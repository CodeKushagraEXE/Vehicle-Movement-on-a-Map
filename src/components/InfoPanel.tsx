import React from "react";
import { VehicleData, RoutePoint } from "../App";

type InfoPanelProps = {
  open: boolean;
  onClose: () => void;
  vehicle?: VehicleData;
  currentIdx: number;
  route: RoutePoint[];
};

const InfoPanel: React.FC<InfoPanelProps> = ({
  open,
  onClose,
  vehicle,
  currentIdx,
  route,
}) => {
  if (!open || !vehicle) return null;
  const current = route[currentIdx];

  return (
    <div className="fixed top-28 right-8 z-50 bg-white rounded-xl shadow-2xl p-6 w-80 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-lg">{vehicle.name}</div>
        <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">×</button>
      </div>
      <div className="text-xs text-gray-500 mb-2">
        <span className="font-semibold">Battery:</span> {vehicle.battery}%
      </div>
      <div className="mb-2">
        <span className="font-semibold">Speed:</span> {vehicle.stats.speed} km/h
      </div>
      <div className="mb-2">
        <span className="font-semibold">Total Distance:</span> {vehicle.stats.totalDistance} km
      </div>
      <div className="mb-2">
        <span className="font-semibold">Distance from Last Stop:</span> {vehicle.stats.lastStopDistance} km
      </div>
      <div className="mb-2">
        <span className="font-semibold">Status:</span> {vehicle.stats.status}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Current Coordinate:</span>{" "}
        {current
          ? `${current.latitude.toFixed(6)}, ${current.longitude.toFixed(6)}`
          : "--"}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Timestamp:</span>{" "}
        {current ? new Date(current.timestamp).toLocaleString() : "--"}
      </div>
    </div>
  );
};

export default InfoPanel; 