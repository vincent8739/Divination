import React, { useState } from "react";
import { History, Search, Trash2, ArrowRight, Calendar, User, Sparkles } from "lucide-react";
import { DivinationResult } from "../types/liuyao";

interface HistoryDrawerProps {
  records: DivinationResult[];
  onSelectRecord: (record: DivinationResult) => void;
  onDeleteRecord: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  records,
  onSelectRecord,
  onDeleteRecord,
  onClearAll,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = records.filter(
    (r) =>
      r.querent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.originalHexagram.name.includes(searchTerm)
  );

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-md sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-800 ring-1 ring-amber-300">
            <History className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-900 sm:text-2xl">
              卦例紀錄簿
            </h2>
            <p className="text-xs text-stone-500">
              儲存於本地瀏覽器，可隨時回溯覆盤
            </p>
          </div>
        </div>

        {records.length > 0 && (
          <button
            id="btn-clear-all-history"
            onClick={onClearAll}
            className="flex items-center gap-1 text-xs text-stone-500 hover:text-rose-600 transition cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>清空所有紀錄</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      {records.length > 0 && (
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋求占者姓名、占問事由、卦名..."
            className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2 pl-9 pr-4 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:border-amber-700 focus:outline-none"
          />
        </div>
      )}

      {/* Record List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-stone-400">
          <History className="h-12 w-12 stroke-1 mb-2 text-stone-300" />
          <p className="text-sm text-stone-600">尚無任何卦例紀錄</p>
          <p className="text-xs mt-1 text-stone-400">
            在起卦排盤後點擊「儲存卦例」即可在此回溯。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 transition hover:border-amber-400 hover:bg-amber-50/40 shadow-2xs"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-amber-100 border border-amber-300 px-2 py-0.5 text-xs font-bold text-amber-900">
                      《{item.originalHexagram.name}》
                      {item.changedHexagram && ` 之 《${item.changedHexagram.name}》`}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {item.querent}
                    </span>
                  </div>
                  <h4 className="mt-1.5 font-serif text-sm font-bold text-stone-900 line-clamp-1">
                    {item.question}
                  </h4>
                </div>

                <button
                  onClick={() => onDeleteRecord(item.id)}
                  className="p-1 text-stone-400 hover:text-rose-600 transition cursor-pointer"
                  title="刪除此紀錄"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-2 text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {item.dateTimeStr}
                </span>

                <button
                  onClick={() => onSelectRecord(item)}
                  className="flex items-center gap-1 font-semibold text-amber-800 hover:text-amber-900 transition cursor-pointer"
                >
                  <span>查看排盤</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
