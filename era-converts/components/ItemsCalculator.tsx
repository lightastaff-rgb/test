
import React, { useState, useEffect, useMemo } from 'react';
import { ITEM_RATIOS } from '../constants';

interface ItemsCalculatorProps {
  onTotalChange: (total: number) => void;
}

const ItemsCalculator: React.FC<ItemsCalculatorProps> = ({ onTotalChange }) => {
  const [quantities, setQuantities] = useState<{ [key: string]: string }>(
    ITEM_RATIOS.reduce((acc, item) => ({ ...acc, [item.name]: '' }), {})
  );
  const [isMinimized, setIsMinimized] = useState(false);

  const totalGralats = useMemo(() => {
    return ITEM_RATIOS.reduce((sum, item) => {
      const val = quantities[item.name];
      const qty = val === '' ? 0 : parseFloat(val);
      return sum + (isNaN(qty) ? 0 : qty * item.ratio);
    }, 0);
  }, [quantities]);

  useEffect(() => {
    onTotalChange(totalGralats);
  }, [totalGralats, onTotalChange]);

  const handleQuantityChange = (name: string, value: string) => {
    // Only allow numbers and decimals
    if (value !== '' && !/^\d*\.?\d*$/.test(value)) return;
    setQuantities(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantities(ITEM_RATIOS.reduce((acc, item) => ({ ...acc, [item.name]: '' }), {}));
  };

  return (
    <div className="h-full flex flex-col group/calc select-none">
      {/* Sidebar Header */}
      <div 
        className="flex items-center justify-between px-5 py-5 border-b border-border-base bg-bg-secondary/50 cursor-pointer hover:bg-bg-secondary transition-all duration-300"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-indigo-600 flex items-center justify-center text-xl shadow-lg shadow-accent/20 transition-transform group-hover/calc:rotate-3">
            📦
          </div>
          <div>
            <h3 className="text-[11px] font-black text-white uppercase tracking-wider">Inventory</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-emerald-400 font-mono font-bold text-sm tracking-tight drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                {totalGralats.toLocaleString()}
              </span>
              <span className="text-[8px] font-black text-emerald-600 uppercase">G</span>
            </div>
          </div>
        </div>
        <div className={`w-6 h-6 rounded-md border border-border-base flex items-center justify-center text-[10px] text-gray-500 transition-all duration-300 ${isMinimized ? '' : 'rotate-180 bg-accent/10 border-accent/20 text-accent'}`}>
          ▼
        </div>
      </div>

      {/* Main List Area */}
      <div className={`flex-1 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isMinimized ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 overflow-hidden'}`}>
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1.5">
              {ITEM_RATIOS.map((item) => {
                const currentQty = quantities[item.name];
                const hasValue = currentQty !== '' && parseFloat(currentQty) > 0;
                const itemTotal = hasValue ? parseFloat(currentQty) * item.ratio : 0;
                
                return (
                  <div 
                    key={item.name} 
                    className={`grid grid-cols-[1fr_90px] items-center gap-2 px-3 py-2.5 rounded-xl border transition-all duration-200 group/row ${
                      hasValue 
                      ? 'bg-accent/10 border-accent/40 shadow-sm ring-1 ring-accent/10' 
                      : 'bg-bg-input/30 border-border-base/50 hover:border-border-base/80 hover:bg-bg-input/60'
                    }`}
                  >
                    {/* Left Column: Info */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition-transform group-hover/row:scale-110 ${hasValue ? 'bg-accent/20' : 'bg-bg-primary/50'}`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col truncate">
                        <span className={`text-[10px] font-black uppercase truncate tracking-tight transition-colors ${hasValue ? 'text-white' : 'text-gray-400 group-hover/row:text-gray-200'}`}>
                          {item.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest bg-bg-primary/40 px-1 rounded">
                            {item.ratio}:1
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Input & Value */}
                    <div className="flex flex-col items-end gap-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={currentQty}
                        onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                        placeholder="0"
                        className={`w-full bg-bg-input/50 border border-border-base rounded-md px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all text-right placeholder:text-gray-800 ${hasValue ? 'border-accent/40' : ''}`}
                      />
                      {hasValue && (
                        <div className="text-[9px] font-black text-emerald-400/90 tabular-nums animate-[fadeSlideIn_0.2s_ease-out]">
                          +{itemTotal.toLocaleString()} G
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="p-4 border-t border-border-base bg-bg-secondary/40">
              <button 
                onClick={handleClear}
                className="w-full py-2 rounded-lg border border-border-base bg-bg-primary/50 text-gray-500 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all active:scale-95 flex items-center justify-center gap-2 group/reset"
              >
                <span className="transition-transform group-hover/reset:rotate-180 duration-500">↺</span>
                Reset All
              </button>
              <div className="mt-3 flex flex-col items-center gap-1 opacity-40">
                <span className="text-[7px] font-black text-gray-600 uppercase tracking-[0.3em]">Era Conversion Engine</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-accent/50"></div>
                  <div className="w-1 h-1 rounded-full bg-emerald-500/50"></div>
                  <div className="w-1 h-1 rounded-full bg-accent/50"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemsCalculator;
