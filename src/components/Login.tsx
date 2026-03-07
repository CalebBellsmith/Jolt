import React from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Github, Chrome, Database } from 'lucide-react';

import { Logo } from './Logo';

interface LoginProps {
  onLogin: () => void;
  onDeveloperClick: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onDeveloperClick }) => {
  const [isSignUp, setIsSignUp] = React.useState(false);

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#d9e6ff] rounded-[48px] shadow-2xl border border-white/20 overflow-hidden p-10"
      >
        <div className="flex flex-col items-center mb-10">
          <Logo className="h-16 mb-4" />
          <p className="text-[#000066]/40 font-mono text-sm tracking-[0.3em] uppercase italic">Spatial Movement</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            {isSignUp && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#000066]/40" />
                <input 
                  type="text" 
                  placeholder="Username" 
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-[#000066]/5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#000066]/5 transition-all font-bold text-[#000066] placeholder:text-[#000066]/20"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#000066]/40" />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-[#000066]/5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#000066]/5 transition-all font-bold text-[#000066] placeholder:text-[#000066]/20"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#000066]/40" />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full pl-12 pr-4 py-4 bg-white/50 border border-[#000066]/5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#000066]/5 transition-all font-bold text-[#000066] placeholder:text-[#000066]/20"
              />
            </div>
          </div>

          <button 
            onClick={onLogin}
            className="w-full py-4 bg-[#000066] text-white rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#000066]/20"
          >
            {isSignUp ? 'Create Account' : 'Login'}
          </button>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#000066]/10"></div>
            </div>
            <span className="relative px-4 bg-[#d9e6ff] text-[10px] font-bold text-[#000066]/30 uppercase tracking-widest">Or</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center justify-center gap-3 w-full py-4 bg-white rounded-2xl font-bold text-[#000066] hover:bg-zinc-50 transition-all border border-[#000066]/5 shadow-sm">
              <Chrome className="w-5 h-5 text-red-500" />
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-[#000066]/60 font-medium">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#000066] font-black hover:underline"
            >
              {isSignUp ? 'Login' : 'Sign up'}
            </button>
          </p>
        </div>
      </motion.div>

      {/* Developer Page Button */}
      <button 
        onClick={onDeveloperClick}
        className="absolute bottom-8 right-8 p-3 bg-white/30 hover:bg-white/50 rounded-2xl border border-[#000066]/5 transition-all group flex items-center gap-2"
        title="Developer Portal"
      >
        <Database className="w-4 h-4 text-[#000066]/40 group-hover:text-[#000066] transition-colors" />
        <span className="text-[10px] font-bold text-[#000066]/30 group-hover:text-[#000066] uppercase tracking-widest transition-colors">Dev Portal</span>
      </button>
    </div>
  );
};
