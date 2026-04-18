"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryCodeToNumeric: Record<string, string> = {
  IN: "356",
  TH: "764",
  VN: "704",
  UZ: "860",
  TJ: "762",
  TR: "792",
  TW: "158",
  KH: "116",
  MY: "458",
  JP: "392",
};

type Props = {
  countryCode: string;
  coordinates: { lat: number; lng: number };
};

export default function MiniMap({ countryCode, coordinates }: Props) {
  const numericId = countryCodeToNumeric[countryCode];

  return (
    <div style={{ width: "840px", opacity: 0.7 }}>
      <ComposableMap
        projectionConfig={{
          scale: getScale(countryCode),
          center: [coordinates.lng, coordinates.lat],
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isTarget = geo.id === numericId;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: isTarget ? "#d4d4d4" : "none",
                      stroke: isTarget ? "#aaaaaa" : "none",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
        <Marker coordinates={[coordinates.lng, coordinates.lat]}>
          <circle r={3} fill="#171717" />
        </Marker>
      </ComposableMap>
    </div>
  );
}

function getScale(countryCode: string): number {
  const scales: Record<string, number> = {
    IN: 400,
    TH: 800,
    VN: 800,
    UZ: 600,
    TJ: 1200,
    TR: 600,
    TW: 2000,
    KH: 1200,
    MY: 800,
    JP: 600,
  };
  return scales[countryCode] || 600;
}