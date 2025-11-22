"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface CustomMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  markerTitle?: string;
  mapUrl?: string;
}

/**
 * Custom Map Component using Leaflet
 *
 * Fully customizable map with dark theme styling to match brand design.
 */
export function CustomMap({
  lat,
  lng,
  zoom = 17,
  height = "420px",
  markerTitle = "Офис Uralliance",
  mapUrl
}: CustomMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: zoom,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false, // Disable attribution
    });

    mapRef.current = map;

    // Add dark themed tile layer (CartoDB Dark Matter)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="custom-marker-wrapper">
          <div class="custom-marker-pin"></div>
          <div class="custom-marker-pulse"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -45], // Popup appears 45px above the marker
    });

    // Add marker
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

    // Open Yandex Maps on marker click
    if (mapUrl) {
      marker.on('click', () => {
        window.open(mapUrl, '_blank', 'noopener,noreferrer');
      });

      // Add cursor pointer style
      marker.getElement()?.classList.add('cursor-pointer');
    }

    if (markerTitle) {
      marker.bindPopup(
        `<div class="custom-popup">
          <strong>${markerTitle}</strong>
        </div>`,
        {
          closeButton: false,
          autoClose: false,
          closeOnClick: false,
        }
      ).openPopup();
    }

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, zoom, markerTitle]);

  return (
    <>
      <div
        ref={containerRef}
        style={{ height, width: '100%' }}
        className="rounded-[inherit] overflow-hidden"
      />
      <style jsx global>{`
        /* Custom marker styles */
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }

        .cursor-pointer {
          cursor: pointer !important;
        }

        .custom-marker-wrapper {
          position: relative;
          width: 40px;
          height: 40px;
        }

        .custom-marker-pin {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, var(--color-legal-primary), var(--color-tech-primary));
          border-radius: 50% 50% 50% 0;
          transform: translateX(-50%) rotate(-45deg);
          border: 3px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        }

        .custom-marker-pin::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        }

        .custom-marker-pulse {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 24px;
          background: var(--color-tech-primary);
          border-radius: 50%;
          opacity: 0;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 0.6;
          }
          100% {
            transform: translateX(-50%) scale(2.5);
            opacity: 0;
          }
        }

        /* Custom popup styles */
        .leaflet-popup-content-wrapper {
          background: var(--color-card-bg) !important;
          border: 1px solid var(--color-border-soft) !important;
          border-radius: 12px !important;
          padding: 8px 12px !important;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4) !important;
        }

        .leaflet-popup-content {
          margin: 0 !important;
          color: var(--color-text-primary) !important;
          font-family: var(--font-sans) !important;
        }

        .custom-popup strong {
          font-weight: 600;
          background: linear-gradient(135deg, var(--color-legal-primary), var(--color-tech-primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .leaflet-popup-tip {
          background: var(--color-card-bg) !important;
          border: 1px solid var(--color-border-soft) !important;
        }

        /* Zoom controls styling */
        .leaflet-control-zoom {
          border: 1px solid var(--color-border-soft) !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
        }

        .leaflet-control-zoom a {
          background: var(--color-card-bg) !important;
          color: var(--color-text-primary) !important;
          border: none !important;
          border-bottom: 1px solid var(--color-border-soft) !important;
          transition: all 0.2s ease !important;
        }

        .leaflet-control-zoom a:last-child {
          border-bottom: none !important;
        }

        .leaflet-control-zoom a:hover {
          background: var(--color-background-secondary) !important;
          color: var(--color-tech-primary) !important;
        }
      `}</style>
    </>
  );
}
