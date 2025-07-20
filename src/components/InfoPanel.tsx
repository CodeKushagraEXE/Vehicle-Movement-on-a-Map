import React from "react";
import { VehicleData, RoutePoint } from "../App";

type InfoPanelProps = {
  open: boolean;
  onClose: () => void;
  vehicle?: VehicleData;
  currentIdx: number;
  route: RoutePoint[];
  darkMode?: boolean;
};

const InfoPanel: React.FC<InfoPanelProps> = ({
  open,
  onClose,
  vehicle,
  currentIdx,
  route,
  darkMode = false,
}) => {
  if (!open || !vehicle) return null;
  const current = route[currentIdx];

  return (
    <div className={`fixed top-28 right-8 z-50 rounded-2xl shadow-2xl p-6 w-96 border transition-all duration-300 backdrop-blur-sm ${darkMode ? 'bg-gray-800/95 text-white border-gray-600' : 'bg-white/95 text-black border-gray-200'}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${vehicle.stats.status === 'RUNNING' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{vehicle.name}</div>
        </div>
        <button onClick={onClose} className={`hover:text-red-500 text-xl transition-all duration-300 hover:scale-110 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>×</button>
      </div>
      <div className={`text-sm mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
          <span className="font-semibold">Battery:</span> 
          <span className={`font-bold ${vehicle.battery < 20 ? 'text-red-500' : vehicle.battery < 50 ? 'text-yellow-500' : 'text-green-500'}`}>{vehicle.battery}%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Speed</span>
          </div>
          <div className="text-lg font-bold">{vehicle.stats.speed} km/h</div>
        </div>
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Status</span>
          </div>
          <div className={`text-lg font-bold ${vehicle.stats.status === 'RUNNING' ? 'text-green-500' : 'text-red-500'}`}>{vehicle.stats.status}</div>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} mb-4`}>
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Distance</span>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Total:</span>
            <span className="font-bold">{vehicle.stats.totalDistance} km</span>
          </div>
          <div className="flex justify-between">
            <span>From Last Stop:</span>
            <span className="font-bold">{vehicle.stats.lastStopDistance} km</span>
          </div>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Location</span>
        </div>
        <div className="space-y-1 text-sm">
          <div>
            <span className="font-medium">Coordinates:</span>
            <div className="font-mono text-xs mt-1">
              {current
                ? `${current.latitude.toFixed(6)}, ${current.longitude.toFixed(6)}`
                : "--"}
            </div>
          </div>
          <div>
            <span className="font-medium">Time:</span>
            <div className="text-xs mt-1">
              {current ? new Date(current.timestamp).toLocaleString() : "--"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel; 