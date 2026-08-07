import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, AlertCircle, RefreshCw, PhoneCall, HelpCircle } from 'lucide-react';
import { AIChatMessage } from '../types';

export const AIAssistantTab: React.FC = () => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Mabuhay! Ako ang iyong **Binangonan Resident AI Assistant** (Gabay Binangoneño). Handa kitang tulungan sa mga katanungan tungkol sa local services, emergency hotlines, commuter guides (mga bangka at jeepney), requirements para sa clearance/cedula, at mga update sa Binangonan, Rizal!',
      timestamp: 'Just now',
      suggestedActions: [
        'Paano kumuha ng Cedula at Barangay Clearance?',
        'Ano ang emergency hotline ng MDRRMO at Pag-asa Hospital?',
        'Anong oras ang mga bangka mula Pritil Port papuntang Talim Island?',
        'Saan ang Municipal Hall at Business Permits Office?'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/binangonan/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      const aiMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Patawad, nagkaroon ng pansamantalang problema. Pakisubukan muli.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      const errorMsg: AIChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Patawad, hindi makakonekta sa AI server sa ngayon. Mangyaring sumangguni sa Emergency Hotlines tab para sa direktang tawag sa MDRRMO o Police.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Assistant Header */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-white">Gabay Binangoneño AI</h3>
              <span className="px-1.5 py-0.5 bg-sky-500/20 text-sky-300 text-[10px] font-bold rounded">
                Gemini 3.6 Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Instant answers on Binangonan LGU services, commuting & emergency help
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'msg-reset',
                sender: 'assistant',
                text: 'Mabuhay! Ano ang nais mong malaman tungkol sa Binangonan ngayon?',
                timestamp: 'Just now',
                suggestedActions: [
                  'Paano kumuha ng Cedula at Barangay Clearance?',
                  'Ano ang emergency hotline ng MDRRMO at Pag-asa Hospital?',
                  'Anong oras ang mga bangka mula Pritil Port papuntang Talim Island?'
                ]
              }
            ]);
          }}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Reset Conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3.5 space-y-1.5 shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white rounded-br-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none border border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] opacity-75 font-semibold">
                {msg.sender === 'user' ? (
                  <>
                    <span>Binangonan Resident</span>
                    <User className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-sky-500" />
                    <span>Gabay Binangoneño</span>
                  </>
                )}
              </div>

              <div className="whitespace-pre-wrap leading-relaxed space-y-2">
                {msg.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <span className="text-[9px] opacity-60 block text-right font-mono">
                {msg.timestamp}
              </span>
            </div>

            {/* Suggested Chips */}
            {msg.suggestedActions && (
              <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                {msg.suggestedActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(action)}
                    className="text-[11px] font-medium px-3 py-1.5 bg-sky-50 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-sky-800 dark:text-sky-300 rounded-xl border border-sky-200/60 dark:border-slate-700 text-left transition-all shadow-2xs"
                  >
                    💡 {action}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
            <Bot className="w-4 h-4 animate-bounce text-sky-500" />
            <span>Nagsusulat ng sagot si Gabay Binangoneño...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          placeholder="I-type ang iyong katanungan tungkol sa Binangonan..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputMessage.trim() || isLoading}
          className="p-2.5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white rounded-xl transition-all shadow-xs shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
