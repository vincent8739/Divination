import React, { useState, useEffect } from "react";
import { Sparkles, X, Copy, Check, Send, Bot, RefreshCw, BookOpen } from "lucide-react";
import { DivinationResult } from "../types/liuyao";

interface AiInterpretationModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: DivinationResult;
}

export const AiInterpretationModal: React.FC<AiInterpretationModalProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  const [interpretation, setInterpretation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Follow-up question state
  const [followUpQuestion, setFollowUpQuestion] = useState<string>("");
  const [followUpList, setFollowUpList] = useState<Array<{ q: string; a: string }>>([]);
  const [followUpLoading, setFollowUpLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && !interpretation && !loading) {
      fetchInterpretation();
    }
  }, [isOpen, result.id]);

  const fetchInterpretation = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gemini/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ divinationResult: result }),
      });

      if (!res.ok) {
        throw new Error("伺服器解卦發生異常，請確認伺服器配置。");
      }

      const data = await res.json();
      setInterpretation(data.interpretation);
    } catch (err: any) {
      setError(err.message || "解卦服務暫時無法連線");
    } finally {
      setLoading(false);
    }
  };

  const handleSendFollowUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuestion.trim() || followUpLoading) return;

    const userQ = followUpQuestion.trim();
    setFollowUpQuestion("");
    setFollowUpLoading(true);

    try {
      const res = await fetch("/api/gemini/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          divinationResult: result,
          userQuestion: userQ,
          previousInterpretation: interpretation,
        }),
      });

      if (!res.ok) {
        throw new Error("追問解析失敗");
      }

      const data = await res.json();
      setFollowUpList((prev) => [...prev, { q: userQ, a: data.interpretation }]);
    } catch (err: any) {
      setFollowUpList((prev) => [
        ...prev,
        { q: userQ, a: "抱歉，易道大師暫時無法回覆您的追問，請稍後重試。" },
      ]);
    } finally {
      setFollowUpLoading(false);
    }
  };

  const handleCopy = () => {
    const fullText = `【易道AI宗師解卦 · ${result.question}】\n\n${interpretation}\n\n${followUpList
      .map((f) => `問：${f.q}\n答：${f.a}\n`)
      .join("\n")}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-xs">
      <div className="flex h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-stone-200 bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 bg-gradient-to-r from-amber-50/80 via-stone-50 to-amber-50/80 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800 ring-1 ring-amber-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                易道AI宗師 · 六爻深度解卦
              </h3>
              <p className="text-xs text-stone-600">
                本卦《{result.originalHexagram.name}》
                {result.changedHexagram && ` 之 《${result.changedHexagram.name}》`}
                · 用神【{result.yongShenCategory}】
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-copy-ai-result"
              onClick={handleCopy}
              disabled={!interpretation}
              className="flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 shadow-2xs transition hover:bg-stone-50"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">已複製</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>複製解語</span>
                </>
              )}
            </button>

            <button
              id="btn-close-ai-modal"
              onClick={onClose}
              className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-100 hover:text-stone-800 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-stone-800">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-amber-200"></div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                </div>
              </div>
              <h4 className="font-serif text-lg font-bold text-amber-900">
                易道大師正在參詳卦象與伏神...
              </h4>
              <p className="mt-2 max-w-md text-xs text-stone-600 leading-relaxed">
                正在依據《易經》六十四卦、京房易納甲、日月旺相休囚、用神伏藏透出、六神主事進行全方位推演。
              </p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
              <p className="text-sm font-semibold text-rose-800">{error}</p>
              <button
                onClick={fetchInterpretation}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-rose-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-rose-800"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>重新請求解卦</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Main Interpretation Box */}
              <div className="max-w-none rounded-2xl border border-amber-200 bg-amber-50/40 p-6 shadow-2xs">
                <div className="whitespace-pre-wrap font-serif text-sm leading-relaxed text-stone-800">
                  {interpretation}
                </div>
              </div>

              {/* Follow-up Q&A Thread */}
              {followUpList.length > 0 && (
                <div className="space-y-4 border-t border-stone-200 pt-4">
                  <h4 className="font-serif text-sm font-bold text-amber-900">
                    【追問與答疑記錄】
                  </h4>
                  {followUpList.map((item, idx) => (
                    <div key={idx} className="space-y-2 rounded-xl border border-stone-200 bg-stone-50 p-4">
                      <div className="flex items-start gap-2 text-xs font-semibold text-stone-900">
                        <span className="rounded bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5">
                          問
                        </span>
                        <span>{item.q}</span>
                      </div>
                      <div className="whitespace-pre-wrap font-serif text-xs leading-relaxed text-stone-700 pl-6">
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer: Follow-up input */}
        <div className="border-t border-stone-200 bg-stone-50 p-4">
          <form onSubmit={handleSendFollowUp} className="flex gap-2">
            <input
              type="text"
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              placeholder="有任何細節想進一步向大師請教？例如：具體應期大約何時？需要注意什麼方向？"
              disabled={loading || followUpLoading}
              className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!followUpQuestion.trim() || loading || followUpLoading}
              className="flex items-center gap-1.5 rounded-xl bg-amber-700 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-2xs transition hover:bg-amber-800 disabled:opacity-50 cursor-pointer"
            >
              {followUpLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>追問</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
