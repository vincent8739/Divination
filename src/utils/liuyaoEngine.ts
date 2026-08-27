import {
  EarthlyBranch,
  FushenInfo,
  HeavenlyStem,
  HexagramData,
  PalaceName,
  SixRelative,
  SixSpirit,
  Wuxing,
  YaoLineDetail,
  YaoRemainder,
  DivinationResult,
  WangXiangLevel,
  DongBianDetail,
} from "../types/liuyao";
import { findHexagramByBinary, getPureHexagramOfPalace, HEXAGRAMS_DATA, TRIGRAMS } from "../data/hexagrams";
import { BRANCH_WUXING, GanzhiResult } from "./calendar";

// NaJia definitions for all 8 Trigrams
// Inner: lines 1, 2, 3; Outer: lines 4, 5, 6
interface NaJiaTrigram {
  innerStem: HeavenlyStem;
  innerBranches: [EarthlyBranch, EarthlyBranch, EarthlyBranch];
  outerStem: HeavenlyStem;
  outerBranches: [EarthlyBranch, EarthlyBranch, EarthlyBranch];
}

export const NAJIA_TABLE: Record<PalaceName, NaJiaTrigram> = {
  乾: {
    innerStem: "甲",
    innerBranches: ["子", "寅", "辰"],
    outerStem: "壬",
    outerBranches: ["午", "申", "戌"],
  },
  坤: {
    innerStem: "乙",
    innerBranches: ["未", "巳", "卯"],
    outerStem: "癸",
    outerBranches: ["丑", "亥", "酉"],
  },
  震: {
    innerStem: "庚",
    innerBranches: ["子", "寅", "辰"],
    outerStem: "庚",
    outerBranches: ["午", "申", "戌"],
  },
  巽: {
    innerStem: "辛",
    innerBranches: ["丑", "亥", "酉"],
    outerStem: "辛",
    outerBranches: ["未", "巳", "卯"],
  },
  坎: {
    innerStem: "戊",
    innerBranches: ["寅", "辰", "午"],
    outerStem: "戊",
    outerBranches: ["申", "戌", "子"],
  },
  離: {
    innerStem: "己",
    innerBranches: ["卯", "丑", "亥"],
    outerStem: "己",
    outerBranches: ["酉", "未", "巳"],
  },
  艮: {
    innerStem: "丙",
    innerBranches: ["辰", "午", "申"],
    outerStem: "丙",
    outerBranches: ["戌", "子", "寅"],
  },
  兌: {
    innerStem: "丁",
    innerBranches: ["巳", "卯", "丑"],
    outerStem: "丁",
    outerBranches: ["亥", "酉", "未"],
  },
};

// Five Element Generation & Restriction
export const WUXING_RELATIONS: Record<
  Wuxing,
  { generates: Wuxing; restricts: Wuxing; generatedBy: Wuxing; restrictedBy: Wuxing }
> = {
  金: { generates: "水", restricts: "木", generatedBy: "土", restrictedBy: "火" },
  木: { generates: "火", restricts: "土", generatedBy: "水", restrictedBy: "金" },
  水: { generates: "木", restricts: "火", generatedBy: "金", restrictedBy: "土" },
  火: { generates: "土", restricts: "金", generatedBy: "木", restrictedBy: "水" },
  土: { generates: "金", restricts: "水", generatedBy: "火", restrictedBy: "木" },
};

// Compute Six Relative from Palace Element and Line Branch Element
export const getSixRelative = (palaceWuxing: Wuxing, branchWuxing: Wuxing): SixRelative => {
  if (palaceWuxing === branchWuxing) return "兄弟";
  if (WUXING_RELATIONS[branchWuxing].generates === palaceWuxing) return "父母"; // 生我者
  if (WUXING_RELATIONS[palaceWuxing].generates === branchWuxing) return "子孫"; // 我生者
  if (WUXING_RELATIONS[branchWuxing].restricts === palaceWuxing) return "官鬼"; // 剋我者
  if (WUXING_RELATIONS[palaceWuxing].restricts === branchWuxing) return "妻財"; // 我剋者
  return "兄弟";
};

// Compute Six Spirits from Day Stem
export const getSixSpirits = (dayStem: HeavenlyStem): SixSpirit[] => {
  const sequence: Record<string, SixSpirit[]> = {
    甲乙: ["青龍", "朱雀", "勾陳", "螣蛇", "白虎", "玄武"],
    丙丁: ["朱雀", "勾陳", "螣蛇", "白虎", "玄武", "青龍"],
    戊: ["勾陳", "螣蛇", "白虎", "玄武", "青龍", "朱雀"],
    己: ["螣蛇", "白虎", "玄武", "青龍", "朱雀", "勾陳"],
    庚辛: ["白虎", "玄武", "青龍", "朱雀", "勾陳", "螣蛇"],
    壬癸: ["玄武", "青龍", "朱雀", "勾陳", "螣蛇", "白虎"],
  };

  for (const [stems, spirits] of Object.entries(sequence)) {
    if (stems.includes(dayStem)) {
      return spirits;
    }
  }
  return ["青龍", "朱雀", "勾陳", "螣蛇", "白虎", "玄武"];
};

// Derive Earthly Branch & Stem for 6 lines of a Hexagram
export const getHexagramLinesNaJia = (
  hexagram: HexagramData
): { stems: HeavenlyStem[]; branches: EarthlyBranch[]; wuxings: Wuxing[]; relatives: SixRelative[] } => {
  const lowerNajia = NAJIA_TABLE[hexagram.lowerTrigram];
  const upperNajia = NAJIA_TABLE[hexagram.upperTrigram];

  const stems: HeavenlyStem[] = [
    lowerNajia.innerStem,
    lowerNajia.innerStem,
    lowerNajia.innerStem,
    upperNajia.outerStem,
    upperNajia.outerStem,
    upperNajia.outerStem,
  ];

  const branches: EarthlyBranch[] = [
    lowerNajia.innerBranches[0],
    lowerNajia.innerBranches[1],
    lowerNajia.innerBranches[2],
    upperNajia.outerBranches[0],
    upperNajia.outerBranches[1],
    upperNajia.outerBranches[2],
  ];

  const wuxings = branches.map((b) => BRANCH_WUXING[b]);
  const relatives = wuxings.map((w) => getSixRelative(hexagram.palaceWuxing, w));

  return { stems, branches, wuxings, relatives };
};

// Earthly Branch Clashes (地支六沖)
export const BRANCH_CHONG: Record<EarthlyBranch, EarthlyBranch> = {
  子: "午",
  丑: "未",
  寅: "申",
  卯: "酉",
  辰: "戌",
  巳: "亥",
  午: "子",
  未: "丑",
  申: "寅",
  酉: "卯",
  戌: "辰",
  亥: "巳",
};

// Earthly Branch Harmonies (地支六合)
export const BRANCH_HE: Record<EarthlyBranch, EarthlyBranch> = {
  子: "丑",
  丑: "子",
  寅: "亥",
  亥: "寅",
  卯: "戌",
  戌: "卯",
  辰: "酉",
  酉: "辰",
  巳: "申",
  申: "巳",
  午: "未",
  未: "午",
};

// Determine Wang / Xiang / Xiu / Qiu / Si based on Month Branch (月建旺衰)
export const calculateWangXiang = (
  branch: EarthlyBranch,
  yueJian: EarthlyBranch
): { level: WangXiangLevel; desc: string } => {
  const branchWuxing = BRANCH_WUXING[branch];
  const yueWuxing = BRANCH_WUXING[yueJian];

  // 1. 同我者旺 (當令)
  if (branchWuxing === yueWuxing) {
    return {
      level: "旺",
      desc: `月建【${yueJian}】${yueWuxing}當令同氣為旺，得令專權，生氣充沛最有力。`,
    };
  }
  // 2. 令生我者相
  if (WUXING_RELATIONS[yueWuxing].generates === branchWuxing) {
    return {
      level: "相",
      desc: `得月建【${yueJian}】${yueWuxing}相生為相，如雨露滋潤，生機蓬勃、後勁充沛。`,
    };
  }
  // 3. 我生令者休
  if (WUXING_RELATIONS[branchWuxing].generates === yueWuxing) {
    return {
      level: "休",
      desc: `生月建【${yueJian}】${yueWuxing}洩氣為休，功成身退，退居休養無力。`,
    };
  }
  // 4. 我剋令者囚
  if (WUXING_RELATIONS[branchWuxing].restricts === yueWuxing) {
    return {
      level: "囚",
      desc: `剋月建【${yueJian}】${yueWuxing}受耗為囚，力不從心，受制被困。`,
    };
  }
  // 5. 令剋我者死
  if (WUXING_RELATIONS[yueWuxing].restricts === branchWuxing) {
    return {
      level: "死",
      desc: `受月建【${yueJian}】${yueWuxing}所剋為死，如草木逢霜，枯朽無氣。`,
    };
  }

  return { level: "休", desc: "月令平氣" };
};

// Check Month Po (月破)
export const checkMonthPo = (
  branch: EarthlyBranch,
  yueJian: EarthlyBranch
): { isMonthPo: boolean; desc?: string } => {
  if (BRANCH_CHONG[yueJian] === branch) {
    return {
      isMonthPo: true,
      desc: `逢月建【${yueJian}】相沖為「月破」。如枯木逢暴風，主事受損、阻礙重重；須待出月或逢合、值日方能填實應事。`,
    };
  }
  return { isMonthPo: false };
};

// Calculate Day relation, Day Chong, An Dong, Ri Po, Ri Chong Dong
export const calculateDayRelationAndChong = (
  branch: EarthlyBranch,
  riChen: EarthlyBranch,
  isMoving: boolean,
  wangXiang: WangXiangLevel,
  isXunKong: boolean
): {
  isDayChong: boolean;
  dayChongType?: "暗動" | "日破" | "日沖動" | "沖空";
  dayChongDesc?: string;
  dayRelation: YaoLineDetail["dayRelation"];
  dayRelationDesc: string;
} => {
  const branchWuxing = BRANCH_WUXING[branch];
  const riWuxing = BRANCH_WUXING[riChen];

  // 1. Determine basic day relation
  let dayRelation: YaoLineDetail["dayRelation"] = "日平";
  let dayRelationDesc = "與日辰無特殊生剋，平穩隨常。";

  if (BRANCH_HE[riChen] === branch) {
    dayRelation = "日辰六合";
    dayRelationDesc = `與日辰【${riChen}】六合，得日辰牽絆成全，吉事添喜、凶事牽連不易解。`;
  } else if (branchWuxing === riWuxing) {
    dayRelation = "日建同旺";
    dayRelationDesc = `與日辰【${riChen}】${riWuxing}同氣，當日得令，身強氣足。`;
  } else if (WUXING_RELATIONS[riWuxing].generates === branchWuxing) {
    dayRelation = "得日辰生";
    dayRelationDesc = `得日辰【${riChen}】${riWuxing}相生，得外力、貴人提攜相助。`;
  } else if (WUXING_RELATIONS[riWuxing].restricts === branchWuxing) {
    dayRelation = "受日辰剋";
    dayRelationDesc = `受日辰【${riChen}】${riWuxing}相剋，當日受制，行事多有壓力阻礙。`;
  } else if (WUXING_RELATIONS[branchWuxing].generates === riWuxing) {
    dayRelation = "生助日辰";
    dayRelationDesc = `生助日辰【${riChen}】${riWuxing}，自耗精力順應形勢。`;
  }

  // 2. Determine Day Chong (日沖)
  const isDayChong = BRANCH_CHONG[riChen] === branch;
  let dayChongType: YaoLineDetail["dayChongType"] = undefined;
  let dayChongDesc: string | undefined = undefined;

  if (isDayChong) {
    if (isMoving) {
      dayChongType = "日沖動";
      dayChongDesc = `動爻逢日辰【${riChen}】相沖為「日沖動」，如催馬加鞭，事態發作迅速、速戰速決。`;
    } else if (isXunKong) {
      dayChongType = "沖空";
      dayChongDesc = `旬空之爻逢日辰【${riChen}】相沖為「沖空」，沖空則實，動而有用，不再受空亡牽制。`;
    } else if (wangXiang === "旺" || wangXiang === "相" || dayRelation === "日建同旺" || dayRelation === "得日辰生") {
      dayChongType = "暗動";
      dayChongDesc = `旺相靜爻逢日辰【${riChen}】相沖為「暗動」，如伏兵暴起，暗中策動發力，福凶力量倍增且難以察覺。`;
    } else {
      dayChongType = "日破";
      dayChongDesc = `休囚無氣之靜爻逢日辰【${riChen}】相沖為「日破」，如風摧枯葉，主破散無依、謀事無成。`;
    }
  }

  return {
    isDayChong,
    dayChongType,
    dayChongDesc,
    dayRelation,
    dayRelationDesc,
  };
};

// Calculate detailed DongBian dynamics (動變生剋: 回頭生, 回頭剋, 化進, 化退, 化絕, 化墓, 化空, 化合, etc.)
export const calculateDongBianDetail = (
  origBranch: EarthlyBranch,
  origWuxing: Wuxing,
  changedBranch: EarthlyBranch,
  changedWuxing: Wuxing,
  isChangedXunKong: boolean
): DongBianDetail => {
  // 進神 (Advance Spirit)
  const jinMap: Record<string, string> = {
    寅: "卯",
    巳: "午",
    申: "酉",
    亥: "子",
    丑: "辰",
    辰: "未",
    未: "戌",
    戌: "丑",
  };

  // 退神 (Retreat Spirit)
  const tuiMap: Record<string, string> = {
    卯: "寅",
    午: "巳",
    酉: "申",
    子: "亥",
    辰: "丑",
    未: "辰",
    戌: "未",
    丑: "戌",
  };

  // 1. 進神
  if (jinMap[origBranch] === changedBranch) {
    return {
      type: "化進神",
      title: `化進神（${origBranch}化${changedBranch}）`,
      summary: "動化進神 · 氣勢倍增",
      detail: `動爻【${origBranch}${origWuxing}】動化【${changedBranch}${changedWuxing}】為化進神。同氣相求、由後進前，如旭日東升、步步高升，氣勢倍增，事多進展順暢且綿長。`,
      auspiciousness: "大吉",
    };
  }

  // 2. 退神
  if (tuiMap[origBranch] === changedBranch) {
    return {
      type: "化退神",
      title: `化退神（${origBranch}化${changedBranch}）`,
      summary: "動化退神 · 後勁不足",
      detail: `動爻【${origBranch}${origWuxing}】動化【${changedBranch}${changedWuxing}】為化退神。同氣後退，如日薄西山、秋葉凋零，後勁匱乏，事態漸漸消退萎縮，虎頭蛇尾。`,
      auspiciousness: "凶",
    };
  }

  // 3. 回頭生 (Return Generation)
  if (WUXING_RELATIONS[changedWuxing].generates === origWuxing) {
    return {
      type: "回頭生",
      title: `化回頭生（${changedBranch}${changedWuxing}生${origBranch}${origWuxing}）`,
      summary: "變爻回頭生動爻 · 大吉",
      detail: `變爻【${changedBranch}${changedWuxing}】回頭生動爻【${origBranch}${origWuxing}】。得變爻源泉之生助，如枯木逢春、貴人暗扶，根基穩固，先難後易，吉慶自招。`,
      auspiciousness: "大吉",
    };
  }

  // 4. 回頭剋 (Return Restriction)
  if (WUXING_RELATIONS[changedWuxing].restricts === origWuxing) {
    return {
      type: "回頭剋",
      title: `化回頭剋（${changedBranch}${changedWuxing}剋${origBranch}${origWuxing}）`,
      summary: "變爻回頭剋動爻 · 大凶",
      detail: `變爻【${changedBranch}${changedWuxing}】回頭剋動爻【${origBranch}${origWuxing}】。變爻反戈一擊自殘根基，猶如後院起火，所謀先成後敗、得而復失，為六爻大凶之象。`,
      auspiciousness: "大凶",
    };
  }

  // 5. 動化空亡 (Transformation into XunKong)
  if (isChangedXunKong) {
    return {
      type: "化空",
      title: `動化旬空（化${changedBranch}空亡）`,
      summary: "變爻逢旬空 · 虛花無實",
      detail: `變爻【${changedBranch}${changedWuxing}】逢當日旬空，動化空亡。猶如水中撈月、築沙造塔，眼前難收實效，需待出空填實之日方能應驗。`,
      auspiciousness: "變數",
    };
  }

  // 6. 動化入墓 (Transformation to Tomb: 金丑 木未 水土辰 火戌)
  const isTomb =
    (origWuxing === "金" && changedBranch === "丑") ||
    (origWuxing === "木" && changedBranch === "未") ||
    ((origWuxing === "水" || origWuxing === "土") && changedBranch === "辰") ||
    (origWuxing === "火" && changedBranch === "戌");

  if (isTomb) {
    return {
      type: "化墓",
      title: `動化入墓（${origBranch}化${changedBranch}墓）`,
      summary: "動爻化入墓庫 · 蒙蔽受困",
      detail: `動爻【${origBranch}${origWuxing}】動化【${changedBranch}】為化入墓庫。主受困、受阻、神智昏昧、被拘禁或才能難以施展，需逢沖墓之日方能脫困。`,
      auspiciousness: "凶",
    };
  }

  // 7. 動化絕地 (Transformation to Severance)
  const isJue =
    (origWuxing === "金" && (changedBranch === "寅" || changedBranch === "巳")) ||
    (origWuxing === "木" && changedBranch === "申") ||
    ((origWuxing === "水" || origWuxing === "土") && changedBranch === "巳") ||
    (origWuxing === "火" && changedBranch === "亥");

  if (isJue) {
    return {
      type: "化絕",
      title: `動化絕地（${origBranch}化${changedBranch}絕）`,
      summary: "動爻化入絕地 · 生氣斷絕",
      detail: `動爻【${origBranch}${origWuxing}】動化【${changedBranch}${changedWuxing}】為絕地。生氣枯竭、後援斷絕，事態陷入絕境難以維持。`,
      auspiciousness: "凶",
    };
  }

  // 8. 動化六合
  if (BRANCH_HE[origBranch] === changedBranch) {
    return {
      type: "化合",
      title: `動化六合（${origBranch}${changedBranch}相合）`,
      summary: "動變地支相合 · 絆住相親",
      detail: `動爻【${origBranch}】與變爻【${changedBranch}】地支六合。主情意纏綿、有人成全相助，但亦主事情被羈絆牽連，不易迅速了結。`,
      auspiciousness: "吉",
    };
  }

  // 9. 動化反吟 / 六沖
  if (BRANCH_CHONG[origBranch] === changedBranch) {
    return {
      type: "化反吟",
      title: `動化反吟（${origBranch}${changedBranch}相沖）`,
      summary: "動變地支相沖 · 事多反覆",
      detail: `動爻【${origBranch}】與變爻【${changedBranch}】地支相沖為反吟。主反覆無常、去而復來、心緒不寧、折騰難定。`,
      auspiciousness: "凶",
    };
  }

  // 10. 動化伏吟
  if (origBranch === changedBranch) {
    return {
      type: "化伏吟",
      title: `動化伏吟（${origBranch}化${changedBranch}同支）`,
      summary: "動變地支相同 · 停滯呻吟",
      detail: `動爻【${origBranch}】化出同地支【${changedBranch}】為伏吟。主停滯不前、進退兩難、心中憂鬱呻吟。`,
      auspiciousness: "平",
    };
  }

  // 11. 動生變 (洩氣)
  if (WUXING_RELATIONS[origWuxing].generates === changedWuxing) {
    return {
      type: "動生變",
      title: `動生變爻（${origBranch}${origWuxing}生${changedBranch}${changedWuxing}）`,
      summary: "動爻生變爻 · 力量外洩",
      detail: `動爻【${origBranch}${origWuxing}】生出變爻【${changedBranch}${changedWuxing}】。為洩氣之象，主自身多所付出、勞碌操心，收穫不及付出。`,
      auspiciousness: "平",
    };
  }

  // 12. 動剋變 (耗力)
  if (WUXING_RELATIONS[origWuxing].restricts === changedWuxing) {
    return {
      type: "動剋變",
      title: `動剋變爻（${origBranch}${origWuxing}剋${changedBranch}${changedWuxing}）`,
      summary: "動爻剋變爻 · 勞力掌控",
      detail: `動爻【${origBranch}${origWuxing}】剋制變爻【${changedBranch}${changedWuxing}】。需耗費心力征服掌控，有得有耗。`,
      auspiciousness: "平",
    };
  }

  // 13. 比和
  return {
    type: "比和",
    title: `動變比和（${origBranch}${origWuxing}化${changedBranch}${changedWuxing}）`,
    summary: "動變同類比和",
    detail: `動爻【${origBranch}${origWuxing}】與變爻【${changedBranch}${changedWuxing}】五行同氣相助，平穩相持。`,
    auspiciousness: "平",
  };
};

// Legacy helper for quick string
export const getChangeDynamics = (
  origBranch: EarthlyBranch,
  origWuxing: Wuxing,
  changedBranch: EarthlyBranch,
  changedWuxing: Wuxing
): string => {
  const detail = calculateDongBianDetail(origBranch, origWuxing, changedBranch, changedWuxing, false);
  return detail.summary;
};

// Auto guess Yong Shen by question context
export const guessYongShenFromQuestion = (question: string): SixRelative => {
  const q = question.toLowerCase();
  if (
    q.includes("財") ||
    q.includes("錢") ||
    q.includes("生意") ||
    q.includes("買賣") ||
    q.includes("投資") ||
    q.includes("獲利") ||
    q.includes("股票") ||
    q.includes("薪水") ||
    q.includes("老婆") ||
    q.includes("妻子") ||
    q.includes("女友")
  ) {
    return "妻財";
  }
  if (
    q.includes("官") ||
    q.includes("事業") ||
    q.includes("工作") ||
    q.includes("升遷") ||
    q.includes("求職") ||
    q.includes("面試") ||
    q.includes("考試") ||
    q.includes("訴訟") ||
    q.includes("官司") ||
    q.includes("丈夫") ||
    q.includes("男友") ||
    q.includes("職位") ||
    q.includes("升職") ||
    q.includes("疾病") ||
    q.includes("病情") ||
    q.includes("盜賊")
  ) {
    return "官鬼";
  }
  if (
    q.includes("學業") ||
    q.includes("證照") ||
    q.includes("合約") ||
    q.includes("文書") ||
    q.includes("父母") ||
    q.includes("長輩") ||
    q.includes("房子") ||
    q.includes("買房") ||
    q.includes("車") ||
    q.includes("房產") ||
    q.includes("消息") ||
    q.includes("文章")
  ) {
    return "父母";
  }
  if (
    q.includes("子") ||
    q.includes("女") ||
    q.includes("孩子") ||
    q.includes("懷孕") ||
    q.includes("求醫") ||
    q.includes("吃藥") ||
    q.includes("平安") ||
    q.includes("消災") ||
    q.includes("旅遊") ||
    q.includes("寵物") ||
    q.includes("後代")
  ) {
    return "子孫";
  }
  if (
    q.includes("朋友") ||
    q.includes("兄弟") ||
    q.includes("姐妹") ||
    q.includes("同事") ||
    q.includes("合夥") ||
    q.includes("競爭") ||
    q.includes("借錢") ||
    q.includes("同輩")
  ) {
    return "兄弟";
  }

  // Default to 官鬼 for generic career/destiny inquiry, or 妻財
  return "官鬼";
};

// Check Liu He (六合) or Liu Chong (六沖) for hexagram
export const checkHexagramCategory = (hex: HexagramData): string => {
  const chongGua = [
    "乾為天",
    "坎為水",
    "艮為山",
    "震為雷",
    "巽為風",
    "離為火",
    "坤為地",
    "兌為澤",
    "天雷無妄",
    "雷天大壯",
  ];
  const heGua = [
    "天地否",
    "地天泰",
    "水地比",
    "地水師",
    "火山旅",
    "山火賁",
    "澤水困",
    "水澤節",
  ];

  if (chongGua.includes(hex.name)) {
    return "六沖卦（主散、主速、沖決事變）";
  }
  if (heGua.includes(hex.name)) {
    return "六合卦（主和、主久、事多牽連成全）";
  }
  if (hex.orderInPalace === 7) {
    return "遊魂卦（心無定向、身處異地、事多飄忽）";
  }
  if (hex.orderInPalace === 8) {
    return "歸魂卦（事歸原處、回心轉意、落葉歸根）";
  }
  return "";
};

// Main function: Calculate complete Liu Yao Divination result
export const calculateLiuYaoDivination = (
  querent: string,
  question: string,
  remainders: YaoRemainder[], // [初爻, 二爻, 三爻, 四爻, 五爻, 上爻]
  ganzhi: GanzhiResult,
  customYongShen?: SixRelative
): DivinationResult => {
  if (remainders.length !== 6) {
    throw new Error("Must provide exactly 6 remainders for all six lines (初爻至上爻)");
  }

  // 1. Build original binary and changed binary
  // 6: 老陰 (yin, changes to yang)
  // 7: 少陽 (yang, stays yang)
  // 8: 少陰 (yin, stays yin)
  // 9: 老陽 (yang, changes to yin)
  const origBits = remainders.map((r) => (r === 7 || r === 9 ? "1" : "0")).join("");
  const changedBits = remainders.map((r) => {
    if (r === 6) return "1"; // 老陰變少陽
    if (r === 9) return "0"; // 老陽變少陰
    return r === 7 ? "1" : "0";
  }).join("");

  const originalHexagram = findHexagramByBinary(origBits);
  const hasMovingYao = remainders.some((r) => r === 6 || r === 9);
  const movingCount = remainders.filter((r) => r === 6 || r === 9).length;

  let changedHexagram: HexagramData | undefined = undefined;
  if (hasMovingYao) {
    changedHexagram = findHexagramByBinary(changedBits);
  }

  // 2. NaJia for Primary Hexagram
  const origNajia = getHexagramLinesNaJia(originalHexagram);

  // 3. NaJia for Changed Hexagram (if moving)
  let changedNajia: ReturnType<typeof getHexagramLinesNaJia> | undefined = undefined;
  if (changedHexagram) {
    changedNajia = getHexagramLinesNaJia(changedHexagram);
  }

  // 4. Six Spirits from Day Stem
  const sixSpirits = getSixSpirits(ganzhi.riGan);

  // 5. Check Missing Relatives in Primary Hexagram
  const allSixRelatives: SixRelative[] = ["父母", "子孫", "官鬼", "妻財", "兄弟"];
  const existingRelatives = new Set(origNajia.relatives);
  const missingRelatives = allSixRelatives.filter((r) => !existingRelatives.has(r));

  // 6. Look up Pure Palace Hexagram (本宮純卦) for Hidden Spirits (伏神)
  const purePalaceHex = getPureHexagramOfPalace(originalHexagram.palace);
  const pureNajia = getHexagramLinesNaJia(purePalaceHex);

  // 7. Yong Shen determination
  const yongShenCategory = customYongShen || guessYongShenFromQuestion(question);

  // 8. Build detailed Yao Lines array (0 = 初爻, 5 = 上爻)
  const lines: YaoLineDetail[] = [];

  for (let i = 0; i < 6; i++) {
    const lineIndex = i + 1; // 1 to 6
    const rem = remainders[i];
    const isMoving = rem === 6 || rem === 9;
    const yinYang: 0 | 1 = rem === 7 || rem === 9 ? 1 : 0;
    const symbolStr = yinYang === 1 ? "▅▅▅▅▅" : "▅▅　▅▅";
    const movingMark = rem === 9 ? "◯ (老陽發動)" : rem === 6 ? "✕ (老陰發動)" : "";

    // Yao line name (e.g. 初九, 初六, 六二, 九二...)
    const yaoPositionName = ["初", "二", "三", "四", "五", "上"][i];
    const yaoTypeName = yinYang === 1 ? "九" : "六";
    const lineName = `${yaoPositionName}${yaoTypeName}`;

    const origStem = origNajia.stems[i];
    const origBranch = origNajia.branches[i];
    const origWuxing = origNajia.wuxings[i];
    const origRelative = origNajia.relatives[i];

    const isShi = originalHexagram.shiYao === lineIndex;
    const isYing = originalHexagram.yingYao === lineIndex;
    const isYongShen = origRelative === yongShenCategory;

    // 1. Wang / Xiang / Xiu / Qiu / Si based on Month (月令旺衰)
    const { level: wangXiang, desc: wangXiangDescription } = calculateWangXiang(origBranch, ganzhi.yueJian);

    // 2. Month Po (月破)
    const { isMonthPo, desc: monthPoDescription } = checkMonthPo(origBranch, ganzhi.yueJian);

    // 3. XunKong (旬空)
    const isXunKong = ganzhi.xunKong.includes(origBranch);

    // 4. Day relation & Day Chong (日辰生剋合沖、暗動、日破、沖動、沖空)
    const {
      isDayChong,
      dayChongType,
      dayChongDesc: dayChongDescription,
      dayRelation,
      dayRelationDesc: dayRelationDescription,
    } = calculateDayRelationAndChong(origBranch, ganzhi.riChen, isMoving, wangXiang, isXunKong);

    // 5. Build Status Tags array for visual badge displays
    const statusTags: string[] = [];
    statusTags.push(`月令${wangXiang}`);
    if (isMonthPo) statusTags.push("月破");
    if (isXunKong) statusTags.push("旬空");
    if (dayRelation === "日辰六合") statusTags.push("日合");
    if (dayRelation === "日建同旺") statusTags.push("臨日辰");
    if (dayRelation === "得日辰生") statusTags.push("日辰生");
    if (dayRelation === "受日辰剋") statusTags.push("日辰剋");
    if (dayChongType) statusTags.push(dayChongType);

    // Changed Yao details
    let changedYinYang: (0 | 1) | undefined = undefined;
    let changedSymbolStr: string | undefined = undefined;
    let changedStem: HeavenlyStem | undefined = undefined;
    let changedBranch: EarthlyBranch | undefined = undefined;
    let changedWuxing: Wuxing | undefined = undefined;
    let changedRelative: SixRelative | undefined = undefined;
    let isChangedShi: boolean | undefined = undefined;
    let isChangedYing: boolean | undefined = undefined;
    let changedLineName: string | undefined = undefined;
    let changedYaoCi: string | undefined = undefined;
    let changeDynamics: string | undefined = undefined;
    let dongBianDetail: DongBianDetail | undefined = undefined;

    if (changedHexagram && changedNajia) {
      changedYinYang = isMoving ? (rem === 6 ? 1 : 0) : yinYang;
      changedSymbolStr = changedYinYang === 1 ? "▅▅▅▅▅" : "▅▅　▅▅";
      changedStem = changedNajia.stems[i];
      changedBranch = changedNajia.branches[i];
      changedWuxing = changedNajia.wuxings[i];
      // Changed relative is calculated against the original Hexagram's palace Wuxing in standard Wen Wang Gua!
      changedRelative = getSixRelative(originalHexagram.palaceWuxing, changedWuxing);
      isChangedShi = changedHexagram.shiYao === lineIndex;
      isChangedYing = changedHexagram.yingYao === lineIndex;
      changedLineName = `${yaoPositionName}${changedYinYang === 1 ? "九" : "六"}`;
      changedYaoCi = changedHexagram.yaoCi[i];

      if (isMoving) {
        const isChangedXunKong = ganzhi.xunKong.includes(changedBranch);
        dongBianDetail = calculateDongBianDetail(origBranch, origWuxing, changedBranch, changedWuxing, isChangedXunKong);
        changeDynamics = dongBianDetail.title;
      }
    }

    // Fushen (Hidden Spirit) on this line from Pure Palace Hexagram
    const pureRel = pureNajia.relatives[i];
    const pureStem = pureNajia.stems[i];
    const pureBranch = pureNajia.branches[i];
    const pureWuxing = pureNajia.wuxings[i];

    // Compute relation between Fushen (pure) and Feishen (original)
    let relationWithFeishen: FushenInfo["relationWithFeishen"] = "比和";
    let relationDesc = "";
    if (pureWuxing === origWuxing) {
      relationWithFeishen = "比和";
      relationDesc = "飛伏同氣，比和相助";
    } else if (WUXING_RELATIONS[pureWuxing].generates === origWuxing) {
      relationWithFeishen = "伏生飛";
      relationDesc = "伏生飛神，伏神洩氣，難以全力發揮";
    } else if (WUXING_RELATIONS[origWuxing].generates === pureWuxing) {
      relationWithFeishen = "飛生伏";
      relationDesc = "飛神生伏神，名為長生得助，極易透出有用";
    } else if (WUXING_RELATIONS[pureWuxing].restricts === origWuxing) {
      relationWithFeishen = "伏剋飛";
      relationDesc = "伏神剋飛神，名為出暴，伏神有勢可破關而出";
    } else if (WUXING_RELATIONS[origWuxing].restricts === pureWuxing) {
      relationWithFeishen = "飛剋伏";
      relationDesc = "飛神剋伏神，名為受制，受飛神壓迫，凶困難出";
    }

    // Check if Fushen is emerged (出伏/透出條件)
    const fushenWang = BRANCH_WUXING[pureBranch] === ganzhi.yueJianWuxing || 
      WUXING_RELATIONS[ganzhi.yueJianWuxing].generates === BRANCH_WUXING[pureBranch] ||
      BRANCH_WUXING[pureBranch] === ganzhi.riChenWuxing ||
      WUXING_RELATIONS[ganzhi.riChenWuxing].generates === BRANCH_WUXING[pureBranch];
    
    const feishenClashed = BRANCH_CHONG[ganzhi.riChen] === origBranch || BRANCH_CHONG[ganzhi.yueJian] === origBranch;
    const feishenKong = ganzhi.xunKong.includes(origBranch);

    let isEmerged = false;
    let emergedReason = "";

    if (relationWithFeishen === "飛生伏") {
      isEmerged = true;
      emergedReason = "得飛神相生，易透出";
    } else if (fushenWang) {
      isEmerged = true;
      emergedReason = "得日月旺相生扶，伏而有力";
    } else if (feishenClashed) {
      isEmerged = true;
      emergedReason = "飛神逢日/月沖動，伏神乘機透出";
    } else if (feishenKong) {
      isEmerged = true;
      emergedReason = "飛神落空，遮擋已除，伏神得出";
    } else if (relationWithFeishen === "伏剋飛") {
      isEmerged = true;
      emergedReason = "伏剋飛神為出暴，有破土之勢";
    } else {
      isEmerged = false;
      emergedReason = "伏藏受制或無力，須待逢沖值日方得出";
    }

    const isMissingInOriginal = missingRelatives.includes(pureRel);

    const fushen: FushenInfo = {
      relative: pureRel,
      stem: pureStem,
      branch: pureBranch,
      wuxing: pureWuxing,
      pureHexagramName: purePalaceHex.name,
      lineIndex,
      relationWithFeishen,
      relationDesc,
      isMissingInOriginal,
      isEmerged,
      emergedReason,
    };

    lines.push({
      index: lineIndex,
      name: lineName,
      remainder: rem,
      isMoving,
      yinYang,
      symbolStr,
      movingMark,
      originalStem: origStem,
      originalBranch: origBranch,
      originalWuxing: origWuxing,
      originalRelative: origRelative,
      changedYinYang,
      changedSymbolStr,
      changedStem,
      changedBranch,
      changedWuxing,
      changedRelative,
      isChangedShi,
      isChangedYing,
      changedLineName,
      changedYaoCi,
      sixSpirit: sixSpirits[i],
      isShi,
      isYing,
      isYongShen,
      wangXiang,
      wangXiangDescription,
      isMonthPo,
      monthPoDescription,
      isDayChong,
      dayChongType,
      dayChongDescription,
      dayRelation,
      dayRelationDescription,
      isXunKong,
      statusTags,
      changeDynamics,
      dongBianDetail,
      yaoCi: originalHexagram.yaoCi[i],
      fushen,
    });
  }

  // Summary and Auspiciousness evaluation
  const sixHeSixChong = checkHexagramCategory(originalHexagram);
  const changedSixHeSixChong = changedHexagram ? checkHexagramCategory(changedHexagram) : undefined;

  let overallAuspiciousness = "平穩相濟";
  if (sixHeSixChong.includes("六合")) {
    overallAuspiciousness = "諸事和合 · 吉星高照";
  } else if (sixHeSixChong.includes("六沖")) {
    overallAuspiciousness = "動盪多變 · 宜守不宜急";
  } else if (originalHexagram.palaceTypeName === "遊魂卦") {
    overallAuspiciousness = "心無定見 · 行事猶豫";
  } else if (originalHexagram.palaceTypeName === "歸魂卦") {
    overallAuspiciousness = "事歸本位 · 宜定心守成";
  }

  return {
    id: `div_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    querent,
    question,
    yongShenCategory,
    date: ganzhi.date,
    dateTimeStr: ganzhi.dateTimeStr,
    solarTermStr: ganzhi.solarTermStr,
    ganzhiYear: ganzhi.ganzhiYear,
    ganzhiMonth: ganzhi.ganzhiMonth,
    ganzhiDay: ganzhi.ganzhiDay,
    ganzhiHour: ganzhi.ganzhiHour,
    yueJian: ganzhi.yueJian,
    yueJianWuxing: ganzhi.yueJianWuxing,
    riChen: ganzhi.riChen,
    riChenWuxing: ganzhi.riChenWuxing,
    riGan: ganzhi.riGan,
    xunKong: ganzhi.xunKong,
    dayLu: ganzhi.dayLu,
    dayGuiRen: ganzhi.dayGuiRen,
    yiMa: ganzhi.yiMa,
    taoHua: ganzhi.taoHua,
    remainders,
    originalHexagram,
    changedHexagram,
    hasMovingYao,
    movingCount,
    lines,
    missingRelatives,
    overallAuspiciousness,
    sixHeSixChong,
    changedSixHeSixChong,
    createdAt: Date.now(),
  };
};
