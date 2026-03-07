import { useState } from 'react';
import { Header } from './components/UI';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Help } from './components/Help';
import { DeveloperPage } from './components/DeveloperPage';
import { useBluetooth } from './hooks/useBluetooth';

type Page = 'login' | 'dashboard' | 'help' | 'developer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const { deviceState, connect, disconnect, togglePower, triggerClick } = useBluetooth();

  const handleLogin = () => setCurrentPage('dashboard');
  const handleLogout = () => setCurrentPage('login');
  const handleHelpClick = () => setCurrentPage('help');
  const handleDeveloperClick = () => setCurrentPage('developer');
  const handleAccountClick = () => {};
  const handleHomeClick = () => setCurrentPage('dashboard');

  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {currentPage !== 'login' && currentPage !== 'developer' && (
        <Header
          title={currentPage === 'help' ? 'Help' : 'JOLT'}
          onHelpClick={handleHelpClick}
          onAccountClick={handleAccountClick}
          onHomeClick={handleHomeClick}
          onLogout={handleLogout}
          showHome={currentPage === 'help'}
          user={{ name: 'Bella Groten', email: 'BellaGroten@gmail.com' }}
        />
      )}
      <main>
        {currentPage === 'login' && (
          <Login
            onLogin={handleLogin}
            onDeveloperClick={handleDeveloperClick}
          />
        )}
        {currentPage === 'dashboard' && (
          <Dashboard
            deviceState={deviceState}
            onTogglePower={togglePower}
            onConnect={connect}
            onDisconnect={disconnect}
            onTriggerClick={triggerClick}
          />
        )}
        {currentPage === 'help' && <Help />}
        {currentPage === 'developer' && (
          <DeveloperPage onBack={() => setCurrentPage('login')} />
        )}
      </main>
      {currentPage !== 'login' && currentPage !== 'developer' && (
        <footer className="fixed bottom-0 left-0 right-0 h-8 bg-white border-t border-zinc-200 flex items-center justify-between px-4 text-[10px] text-zinc-400 uppercase tracking-widest z-40">
          <div className="flex items-center gap-4">
            <span>Status: <span className={deviceState.connected ? 'text-green-500' : 'text-zinc-300'}>{deviceState.connected ? 'Active' : 'Idle'}</span></span>
            <span>Firmware: v1.0.4</span>
          </div>
          <div>© 2026 JOLT Technologies</div>
        </footer>
      )}
    </div>
  );
}
