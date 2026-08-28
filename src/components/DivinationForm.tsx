import React, { useState, useEffect } from "react";
import { Clock, User, HelpCircle, RefreshCw, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { YaoRemainder, SixRelative } from "../types/liuyao";
import { getGanzhiFromDate, GanzhiResult } from "../utils/calendar";

interface DivinationFormProps {
  onCalculate: (data: {
    querent: string;
    question: string;
    date: Date;
    remainders: YaoRemainder[];
    customYongShen?: SixRelative;
  }) => void;
  initialValues?: {
    querent: string;
    question: string;
    date: Date;
    remainders: YaoRemainder[];
  };
}

const PRESET_QUESTIONS = [
  { label: "求財經營", relative: "妻財" as SixRelative, text: "問近期投資營商財運如何？" },
  { label: "事業工作", relative: "官鬼" as SixRelative, text: "問求職升遷與事業前景發展？" },
  { label: "戀愛婚姻", relative: "妻財" as SixRelative, text: "問感情姻緣與對方心意發展？" },
  { label: "身體健康", relative: "子孫" as SixRelative, text: "問身體健康狀況與求醫調理？" },
  { label: "考試升學", relative: "父母" as SixRelative, text: "問文憑證照與考試錄取結果？" },
  { label: "訴訟官司", relative: "官鬼" as SixRelative, text: "問官非紛爭與法務審理吉凶？" },
  { label: "出門遠行", relative: "子孫" as SixRelative, text: "問出外旅行、出差平安順遂？" },
  { label: "尋人失物", relative: "妻財" as SixRelative, text: "問遺失物品方位或失散音訊？" },
];

export const DivinationForm: React.FC<DivinationFormProps> = ({
  onCalculate,
  initialValues,
}) => {
  const [querent, setQuerent] = useState(initialValues?.querent || "");
  const [question, setQuestion] = useState(initialValues?.question || "");
  const [date, setDate] = useState<Date>(initialValues?.date || new Date());

  // Date and Time breakdown fields
  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth() + 1);
  const [day, setDay] = useState<number>(date.getDate());
  const [hour, setHour] = useState<number>(date.getHours());
  const [minute, setMinute] = useState<number>(date.getMinutes());

  // 6 Yao remainders: index 0 is 初爻 (Bottom), index 5 is 上爻 (Top)
  const [remainders, setRemainders] = useState<YaoRemainder[]>(
    initialValues?.remainders || [7, 8, 7, 8, 9, 8]
  );

  const [ganzhiPreview, setGanzhiPreview] = useState<GanzhiResult>(getGanzhiFromDate(date));
  const [selectedYongShen, setSelectedYongShen] = useState<SixRelative | undefined>(undefined);

  // Sync date when components change
  useEffect(() => {
    try {
      const newDate = new Date(year, month - 1, day, hour, minute, 0);
      setDate(newDate);
      setGanzhiPreview(getGanzhiFromDate(newDate));
    } catch {
      // ignore invalid dates
    }
  }, [year, month, day, hour, minute]);

  const handleSetCurrentTime = () => {
    const now = new Date();
    setYear(now.getFullYear());
    setMonth(now.getMonth() + 1);
    setDay(now.getDate());
    setHour(now.getHours());
    setMinute(now.getMinutes());
    setDate(now);
    setGanzhiPreview(getGanzhiFromDate(now));
  };

  const handleRemainderChange = (index: number, val: YaoRemainder) => {
    const next = [...remainders];
    next[index] = val;
    setRemainders(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      querent: querent.trim() || "求占者",
      question: question.trim() || "問事吉凶",
      date,
      remainders,
      customYongShen: selectedYongShen,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Querent & Question Card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="mb-4 flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-amber-600" />
            <h2 className="font-serif text-base font-bold text-stone-900 sm:text-lg">
              第一步：填寫求占資訊與問卦事由
            </h2>
          </div>
          <span className="text-xs text-stone-500">誠心默念 · 專注所問</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Querent Name */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-stone-700">
              求占者姓名（或稱謂）
            </label>
            <div className="relative">
              <input
                id="input-querent-name"
                type="text"
                value={querent}
                onChange={(e) => setQuerent(e.target.value)}
                placeholder="例如：張信徒、李居士或匿名"
                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 shadow-2xs transition focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Query Reason */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-stone-700">
              占問事由（具體問事內容）
            </label>
            <div className="relative">
              <input
                id="input-question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="例如：問今年下半年跳槽或升遷機運？"
                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 shadow-2xs transition focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4">
          <label className="mb-2 flex items-center gap-1.5 text-xs text-stone-600">
            <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
            <span>常用占問類別快捷選擇：</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_QUESTIONS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuestion(item.text);
                  setSelectedYongShen(item.relative);
                }}
                className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                  question === item.text
                    ? "border-amber-500 bg-amber-50 text-amber-900 font-semibold ring-1 ring-amber-400"
                    : "border-stone-200 bg-stone-50 text-stone-700 hover:border-amber-400 hover:bg-amber-50/50 hover:text-amber-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Divination Time & Ganzhi Live Conversion */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-amber-600" />
            <h2 className="font-serif text-base font-bold text-stone-900 sm:text-lg">
              第二步：起卦時間（公曆）與年月日時干支
            </h2>
          </div>
          <button
            id="btn-set-current-time"
            type="button"
            onClick={handleSetCurrentTime}
            className="flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 transition hover:bg-amber-100 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>取得當前即時時間</span>
          </button>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5 sm:gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label className="mb-1 block text-xs text-stone-500 font-medium">年（公曆）</label>
            <div className="flex items-center rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-2 focus-within:bg-white focus-within:border-amber-500">
              <input
                id="input-year"
                type="number"
                min={1900}
                max={2100}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-transparent text-sm text-stone-900 focus:outline-none"
              />
              <span className="text-xs text-stone-500">年</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-stone-500 font-medium">月</label>
            <div className="flex items-center rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-2 focus-within:bg-white focus-within:border-amber-500">
              <input
                id="input-month"
                type="number"
                min={1}
                max={12}
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full bg-transparent text-sm text-stone-900 focus:outline-none"
              />
              <span className="text-xs text-stone-500">月</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-stone-500 font-medium">日</label>
            <div className="flex items-center rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-2 focus-within:bg-white focus-within:border-amber-500">
              <input
                id="input-day"
                type="number"
                min={1}
                max={31}
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full bg-transparent text-sm text-stone-900 focus:outline-none"
              />
              <span className="text-xs text-stone-500">日</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-stone-500 font-medium">時（24時制）</label>
            <div className="flex items-center rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-2 focus-within:bg-white focus-within:border-amber-500">
              <input
                id="input-hour"
                type="number"
                min={0}
                max={23}
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                className="w-full bg-transparent text-sm text-stone-900 focus:outline-none"
              />
              <span className="text-xs text-stone-500">時</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs text-stone-500 font-medium">分</label>
            <div className="flex items-center rounded-lg border border-stone-300 bg-stone-50 px-2.5 py-2 focus-within:bg-white focus-within:border-amber-500">
              <input
                id="input-minute"
                type="number"
                min={0}
                max={59}
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                className="w-full bg-transparent text-sm text-stone-900 focus:outline-none"
              />
              <span className="text-xs text-stone-500">分</span>
            </div>
          </div>
        </div>

        {/* Ganzhi & Metaphysics Preview Bar */}
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-3 sm:p-3.5">
          <div className="grid grid-cols-2 gap-2.5 text-xs sm:grid-cols-3 md:grid-cols-6">
            <div className="flex flex-col">
              <span className="text-stone-500 text-[11px]">歲次年柱</span>
              <span className="font-serif text-sm font-bold text-stone-900">
                {ganzhiPreview.ganzhiYear}年
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-stone-500 text-[11px]">月建月柱</span>
              <span className="font-serif text-sm font-bold text-stone-900">
                {ganzhiPreview.ganzhiMonth}月（建{ganzhiPreview.yueJian}）
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-stone-500 text-[11px]">日辰日柱</span>
              <span className="font-serif text-sm font-bold text-stone-900">
                {ganzhiPreview.ganzhiDay}日（辰{ganzhiPreview.riChen}）
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-stone-500 text-[11px]">時辰時柱</span>
              <span className="font-serif text-sm font-bold text-stone-900">
                {ganzhiPreview.ganzhiHour}時
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-stone-500 text-[11px]">日旬空亡</span>
              <span className="font-bold text-rose-600 text-sm">
                {ganzhiPreview.xunKong}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-stone-500 text-[11px]">神煞吉星</span>
              <span className="text-stone-800 font-medium text-[11px] leading-tight">
                貴人:{ganzhiPreview.dayGuiRen} · 驛馬:{ganzhiPreview.yiMa} · 祿:{ganzhiPreview.dayLu}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Da Yan Stalk Remainders Input (6, 7, 8, 9) */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6 shadow-xs">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <h2 className="font-serif text-base font-bold text-stone-900 sm:text-lg">
                第三步：輸入揲蓍餘數（初爻至上爻之 6, 7, 8, 9）
              </h2>
              <p className="text-xs text-stone-500">
                大衍筮法以四除之：9為老陽（◯動）、8為少陰、7為少陽、6為老陰（✕動）
              </p>
            </div>
          </div>
        </div>

        {/* Yao Lines Selector Stack (Displayed from 上爻 top to 初爻 bottom) */}
        <div className="space-y-2.5">
          {[5, 4, 3, 2, 1, 0].map((idx) => {
            const yaoNumber = idx + 1;
            const yaoLabel = ["初爻 (底)", "二爻", "三爻", "四爻", "五爻", "上爻 (頂)"][idx];
            const currentVal = remainders[idx];

            return (
              <div
                key={idx}
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-stone-200 bg-stone-50/70 p-2.5 sm:p-3 transition hover:border-stone-300 hover:bg-stone-100/50"
              >
                {/* Left Line Name & Symbol Preview */}
                <div className="flex items-center justify-between sm:justify-start space-x-3">
                  <span className="w-18 sm:w-20 font-serif text-sm font-semibold text-stone-800">
                    {yaoLabel}
                  </span>
                  
                  {/* Line Visual Symbol */}
                  <div className="flex h-8 w-28 items-center justify-center rounded-lg border border-stone-200 bg-white px-2 font-mono text-sm tracking-widest text-stone-900 shadow-2xs">
                    <div className="relative inline-flex items-center justify-center">
                      {currentVal === 9 ? (
                        <>
                          <span className="text-rose-600 font-bold select-none">▅▅▅▅▅</span>
                          <span className="absolute left-[calc(100%+6px)] text-xs text-rose-600 font-bold">◯</span>
                        </>
                      ) : currentVal === 7 ? (
                        <span className="text-stone-900 select-none">▅▅▅▅▅</span>
                      ) : currentVal === 6 ? (
                        <>
                          <span className="text-sky-600 font-bold select-none">▅▅　▅▅</span>
                          <span className="absolute left-[calc(100%+6px)] text-xs text-sky-600 font-bold">✕</span>
                        </>
                      ) : (
                        <span className="text-stone-600 select-none">▅▅　▅▅</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Selector Radio Buttons for 6, 7, 8, 9 */}
                <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
                  {[
                    { val: 9 as YaoRemainder, label: "9 老陽 (◯發動)", desc: "變少陰", color: "rose" },
                    { val: 7 as YaoRemainder, label: "7 少陽", desc: "靜陽", color: "amber" },
                    { val: 8 as YaoRemainder, label: "8 少陰", desc: "靜陰", color: "stone" },
                    { val: 6 as YaoRemainder, label: "6 老陰 (✕發動)", desc: "變少陽", color: "sky" },
                  ].map((btn) => {
                    const isSelected = currentVal === btn.val;
                    return (
                      <button
                        key={btn.val}
                        id={`yao-${yaoNumber}-val-${btn.val}`}
                        type="button"
                        onClick={() => handleRemainderChange(idx, btn.val)}
                        className={`rounded-lg px-2.5 py-2 sm:px-3 sm:py-1.5 text-xs font-semibold transition-all cursor-pointer text-center ${
                          isSelected
                            ? btn.val === 9
                              ? "border border-rose-400 bg-rose-50 text-rose-800 ring-1 ring-rose-400 shadow-2xs font-bold"
                              : btn.val === 6
                              ? "border border-sky-400 bg-sky-50 text-sky-800 ring-1 ring-sky-400 shadow-2xs font-bold"
                              : btn.val === 7
                              ? "border border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-400 shadow-2xs font-bold"
                              : "border border-stone-400 bg-stone-200 text-stone-900 ring-1 ring-stone-400 shadow-2xs font-bold"
                            : "border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:text-stone-900"
                        }`}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Action Button */}
      <div className="flex justify-center pt-2">
        <button
          id="btn-submit-divination"
          type="submit"
          className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-8 py-3.5 text-base font-bold text-white shadow-md transition-all hover:brightness-105 active:scale-[0.99] sm:w-80 cursor-pointer"
        >
          <CheckCircle2 className="h-5 w-5" />
          <span>立即排盤與伏神推算</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
};
