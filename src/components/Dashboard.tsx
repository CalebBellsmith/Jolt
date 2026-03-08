import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bluetooth, Battery, Power, Target, ChevronDown, User, Compass, SlidersHorizontal } from 'lucide-react';
import { HumanOutline } from './HumanOutline';
import { BluetoothDeviceState } from '../hooks/useBluetooth';
import { Logo } from './Logo';

interface DashboardProps {
  deviceState: BluetoothDeviceState;
  onTogglePower: () => void;
  onConnect: () => void;
  onDisconnect: () => void;
  onTriggerClick?: () => void;
  onSetSensitivity?: (value: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  deviceState,
  onTogglePower,
  onConnect,
  onDisconnect,
  onTriggerClick,
  onSetSensitivity,
}) => {
  const [selectedPart, setSelectedPart] = useState('bicep');
  const [sensitivity, setSensitivity] = useState(5);

  const bodyParts = [
    { id: 'default', label: 'Select as default' },
    { id: 'bicep',   label: 'Bicep' },
    { id: 'forearm', label: 'Forearm' },
    { id: 'calf',    label: 'Calf' },
    { id: 'thigh',   label: 'Thigh' },
  ];

  const dotX = Math.max(-80, Math.min(80, deviceState.imu.roll  * 1.5));
  const dotY = Math.max(-80, Math.min(80, deviceState.imu.pitch * 1.5));

  const handleSensitivityChange = (val: number) => {
    setSensitivity(val);
    onSetSensitivity?.(val);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

        {/* Left Column: Power & Baseline */}
        <div className="space-y-8">
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

          <div className="relative pt-10 pb-8 px-6 bg-[#d9e6ff] rounded-[32px] shadow-sm flex flex-col items-center text-center">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#000066] rounded-full flex items-center justify-center shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-semibold text-[#000066] uppercase tracking-widest mb-4">Baseline</p>
            <p className={`text-2xl font-bold ${deviceState.baselineSet || deviceState.powerOn ? 'text-green-600' : 'text-red-600'}`}>
              {deviceState.baselineSet ? 'SET' : deviceState.powerOn ? 'LOCKED' : 'NOT SET'}
            </p>
            <p className="mt-4 text-[10px] text-[#000066]/60 italic">
              Double click device button to zero IMU
            </p>
          </div>
        </div>

        {/* Center Column: Human Diagram */}
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

          <button
            onClick={() => { if (deviceState.connected) onDisconnect(); else onConnect(); }}
            className="group relative pt-10 pb-8 px-6 bg-[#d9e6ff] rounded-[32px] shadow-sm flex flex-col items-center text-center w-full transition-all hover:shadow-md active:scale-[0.98]"
          >
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors ${deviceState.powerOn ? 'bg-blue-500' : 'bg-[#000066]'}`}>
              <Bluetooth className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm font-semibold text-[#000066] uppercase tracking-widest mb-4">Bluetooth</p>
            <p className={`text-lg font-bold truncate w-full px-2 ${deviceState.powerOn ? 'text-blue-600' : 'text-[#000066]/40'}`}>
              {deviceState.powerOn ? 'JOLT' : 'Disconnected'}
            </p>
            <p className="mt-4 text-[10px] font-bold text-[#000066]/60 uppercase tracking-tighter">
              {deviceState.powerOn ? 'Connected' : 'Click to connect'}
            </p>
          </button>
        </div>
      </div>

    {/* IMU Live Data Panel */}
<div className="p-8 bg-[#000066] rounded-[40px] shadow-2xl relative overflow-hidden">
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
  </div>
  <div className="relative z-10 space-y-6">
    <div className="flex items-center gap-3">
      <Compass className="w-5 h-5 text-blue-300" />
      <p className="text-blue-200/60 text-[10px] font-mono uppercase tracking-[0.4em]">Live Position</p>
      <div className={`ml-auto px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${deviceState.connected ? 'bg-green-500 text-white' : 'bg-white/10 text-white/40'}`}>
        {deviceState.connected ? 'Live' : 'Offline'}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-6">
      {[
        { label: 'X', value: deviceState.imu.roll,  color: 'text-blue-300' },
        { label: 'Y', value: deviceState.imu.pitch, color: 'text-purple-300' },
      ].map(({ label, value, color }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <p className={`text-[9px] uppercase font-bold tracking-widest ${color} opacity-60`}>{label}</p>
          <p className={`font-mono text-3xl font-light ${color}`}>
            {value.toFixed(1)}°
          </p>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-100 ${color.replace('text-', 'bg-')}`}
              style={{
                width: `${Math.min(100, Math.abs(value) / 90 * 100)}%`,
                marginLeft: value < 0 ? 'auto' : undefined,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Sensitivity Panel */}
      <div className="p-8 bg-[#000066] rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-5 h-5 text-blue-300" />
            <p className="text-blue-200/60 text-[10px] font-mono uppercase tracking-[0.4em]">Cursor Sensitivity</p>
            <div className={`ml-auto px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${deviceState.connected ? 'bg-green-500 text-white' : 'bg-white/10 text-white/40'}`}>
              {deviceState.connected ? 'Active' : 'Offline'}
            </div>
          </div>
          <div className="flex flex-col items-center gap-6">
            <p className="text-white font-mono text-5xl font-light">{sensitivity}<span className="text-white/30 text-2xl ml-1">/ 10</span></p>
            <div className="w-full flex items-center gap-4">
              <span className="text-white/30 text-[10px] font-mono uppercase">Low</span>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={sensitivity}
                onChange={(e) => handleSensitivityChange(Number(e.target.value))}
                disabled={!deviceState.powerOn}
                className="flex-1 h-2 appearance-none rounded-full cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(to right, #3b82f6 ${(sensitivity - 1) / 9 * 100}%, rgba(255,255,255,0.1) ${(sensitivity - 1) / 9 * 100}%)`,
                }}
              />
              <span className="text-white/30 text-[10px] font-mono uppercase">High</span>
            </div>
            <p className="text-[10px] text-blue-200/30 italic">
              Sends value to ESP32 over BLE — scale your IMU multiplier on the device side
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
