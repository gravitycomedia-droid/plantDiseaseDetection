import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen text-on-surface relative">
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-emerald-200/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-200/20 blur-[150px] rounded-full"></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="bg-white/20 backdrop-blur-xl docked full-width top-0 sticky z-50 shadow-[0_10px_40px_rgba(46,46,87,0.05)]">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2 font-headline tracking-tight">
              <span className="material-symbols-outlined text-emerald-500">eco</span>
              PlantScan
            </Link>
            <span className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              57 plant diseases
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            <Link to="/" className={`pb-1 font-headline font-semibold tracking-tight ${location.pathname === '/' ? 'text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-500' : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors'}`}>Detect</Link>
            <Link to="/about" className={`pb-1 font-headline font-semibold tracking-tight ${location.pathname === '/about' ? 'text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-500' : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors'}`}>About</Link>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-slate-600 p-2 hover:bg-white/10 transition-all duration-300 rounded-full">notifications</button>
            <button className="material-symbols-outlined text-slate-600 p-2 hover:bg-white/10 transition-all duration-300 rounded-full">account_circle</button>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 mt-12 mb-20 w-full max-w-7xl mx-auto">
        {children}
      </main>

      {/* Footer Area */}
      <footer className="bg-white/10 backdrop-blur-lg w-full mt-auto py-8 flex items-center justify-center px-12 border-t border-white/10 text-center">
        <p className="font-body text-sm tracking-widest text-slate-500">
          This project uses a ResNet50 PyTorch model trained on 57 disease classes, served via FastAPI and React.
        </p>
      </footer>
    </div>
  );
}
