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
  { id: "v1", name: "CAR-1" },
  { id: "v2", name: "TRUCK-1" },
];

const dateOptions: DateOption[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
];

const mockVehicleData: VehicleData[] = [
  {
    id: "v1",
    name: "CAR-1",
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
      {
        date: "yesterday",
        points: dummyRoutes.map((p, i) => ({
          ...p,
          latitude: p.latitude + 0.01,
          longitude: p.longitude + 0.01,
          timestamp: new Date(new Date(p.timestamp).getTime() + i * 5000).toISOString()
        })),
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
        points: dummyRoutes.map((p, i) => ({
          ...p,
          latitude: p.latitude - 0.01,
          longitude: p.longitude - 0.01,
          timestamp: new Date(new Date(p.timestamp).getTime() + i * 3000).toISOString()
        })),
      },
      {
        date: "yesterday",
        points: dummyRoutes.slice(0, 8).map((p, i) => ({
          ...p,
          latitude: p.latitude + 0.02,
          longitude: p.longitude - 0.02,
          timestamp: new Date(new Date(p.timestamp).getTime() + i * 4000).toISOString()
        })),
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

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
    console.log("SHOW clicked:", vehicleId, dateId);
    setSelectedVehicle(vehicleId);
    setSelectedDate(dateId);
  };

  // Calculate dynamic stats based on currentIdx and route
  const current = route[currentIdx];
  const prev = route[currentIdx - 1] || current;

  // Calculate speed (m/s to km/h), distance, etc.
  function haversine(a: RoutePoint, b: RoutePoint) {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371e3;
    const φ1 = toRad(a.latitude);
    const φ2 = toRad(b.latitude);
    const Δφ = toRad(b.latitude - a.latitude);
    const Δλ = toRad(b.longitude - a.longitude);
    const d =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(d), Math.sqrt(1 - d));
    return R * c; // meters
  }

  // Speed (km/h)
  let speed = 0;
  if (currentIdx > 0) {
    const dist = haversine(prev, current); // meters
    const t1 = new Date(prev.timestamp).getTime();
    const t2 = new Date(current.timestamp).getTime();
    const dt = (t2 - t1) / 1000; // seconds
    if (dt > 0) speed = (dist / dt) * 3.6; // m/s to km/h
  }

  // Total distance (sum of all segments up to currentIdx, in km)
  let totalDistance = 0;
  for (let i = 1; i <= currentIdx; i++) {
    totalDistance += haversine(route[i - 1], route[i]);
  }
  totalDistance = totalDistance / 1000;

  // Distance from last stop (for demo, use last segment in km)
  let lastStopDistance = 0;
  if (currentIdx > 0) lastStopDistance = haversine(prev, current) / 1000;

  // Status (RUNNING if moving, STOPPED if speed < 1 km/h)
  const status = speed > 1 ? "RUNNING" : "STOPPED";

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-2 transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'}`}>
      <div className="text-center mb-4">
        <h1 className={`text-3xl font-bold mb-1 transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent' : 'text-slate-800 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'}`}>
          Vehicle Movement on a Map
        </h1>
        <p className={`text-xs transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
          Real-time vehicle tracking and route simulation
        </p>
      </div>
      <div className={`w-full max-w-4xl rounded-xl shadow-xl p-4 flex flex-col gap-4 relative transition-all duration-500 backdrop-blur-sm ${darkMode ? 'bg-gray-800/90 text-white border border-gray-700' : 'bg-white/95 text-black border border-slate-200 shadow-lg'}`}>
        <MapView
          route={route}
          currentIdx={currentIdx}
          vehicleName={vehicle?.name || ""}
          showNumbers
          onCarClick={() => setInfoOpen(true)}
        />
        <div className="flex flex-col gap-4">
          <Controls
            playing={playing}
            onPlay={handlePlay}
            onPause={handlePause}
            onReset={handleReset}
            isAtEnd={currentIdx >= route.length - 1}
            sliderValue={currentIdx}
            sliderMax={route.length > 0 ? route.length - 1 : 0}
            onSliderChange={handleSlider}
            darkMode={darkMode}
          />
          <ConfigPanel
            vehicleOptions={vehicleOptions}
            dateOptions={dateOptions}
            selectedVehicle={selectedVehicle}
            selectedDate={selectedDate}
            onShow={handleConfigShow}
            darkMode={darkMode}
          />
        </div>
        <button
          className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full p-2.5 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 z-50 backdrop-blur-sm"
          onClick={() => setInfoOpen((v) => !v)}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          className="absolute top-3 right-14 z-50 p-1"
          onClick={() => setDarkMode(!darkMode)}
        >
          <div className={`relative w-12 h-6 rounded-full transition-all duration-500 ease-in-out cursor-pointer shadow-md ${darkMode ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-slate-200 to-slate-300'}`}>
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-500 ease-in-out transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}>
              {darkMode ? (
                <svg className="w-3 h-3 text-yellow-500 mt-1 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-slate-600 mt-1 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </div>
          </div>
        </button>
        <InfoPanel
          open={infoOpen}
          onClose={() => setInfoOpen(false)}
          vehicle={vehicle && {
            id: vehicle.id,
            name: vehicle.name,
            battery: vehicle.battery,
            routes: vehicle.routes,
            stats: {
              ...vehicle.stats,
              speed: Math.round(speed),
              totalDistance: Number(totalDistance.toFixed(2)),
              lastStopDistance: Number(lastStopDistance.toFixed(2)),
              status,
            },
          }}
          currentIdx={currentIdx}
          route={route}
          darkMode={darkMode}
        />
      </div>
      <footer className={`mt-4 text-xs text-center transition-all duration-300 ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
        &copy; {new Date().getFullYear()} Vehicle Movement on a Map
      </footer>
    </div>
  );
};

export default App; 