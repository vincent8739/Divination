import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { DivinationForm } from "./components/DivinationForm";
import { HexagramBoard } from "./components/HexagramBoard";
import { AiInterpretationModal } from "./components/AiInterpretationModal";
import { LearningGuide } from "./components/LearningGuide";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { DivinationResult, SixRelative, YaoRemainder } from "./types/liuyao";
import { getGanzhiFromDate } from "./utils/calendar";
import { calculateLiuYaoDivination } from "./utils/liuyaoEngine";
import confetti from "canvas-confetti";

export function App() {
  const [activeTab, setActiveTab] = useState<"paipan" | "history" | "guide">("paipan");
  const [divinationResult, setDivinationResult] = useState<DivinationResult | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // Stored History records
  const [historyRecords, setHistoryRecords] = useState<DivinationResult[]>(() => {
    try {
      const saved = localStorage.getItem("liuyao_divination_history");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("liuyao_divination_history", JSON.stringify(historyRecords));
    } catch {
      // ignore
    }
  }, [historyRecords]);

  // Initial demo calculation on first mount so user immediately sees a live working paipan
  useEffect(() => {
    if (!divinationResult) {
      const now = new Date();
      const ganzhi = getGanzhiFromDate(now);
      // Demo: 9 (老陽/初爻), 8 (少陰), 7 (少陽), 8 (少陰), 9 (老陽/五爻), 8 (少陰/上爻)
      const demoResult = calculateLiuYaoDivination(
        "求占居士",
        "問今年下半年事業升遷與財運發展？",
        [9, 8, 7, 8, 9, 8],
        ganzhi,
        "官鬼"
      );
      setDivinationResult(demoResult);
    }
  }, []);

  const handleCalculate = (data: {
    querent: string;
    question: string;
    date: Date;
    remainders: YaoRemainder[];
    customYongShen?: SixRelative;
  }) => {
    const ganzhi = getGanzhiFromDate(data.date);
    const result = calculateLiuYaoDivination(
      data.querent,
      data.question,
      data.remainders,
      ganzhi,
      data.customYongShen
    );

    setDivinationResult(result);
    setActiveTab("paipan");

    // Subtle celebration feedback
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.85 },
        colors: ["#d97706", "#f59e0b", "#fbbf24", "#78716c"],
      });
    } catch {
      // ignore
    }
  };

  const handleYongShenChange = (newRelative: SixRelative) => {
    if (!divinationResult) return;
    const ganzhi = getGanzhiFromDate(divinationResult.date);
    const updated = calculateLiuYaoDivination(
      divinationResult.querent,
      divinationResult.question,
      divinationResult.remainders,
      ganzhi,
      newRelative
    );
    setDivinationResult(updated);
  };

  const handleSaveToHistory = () => {
    if (!divinationResult) return;
    const exists = historyRecords.some((r) => r.id === divinationResult.id);
    if (!exists) {
      setHistoryRecords([divinationResult, ...historyRecords]);
    }
  };

  const handleDeleteHistory = (id: string) => {
    setHistoryRecords(historyRecords.filter((r) => r.id !== id));
  };

  const handleClearAllHistory = () => {
    if (window.confirm("確定要清空所有歷史卦例紀錄嗎？")) {
      setHistoryRecords([]);
    }
  };

  const handleSelectHistoryRecord = (rec: DivinationResult) => {
    setDivinationResult(rec);
    setActiveTab("paipan");
  };

  const isCurrentSaved = divinationResult
    ? historyRecords.some((r) => r.id === divinationResult.id)
    : false;

  return (
    <div className="min-h-screen text-stone-900 font-sans selection:bg-amber-500/20 selection:text-amber-900">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={historyRecords.length}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {activeTab === "paipan" && (
          <div className="space-y-8">
            {/* Input Form */}
            <DivinationForm
              onCalculate={handleCalculate}
              initialValues={
                divinationResult
                  ? {
                      querent: divinationResult.querent,
                      question: divinationResult.question,
                      date: divinationResult.date,
                      remainders: divinationResult.remainders,
                    }
                  : undefined
              }
            />

            {/* Hexagram Result Board */}
            {divinationResult && (
              <div id="hexagram-board-section">
                <HexagramBoard
                  result={divinationResult}
                  onYongShenChange={handleYongShenChange}
                  onOpenAiModal={() => setIsAiModalOpen(true)}
                  onSaveToHistory={handleSaveToHistory}
                  isSaved={isCurrentSaved}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === "guide" && <LearningGuide />}

        {activeTab === "history" && (
          <HistoryDrawer
            records={historyRecords}
            onSelectRecord={handleSelectHistoryRecord}
            onDeleteRecord={handleDeleteHistory}
            onClearAll={handleClearAllHistory}
          />
        )}
      </main>

      {/* AI Interpretation Modal */}
      {divinationResult && (
        <AiInterpretationModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          result={divinationResult}
        />
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200 bg-white/80 py-8 text-center text-xs text-stone-600 backdrop-blur shadow-xs">
        <p className="font-serif font-medium text-stone-800">六爻筮法卜卦系統 · 傳承京房納甲法、伏神推算、周易古經智慧</p>
        <p className="mt-1 text-stone-500">
          天地之數五十有五，大衍之數五十，其用四十有九
        </p>
      </footer>
    </div>
  );
}
export default App;
