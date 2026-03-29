'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  sources?: string[];
  timestamp: Date;
}

interface ChatBotProps {
  grade: number | null;
  subject: string | null;
}

export default function ChatBot({ grade, subject }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: `Hi! 👋 I'm your Study Helper Assistant. I'm here to answer your questions about ${subject || 'your subjects'}. Feel free to ask me anything!`,
      sources: [],
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !grade) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Mock bot response - in production, connect to OpenAI
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `That's a great question! Here's what I found:\n\nBased on the ${subject} curriculum for Grade ${grade}, ${inputText.toLowerCase()}...\n\nSome key points to remember:\n• First important point\n• Second important point\n• Third important point\n\nDoes this help? Do you have any follow-up questions?`,
        sources: ['Khan Academy', 'Britannica', 'Textbook Reference'],
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 h-[600px] flex flex-col">
      <h3 className="text-lg font-bold mb-4">💬 Chat with Study Helper</h3>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-600 rounded-lg">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white dark:bg-gray-500 text-gray-900 dark:text-white rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.content}</p>

              {/* Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-opacity-30 border-gray-300">
                  <p className="text-xs font-semibold mb-1">📚 Sources:</p>
                  {msg.sources.map((source, idx) => (
                    <p key={idx} className="text-xs opacity-80">
                      • {source}
                    </p>
                  ))}
                </div>
              )}

              <p className="text-xs opacity-70 mt-2">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-500 text-gray-900 dark:text-white p-4 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me anything... (Grade appropriate answers)"
          className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading || !grade}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputText.trim() || !grade}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '⏳' : '📤'}
        </button>
      </div>

      {!grade && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">⚠️ Please select a grade level first</p>
      )}
    </div>
  );
}
