import { useState } from 'react';
import { Send, Bot, User, ExternalLink, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sampleChatMessages, type ChatMessage } from '@/data/mockData';

export default function RegulatoryAI() {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on current regulations in the ECO region, here is the relevant information regarding your query about "${inputValue}":

• This query has been processed through our regulatory database
• Please note that specific policy details may vary by jurisdiction
• We recommend consulting with local regulatory authorities for final verification

For detailed analysis, please specify the country and energy type of interest.`,
        sources: [
          { title: 'ECO Region Energy Policy Database', reference: 'Internal Reference' },
        ],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">Regulatory AI Oracle</h1>
        <p className="text-sm text-muted-foreground">
          Get reliable, source-verified answers to clean energy regulatory questions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-8">
          <div className="bg-card border border-border rounded-lg overflow-hidden h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                  <Bot className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">CleanAxis AI Oracle</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Verified regulatory intelligence
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    message.role === 'user' ? 'bg-primary' : 'bg-accent'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-accent-foreground" />
                    )}
                  </div>
                  <div className={`max-w-[80%] space-y-2 ${message.role === 'user' ? 'items-end' : ''}`}>
                    <div className={`rounded-lg px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    {message.sources && (
                      <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                        <p className="text-xs font-medium text-foreground mb-2">Verified Sources</p>
                        <div className="space-y-1">
                          {message.sources.map((source, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <ExternalLink className="h-3 w-3" />
                              <span>{source.title}</span>
                              <span className="text-accent">• {source.reference}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <Sparkles className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-pulse" />
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-muted/30">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about clean energy permits, incentives, or regulations…"
                  className="flex-1"
                />
                <Button type="submit" disabled={!inputValue.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="stat-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">How It Works</h3>
            <div className="space-y-3 text-xs text-muted-foreground">
              <p>
                The Regulatory AI Oracle processes your questions against a comprehensive database
                of clean energy policies, laws, and regulations across the ECO region.
              </p>
              <p>
                All responses are sourced from official government documents, ministry decrees,
                and verified legal frameworks.
              </p>
            </div>
          </div>

          <div className="stat-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">Suggested Questions</h3>
            <div className="space-y-2">
              {[
                'What are the feed-in tariff rates for solar in Kazakhstan?',
                'Which permits are needed for wind projects in Uzbekistan?',
                'What tax incentives exist for clean energy in Azerbaijan?',
                'How long does environmental approval take in Navoi region?',
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(question)}
                  className="w-full text-left text-xs text-muted-foreground hover:text-foreground p-2 rounded-md hover:bg-muted transition-colors"
                >
                  "{question}"
                </button>
              ))}
            </div>
          </div>

          <div className="stat-card bg-accent/5 border-accent/20">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-foreground">Trust & Transparency</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Every response includes verified source citations. We recommend confirming
                  critical decisions with official regulatory bodies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
