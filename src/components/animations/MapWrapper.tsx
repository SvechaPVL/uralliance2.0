"use client";

import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with Leaflet
const CustomMap = dynamic(
  () => import("./CustomMap").then((mod) => mod.CustomMap),
  { ssr: false }
);

interface MapWrapperProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  markerTitle?: string;
  mapUrl?: string;
}

/**
 * Client-side wrapper for CustomMap
 *
 * Required to use dynamic imports with ssr: false in App Router
 */
export function MapWrapper(props: MapWrapperProps) {
  return <CustomMap {...props} />;
}
