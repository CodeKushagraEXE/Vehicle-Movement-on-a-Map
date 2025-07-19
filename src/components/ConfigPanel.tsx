import React, { useState } from "react";

export type VehicleOption = { id: string; name: string };
export type DateOption = { id: string; label: string };

type ConfigPanelProps = {
  vehicleOptions: VehicleOption[];
  dateOptions: DateOption[];
  selectedVehicle: string;
  selectedDate: string;
  onShow: (vehicleId: string, dateId: string) => void;
};

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  vehicleOptions,
  dateOptions,
  selectedVehicle,
  selectedDate,
  onShow,
}) => {
  const [vehicle, setVehicle] = useState(selectedVehicle);
  const [date, setDate] = useState(selectedDate);

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-2 shadow">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <select
          className="border rounded px-2 py-1"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        >
          {vehicleOptions.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <select
          className="border rounded px-2 py-1"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        >
          {dateOptions.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => onShow(vehicle, date)}
      >
        SHOW
      </button>
    </div>
  );
};

export default ConfigPanel; 