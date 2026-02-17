
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  user: string;
  avatar: string;
  color: string;
  text: string;
  time: string;
  isMe?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  { id: '1', user: 'EraLegend', avatar: '🎮', color: 'text-blue-400', text: 'Anyone selling Tro at 2.1? Need 500 fast.', time: '14:02' },
  { id: '2', user: 'MushroomKing', avatar: '🍄', color: 'text-emerald-400', text: 'Just hit 10k mushrooms today! 🚀', time: '14:05' },
  { id: '3', user: 'TroBroker', avatar: '💼', color: 'text-purple-400', text: 'Selling Tro 2.0. Catch me at Era Square.', time: '14:08' },
];

const BOT_NAMES = ['GralatGal', 'DiggerDave', 'StarfishSally', 'PixelPro', 'EraVibes'];
const BOT_MESSAGES = [
  'Nice tool! Ratios are looking correct for today.',
  'Who wants to mine rocks together?',
  'Selling 100 Emeralds, DM me!',
  'Just used the converter, saved me so much math.',
  'Prices are rising in the market today...',
  'Discord link for the guild is in my bio!',
  'Looking for a trade partner for 1k Tro.'
];

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Simulate other users chatting
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsTyping(true);
        setTimeout(() => {
          const newBotMsg: Message = {
            id: Math.random().toString(36).substr(2, 9),
            user: BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)],
            avatar: '👤',
            color: 'text-orange-400',
            text: BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages(prev => [...prev.slice(-49), newBotMsg]);
          setIsTyping(false);
        }, 2000);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const myMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      user: 'You',
      avatar: '👤',
      color: 'text-accent',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages(prev => [...prev, myMsg]);
    setInputText('');
  };

  const addEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
  };

  return (
    <div className="w-full max-w-4xl mt-6 flex flex-col bg-[#2b2d31] rounded-2xl overflow-hidden border border-border-base shadow-2xl h-[450px]">
      {/* Chat Header */}
      <div className="px-4 py-3 bg-[#2b2d31] border-b border-[#1e1f22] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-gray-400 text-lg">#</div>
          <h3 className="font-bold text-white text-sm">global-trade-chat</h3>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-2"></div>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Live</span>
        </div>
        <div className="flex gap-4 text-gray-400">
          <button className="hover:text-white transition-colors">🔔</button>
          <button className="hover:text-white transition-colors">📌</button>
          <button className="hover:text-white transition-colors">👥</button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-[#313338]"
      >
        <div className="flex flex-col justify-end min-h-full">
          <div className="mb-8 p-4">
             <div className="w-16 h-16 bg-[#35373c] rounded-full flex items-center justify-center text-3xl mb-4">#</div>
             <h2 className="text-2xl font-black text-white mb-1">Welcome to #global-trade-chat!</h2>
             <p className="text-gray-400 text-sm">This is the start of the official ERA CONVERTS trade channel. Be respectful and have fun trading!</p>
             <div className="h-px bg-border-base mt-6"></div>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className="group flex gap-4 hover:bg-[#2e3035] -mx-4 px-4 py-1 transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#1e1f22] flex items-center justify-center text-lg shrink-0 mt-0.5">
                {msg.avatar}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className={`font-bold text-sm hover:underline cursor-pointer ${msg.color}`}>
                    {msg.user}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium">{msg.time}</span>
                </div>
                <p className="text-[#dbdee1] text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 px-4 py-2 text-xs text-gray-400 italic">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              Someone is typing...
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[#313338]">
        <form 
          onSubmit={handleSendMessage}
          className="bg-[#383a40] rounded-lg px-4 py-2.5 flex items-center gap-3"
        >
          <button type="button" className="text-gray-400 hover:text-white transition-colors text-xl">+</button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Message #global-trade-chat"
            className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm placeholder:text-gray-500"
          />
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => addEmoji('🔥')}
              className="grayscale hover:grayscale-0 transition-all text-lg"
            >🔥</button>
            <button 
              type="button" 
              onClick={() => addEmoji('💎')}
              className="grayscale hover:grayscale-0 transition-all text-lg"
            >💎</button>
            <button 
              type="button" 
              onClick={() => addEmoji('🚀')}
              className="grayscale hover:grayscale-0 transition-all text-lg"
            >🚀</button>
            <button 
              type="submit"
              className="text-accent hover:text-accent-hover font-bold text-sm ml-2"
            >
              SEND
            </button>
          </div>
        </form>
        <div className="mt-1.5 flex gap-2">
           <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Pro Tip:</span>
           <span className="text-[9px] text-gray-600">Use emojis to react to market trends!</span>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
