import React, { useEffect, useState, useRef, useMemo } from "react";
import MapView, { VehicleRoute } from "./components/MapView";
import Controls from "./components/Controls";
import InfoPanel from "./components/InfoPanel";
import ConfigPanel, { VehicleOption, DateOption } from "./components/ConfigPanel";
import dummyRoutes from "./dummy-route.json";

export type RoutePoint = {
  latitude: number;
  longitude: number;
  timestamp: string;
};

export type VehicleData = {
  id: string;
  name: string;
  battery: number;
  stats: {
    speed: number;
    totalDistance: number;
    lastStopDistance: number;
    status: string;
  };
  routes: VehicleRoute[];
};

const vehicleOptions: VehicleOption[] = [
  { id: "v1", name: "WIRELESS" },
  { id: "v2", name: "TRUCK-1" },
];

const dateOptions: DateOption[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
];

const mockVehicleData: VehicleData[] = [
  {
    id: "v1",
    name: "WIRELESS",
    battery: 16,
    stats: {
      speed: 0,
      totalDistance: 834.89,
      lastStopDistance: 0,
      status: "STOPPED",
    },
    routes: [
      {
        date: "today",
        points: dummyRoutes,
      },
    ],
  },
  {
    id: "v2",
    name: "TRUCK-1",
    battery: 80,
    stats: {
      speed: 45,
      totalDistance: 120.5,
      lastStopDistance: 2.3,
      status: "RUNNING",
    },
    routes: [
      {
        date: "today",
        points: dummyRoutes.slice().reverse(),
      },
      {
        date: "yesterday",
        points: dummyRoutes,
      },
    ],
  },
];

const App: React.FC = () => {
  // Config panel state
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleOptions[0].id);
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].id);

  // Route and playback state
  const [route, setRoute] = useState<RoutePoint[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Info panel state
  const [infoOpen, setInfoOpen] = useState(false);

  // Get filtered vehicle and route
  const vehicle = useMemo(
    () => mockVehicleData.find((v) => v.id === selectedVehicle),
    [selectedVehicle]
  );
  const filteredRoute = useMemo(() => {
    const r = vehicle?.routes.find((r) => r.date === selectedDate);
    return r ? r.points : [];
  }, [vehicle, selectedDate]);

  // Update route when config changes
  useEffect(() => {
    setRoute(filteredRoute);
    setCurrentIdx(0);
    setPlaying(false);
  }, [filteredRoute]);

  // Playback effect
  useEffect(() => {
    if (!playing || route.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIdx((idx) => {
        if (idx < route.length - 1) return idx + 1;
        setPlaying(false);
        return idx;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [playing, route]);

  // Handlers
  const handlePlay = () => setPlaying(true);
  const handlePause = () => setPlaying(false);
  const handleReset = () => {
    setPlaying(false);
    setCurrentIdx(0);
  };
  const handleSlider = (val: number) => {
    setCurrentIdx(val);
    setPlaying(false);
  };

  // Config panel handlers
  const handleConfigShow = (vehicleId: string, dateId: string) => {
    setSelectedVehicle(vehicleId);
    setSelectedDate(dateId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-2">
      <h1 className="text-2xl font-bold mb-2 text-center">Vehicle Movement on a Map</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4 relative">
        <MapView
          route={route}
          currentIdx={currentIdx}
          vehicleName={vehicle?.name || ""}
          showNumbers
        />
        <div className="flex flex-col gap-2">
          <Controls
            playing={playing}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            isAtEnd={currentIdx >= route.length - 1}
            sliderValue={currentIdx}
            sliderMax={route.length > 0 ? route.length - 1 : 0}
            onSliderChange={handleSlider}
          />
          <ConfigPanel
            vehicleOptions={vehicleOptions}
            dateOptions={dateOptions}
            selectedVehicle={selectedVehicle}
            selectedDate={selectedDate}
            onShow={handleConfigShow}
          />
        </div>
        <button
          className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition"
          onClick={() => setInfoOpen((v) => !v)}
        >
          ℹ️
        </button>
        <InfoPanel
          open={infoOpen}
          onClose={() => setInfoOpen(false)}
          vehicle={vehicle}
          currentIdx={currentIdx}
          route={route}
        />
      </div>
      <footer className="mt-4 text-xs text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Vehicle Movement on a Map
      </footer>
    </div>
  );
};

export default App; 