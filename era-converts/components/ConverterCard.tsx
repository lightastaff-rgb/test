
import React, { useState, useEffect } from 'react';
import { ConverterType } from '../types';

interface ConverterCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  inputLabel: string;
  type: ConverterType;
  defaultRatio: number;
  externalValue?: number; // Used to update value from ItemsCalculator
  onConvert: (input: number, ratio: number, tro: number, direction: 'forward' | 'reverse') => void;
}

const ConverterCard: React.FC<ConverterCardProps> = ({ 
  title, description, icon, iconBg, inputLabel, type, defaultRatio, onConvert, externalValue 
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [ratioVal, setRatioVal] = useState<string>(defaultRatio.toString());
  const [troVal, setTroVal] = useState<string>('');
  const [resultMsg, setResultMsg] = useState<string>('');

  // Sync external value (e.g., from Item Calculator)
  useEffect(() => {
    if (externalValue === 0) {
      // Clear converter fields if the external value (itemizer) is zero
      setInputVal('');
      setTroVal('');
      setResultMsg('');
    } else if (externalValue !== undefined) {
      setInputVal(externalValue.toString());
      // Clear previous calculation results as the input has changed
      setTroVal('');
      setResultMsg('');
    }
  }, [externalValue]);

  const handleConvert = (source: 'input' | 'ratio' | 'tro') => {
    const inputNum = parseFloat(inputVal);
    const ratioNum = parseFloat(ratioVal);
    const troNum = parseFloat(troVal);

    if (source === 'tro' && !isNaN(troNum) && !isNaN(ratioNum)) {
      const result = troNum * ratioNum;
      setInputVal(result.toFixed(2));
      setResultMsg(`${troNum} Tro = ${result.toFixed(2)} ${inputLabel}`);
      onConvert(result, ratioNum, troNum, 'reverse');
    } else if (!isNaN(inputNum) && !isNaN(ratioNum)) {
      const result = inputNum / ratioNum;
      setTroVal(result.toFixed(2));
      setResultMsg(`${inputNum} ${inputLabel} = ${result.toFixed(2)} Tro`);
      onConvert(inputNum, ratioNum, result, 'forward');
    }
  };

  return (
    <div className="bg-bg-card border border-border-base rounded-2xl p-7 transition-all duration-300 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-base">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-lg ${iconBg}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-gray-500 font-medium">{description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            {inputLabel} <span className="lowercase font-normal text-gray-500">— press Enter to convert</span>
          </label>
          <div className="relative">
            <input 
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConvert('input')}
              placeholder="0"
              className="w-full bg-bg-input border border-border-base rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            Ratio <span className="lowercase font-normal text-gray-500">— ratio to 1 Tro</span>
          </label>
          <div className="relative">
            <input 
              type="number"
              value={ratioVal}
              onChange={(e) => setRatioVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConvert('ratio')}
              className="w-full bg-bg-input border border-border-base rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 pointer-events-none">: 1</span>
          </div>
        </div>

        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px bg-border-base"></div>
          <div className="w-8 h-8 rounded-lg border border-border-base bg-bg-secondary flex items-center justify-center text-gray-500 text-xs">⇅</div>
          <div className="flex-1 h-px bg-border-base"></div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            Tro <span className="lowercase font-normal text-gray-500">— press Enter to reverse</span>
          </label>
          <div className="relative">
            <input 
              type="number"
              value={troVal}
              onChange={(e) => setTroVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConvert('tro')}
              placeholder="0"
              className="w-full bg-accent/5 border border-accent/20 rounded-xl px-4 py-3 text-white font-mono focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all"
            />
          </div>
        </div>

        <button 
          onClick={() => handleConvert('input')}
          className="w-full bg-gradient-to-r from-accent to-accent-hover py-3 rounded-xl text-white text-sm font-semibold shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all duration-200"
        >
          Calculate
        </button>

        {resultMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg py-2.5 px-4 text-emerald-400 text-xs font-bold text-center animate-[fadeSlideIn_0.3s_ease-out]">
            {resultMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConverterCard;
