import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bluetooth, Battery, Power, Target, ChevronDown, User } from 'lucide-react';
import { HumanOutline } from './HumanOutline';
import { BluetoothDeviceState } from '../hooks/useBluetooth';

import { Logo } from './Logo';

interface DashboardProps {
  deviceState: BluetoothDeviceState;
  onTogglePower: () => void;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  deviceState,
  onTogglePower,
  onConnect,
  onDisconnect
}) => {
  const [selectedPart, setSelectedPart] = useState('bicep');
  const [showBluetoothModal, setShowBluetoothModal] = useState(false);

  const bodyParts = [
    { id: 'default', label: 'Select as default' },
    { id: 'bicep', label: 'Bicep' },
    { id: 'forearm', label: 'Forearm' },
    { id: 'calf', label: 'Calf' },
    { id: 'thigh', label: 'Thigh' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left Column: Power & Baseline */}
        <div className="space-y-8">
          {/* Power Section */}
          <div className="relative pt-10 pb-8 px-6 bg-[#d9e6ff] rounded-[32px] shadow-sm flex flex-col items-center text-center">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#000066] rounded-full flex items-center justify-center shadow-lg">
              <Power className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-semibold text-[#000066] uppercase tracking-widest mb-4">Power</p>
            <div className="flex flex-col items-center gap-4">
              <p className={`text-2xl font-bold ${deviceState.powerOn ? 'text-green-600' : 'text-red-600'}`}>
                {deviceState.powerOn ? 'ON' : 'OFF'}
              </p>
              <button 
                onClick={onTogglePower}
                className={`relative inline-flex h-10 w-16 items-center rounded-full transition-colors focus:outline-none ${deviceState.powerOn ? 'bg-green-500' : 'bg-zinc-300'}`}
              >
                <span className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-md transition-transform ${deviceState.powerOn ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Baseline Section */}
          <div className="relative pt-10 pb-8 px-6 bg-[#d9e6ff] rounded-[32px] shadow-sm flex flex-col items-center text-center">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#000066] rounded-full flex items-center justify-center shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-semibold text-[#000066] uppercase tracking-widest mb-4">Baseline</p>
            <p className={`text-2xl font-bold ${deviceState.baselineSet ? 'text-green-600' : 'text-red-600'}`}>
              {deviceState.baselineSet ? 'SET' : 'NOT SET'}
            </p>
            <p className="mt-4 text-[10px] text-[#000066]/60 italic">
              Automatically updated by device
            </p>
          </div>
        </div>

        {/* Center Column: Human Diagram & Body Part Selection */}
        <div className="relative pt-10 pb-8 px-6 bg-[#d9e6ff] rounded-[32px] shadow-sm flex flex-col items-center text-center min-h-[450px]">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#000066] rounded-full flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm font-semibold text-[#000066] uppercase tracking-widest mb-6">Body Part</p>
          
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            <HumanOutline selectedPart={selectedPart} className="w-40 h-56 text-[#000066]/20" />
            
            <div className="mt-8 w-full max-w-[200px]">
              <div className="relative">
                <select 
                  value={selectedPart}
                  onChange={(e) => setSelectedPart(e.target.value)}
                  className="w-full appearance-none bg-white/50 border border-[#000066]/10 rounded-2xl px-4 py-3 pr-10 text-[#000066] font-bold focus:outline-none focus:ring-2 focus:ring-[#000066]/10 transition-all cursor-pointer text-sm"
                >
                  {bodyParts.map(part => (
                    <option key={part.id} value={part.id}>{part.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#000066]/40 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Battery & Bluetooth */}
        <div className="space-y-8">
          {/* Battery Section */}
          <div className="relative pt-10 pb-8 px-6 bg-[#d9e6ff] rounded-[32px] shadow-sm flex flex-col items-center text-center">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#000066] rounded-full flex items-center justify-center shadow-lg">
              <Battery className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-semibold text-[#000066] uppercase tracking-widest mb-4">Battery</p>
            <div className="flex flex-col items-center gap-2">
              <p className="text-4xl font-black text-[#000066]">{Math.round(deviceState.batteryLevel)}%</p>
              <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden mt-2 max-w-[100px]">
                <div 
                  className="h-full bg-[#000066] transition-all duration-500" 
                  style={{ width: `${deviceState.batteryLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bluetooth Section */}
          <button 
            onClick={() => {
              if (deviceState.connected) onDisconnect();
              else onConnect();
            }}
            className="group relative pt-10 pb-8 px-6 bg-[#d9e6ff] rounded-[32px] shadow-sm flex flex-col items-center text-center w-full transition-all hover:shadow-md active:scale-[0.98]"
          >
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors ${deviceState.connected ? 'bg-blue-500' : 'bg-[#000066]'}`}>
              <Bluetooth className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-semibold text-[#000066] uppercase tracking-widest mb-4">Bluetooth</p>
            <p className={`text-lg font-bold truncate w-full px-2 ${deviceState.connected ? 'text-blue-600' : 'text-[#000066]/40'}`}>
              {deviceState.connected ? deviceState.deviceName : 'Disconnected'}
            </p>
            <p className="mt-4 text-[10px] font-bold text-[#000066]/60 uppercase tracking-tighter">
              {deviceState.connected ? 'Click to disconnect' : 'Click to connect'}
            </p>
          </button>
        </div>
      </div>

      {/* Virtual Cursor Demo Area - Styled to match */}
      <div className="p-10 bg-[#000066] rounded-[40px] shadow-2xl relative overflow-hidden min-h-[250px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="text-center z-10">
          <p className="text-blue-200/40 text-[10px] font-mono uppercase tracking-[0.4em] mb-6">Spatial Movement Translation</p>
          <div className="flex items-center justify-center gap-12">
            <div className="text-left">
              <p className="text-blue-300/30 text-[9px] uppercase font-bold tracking-widest">X-Axis</p>
              <p className="text-white font-mono text-3xl font-light">{deviceState.movement.x.toFixed(2)}</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-left">
              <p className="text-blue-300/30 text-[9px] uppercase font-bold tracking-widest">Y-Axis</p>
              <p className="text-white font-mono text-3xl font-light">{deviceState.movement.y.toFixed(2)}</p>
            </div>
          </div>
          <p className="mt-8 text-[10px] text-blue-200/30 max-w-[250px] mx-auto leading-relaxed">
            * Real-time spatial data is translated into 2D coordinates for virtual cursor control.
          </p>
        </div>
        
        {/* The "Cursor" */}
        <motion.div 
          animate={{ 
            x: deviceState.movement.x, 
            y: deviceState.movement.y 
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="absolute w-6 h-6 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] border-2 border-blue-200 pointer-events-none"
        />
      </div>
    </div>
  );
};
