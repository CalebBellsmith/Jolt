import React, { useState } from 'react';
import { HelpCircle, User, Home, ChevronDown, ChevronUp, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Logo } from './Logo';

interface HeaderProps {
  title: string;
  onHelpClick: () => void;
  onAccountClick: () => void;
  onHomeClick: () => void;
  onLogout: () => void;
  showHome?: boolean;
  user?: { name: string; email: string };
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  onHelpClick, 
  onAccountClick, 
  onHomeClick,
  onLogout,
  showHome,
  user 
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  return (
    <header className="h-20 bg-transparent flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {showHome && (
          <button 
            onClick={onHomeClick}
            className="p-2 hover:bg-[#000066]/5 rounded-full transition-colors"
          >
            <Home className="w-6 h-6 text-[#000066]" />
          </button>
        )}
        <Logo className="h-8" />
        {title !== 'JOLT' && (
          <>
            <div className="w-px h-6 bg-[#000066]/10 mx-2" />
            <h1 className="text-xl font-bold text-[#000066] tracking-tight">{title}</h1>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onHelpClick}
          className="p-3 bg-[#000066] rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg group"
          title="Help"
        >
          <HelpCircle className="w-6 h-6 text-white" />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="p-3 bg-[#000066] rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg group"
            title="Account"
          >
            <User className="w-6 h-6 text-white" />
          </button>

          <AnimatePresence>
            {showAccountMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowAccountMenu(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-[#000066]/5 z-20 overflow-hidden"
                >
                  <div className="p-6 border-b border-[#000066]/5 bg-[#f0f4ff]">
                    <p className="font-bold text-[#000066]">{user?.name || 'User Name'}</p>
                    <p className="text-xs text-[#000066]/60">{user?.email || 'user@example.com'}</p>
                  </div>
                  <div className="p-3">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#000066] hover:bg-[#f0f4ff] rounded-2xl transition-colors">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button 
                      onClick={() => {
                        setShowAccountMenu(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-200 rounded-xl overflow-hidden mb-4 bg-white shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-50 transition-colors"
      >
        <span className="font-medium text-zinc-800">{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-zinc-600 text-sm leading-relaxed border-t border-zinc-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
