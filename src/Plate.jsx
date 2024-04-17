import { useRef } from "react";
import PlateProvider from "./PlateProvider";
import PlateControls from "./PlateControls";
import PlatePreview from "./PlatePreview";
import PrintControls from "./PrintControls";

export default function Plate({ type }) {
  const containerRef = useRef(null);

  return (
    <PlateProvider type={type}>
      <div className="w-full bg-gray-900 text-zinc-200 p-4">
        <fieldset>
          <legend>{type === "front" ? "Front-Plate" : "Rear-Plate"}</legend>
          <div className="grid grid-cols-[25%_auto_15%] gap-4">
            <PlateControls />

            <PlatePreview ref={containerRef} />

            <PrintControls printElementRef={containerRef} />
          </div>
        </fieldset>
      </div>
    </PlateProvider>
  );
}
