import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface Coordinate {
  lat: number;
  lng: number;
}

interface MapType {
  selectedCoordinat: Coordinate | null;
  setSelectedCoordinat: Dispatch<SetStateAction<Coordinate | null>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MapContext = createContext<MapType | null>(null);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCoordinat, setSelectedCoordinat] = useState<Coordinate | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <MapContext.Provider
      value={{ selectedCoordinat, setIsOpen, isOpen, setSelectedCoordinat }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapProvider = () => {
  const context = useContext(MapContext);
  if (!context) throw new Error("Context is not found!");
  return context;
};
