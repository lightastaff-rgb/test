
import React from 'react';

interface HeaderProps {
  onClearLog: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClearLog }) => {
  return (
    <header className="bg-bg-secondary border-b border-border-base px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-accent to-purple-400 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent/20">
          E
        </div>
        <div>
          <div className="text-lg font-black tracking-tighter text-white leading-tight uppercase">ERA CONVERTS</div>
          <div className="text-xs text-gray-400 font-medium">Trade Calculator Pro</div>
        </div>
      </div>
      <button 
        onClick={onClearLog}
        className="px-4 py-2 border border-border-base rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:border-red-400/50 transition-all duration-200 active:scale-95"
      >
        Clear Log
      </button>
    </header>
  );
};

export default Header;
