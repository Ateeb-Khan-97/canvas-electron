import { useId, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { usePlate } from "./PlateProvider";

export default function PrintControls({ printElementRef }) {
  const plate = usePlate();
  const [isPrintPair, setIsPrintPair] = useState(false);
  const id = useId();

  const handlePrint = useReactToPrint({
    content: () => {
      let printElem = document.createElement("div");
      // const borderDiv = document.createElement("div");
      // borderDiv.style["border"] = `2px solid black`;
      // borderDiv.style["padding"] = "5px";
      // borderDiv.style["height"] = `100%`;
      // borderDiv.style["width"] = `100%`;
      // borderDiv.style["borderRadius"] = "8mm";

      const height = plate.plateSize.height;
      const width = plate.plateSize.width;

      printElem.classList.add(
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "w-full",
        "h-full"
      );

      // if print pair
      if (isPrintPair) {
        const containerFront = document
          .getElementById("container-front")
          .cloneNode(true).firstElementChild.firstElementChild;
        containerFront.style["width"] = `100%`;
        containerFront.style["height"] = `100%`;
        containerFront.style["scale"] = 0.97;
        //
        const firstSection = document.createElement("section");
        firstSection.classList.add("flex", "items-center", "justify-center");
        firstSection.style["width"] = `${width}mm`;
        firstSection.style["height"] = `${height}mm`;
        firstSection.style["padding"] = `10px`;
        firstSection.style["position"] = "relative";

        // const borderFront = borderDiv.cloneNode(true);
        // borderFront.appendChild(containerFront);
        firstSection.appendChild(containerFront);
        printElem.appendChild(firstSection);
        //
        //
        const containerRear = document
          .getElementById("container-rear")
          .cloneNode(true).firstElementChild.firstElementChild;
        containerRear.style["width"] = `100%`;
        containerRear.style["height"] = `100%`;
        containerRear.style["scale"] = 0.97;
        //
        const secondSection = document.createElement("section");
        secondSection.classList.add("flex", "items-center", "justify-center");
        secondSection.style["width"] = `${width}mm`;
        secondSection.style["height"] = `${height}mm`;
        secondSection.style["padding"] = `10px`;
        secondSection.style["position"] = "relative";
        secondSection.style["backgroundColor"] = `rgb(234, 179, 8)`;

        // const borderRear = borderDiv.cloneNode(true);
        // borderRear.appendChild(containerRear);
        secondSection.appendChild(containerRear);
        printElem.appendChild(secondSection);
        //
        return printElem;
      }

      const section = document.createElement("section");
      section.classList.add("flex", "items-center", "justify-center");
      section.style["width"] = `${width}mm`;
      section.style["height"] = `${height}mm`;
      section.style["padding"] = `5px`;
      section.style["position"] = "relative";

      const articleNode =
        printElementRef.current.cloneNode(true).firstElementChild
          .firstElementChild;
      articleNode.style["width"] = `100%`;
      articleNode.style["height"] = `100%`;
      articleNode.style["scale"] = 0.97;

      // borderDiv.appendChild(articleNode);
      // section.appendChild(borderDiv);
      section.appendChild(articleNode);
      printElem.appendChild(section);
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
