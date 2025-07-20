import React, { useState, useEffect } from "react";

export type VehicleOption = { id: string; name: string };
export type DateOption = { id: string; label: string };

type ConfigPanelProps = {
  vehicleOptions: VehicleOption[];
  dateOptions: DateOption[];
  selectedVehicle: string;
  selectedDate: string;
  onShow: (vehicleId: string, dateId: string) => void;
  darkMode?: boolean;
};

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  vehicleOptions,
  dateOptions,
  selectedVehicle,
  selectedDate,
  onShow,
  darkMode = false,
}) => {
  const [vehicle, setVehicle] = useState(selectedVehicle);
  const [date, setDate] = useState(selectedDate);

  // Sync local state with props if parent changes
  useEffect(() => {
    setVehicle(selectedVehicle);
  }, [selectedVehicle]);
  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const handleShowRoute = () => {
    onShow(vehicle, date);
  };

  return (
    <div className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200'}`}>
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
            Vehicle
          </label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-sm'}`}
          >
            {vehicleOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className={`block text-sm font-medium mb-1 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
            Date
          </label>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-sm'}`}
          >
            {dateOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 flex items-end">
          <button
            onClick={handleShowRoute}
            className="w-full px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-emerald-400 hover:border-emerald-500 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel; 