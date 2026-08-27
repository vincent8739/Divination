export type Wuxing = "金" | "木" | "水" | "火" | "土";

export type HeavenlyStem = "甲" | "乙" | "丙" | "丁" | "戊" | "己" | "庚" | "辛" | "壬" | "癸";
export type EarthlyBranch = "子" | "丑" | "寅" | "卯" | "辰" | "巳" | "午" | "未" | "申" | "酉" | "戌" | "亥";

export type SixRelative = "父母" | "子孫" | "官鬼" | "妻財" | "兄弟";
export type SixSpirit = "青龍" | "朱雀" | "勾陳" | "螣蛇" | "白虎" | "玄武";

export type YaoRemainder = 6 | 7 | 8 | 9;

export type PalaceName = "乾" | "坎" | "艮" | "震" | "巽" | "離" | "坤" | "兌";

export interface TrigramInfo {
  name: PalaceName;
  symbol: string;
  wuxing: Wuxing;
  binary: string; // 3 bits, e.g. "111" for Qian, "000" for Kun (bottom to top)
  nature: string;
  number: number;
}

export interface HexagramData {
  id: number;
  name: string;
  upperTrigram: PalaceName;
  lowerTrigram: PalaceName;
  binary: string; // 6 bits from bottom to top (bit 0 = 初爻, bit 5 = 上爻)
  palace: PalaceName;
  palaceWuxing: Wuxing;
  orderInPalace: number; // 1: 本宮/純卦, 2: 一世, 3: 二世, 4: 三世, 5: 四世, 6: 五世, 7: 遊魂, 8: 歸魂
  palaceTypeName: string; // "本宮卦", "一世卦", "二世卦", "三世卦", "四世卦", "五世卦", "遊魂卦", "歸魂卦"
  shiYao: number; // 1-6
  yingYao: number; // 1-6
  guaCi: string;
  tuanCi: string;
  xiangCi: string;
  yaoCi: string[]; // 6 strings from 初爻 to 上爻
}

export type WangXiangLevel = "旺" | "相" | "休" | "囚" | "死";

export interface DongBianDetail {
  type:
    | "回頭生"
    | "回頭剋"
    | "化進神"
    | "化退神"
    | "化絕"
    | "化墓"
    | "化空"
    | "化合"
    | "化反吟"
    | "化伏吟"
    | "動生變"
    | "動剋變"
    | "比和";
  title: string;
  summary: string;
  detail: string;
  auspiciousness: "大吉" | "吉" | "平" | "凶" | "大凶" | "變數";
}

export interface FushenInfo {
  relative: SixRelative;
  stem: HeavenlyStem;
  branch: EarthlyBranch;
  wuxing: Wuxing;
  pureHexagramName: string;
  lineIndex: number; // 1-6
  relationWithFeishen: "伏生飛" | "飛生伏" | "伏剋飛" | "飛剋伏" | "比和";
  relationDesc: string;
  isMissingInOriginal: boolean; // 是否為本卦所缺之六親
  isEmerged: boolean; // 伏神是否旺相/透出/得日建月建動爻生扶
  emergedReason: string;
}

export interface YaoLineDetail {
  index: number; // 1 = 初爻, 6 = 上爻
  name: string; // 初九, 初六, 六二, 九二, 六三, 九三, etc.
  remainder: YaoRemainder;
  isMoving: boolean;
  yinYang: 0 | 1; // 0 = 陰, 1 = 陽
  symbolStr: string; // "▅▅▅▅▅" or "▅▅　▅▅"
  movingMark: string; // "◯" for 9, "✕" for 6, "" for 7/8
  
  // NaJia in Primary Hexagram
  originalStem: HeavenlyStem;
  originalBranch: EarthlyBranch;
  originalWuxing: Wuxing;
  originalRelative: SixRelative;
  
  // NaJia in Changed Hexagram (if changed)
  changedYinYang?: 0 | 1;
  changedSymbolStr?: string;
  changedStem?: HeavenlyStem;
  changedBranch?: EarthlyBranch;
  changedWuxing?: Wuxing;
  changedRelative?: SixRelative;
  isChangedShi?: boolean;
  isChangedYing?: boolean;
  changedLineName?: string;
  changedYaoCi?: string;
  
  // Six Spirit
  sixSpirit: SixSpirit;
  
  // Shi & Ying
  isShi: boolean;
  isYing: boolean;
  
  // Yong Shen tag
  isYongShen: boolean;
  
  // 月令旺衰 (旺、相、休、囚、死)
  wangXiang: WangXiangLevel;
  wangXiangDescription: string;

  // 月破 (Month Po)
  isMonthPo: boolean;
  monthPoDescription?: string;

  // 日沖與日動態 (暗動、日破、日沖動、沖空)
  isDayChong: boolean;
  dayChongType?: "暗動" | "日破" | "日沖動" | "沖空";
  dayChongDescription?: string;

  // 日辰關係 (日建同旺、得日生、受日剋、生助日辰、日合、日平)
  dayRelation: "日建同旺" | "得日辰生" | "受日辰剋" | "生助日辰" | "日辰六合" | "日平";
  dayRelationDescription: string;

  // 旬空
  isXunKong: boolean;

  // Wang Xiang & Shensha status tags (Combined for display badges)
  statusTags: string[];
  
  // 動變生剋 (化進神, 化退神, 化回頭生, 化回頭剋, 化空, 化墓, etc.)
  changeDynamics?: string;
  dongBianDetail?: DongBianDetail;
  
  // YaoCi
  yaoCi: string;
  
  // Corresponding Fushen
  fushen?: FushenInfo;
}

export interface DivinationResult {
  id: string;
  querent: string;
  question: string;
  yongShenCategory: SixRelative;
  
  // Time & Ganzhi
  date: Date;
  dateTimeStr: string;
  solarTermStr: string;
  ganzhiYear: string;
  ganzhiMonth: string;
  ganzhiDay: string;
  ganzhiHour: string;
  
  // Liu Yao Key Parameters
  yueJian: EarthlyBranch; // 月建
  yueJianWuxing: Wuxing;
  riChen: EarthlyBranch; // 日辰
  riChenWuxing: Wuxing;
  riGan: HeavenlyStem;
  xunKong: string; // 旬空
  dayLu: string; // 日祿
  dayGuiRen: string; // 天乙貴人
  yiMa: string; // 驛馬
  taoHua: string; // 桃花
  
  // Hexagrams
  remainders: YaoRemainder[]; // [初爻, 二爻, 三爻, 四爻, 五爻, 上爻]
  originalHexagram: HexagramData;
  changedHexagram?: HexagramData;
  hasMovingYao: boolean;
  movingCount: number;
  
  // Detailed Lines
  lines: YaoLineDetail[]; // Length 6, from 初爻 (index 0) to 上爻 (index 5)
  
  // Missing Six Relatives in Primary Hexagram
  missingRelatives: SixRelative[];
  
  // Summary & Classical Evaluation
  overallAuspiciousness: string;
  sixHeSixChong?: string; // 六合卦、六沖卦、遊魂卦、歸魂卦
  changedSixHeSixChong?: string; // 變卦之六合、六沖、遊魂、歸魂
  aiInterpretation?: string;
  createdAt: number;
}

export interface StalkChangeStep {
  changeIndex: number; // 1, 2, 3
  stalksBefore: number; // e.g. 49, 44, 40
  leftCount: number;
  rightCount: number;
  hangOne: number; // 1
  leftRemainder: number; // 1, 2, 3, 4
  rightRemainder: number; // 1, 2, 3, 4
  totalDiscarded: number; // 5, 9 or 4, 8
  stalksRemaining: number;
}

export interface StalkYaoStep {
  yaoIndex: number; // 1-6
  changes: StalkChangeStep[];
  finalStalks: number; // 36, 32, 28, 24
  remainderValue: YaoRemainder; // 9, 8, 7, 6
  lineNature: string; // "老陽 (九)", "少陰 (八)", "少陽 (七)", "老陰 (六)"
}
