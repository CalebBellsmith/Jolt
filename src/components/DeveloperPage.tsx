import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Database, User, Activity, Signal, ChevronRight, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

interface ProfileData {
  id: string;
  name: string;
  role: string;
  movementData: { time: string; x: number; y: number; z: number }[];
  receptionData: { time: string; strength: number }[];
}

const mockProfiles: ProfileData[] = [
  {
    id: '1',
    name: 'Bella Groten',
    role: 'Lead Researcher',
    movementData: [
      { time: '0s', x: 0.1, y: 0.2, z: 0.5 },
      { time: '1s', x: 0.3, y: 0.4, z: 0.6 },
      { time: '2s', x: 0.5, y: 0.1, z: 0.4 },
      { time: '3s', x: 0.2, y: 0.6, z: 0.8 },
      { time: '4s', x: 0.8, y: 0.3, z: 0.2 },
      { time: '5s', x: 0.4, y: 0.5, z: 0.7 },
    ],
    receptionData: [
      { time: '0s', strength: 85 },
      { time: '1s', strength: 82 },
      { time: '2s', strength: 88 },
      { time: '3s', strength: 90 },
      { time: '4s', strength: 84 },
      { time: '5s', strength: 87 },
    ]
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'Hardware Engineer',
    movementData: [
      { time: '0s', x: 0.5, y: 0.5, z: 0.5 },
      { time: '1s', x: 0.6, y: 0.6, z: 0.6 },
      { time: '2s', x: 0.4, y: 0.4, z: 0.4 },
      { time: '3s', x: 0.7, y: 0.7, z: 0.7 },
      { time: '4s', x: 0.3, y: 0.3, z: 0.3 },
      { time: '5s', x: 0.8, y: 0.8, z: 0.8 },
    ],
    receptionData: [
      { time: '0s', strength: 70 },
      { time: '1s', strength: 75 },
      { time: '2s', strength: 65 },
      { time: '3s', strength: 80 },
      { time: '4s', strength: 60 },
      { time: '5s', strength: 85 },
    ]
  }
];

export const DeveloperPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileData>(mockProfiles[0]);

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12 pb-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-[#000066] rounded-full text-white hover:scale-110 transition-all shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4">
            <Logo className="h-10" />
            <div className="w-px h-8 bg-[#000066]/10" />
            <div>
              <h2 className="text-2xl font-black text-[#000066] tracking-tight">Developer Portal</h2>
              <p className="text-[#000066]/40 font-mono text-[10px] tracking-widest uppercase">System Diagnostics</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#d9e6ff] rounded-2xl border border-[#000066]/5">
          <Database className="w-4 h-4 text-[#000066]" />
          <span className="text-xs font-bold text-[#000066] uppercase tracking-wider">Live Database</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Selection */}
        <div className="lg:col-span-1 space-y-4">
          <p className="text-xs font-bold text-[#000066]/40 uppercase tracking-widest px-2">Personal Profiles</p>
          <div className="space-y-2">
            {mockProfiles.map(profile => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile)}
                className={`w-full p-4 rounded-3xl flex items-center justify-between transition-all border ${
                  selectedProfile.id === profile.id 
                  ? 'bg-[#000066] text-white border-transparent shadow-xl' 
                  : 'bg-[#d9e6ff] text-[#000066] border-[#000066]/5 hover:bg-[#c5d8ff]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${selectedProfile.id === profile.id ? 'bg-white/10' : 'bg-[#000066]/5'}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm leading-tight">{profile.name}</p>
                    <p className={`text-[10px] uppercase tracking-tighter ${selectedProfile.id === profile.id ? 'text-white/60' : 'text-[#000066]/40'}`}>
                      {profile.role}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 ${selectedProfile.id === profile.id ? 'text-white/40' : 'text-[#000066]/20'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Data Visualization */}
        <div className="lg:col-span-3 space-y-8">
          {/* Movement Data */}
          <div className="bg-[#d9e6ff] rounded-[48px] p-8 shadow-sm border border-[#000066]/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#000066] rounded-2xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#000066]">Spatial Movement Data</h3>
                <p className="text-[10px] text-[#000066]/40 uppercase tracking-widest">X, Y, Z Axis Translation</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedProfile.movementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#000066" strokeOpacity={0.05} />
                  <XAxis dataKey="time" stroke="#000066" strokeOpacity={0.4} fontSize={10} />
                  <YAxis stroke="#000066" strokeOpacity={0.4} fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000066', borderRadius: '16px', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="x" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="y" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="z" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reception Data */}
          <div className="bg-[#d9e6ff] rounded-[48px] p-8 shadow-sm border border-[#000066]/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-[#000066] rounded-2xl">
                <Signal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#000066]">Signal Reception Strength</h3>
                <p className="text-[10px] text-[#000066]/40 uppercase tracking-widest">Bluetooth RSSI Stability</p>
              </div>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedProfile.receptionData}>
                  <defs>
                    <linearGradient id="colorStrength" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000066" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#000066" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#000066" strokeOpacity={0.05} />
                  <XAxis dataKey="time" stroke="#000066" strokeOpacity={0.4} fontSize={10} />
                  <YAxis stroke="#000066" strokeOpacity={0.4} fontSize={10} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000066', borderRadius: '16px', border: 'none', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="strength" stroke="#000066" fillOpacity={1} fill="url(#colorStrength)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
