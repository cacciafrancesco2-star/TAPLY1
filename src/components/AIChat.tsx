import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Bot, User, Sparkles } from 'lucide-react';
import { getChatResponse } from '../services/gemini';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Ciao! Sono Taply, il tuo assistente digitale. Come posso aiutarti oggi?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getChatResponse(input, history);
    const modelMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
    
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-brand-bg pt-20 pb-24">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex gap-3 max-w-[85%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white/20",
              msg.role === 'user' ? "bg-brand-secondary text-slate-900" : "bg-white text-brand-primary"
            )}>
              {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
            </div>
            
            <div className={cn(
              "p-4 rounded-2xl text-lg shadow-xl border-b-4",
              msg.role === 'user' 
                ? "bg-brand-secondary text-slate-900 border-brand-accent rounded-tr-none" 
                : "bg-white text-slate-900 border-brand-border rounded-tl-none"
            )}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 max-w-[85%] mr-auto">
            <div className="w-10 h-10 rounded-xl bg-white border border-brand-border text-brand-primary flex items-center justify-center animate-pulse">
              <Bot className="w-6 h-6" />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-xl border-b-4 border-brand-border flex gap-1">
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t-4 border-brand-border mx-4 mb-4 rounded-[2.5rem] shadow-2xl">
        <div className="flex gap-3 items-center">
          <button className="p-4 bg-brand-bg border border-brand-border rounded-2xl text-brand-primary active:scale-90 transition-all">
            <Mic className="w-6 h-6" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Chiedimi qualsiasi cosa..."
              className="w-full bg-brand-bg border border-brand-border rounded-2xl py-4 px-6 text-lg text-slate-900 placeholder:text-brand-muted focus:outline-none focus:border-brand-primary transition-all font-bold"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn(
                "absolute right-2 top-2 p-2 rounded-xl transition-all",
                input.trim() && !isLoading ? "bg-brand-primary text-white shadow-md border-b-4 border-blue-800" : "text-brand-muted opacity-30"
              )}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['Cos\'è il phishing?', 'Come riconosco una fake news?', 'Cos\'è un URL?'].map((hint) => (
            <button
              key={hint}
              onClick={() => setInput(hint)}
              className="whitespace-nowrap bg-brand-bg text-brand-muted border border-brand-border px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all hover:bg-brand-primary hover:text-white"
            >
              {hint}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
