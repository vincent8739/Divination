import React from "react";
import {
  BookOpen,
  Sparkles,
  HelpCircle,
  Layers,
  CheckCircle2,
  Moon,
  Sun,
  Zap,
  Compass,
  Activity,
  Table,
  GitBranch,
  ShieldAlert,
  ArrowRight,
  Info,
} from "lucide-react";

export const LearningGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 頂部引言與研習指南 */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50/70 via-white to-stone-50 p-6 shadow-md sm:p-8">
        <div className="flex items-center space-x-3 border-b border-amber-200/80 pb-4 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800 ring-1 ring-amber-300 shadow-2xs">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900 sm:text-2xl tracking-wide">
              易學研習：京房六爻納甲精要與易理圖譜全鑑
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              深研《易經·繫辭傳》、《增刪卜易》、《卜筮正宗》、《易隱》與大衍筮法之哲學架構與實占體系
            </p>
          </div>
        </div>

        {/* 導讀導覽 */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs text-stone-700 leading-relaxed space-y-2">
          <p className="font-serif text-amber-900 font-semibold text-sm">
            【研習指引】易道廣大，悉備五行生剋與時空演化
          </p>
          <p>
            本指南系統性剖析了排盤系統中三大核心模組的易理淵源、設計初衷與實戰斷卦法則：
            從<strong>「日月星辰能量量化圖譜」</strong>的五行旺衰力學模型、
            <strong>「六爻納甲飛伏排盤矩陣」</strong>的八宮世應六親體系，
            到<strong>「月建日辰動變生剋易理全鑑」</strong>的吉凶應期推斷，助您融會貫通六爻精髓。
          </p>
        </div>
      </div>

      {/* 模組一：日月星辰六爻旺衰能量量化圖譜 專章解析 */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-md sm:p-7 space-y-6">
        <div className="flex items-center space-x-3 border-b border-stone-200 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-800 ring-1 ring-sky-300">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 sm:text-xl">
              第一章：日月星辰六爻旺衰能量量化圖譜 · 易理詳解
            </h3>
            <p className="text-xs text-stone-600">
              為何要將六爻旺衰進行「能量量化」？六親（兄弟、子孫、妻財、官鬼、父母）各自代表何種深層含義？
            </p>
          </div>
        </div>

        {/* 為什麼有能量圖譜？ */}
        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-5 space-y-3">
          <h4 className="font-serif font-bold text-sky-900 text-sm flex items-center gap-1.5">
            <Info className="h-4 w-4" /> 1. 為何需要「六爻旺衰能量量化圖譜」？
          </h4>
          <p className="text-xs text-stone-700 leading-relaxed">
            在傳統六爻實占中，初學者最常面臨的難題是：<strong>「一爻若得月生卻受日剋，又發動化退神，此爻到底算旺還是算衰？」</strong>
          </p>
          <p className="text-xs text-stone-600 leading-relaxed">
            古籍如《增刪卜易》與《卜筮正宗》將爻之旺衰力道分為<strong>「月令提綱」</strong>、<strong>「日辰主宰」</strong>與<strong>「動變回頭生剋」</strong>三大力學維度。本系統將古典古訓轉化為<strong>精確的三維向量力學模型</strong>：
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="rounded-lg bg-white p-3 border border-sky-200 shadow-2xs">
              <span className="font-bold text-sky-900 block mb-1">① 月建分量（天時提綱）</span>
              <p className="text-stone-600 text-[11px]">司三旬萬物旺相休囚，賦予爻的先天根本底氣（臨月建 +100，旺 +80，相 +55，休 -15，死 -75，月破 -90）。</p>
            </div>
            <div className="rounded-lg bg-white p-3 border border-amber-200 shadow-2xs">
              <span className="font-bold text-amber-900 block mb-1">② 日辰分量（地利主宰）</span>
              <p className="text-stone-600 text-[11px]">司一日生殺大權，決定爻的當下發力與沖動（臨日辰 +90，生扶 +60，暗動 +75，受剋 -55，日破 -80）。</p>
            </div>
            <div className="rounded-lg bg-white p-3 border border-purple-200 shadow-2xs">
              <span className="font-bold text-purple-900 block mb-1">③ 動變分量（事態演化）</span>
              <p className="text-stone-600 text-[11px]">動則必變，動爻化出之變爻對本位的回頭生剋（化進神 +80，回頭生 +70，化退神 -65，回頭剋 -80）。</p>
            </div>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed pt-1">
            透過直觀的<strong>「三維疊加分量圖」</strong>、<strong>「綜合能譜柱狀圖」</strong>與<strong>「雷達天平」</strong>，占者能一眼看出全卦能量最鼎盛之爻（成事主力）與最衰破之爻（凶險病根），大幅提昇斷卦效率與準確度。
          </p>
        </div>

        {/* 六親含義全解 */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-amber-900 text-sm flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-700" /> 2. 六親（兄弟、子孫、妻財、官鬼、父母）易學萬象全解
          </h4>
          <p className="text-xs text-stone-600">
            六親源自於「我（本宮所屬五行）」與六爻干支五行的生剋關係（生我者父母、我生者子孫、剋我者官鬼、我剋者妻財、同我者兄弟）：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
            {/* 兄弟爻 */}
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-amber-900">【兄弟爻】同我者</span>
                <span className="rounded bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 text-[10px] font-mono">比肩·劫財</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                <strong>象義：</strong>同輩、兄弟姐妹、朋友、同事、合夥人、同行競爭對手、假小人。
              </p>
              <div className="text-stone-600 text-[11px] space-y-1 border-t border-stone-200 pt-1.5">
                <div><strong className="text-stone-800">占事象徵：</strong>求財最忌兄弟發動（兄動必剋妻財，主破財、爭奪、劫財、開銷破耗、分紅爭執）。</div>
                <div><strong className="text-stone-800">吉利場合：</strong>占同儕情誼、互助結盟、或防範官非時（兄能生子孫，子孫制官鬼）。</div>
              </div>
            </div>

            {/* 子孫爻 */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-emerald-900">【子孫爻】我生者</span>
                <span className="rounded bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 text-[10px] font-mono">福神·生財之源</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                <strong>象義：</strong>晚輩、兒女子嗣、學生、下屬、良醫藥物、福祿、忠僕、寵物、快樂娛樂。
              </p>
              <div className="text-stone-600 text-[11px] space-y-1 border-t border-emerald-200 pt-1.5">
                <div><strong className="text-emerald-900">占事象徵：</strong>六爻中之「萬能福神」與「解難吉神」。子孫生妻財（財源滾滾）；子孫剋官鬼（解災散禍、平息訴訟、祛除病魔、保平安）。</div>
                <div><strong className="text-emerald-900">忌諱場合：</strong>占官職、升遷、考功名時最忌子孫發動（子孫為制官之神，發動則官職難保、降職受挫）。</div>
              </div>
            </div>

            {/* 妻財爻 */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-amber-900">【妻財爻】我剋者</span>
                <span className="rounded bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 text-[10px] font-mono">資財·情緣</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                <strong>象義：</strong>金錢、資產、利潤、生意回報、妻子、女友、愛人、食物、貴重器物。
              </p>
              <div className="text-stone-600 text-[11px] space-y-1 border-t border-amber-200 pt-1.5">
                <div><strong className="text-amber-900">占事象徵：</strong>求財、經商買賣、投資、男占婚姻感情之核心用神。妻財旺相得生，主財豐源茂、夫妻和睦。</div>
                <div><strong className="text-amber-900">剋制關係：</strong>妻財生官鬼（助長事業名望），但妻財剋父母（買賣成則文書耗、不利考試文憑或長輩安康）。</div>
              </div>
            </div>

            {/* 官鬼爻 */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-rose-900">【官鬼爻】剋我者</span>
                <span className="rounded bg-rose-100 text-rose-900 border border-rose-300 px-2 py-0.5 text-[10px] font-mono">官位·名譽·禍患</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                <strong>象義：</strong>官位、事業名聲、領導上司、丈夫、男友、官方機構、官司訴訟、疾病、小人、邪崇。
              </p>
              <div className="text-stone-600 text-[11px] space-y-1 border-t border-rose-200 pt-1.5">
                <div><strong className="text-rose-900">占事象徵：</strong>求職、升遷、考試榜名、公職、女占婚姻感情之用神。旺相得生者官運亨通。</div>
                <div><strong className="text-rose-900">凶煞轉化：</strong>占平安健康時，官鬼即為病魔與災厄；官鬼剋兄弟（平息爭端、制衡小人）。</div>
              </div>
            </div>

            {/* 父母爻 */}
            <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-sky-900">【父母爻】生我者</span>
                <span className="rounded bg-sky-100 text-sky-900 border border-sky-300 px-2 py-0.5 text-[10px] font-mono">庇護·文書·契約</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                <strong>象義：</strong>父母雙親、師長前輩、房屋住宅、車輛船舶、合同契約、公文證照、學業功名、資訊消息。
              </p>
              <div className="text-stone-600 text-[11px] space-y-1 border-t border-sky-200 pt-1.5">
                <div><strong className="text-sky-900">占事象徵：</strong>買房置產、考取學位、簽訂合約、尋求庇護之用神。父母爻旺相，主文書得力、家宅安泰。</div>
                <div><strong className="text-sky-900">剋制關係：</strong>父母爻剋子孫爻（父母發動則損小口子息、醫藥難效），父母爻生兄弟爻。</div>
              </div>
            </div>

            {/* 六神配排 */}
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-bold text-stone-900">【六神配爻】日干起例</span>
                <span className="rounded bg-stone-200 text-stone-800 px-2 py-0.5 text-[10px] font-mono">青龍/朱雀/勾陳/騰蛇/白虎/玄武</span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                六神依<strong>日辰天干</strong>從初爻向上依次配排，輔助爻象描摹事物情狀：
              </p>
              <div className="text-stone-600 text-[11px] space-y-0.5 border-t border-stone-200 pt-1.5">
                <div><strong>青龍：</strong>喜慶、吉慶、亨通、高貴、酒食。</div>
                <div><strong>朱雀：</strong>文書、信息、口舌、言詞、辯論、喧嘩。</div>
                <div><strong>勾陳：</strong>遲滯、田土、房產、牽連、公堂。</div>
                <div><strong>騰蛇：</strong>虛驚、怪異、多疑、夢魘、纏繞難解。</div>
                <div><strong>白虎：</strong>剛猛、血光、凶煞、急躁、重喪、手術。</div>
                <div><strong>玄武：</strong>陰私、曖昧、盜賊、隱匿、暗疾。</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 模組二：六爻納甲飛伏排盤矩陣 專章解析 */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-md sm:p-7 space-y-6">
        <div className="flex items-center space-x-3 border-b border-stone-200 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-800 ring-1 ring-amber-300">
            <Table className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 sm:text-xl">
              第二章：六爻納甲飛伏排盤矩陣 · 易理詳解
            </h3>
            <p className="text-xs text-stone-600">
              京房納甲體系的由來是什麼？世應定位與飛伏神推算有何決定性意義？
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. 為何有納甲矩陣？ */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 space-y-3">
            <h4 className="font-serif font-bold text-amber-900 text-sm flex items-center gap-1.5">
              <Compass className="h-4 w-4" /> 1. 京房納甲法的創制與矩陣架構
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed">
              西漢易學巨擘<strong>京房</strong>將十天干、十二地支、二十八星宿及五行生剋引入六十四卦，創立了「納甲筮法」：
            </p>
            <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
              <li>
                <strong className="text-amber-900">乾坤納甲、內外配支：</strong>乾納甲壬、坤納乙癸、震納庚、巽納辛、坎納戊、離納己、艮納丙、兌納丁。將無形的天道氣律具象化於六爻。
              </li>
              <li>
                <strong className="text-amber-900">八宮卦變體系：</strong>六十四卦分屬乾、坎、艮、震、巽、離、坤、兌八宮。每宮由「本宮首卦（八純卦）」經由一世、二世、三世、四世、五世、遊魂、歸魂七步演變而成。
              </li>
              <li>
                <strong className="text-amber-900">世應定位：</strong>
                「世爻」為求占者自身之根本、問事之基點；「應爻」為對方、所求之事、他人、環境或彼方態勢。世應相生相合者易成，相剋相沖者難就。
              </li>
            </ul>
          </div>

          {/* 2. 飛神與伏神推算法則 */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 space-y-3">
            <h4 className="font-serif font-bold text-amber-900 text-sm flex items-center gap-1.5">
              <Layers className="h-4 w-4" /> 2. 伏神考證：用神不上卦時的救應法則
            </h4>
            <p className="text-xs text-stone-700 leading-relaxed">
              占卦時常遇到所求之六親在六爻中完全不出現（例如問財運但卦中六爻皆無妻財爻），此時絕非「無財」，而是該六親隱伏於底層，稱為<strong>【伏神】</strong>：
            </p>
            <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-stone-800">尋伏之法：</strong>必須至該卦所屬八宮的<strong>「本宮八純卦」</strong>（如坎宮卦至《坎為水》）查取對應爻位的六親與干支。
              </li>
              <li>
                <strong className="text-stone-800">飛神與伏神：</strong>本卦原有之爻稱為「飛神」，純卦潛藏之爻稱為「伏神」。
              </li>
              <li>
                <strong className="text-emerald-800">飛生伏得長生：</strong>飛神生伏神，名為「得生」，伏神極易破土而出應吉，大吉。
              </li>
              <li>
                <strong className="text-sky-800">伏剋飛名出暴：</strong>伏神五行剋制飛神，伏神有力衝破阻礙透出，吉。
              </li>
              <li>
                <strong className="text-rose-800">飛剋伏受制：</strong>飛神反剋伏神，如同巨石壓頂，伏神難以出透，主所求被壓制難成。
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 模組三：月建·日辰·動變生剋易理全鑑 專章解析 */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-md sm:p-7 space-y-6">
        <div className="flex items-center space-x-3 border-b border-stone-200 pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-800 ring-1 ring-purple-300">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 sm:text-xl">
              第三章：月建·日辰·動變生剋易理全鑑 · 易理詳解
            </h3>
            <p className="text-xs text-stone-600">
              月令如何操縱萬物死生？日辰如何催發暗動？動爻回頭生剋與化進化退如何決定事態成敗？
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* 月建 */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2.5 shadow-2xs">
            <div className="flex items-center space-x-2 text-sky-900 font-serif font-bold text-sm">
              <Moon className="h-4 w-4 text-sky-700" />
              <h4>一、月建提綱（司萬物之綱領）</h4>
            </div>
            <p className="text-stone-700 leading-relaxed">
              月建為當月時令主宰，決定卦中六爻五行的先天根本力量：
            </p>
            <div className="text-stone-600 space-y-1.5">
              <div><strong className="text-emerald-800">月旺（同氣比和）：</strong>爻得月建扶助，萬事皆備。</div>
              <div><strong className="text-teal-800">月相（得月建生）：</strong>月令源源生助，日漸壯大。</div>
              <div><strong className="text-amber-800">月休（生月令洩氣）：</strong>精力耗於月令，處於休整。</div>
              <div><strong className="text-orange-800">月囚（剋月令耗氣）：</strong>以卵擊石，處境困頓。</div>
              <div><strong className="text-rose-800">月死（受月建剋）：</strong>月令重創剋伐，毫無生氣。</div>
              <div><strong className="text-rose-800">月破（地支正沖）：</strong>爻與月建正沖（如子月逢午），如枯木朽木，當月逢事必破，需待出月逢合填實之期。</div>
            </div>
          </div>

          {/* 日辰 */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2.5 shadow-2xs">
            <div className="flex items-center space-x-2 text-amber-900 font-serif font-bold text-sm">
              <Sun className="h-4 w-4 text-amber-700" />
              <h4>二、日辰主事（操一日之生殺）</h4>
            </div>
            <p className="text-stone-700 leading-relaxed">
              日辰如天子臨幸，能生克合害動靜之爻，為事態發動與應期之樞紐：
            </p>
            <div className="text-stone-600 space-y-1.5">
              <div><strong className="text-emerald-800">得日生 / 日建同旺：</strong>得日辰庇佑，千災難害。</div>
              <div><strong className="text-sky-800">暗動（旺相逢日沖）：</strong>靜爻得月令旺相或日生，遇日辰相沖，化為「暗動」。暗中湧動發力，吉凶立現！</div>
              <div><strong className="text-rose-800">日破（休囚逢日沖）：</strong>靜爻失令休囚，逢日辰相沖化為「日破」，破散無存。</div>
              <div><strong className="text-purple-800">沖動（動爻逢日沖）：</strong>發動之爻逢日沖，主事態加速演變。</div>
              <div><strong className="text-emerald-800">沖空（旬空逢日沖）：</strong>落空之爻逢日沖名「沖空則實」，得用成事。</div>
            </div>
          </div>

          {/* 動變生剋 */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2.5 shadow-2xs">
            <div className="flex items-center space-x-2 text-purple-900 font-serif font-bold text-sm">
              <Zap className="h-4 w-4 text-purple-700" />
              <h4>三、動變生剋（事態最終歸宿）</h4>
            </div>
            <p className="text-stone-700 leading-relaxed">
              古云：「動則有變，變爻專剋動爻。」動爻化出之變爻對本位具有極強作用：
            </p>
            <div className="text-stone-600 space-y-1.5">
              <div><strong className="text-emerald-800">回頭生：</strong>化出之爻回生動爻（如木動化亥水），得源頭活水，愈動愈吉。</div>
              <div><strong className="text-rose-800">回頭剋：</strong>化出之爻回剋動爻（如木動化酉金），化出毒刃自傷，由吉化凶。</div>
              <div><strong className="text-sky-800">化進神：</strong>寅化卯、申化酉、巳化午、亥化子等。氣勢磅礡、步步高升，大吉。</div>
              <div><strong className="text-amber-800">化退神：</strong>卯化寅、酉化申、午化巳、子化亥等。虎頭蛇尾、後繼乏力，漸衰。</div>
              <div><strong className="text-rose-800">化絕 / 化墓 / 化空：</strong>動爻化入絕地、墓庫或旬空，主事多坎坷阻礙。</div>
            </div>
          </div>
        </div>

        {/* 變卦易理：本卦為始，變卦為終 */}
        <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 text-xs text-stone-700 leading-relaxed space-y-2">
          <span className="font-serif font-bold text-amber-900 block text-sm">
            【易理總綱】本卦為事之始，變卦為事之終
          </span>
          <p>
            六爻卦中，未動之爻代表事物的初始現狀與基本盤；發動之爻則是推動命運軌跡演化的契機與轉折點。全卦在動爻的牽引下，最終轉化為變卦（之卦）。
            因此，<strong>「分析本卦知其來因，參悟變卦定其結果，洞察動變明其吉凶轉化」</strong>，乃六爻斷卦不可移易之鐵律。
          </p>
        </div>
      </div>
    </div>
  );
};
