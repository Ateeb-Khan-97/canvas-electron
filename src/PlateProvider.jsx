import { createContext, useContext, useState } from 'react';

const PlateContext = createContext(null);

export function usePlate() {
  return useContext(PlateContext);
}

export default function PlateProvider({ type, children }) {
  const [plateSize, setPlateSize] = useState({ width: 520, height: 110 });
  const [isBorderEnabled, setIsBorderEnabled] = useState(true);
  const [borderWidth, setBorderWidth] = useState(5);
  const [borderMargin, setBorderMargin] = useState(10);
  const [isBadgeEnabled, setIsBadgeEnabled] = useState(false);
  const [bsau, setBsau] = useState('ITP BSAU 145e');
  const [isBsauOnBorder, setIsBsauOnBorder] = useState(false);
  const [isBsauPrePrinted, setIsBsauPrePrinted] = useState(false);

  return (
    <PlateContext.Provider value={{
      type,
      plateSize,
      setPlateSize,
      isBorderEnabled,
      setIsBorderEnabled,
      borderWidth,
      setBorderWidth,
      borderMargin,
      setBorderMargin,
      isBadgeEnabled,
      setIsBadgeEnabled,
      bsau,
      setBsau,
      isBsauOnBorder,
      setIsBsauOnBorder,
      isBsauPrePrinted,
      setIsBsauPrePrinted,    
    }}>
      {children}
    </PlateContext.Provider>
  )
}
