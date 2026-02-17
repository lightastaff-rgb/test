
import React from 'react';
import { LogEntry } from '../types';

interface LogPanelProps {
  entries: LogEntry[];
  totalTro: number;
}

const LogPanel: React.FC<LogPanelProps> = ({ entries, totalTro }) => {
  return (
    <div className="w-full lg:w-96 bg-bg-secondary border-l border-border-base flex flex-col shrink-0 h-full">
      <div className="p-5 border-b border-border-base flex items-center justify-between bg-bg-secondary/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white">Conversion Log</h3>
          <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
            {entries.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {entries.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3 opacity-40">
            <div className="text-4xl">📋</div>
            <div className="text-sm font-medium">No conversions yet</div>
            <div className="text-[10px] uppercase font-bold tracking-widest">Results will appear here</div>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="bg-bg-card border border-border-base rounded-xl p-4 animate-[fadeSlideIn_0.3s_ease-out]">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  entry.type === 'rocks' ? 'bg-blue-500/10 text-blue-400' : 'bg-pink-500/10 text-pink-400'
                }`}>
                  {entry.type}
                </span>
                <span className="text-[10px] font-mono text-gray-500">{entry.time}</span>
              </div>
              <div className="text-xs font-mono text-gray-400 leading-relaxed">
                {entry.direction === 'forward' ? (
                  <>
                    <strong className="text-gray-200">{entry.input.toLocaleString()}</strong> {entry.inputLabel} @ <strong className="text-gray-200">{entry.ratio}</strong>:1
                  </>
                ) : (
                  <>
                    <strong className="text-gray-200">{entry.tro.toFixed(2)}</strong> Tro → <strong className="text-gray-200">{entry.input.toLocaleString()}</strong> {entry.inputLabel}
                  </>
                )}
              </div>
              <div className="mt-2 pt-2 border-t border-border-base text-sm font-bold text-emerald-400 font-mono">
                = {entry.tro.toFixed(2)} Tro
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-5 border-t border-border-base bg-bg-secondary/80 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Trade Value</span>
          <div className="text-right">
            <div className="text-emerald-400 font-mono font-bold text-xl">
              {totalTro.toFixed(2)} <span className="text-xs text-emerald-500/60 ml-0.5">Tro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogPanel;
