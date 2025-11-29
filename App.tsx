
import React, { useState, useEffect, useRef } from 'react';
import { OpenAIWordmark, CliIcon, IdeIcon, CloudIcon, ArrowRightIcon } from './components/Icons';

// --------------------------------------------------------------------------
// INSTRUCTIONS:
// To keep your custom logo permanently via code (optional):
// 1. Get a public URL for your image OR convert your image to a Base64 string.
// 2. Paste the URL or Base64 string inside the quotes below.
// --------------------------------------------------------------------------
const CUSTOM_LOGO_URL = ""; 

const FluidBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-black">
            {/* Dark Overlay to keep text readable */}
            <div className="absolute inset-0 bg-black/80 z-0"></div>

            {/* Morphing Liquid Glass Layers */}
            <div className="relative w-full h-full">
                {/* Deep Purple Base - Slow morphing */}
                <div className="absolute top-[10%] left-[10%] w-[70vw] h-[70vw] bg-indigo-900/40 mix-blend-screen animate-morph animation-delay-4000 blur-[100px] transition-all duration-[10s]"></div>
                
                {/* Vibrant Pink/Fuchsia Mid Layer - Moves opposite */}
                <div className="absolute top-[20%] right-[10%] w-[60vw] h-[60vw] bg-fuchsia-700/30 mix-blend-screen animate-morph animation-delay-2000 blur-[80px] transition-all duration-[12s]"></div>

                {/* Cyan/Glass Highlight Layer - Smaller, faster, creates the 'shine' */}
                <div className="absolute bottom-[0%] left-[30%] w-[50vw] h-[50vw] bg-cyan-500/20 mix-blend-overlay animate-morph blur-[60px] transition-all duration-[8s]"></div>
            </div>
            
            {/* Noise Texture for "Crystal" feel */}
            <div className="absolute inset-0 opacity-[0.04] z-[1]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>
    );
};

const Header: React.FC = () => {
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState<number>(32);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Load saved logo settings from localStorage on mount
  useEffect(() => {
    const savedLogo = localStorage.getItem('codex_custom_logo');
    const savedSize = localStorage.getItem('codex_logo_size');
    const savedLock = localStorage.getItem('codex_logo_locked');
    
    if (savedLogo) {
        setCustomLogo(savedLogo);
    }
    if (savedSize) {
        setLogoSize(parseInt(savedSize, 10));
    }
    if (savedLock === 'true') {
        setIsLocked(true);
    }
  }, []);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCustomLogo(result);
        localStorage.setItem('codex_custom_logo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(event.target.value, 10);
    setLogoSize(size);
    localStorage.setItem('codex_logo_size', size.toString());
  };

  const handleLock = () => {
      localStorage.setItem('codex_logo_locked', 'true');
      setIsLocked(true);
  };

  const handleUnlock = () => {
      localStorage.removeItem('codex_logo_locked');
      setIsLocked(false);
  };

  const handleReset = () => {
      localStorage.removeItem('codex_logo_locked');
      localStorage.removeItem('codex_custom_logo');
      localStorage.removeItem('codex_logo_size');
      setCustomLogo(null);
      setLogoSize(32);
      setIsLocked(false);
  }

  // Determine which logo to show: State > Constant > Default
  const displayLogo = customLogo || CUSTOM_LOGO_URL;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md transition-all duration-200 border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex justify-between items-center">
        <div className="flex items-center gap-6">
            {/* Logo Area */}
            <div className="relative group flex items-center gap-4">
                <a 
                    href="#" 
                    className="flex items-center hover:opacity-80 transition-opacity"
                    onClick={(e) => !isLocked && e.preventDefault()}
                >
                {displayLogo ? (
                    <img 
                        src={displayLogo} 
                        alt="Custom Logo" 
                        style={{ height: `${logoSize}px` }}
                        className="w-auto object-contain"
                    />
                ) : (
                    <OpenAIWordmark />
                )}
                </a>

                {/* Unlock/Change Button - Visible on hover if locked */}
                {isLocked && (
                    <button 
                        onClick={handleUnlock}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-[10px] font-medium bg-zinc-800 text-gray-300 hover:text-white border border-zinc-700 rounded px-2 py-1 ml-2"
                    >
                        Change Logo
                    </button>
                )}

                {/* Edit Controls - Only visible if NOT locked */}
                {!isLocked && (
                    <div className="flex items-center gap-3 bg-zinc-900/90 p-2 rounded-lg border border-white/10 animate-fade-in duration-200">
                        <label className="cursor-pointer text-xs bg-white text-black px-2 py-1 rounded font-medium hover:bg-gray-200 transition-colors whitespace-nowrap">
                            Upload Logo
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleLogoUpload}
                            />
                        </label>
                        
                        {customLogo && (
                            <>
                                <div className="h-4 w-px bg-white/20"></div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Size</span>
                                    <input 
                                        type="range" 
                                        min="20" 
                                        max="60" 
                                        value={logoSize} 
                                        onChange={handleSizeChange}
                                        className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-white"
                                    />
                                </div>
                                <div className="h-4 w-px bg-white/20"></div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={handleLock}
                                        className="text-xs text-green-400 hover:text-green-300 font-medium px-2 py-1 hover:bg-green-400/10 rounded transition-colors"
                                        title="Save logo and hide controls"
                                    >
                                        ✔ Lock
                                    </button>
                                    <button 
                                        onClick={handleReset}
                                        className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 hover:bg-red-400/10 rounded transition-colors"
                                        title="Reset to default logo"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="hidden md:block text-sm font-medium text-white hover:text-gray-300 transition-colors">
              Research
          </a>
          <a href="#" className="hidden md:block text-sm font-medium text-white hover:text-gray-300 transition-colors">
              API
          </a>
          <a href="#" className="hidden md:block text-sm font-medium text-white hover:text-gray-300 transition-colors">
              ChatGPT
          </a>
          
          <div className="flex items-center gap-3 pl-2">
              <button className="bg-white text-black text-[13px] font-semibold rounded-full px-3 py-1.5 hover:bg-gray-200 transition-colors">
              Try ChatGPT
              </button>
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-white cursor-pointer hover:bg-zinc-700">
                  <span className="sr-only">Account</span>
                  <div className="w-4 h-4 border border-zinc-400 rounded-sm"></div>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const TerminalWindow: React.FC = () => {
    const [lines, setLines] = useState<Array<{text: string, color: string}>>([
        { text: ">_ Vortex (v0.50.0)", color: "text-gray-500" },
        { text: "directory: ~/eb/code/acme", color: "text-gray-500" },
        { text: " ", color: "" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);

    // Blinking cursor effect
    useEffect(() => {
        const interval = setInterval(() => setCursorVisible(v => !v), 500);
        return () => clearInterval(interval);
    }, []);

    // Animation Scenario Logic
    useEffect(() => {
        let isMounted = true;
        
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const runScenario = async () => {
            while (isMounted) {
                // Reset state
                setLines([
                    { text: ">_ Vortex (v0.50.0)", color: "text-gray-500" },
                    { text: "directory: ~/eb/code/acme", color: "text-gray-500" },
                    { text: " ", color: "" },
                ]);
                setInputValue("");
                await wait(500); // Wait briefly before starting

                // --- Step 1: Run Dev Server ---
                const cmd1 = "npm run dev";
                for (let i = 0; i <= cmd1.length; i++) {
                    if (!isMounted) return;
                    setInputValue(cmd1.slice(0, i));
                    await wait(Math.random() * 50 + 30);
                }
                await wait(300);
                setLines(prev => [...prev, { text: `> ${cmd1}`, color: "text-white" }]);
                setInputValue("");
                await wait(400);

                // --- Step 2: Show Output & Error ---
                const output1 = [
                    { text: "> vortex-app@0.1.0 dev", color: "text-gray-400" },
                    { text: "ready - started server on http://localhost:3000", color: "text-green-400" },
                    { text: "event - compiled client and server successfully", color: "text-gray-400" },
                    { text: "wait  - compiling...", color: "text-gray-500" },
                    { text: "error - ./src/Dashboard.tsx:24:12", color: "text-red-500" },
                    { text: "SyntaxError: Unexpected token", color: "text-red-400" },
                ];
                for (const line of output1) {
                    if (!isMounted) return;
                    setLines(prev => [...prev, line]);
                    await wait(Math.random() * 200 + 100);
                }
                await wait(1500);

                // --- Step 3: Call Vortex Agent ---
                const cmd2 = "vortex fix";
                for (let i = 0; i <= cmd2.length; i++) {
                    if (!isMounted) return;
                    setInputValue(cmd2.slice(0, i));
                    await wait(Math.random() * 50 + 30);
                }
                await wait(300);
                setLines(prev => [...prev, { text: `> ${cmd2}`, color: "text-white" }]);
                setInputValue("");
                await wait(500);

                // --- Step 4: Vortex Output ---
                const output2 = [
                    { text: "Vortex is analyzing...", color: "text-blue-400" },
                    { text: "Found syntax error in Dashboard.tsx", color: "text-gray-300" },
                    { text: "Applying fix...", color: "text-gray-300" },
                    { text: "+ const data = await response.json();", color: "text-green-400" },
                    { text: "✓ Fixed in 180ms", color: "text-green-500" },
                    { text: "ready - reloaded successfully", color: "text-gray-400" },
                ];
                for (const line of output2) {
                    if (!isMounted) return;
                    setLines(prev => [...prev, line]);
                    await wait(600);
                }

                await wait(6000);
            }
        };

        runScenario();

        return () => { isMounted = false; };
    }, []);

    return (
        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
            {/* Glass Window */}
            <div className="relative w-full h-full bg-[#1e1e1e]/90 backdrop-blur-xl rounded-xl shadow-2xl flex flex-col overflow-hidden border border-white/10 ring-1 ring-black/20">
                {/* Window Controls */}
                <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-white/5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    <div className="ml-auto text-xs text-gray-500 font-mono">vortex-cli — zsh</div>
                </div>

                {/* Terminal Content */}
                <div className="flex-1 p-6 font-mono text-[13px] leading-relaxed text-gray-300 overflow-hidden font-medium">
                    <div className="flex flex-col justify-end h-full">
                         {/* Static/History Lines */}
                        <div className="space-y-1">
                            {lines.map((line, i) => (
                                <p key={i} className={`${line.color} break-words animate-fade-in`}>{line.text}</p>
                            ))}
                        </div>
                        
                        {/* Active Input Line */}
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-green-500">&gt;</span>
                            <span className="text-white flex">
                                {inputValue}
                                <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} ml-0.5 w-2 h-4 bg-gray-400 block`}></span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HeroSection: React.FC = () => (
  <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 relative z-10">
    <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Centered Top Content */}
        <div className="text-center max-w-4xl mb-16">
            <h1 className="text-6xl md:text-[96px] leading-[0.9] font-semibold tracking-tighter text-white mb-8 drop-shadow-2xl">
            Vortex
            </h1>
            <p className="text-xl md:text-3xl text-gray-200 leading-normal mb-10 font-medium drop-shadow-md max-w-2xl mx-auto">
            A powerful coding agent that helps developers ship faster and more confidently.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
                <button className="bg-white text-black font-semibold text-lg rounded-full px-10 py-4 hover:bg-gray-200 transition-all transform active:scale-95 shadow-xl shadow-white/10">
                    Get started
                </button>
                <a href="#" className="flex items-center text-white font-semibold text-lg group hover:text-gray-300 transition-colors">
                    Try in VSCode
                    <ArrowRightIcon />
                </a>
            </div>
        </div>

        {/* Terminal Animation - Centered - Reduced size */}
        <div className="w-full max-w-3xl shadow-2xl rounded-xl overflow-hidden ring-1 ring-white/10">
            <TerminalWindow />
        </div>
    </div>
  </section>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-[#1a1a1a]/80 backdrop-blur-sm rounded-xl p-8 flex flex-col h-full border border-white/5 hover:bg-[#202020]/90 transition-colors">
        <div className="text-white mb-6">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-[15px] leading-relaxed">{description}</p>
    </div>
);


const FeaturesSection: React.FC = () => (
    <section className="py-20 md:py-32 px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
            <div className="mb-16">
                <h2 className="text-4xl md:text-[56px] font-semibold tracking-tighter text-white leading-tight mb-6">
                    Your new coding partner
                </h2>
                <p className="text-xl text-gray-400 font-medium">
                    Vortex runs in all your tools, powered by your ChatGPT account.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureCard 
                    icon={<CliIcon />}
                    title="Vortex CLI"
                    description="Go from prompt to pull request in minutes. Ship new features, fix bugs, brainstorm solutions, or tackle whatever's next with Vortex in your terminal."
                />
                <FeatureCard 
                    icon={<IdeIcon />}
                    title="Vortex IDE extension"
                    description="Partner with Vortex in VSCode, Cursor, and other IDEs. Preview changes, make targeted edits, and stay in flow from idea to implementation."
                />
                <FeatureCard 
                    icon={<CloudIcon />}
                    title="Vortex cloud"
                    description="Delegate tasks to Vortex in the cloud so you can stay in flow. Vortex loads your repo in a secure sandbox, generating code you can review, merge, or continue working on locally."
                />
            </div>
        </div>
    </section>
);

const AgentSection: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
    const [step, setStep] = useState(0); // 0: Reset, 1: Typing, 2: Message Sent, 3: Thinking, 4-10: Actions
    const [inputValue, setInputValue] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);

    // Blinking cursor
    useEffect(() => {
        const interval = setInterval(() => setCursorVisible(v => !v), 500);
        return () => clearInterval(interval);
    }, []);

    // Timer logic
    useEffect(() => {
        let interval: any;
        if (step >= 3 && step < 10) {
            interval = setInterval(() => {
                setSeconds(s => (s < 9 ? s + 1 : 9));
            }, 150);
        } else {
            setSeconds(0);
        }
        return () => clearInterval(interval);
    }, [step]);

    // Main Animation Sequence
    useEffect(() => {
        let isMounted = true;
        const sequence = async () => {
            const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
            const prompt = "Help me understand how teams split their focus between the analytics toolkit that highlights tab versus agent usage.";
            
            while (isMounted) {
                // RESET
                setStep(0);
                setInputValue("");
                await wait(500);

                // Step 1: TYPE PROMPT
                setStep(1);
                for (let i = 0; i <= prompt.length; i++) {
                    if (!isMounted) return;
                    setInputValue(prompt.slice(0, i));
                    await wait(25);
                }
                await wait(600);

                // Step 2: SEND MESSAGE (Move prompt to bubble)
                setStep(2); 
                setInputValue("");
                await wait(800);

                // Step 3: THINKING START
                setStep(3); 
                await wait(1000);

                // Step 4: REVIEW DOCS
                setStep(4);
                await wait(800);

                // Step 5: INTENT
                setStep(5);
                await wait(1000);

                // Step 6: ACTION 1 (summary.py)
                setStep(6);
                await wait(800);

                // Step 7: INTENT 2
                setStep(7);
                await wait(800);

                // Step 8: ACTION 2 (segmentation.py)
                setStep(8);
                await wait(800);

                // Step 9: ACTION 3 (report.py)
                setStep(9);
                await wait(800);

                // Step 10: FINAL INTENT
                setStep(10);
                await wait(5000);
            }
        };
        sequence();
        return () => { isMounted = false; };
    }, []);

    return (
        <section className="py-20 md:py-32 px-6 relative z-10">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Text */}
            <div className="order-1">
                <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6">
                Agent turns ideas<br />into code
                </h2>
                <p className="text-xl text-gray-400 font-medium leading-relaxed mb-8 max-w-lg">
                A human-AI programmer, orders of magnitude more effective than any developer alone.
                </p>
                <a href="#" className="inline-flex items-center text-[#ff8c42] hover:text-[#ff9f63] font-semibold transition-colors">
                Learn about Agent <ArrowRightIcon />
                </a>
            </div>

            {/* Right UI Mockup */}
            <div className="order-2 w-full">
                <div className="bg-[#1e1e1e]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden font-sans text-sm">
                {/* Window Chrome */}
                <div className="h-8 bg-[#2d2d2d] flex items-center px-3 border-b border-black/40">
                    <div className="flex gap-1.5 absolute">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5f5f5f]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5f5f5f]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5f5f5f]"></div>
                    </div>
                    <div className="w-full text-center text-gray-400 text-xs">Cursor</div>
                </div>

                <div className="flex h-[450px]">
                    {/* Sidebar */}
                    <div className="w-64 bg-[#181818]/90 border-r border-white/5 p-4 flex flex-col gap-6 overflow-y-auto hidden md:flex">
                        <div>
                            <div className="text-[10px] font-bold text-gray-500 tracking-wider mb-2">IN PROGRESS 3</div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-2 text-gray-300">
                                    <span className="animate-spin mt-0.5 text-gray-500">❋</span>
                                    <div>
                                        <div className="text-xs font-medium">Enterprise Order Management...</div>
                                        <div className="text-[10px] text-gray-500">Generating</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-gray-300">
                                    <span className="animate-spin mt-0.5 text-gray-500">❋</span>
                                    <div>
                                        <div className="text-xs font-medium">PyTorch MNIST Experiments</div>
                                        <div className="text-[10px] text-gray-500">Generating</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-gray-300">
                                    <span className="animate-spin mt-0.5 text-gray-500">❋</span>
                                    <div>
                                        <div className="text-xs font-medium">Fix PR Comments Fetching Is...</div>
                                        <div className="text-[10px] text-gray-500">Generating</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] font-bold text-gray-500 tracking-wider mb-2">READY FOR REVIEW 3</div>
                            <div className="space-y-3 opacity-70">
                                <div className="flex items-start gap-2 text-gray-300">
                                    <div className="w-3 h-3 rounded-full border border-gray-500 flex items-center justify-center text-[8px] mt-0.5">✓</div>
                                    <div>
                                        <div className="text-xs font-medium">Analyze Tab vs Agent Us... <span className="text-gray-500 ml-1">now</span></div>
                                        <div className="text-[10px] text-gray-500">All set! We now track focus shar...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-[#1e1e1e]/50 flex flex-col">
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <span className="font-semibold text-gray-200">Analyze Tab vs Agent Usage Patterns</span>
                        </div>
                        
                        <div className="flex-1 p-6 space-y-6 overflow-y-auto scroll-smooth">
                            {/* User Message Bubble */}
                            {step >= 2 && (
                                <div className="bg-[#2b2b2b] p-3 rounded-lg text-gray-200 text-sm border border-white/5 animate-slide-up">
                                    Help me understand how teams split their focus between the analytics toolkit that highlights tab versus agent usage.
                                </div>
                            )}

                            {/* Agent Thinking & Response Area */}
                            {step >= 3 && (
                                <div className="space-y-4 animate-fade-in">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                                        <span className="font-medium text-gray-300">Thought</span> {seconds}s
                                    </div>
                                    
                                    {step >= 4 && (
                                        <div className="text-gray-400 text-xs animate-slide-up pl-4 border-l border-gray-700">
                                            Reviewed <span className="underline decoration-gray-600">workspace usage exports</span> and <span className="underline decoration-gray-600">historical engagement logs.</span>
                                        </div>
                                    )}
                                    
                                    {step >= 5 && (
                                        <div className="text-gray-300 text-sm leading-relaxed animate-slide-up">
                                            I'll build an analytics toolkit that highlights tab versus agent switching behavior:
                                        </div>
                                    )}

                                    {step >= 6 && (
                                        <div className="space-y-2 animate-slide-up">
                                            <div className="flex items-center gap-2 bg-[#252525] p-2 rounded border border-white/5 text-xs text-gray-300">
                                                <span className="text-gray-500">📄</span> summary.py <span className="text-green-400 ml-auto">+150</span> <span className="text-red-400">-0</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {step >= 7 && (
                                        <div className="text-gray-300 text-sm leading-relaxed animate-slide-up">
                                            Next I'll normalize the interaction labels and add session timeouts so the product can filter specific cohorts:
                                        </div>
                                    )}

                                    {step >= 8 && (
                                        <div className="space-y-2 animate-slide-up">
                                            <div className="flex items-center gap-2 bg-[#252525] p-2 rounded border border-white/5 text-xs text-gray-300">
                                                <span className="text-gray-500">📄</span> segmentation.py <span className="text-green-400 ml-auto">+94</span> <span className="text-red-400">-0</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {step >= 9 && (
                                        <div className="text-gray-300 text-sm leading-relaxed animate-slide-up">
                                            Time to stitch everything together with a report helper that calculates the key metrics:
                                        </div>
                                    )}
                                    
                                    {step >= 9 && ( // Show simultaneously with step 9 or shortly after
                                        <div className="space-y-2 animate-slide-up mt-2">
                                            <div className="flex items-center gap-2 bg-[#252525] p-2 rounded border border-white/5 text-xs text-gray-300">
                                                <span className="text-gray-500">📄</span> report.py <span className="text-green-400 ml-auto">+40</span> <span className="text-red-400">-0</span>
                                            </div>
                                        </div>
                                    )}

                                    {step >= 10 && (
                                        <div className="text-gray-300 text-sm leading-relaxed pb-4 animate-slide-up mt-4">
                                            I'll add tests to lock in the behaviour using a representative sample of last week's export:
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Input Bar */}
                        <div className="p-4 border-t border-white/5 bg-[#252525]">
                            <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-2 flex items-center justify-between">
                                {/* If typing (step 1), show input. If idle/later steps, show placeholder */}
                                {step === 1 ? (
                                    <span className="text-gray-200 text-sm flex items-center">
                                        {inputValue}
                                        <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} w-1.5 h-4 bg-gray-400 ml-0.5`}></span>
                                    </span>
                                ) : (
                                    <span className="text-gray-500 text-sm">Plan, search, build anything...</span>
                                )}
                                
                                <div className="flex items-center gap-2">
                                    <div className="bg-[#333] text-[10px] px-1.5 py-0.5 rounded text-gray-300 border border-white/10 flex items-center gap-1">
                                        ∞ Agent
                                    </div>
                                    <div className="text-[10px] text-gray-500">GPT-5 ⌄</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
};

// Syntax Highlighter for the Autocomplete Section to make it look real
const SyntaxHighlighter: React.FC<{ code: string }> = ({ code }) => {
    // Simple tokenizer for visual flair
    const tokens = code.split(/(\b(?:import|from|const|export|default|function|return|useQuery|useState|React|div|span|className)\b|"[^"]*"|'[^']*'|\{|\}|\(|\)|;)/g);
    
    return (
        <>
            {tokens.map((token, i) => {
                if (!token) return null;
                if (['import', 'from', 'const', 'export', 'default', 'function', 'return'].includes(token)) 
                    return <span key={i} className="text-[#ff79c6]">{token}</span>; // Pink
                if (['useQuery', 'useState', 'React'].includes(token)) 
                    return <span key={i} className="text-[#8be9fd]">{token}</span>; // Cyan
                if (token.startsWith('"') || token.startsWith("'")) 
                    return <span key={i} className="text-[#f1fa8c]">{token}</span>; // Yellow
                 if (['div', 'span', 'className'].includes(token))
                    return <span key={i} className="text-[#ffb86c]">{token}</span>; // Orange
                return <span key={i} className="text-[#f8f8f2]">{token}</span>; // White
            })}
        </>
    );
};

const AutocompleteSection: React.FC = () => {
    const startCode = `"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function SupportChat() {
  const [input, setInput] = useState("");
  `;
    const [displayedCode, setDisplayedCode] = useState(startCode);
    const [ghostText, setGhostText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const [showTabKey, setShowTabKey] = useState(false);
    const [tabPressed, setTabPressed] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setCursorVisible(v => !v), 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const sequence = async () => {
            const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
            const type = async (text: string) => {
                for (let char of text) {
                    if (!isMounted) return;
                    setDisplayedCode(prev => prev + char);
                    await wait(Math.random() * 20 + 20); // Faster typing
                }
            };

            while(isMounted) {
                // Reset
                setDisplayedCode(startCode);
                setGhostText("");
                setShowTabKey(false);
                setTabPressed(false);
                await wait(500);

                // --- Step 1: Type Query Hook ---
                await type(`const { data: messages } = useQuery({`);
                await wait(150);
                await type(`\n    queryKey: ['messages'],`);
                await wait(200);

                // Ghost Text: The implementation
                const queryLogic = `\n    queryFn: () => fetch('/api/messages').then(res => res.json())`;
                setGhostText(queryLogic);
                setShowTabKey(true);
                await wait(1000);

                // "Press Tab" - instant complete
                setTabPressed(true);
                await wait(150);
                setGhostText("");
                setDisplayedCode(prev => prev + queryLogic);
                setShowTabKey(false);
                setTabPressed(false);
                
                // Finish block
                await type(`\n  });\n`);
                await wait(400);

                // --- Step 2: UI Implementation ---
                await type(`\n  return (`);
                await wait(200);

                // Ghost Text: The entire JSX
                const jsxLogic = `\n    <div className="p-4 flex flex-col h-full">\n      {messages.map(msg => <div key={msg.id}>{msg.text}</div>)}\n    </div>\n  );`;
                setGhostText(jsxLogic);
                setShowTabKey(true);
                await wait(1200);

                // "Press Tab"
                setTabPressed(true);
                await wait(150);
                setGhostText("");
                setDisplayedCode(prev => prev + jsxLogic);
                setShowTabKey(false);
                setTabPressed(false);
                
                await type(`\n}`);

                await wait(4000);
            }
        };
        sequence();
        return () => { isMounted = false; };
    }, []);

    return (
        <section className="py-20 md:py-32 px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left UI Mockup */}
            <div className="order-2 lg:order-1 w-full">
            <div className="bg-[#1e1e1e]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm">
                {/* Window Chrome */}
                <div className="h-9 bg-[#2d2d2d] flex items-center justify-between px-3 border-b border-black/40">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5f5f5f]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5f5f5f]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5f5f5f]"></div>
                    </div>
                    <div className="text-gray-400 text-xs absolute left-1/2 -translate-x-1/2">Cursor</div>
                    <div></div>
                </div>
                
                {/* Tab Bar */}
                <div className="flex bg-[#181818]/80 text-xs text-gray-400 border-b border-black/40">
                    <div className="px-4 py-2 border-r border-black/40 hover:bg-[#1e1e1e] cursor-pointer">Dashboard.tsx</div>
                    <div className="px-4 py-2 border-r border-black/40 bg-[#1e1e1e] text-gray-200 border-t-2 border-t-blue-500 cursor-pointer flex items-center gap-2">
                        SupportChat.tsx <span className="hover:text-white">×</span>
                    </div>
                    <div className="flex-1 bg-[#181818]/80"></div>
                </div>

                {/* Code Editor */}
                <div className="relative p-6 bg-[#1e1e1e]/50 leading-relaxed overflow-x-auto h-[400px] whitespace-pre font-mono text-[13px]">
                    <div className="text-gray-300">
                        <SyntaxHighlighter code={displayedCode} />
                        <span className="text-gray-500 transition-opacity duration-150 italic">{ghostText}</span>
                        <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} w-2 h-4 bg-gray-400 inline-block align-middle ml-[1px]`}></span>
                    </div>

                    {/* Visual Tab Key Indicator */}
                    {showTabKey && (
                        <div className={`absolute top-1/2 right-10 transform -translate-y-1/2 flex flex-col items-center gap-2 transition-all duration-150 ${tabPressed ? 'scale-90 opacity-80' : 'scale-100 opacity-100'}`}>
                             <div className="w-16 h-16 rounded-lg bg-gray-800 border-b-4 border-gray-950 flex items-center justify-center shadow-lg border-t border-t-white/10">
                                 <span className="text-gray-400 font-bold text-lg">Tab</span>
                             </div>
                             <span className="text-xs text-blue-400 font-medium animate-pulse-fast">Press to complete</span>
                        </div>
                    )}
                </div>
            </div>
            </div>
    
            {/* Right Text */}
            <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tighter leading-tight mb-6">
                    Magically accurate<br />autocomplete
                </h2>
                <p className="text-xl text-gray-400 font-medium leading-relaxed mb-8 max-w-lg">
                    Our custom Tab model predicts your next action with striking speed and precision.
                </p>
                <a href="#" className="inline-flex items-center text-[#ff8c42] hover:text-[#ff9f63] font-semibold transition-colors">
                    Learn about Tab <ArrowRightIcon />
                </a>
            </div>
        </div>
        </section>
    );
};

interface PricingCardProps {
    title: string;
    features: string[];
    price: string;
    pricePeriod?: string;
    buttonText?: string;
    isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, features, price, pricePeriod, buttonText = "Try Vortex", isPopular }) => (
    <div className={`relative bg-[#1a1a1a]/60 backdrop-blur-xl rounded-2xl p-8 flex flex-col justify-between border transition-all duration-300 group hover:-translate-y-2 ${isPopular ? 'border-purple-500/50 shadow-2xl shadow-purple-900/20' : 'border-white/10 hover:border-white/20'}`}>
        {isPopular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                MOST POPULAR
            </div>
        )}
        
        <div>
            <h3 className="text-xl font-medium text-gray-300 mb-4">{title}</h3>
            <div className="flex items-baseline mb-6">
                <span className="text-5xl font-bold text-white tracking-tight">{price}</span>
                {pricePeriod && <span className="text-gray-500 ml-2">{pricePeriod}</span>}
            </div>
            
            <div className="space-y-4 mb-8">
                {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isPopular ? 'bg-purple-500/20 text-purple-400' : 'bg-white/10 text-gray-400'}`}>
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="stroke-current stroke-2">
                                <path d="M1 4L3.5 6.5L9 1" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="leading-5">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
        
        <button className={`w-full font-semibold text-sm rounded-full py-3 transition-all flex items-center justify-center gap-2 ${isPopular ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}>
            {buttonText} <ArrowRightIcon />
        </button>
    </div>
);

const PricingSection: React.FC = () => (
    <section className="py-20 md:py-32 px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
             <div className="mb-16">
                <h2 className="text-4xl md:text-[56px] font-semibold tracking-tighter text-white leading-tight mb-6">
                    Plans & Pricing
                </h2>
                <p className="text-xl text-gray-400 font-medium">
                    Choose the power of Vortex that fits your workflow.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PricingCard 
                    title="Free Trial"
                    features={["One week trial", "Limit usage", "Limit agent power"]}
                    price="Free"
                />
                <PricingCard 
                    title="Pro"
                    features={["Daily 100 requests", "Agent full power", "Fast error fixing"]}
                    price="$10"
                    pricePeriod="/ month"
                    isPopular={true}
                />
                <PricingCard 
                    title="Business"
                    features={["500 requests / day", "Fast response agent", "Potential auto debugging", "Fast error fixing"]}
                    price="$50"
                    pricePeriod="/ user / month"
                />
            </div>
        </div>
    </section>
);

const TryVortexSection: React.FC = () => (
    <section className="py-32 px-6 relative z-10 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="relative">
             <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-10 relative z-10">
                Try Vortex now.
             </h2>
        </div>
        <button className="bg-white text-black text-lg font-medium rounded-full px-8 py-3 hover:bg-gray-200 transition-all flex items-center gap-2 group relative z-20">
            Download for Linux <span className="text-xl group-hover:translate-y-1 transition-transform">↓</span>
        </button>
    </section>
);

const FooterSection: React.FC = () => (
    <footer className="pt-24 pb-10 px-6 bg-black/90 text-gray-400 text-sm border-t border-white/5 relative z-10">
        <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-8 mb-24">
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-white mb-2">Product</h4>
                    <a href="#" className="hover:text-white transition-colors">Features</a>
                    <a href="#" className="hover:text-white transition-colors">Enterprise</a>
                    <a href="#" className="hover:text-white transition-colors">Bugbot</a>
                    <a href="#" className="hover:text-white transition-colors">CLI</a>
                    <a href="#" className="hover:text-white transition-colors">Pricing</a>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-white mb-2">Resources</h4>
                    <a href="#" className="hover:text-white transition-colors">Download</a>
                    <a href="#" className="hover:text-white transition-colors">Web Agents</a>
                    <a href="#" className="hover:text-white transition-colors">Changelog</a>
                    <a href="#" className="hover:text-white transition-colors">Docs</a>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-1">Forum <span className="text-[10px] opacity-70">↗</span></a>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-1">Status <span className="text-[10px] opacity-70">↗</span></a>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-white mb-2">Company</h4>
                    <a href="#" className="hover:text-white transition-colors">Careers</a>
                    <a href="#" className="hover:text-white transition-colors">Blog</a>
                    <a href="#" className="hover:text-white transition-colors">Community</a>
                    <a href="#" className="hover:text-white transition-colors">Students</a>
                    <a href="#" className="hover:text-white transition-colors">Brand</a>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-1">Anysphere <span className="text-[10px] opacity-70">↗</span></a>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-white mb-2">Legal</h4>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Data Use</a>
                    <a href="#" className="hover:text-white transition-colors">Security</a>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold text-white mb-2">Connect</h4>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-1">X <span className="text-[10px] opacity-70">↗</span></a>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-1">LinkedIn <span className="text-[10px] opacity-70">↗</span></a>
                    <a href="#" className="hover:text-white transition-colors flex items-center gap-1">YouTube <span className="text-[10px] opacity-70">↗</span></a>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
                <div className="flex items-center gap-4">
                    <span>© 2025 Vortex, Inc.</span>
                    <span className="hidden md:inline text-gray-700">|</span>
                    <span className="flex items-center gap-1.5 text-gray-400">
                        <div className="w-3 h-3 rounded-full border border-gray-500 flex items-center justify-center text-[8px] mt-0.5">✓</div>
                        SOC 2 Certified
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-[#1a1a1a] rounded-full p-1 border border-white/10">
                        <button className="p-1.5 rounded-full text-white bg-[#333] hover:bg-[#444] transition-colors"><div className="w-3 h-3 border border-current rounded-sm"></div></button>
                        <button className="p-1.5 rounded-full text-gray-500 hover:text-white transition-colors"><div className="w-3 h-3 border border-current rounded-full"></div></button>
                        <button className="p-1.5 rounded-full text-gray-500 hover:text-white transition-colors"><div className="w-3 h-3 border-l border-b border-current rotate-45"></div></button>
                    </div>
                    
                    <button className="flex items-center gap-2 bg-[#1a1a1a] text-gray-300 px-3 py-1.5 rounded-full border border-white/10 text-xs hover:bg-[#252525] transition-colors">
                        🌐 English ⌄
                    </button>
                </div>
            </div>
        </div>
    </footer>
);


const App: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-sky-500/30 relative">
      <FluidBackground />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AgentSection />
        <AutocompleteSection />
        <PricingSection />
        <TryVortexSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default App;
