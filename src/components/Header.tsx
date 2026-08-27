import React from "react";
import { Compass, BookOpen, History, Feather } from "lucide-react";

interface HeaderProps {
  activeTab: "paipan" | "history" | "guide";
  setActiveTab: (tab: "paipan" | "history" | "guide") => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, savedCount }) => {
  return (
    <header className="border-b border-stone-200 bg-white/95 text-stone-900 shadow-xs backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/30">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg font-bold tracking-wider text-stone-900 sm:text-xl">
                六爻筮法卜卦系統
              </h1>
              <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-300">
                京房納甲 · 伏神推算
              </span>
            </div>
            <p className="text-xs text-stone-500">
              六爻揲蓍餘數起卦 · 歲月日時干支排盤 · 飛伏神煞考證
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 rounded-lg bg-stone-100 p-1 ring-1 ring-stone-200">
          <button
            id="tab-btn-paipan"
            onClick={() => setActiveTab("paipan")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all sm:text-sm cursor-pointer ${
              activeTab === "paipan"
                ? "bg-amber-600 text-white shadow-xs font-semibold"
                : "text-stone-600 hover:bg-white hover:text-stone-900"
            }`}
          >
            <Feather className="h-4 w-4" />
            <span>起卦排盤</span>
          </button>

          <button
            id="tab-btn-guide"
            onClick={() => setActiveTab("guide")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all sm:text-sm cursor-pointer ${
              activeTab === "guide"
                ? "bg-amber-600 text-white shadow-xs font-semibold"
                : "text-stone-600 hover:bg-white hover:text-stone-900"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>易學研習</span>
          </button>

          <button
            id="tab-btn-history"
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all sm:text-sm cursor-pointer ${
              activeTab === "history"
                ? "bg-amber-600 text-white shadow-xs font-semibold"
                : "text-stone-600 hover:bg-white hover:text-stone-900"
            }`}
          >
            <History className="h-4 w-4" />
            <span>卦例紀錄</span>
            {savedCount > 0 && (
              <span className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === "history" ? "bg-white/25 text-white" : "bg-amber-100 text-amber-800"
              }`}>
                {savedCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
