import React, { useRef, useEffect } from "react";
import { GoogleMap, Polyline, Marker, useJsApiLoader } from "@react-google-maps/api";
import carIconUrl from "../assets/car.png";
import { RoutePoint } from "../App";

export type VehicleRoute = {
  date: string;
  points: RoutePoint[];
};

type MapViewProps = {
  route: RoutePoint[];
  currentIdx: number;
  vehicleName: string;
  showNumbers?: boolean;
  onCarClick?: () => void;
};

const containerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "12px",
  overflow: "hidden",
};

const defaultCenter = { lat: 17.385044, lng: 78.486671 };

const MapView: React.FC<MapViewProps> = ({
  route,
  currentIdx,
  vehicleName,
  showNumbers = false,
  onCarClick,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && route.length > 0) {
      const pos = {
        lat: route[currentIdx].latitude,
        lng: route[currentIdx].longitude,
      };
      mapRef.current.panTo(pos);
    }
  }, [currentIdx, route]);

  if (!isLoaded) return <div className="h-96 flex items-center justify-center">Loading Map...</div>;

  const path = route.map((p) => ({ lat: p.latitude, lng: p.longitude }));
  const currentPos = path[currentIdx] || defaultCenter;

  return (
    <div>
      {/* Debug: Show car icon image */}
      <div style={{textAlign: 'center', marginBottom: 8}}>
        <img src={carIconUrl} alt="car" width={40} height={40} />
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPos}
        zoom={16}
        onLoad={(map) => { mapRef.current = map; }}
        options={{
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {path.length > 0 && (
          <>
            <Polyline
              path={path}
              options={{
                strokeColor: "#1976d2",
                strokeOpacity: 0.8,
                strokeWeight: 5,
                icons: [
                  {
                    icon: {
                      path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    },
                    offset: "100%",
                    repeat: "50px",
                  },
                ],
              }}
            />
            {showNumbers &&
              path.map((pos, idx) => (
                <Marker
                  key={idx}
                  position={pos}
                  label={{
                    text: (idx + 1).toString(),
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: "#1976d2",
                    fillOpacity: 1,
                    strokeWeight: 0,
                  }}
                  zIndex={1}
                />
              ))}
            <Marker
              position={currentPos}
              icon={{
                url: carIconUrl,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              zIndex={2}
              onClick={onCarClick}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapView; 