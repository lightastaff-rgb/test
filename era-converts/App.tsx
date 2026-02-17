
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ConverterCard from './components/ConverterCard';
import ItemsCalculator from './components/ItemsCalculator';
import LogPanel from './components/LogPanel';
import LiveChat from './components/LiveChat';
import { LogEntry, ConverterType } from './types';

const App: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [itemizerTotal, setItemizerTotal] = useState<number>(0);

  const addLog = useCallback((type: ConverterType, input: number, ratio: number, tro: number, direction: 'forward' | 'reverse') => {
    const entry: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      input,
      inputLabel: type === 'rocks' ? 'rocks' : 'gralats',
      ratio,
      tro,
      direction,
      time: new Date().toLocaleTimeString('en-US', { hour12: false })
    };
    setLogs(prev => [entry, ...prev]);
  }, []);

  const handleClearLog = () => {
    setLogs([]);
  };

  const totalTro = logs.reduce((sum, entry) => sum + entry.tro, 0);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg-primary text-gray-200 font-sans">
      <Header onClearLog={handleClearLog} />

      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Left Sidebar: Itemizer */}
        <div className="w-full lg:w-80 border-r border-border-base bg-bg-secondary/30 backdrop-blur-md overflow-hidden flex flex-col shrink-0">
          <ItemsCalculator onTotalChange={setItemizerTotal} />
        </div>

        {/* Center: Main Converters & Live Chat */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin flex flex-col items-center gap-10">
          <div className="w-full max-w-4xl space-y-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Live Exchange</h2>
              <div className="h-1 w-12 bg-accent rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ConverterCard 
                id="rocks-converter"
                title="Rocks ⇄ Tro"
                description="Mined rocks converter"
                icon="💎"
                iconBg="bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20"
                inputLabel="Rocks"
                type="rocks"
                defaultRatio={1.3}
                onConvert={(i, r, t, d) => addLog('rocks', i, r, t, d)}
              />

              <ConverterCard 
                id="sell-converter"
                title="Gralats ⇄ Tro"
                description="Gralat items converter"
                icon="💰"
                iconBg="bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/20"
                inputLabel="Gralats"
                type="sellables"
                defaultRatio={2.0}
                externalValue={itemizerTotal}
                onConvert={(i, r, t, d) => addLog('sellables', i, r, t, d)}
              />
            </div>

            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] bg-bg-secondary px-6 py-2.5 rounded-full border border-border-base shadow-lg">
                Pro Trade Tools — <span className="text-accent">Official ERA Ratios</span>
              </div>
            </div>

            {/* Bottom Section: Live Discord-style Chat */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center gap-4 w-full">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-base to-transparent"></div>
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] whitespace-nowrap">Global Trade Chat</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border-base to-transparent"></div>
              </div>
              
              <LiveChat />
            </div>

            {/* Extra spacer for scrollability */}
            <div className="h-20"></div>
          </div>
        </div>

        {/* Right Sidebar: History Log */}
        <LogPanel entries={logs} totalTro={totalTro} />
      </main>

      {/* Mobile Sticky Total Footer */}
      <div className="lg:hidden bg-bg-secondary border-t border-border-base p-4 flex justify-between items-center shadow-2xl z-50">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Session Total</span>
        <span className="text-emerald-400 font-mono font-bold text-lg">{totalTro.toFixed(2)} Tro</span>
      </div>
    </div>
  );
};

export default App;
