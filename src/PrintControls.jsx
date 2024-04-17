import { useId, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { usePlate } from "./PlateProvider";

export default function PrintControls({ printElementRef }) {
  const plate = usePlate();
  const [isPrintPair, setIsPrintPair] = useState(false);
  const id = useId();

  const handlePrint = useReactToPrint({
    content: () => {
      const printElem = document.createElement("div");
      printElem.classList.add(
        "w-full",
        "h-full",
        "flex",
        "items-center",
        "justify-center",
        "flex-col"
      );

      if (isPrintPair) {
        const containerFront = document
          .getElementById("container-front")
          .cloneNode(true);
        const frontNestedDiv = containerFront.querySelector("div > div");
        frontNestedDiv.style.outline = "none";
        containerFront.classList.add("no-border");

        const containerRear = document
          .getElementById("container-rear")
          .cloneNode(true);
        const backNestedDiv = containerRear.querySelector("div > div");
        backNestedDiv.style.outline = "none";
        containerFront.classList.add("no-border");

        printElem.appendChild(containerFront);
        printElem.appendChild(containerRear);
        return printElem;
      }
      const clonedNode = printElementRef.current.cloneNode(true);
      const nestedDiv = clonedNode.querySelector("div > div");
      nestedDiv.style.outline = "none";

      clonedNode.classList.add("no-border");
      printElem.appendChild(clonedNode);
      return printElem;
    },
  });

  return (
    <fieldset>
      <legend>{plate.type === "front" ? "Print-Front" : "Print-Rear"}</legend>
      <button
        onClick={handlePrint}
        className="bg-zinc-700 py-2 px-6 rounded-md hover:bg-zinc-600 transition-colors"
      >
        Printer Setup
      </button>

      <div className="mt-4">
        <p>Width: {plate.plateSize.width} mm</p>
        <p>Height: {plate.plateSize.height} mm</p>
      </div>

      <label className="flex gap-2 mt-4 mb-0 w-max">
        <span>Print pair</span>
        <input
          type="checkbox"
          id={`${id}-${plate.type}-printpair`}
          checked={isPrintPair}
          onChange={() => setIsPrintPair((s) => !s)}
          className="w-auto"
        />
      </label>
    </fieldset>
  );
}
