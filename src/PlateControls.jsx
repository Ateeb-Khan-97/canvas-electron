import { useId, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { usePlate } from "./PlateProvider";

export default function PlateControls() {
  const [savedPlates, setSavedPlates] = useState([]);
  const plate = usePlate();

  const id = useId();

  const handleSizeChange = (e) => {
    const size = JSON.parse(e.target.value);
    plate.setPlateSize(size);
  };

  return (
    <fieldset>
      <legend>Plate</legend>
      <label htmlFor={`${id}-${plate.type}-size`}>Plate Size</label>
      <select
        id={`${id}-${plate.type}-size`}
        value={JSON.stringify(plate.plateSize)}
        onChange={handleSizeChange}
      >
        {plateSizes.map((size) => (
          <option key={size.value} value={size.value}>
            {size.text}
          </option>
        ))}
      </select>

      {/* <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="bg-zinc-700 p-2 px-4 rounded-md hover:bg-zinc-600 transition-colors mt-4">
            Options
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/10 animate-appear" />

          <Dialog.Content className="max-w-96 w-screen text-zinc-200 bg-zinc-800 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 border border-zinc-600 data-[state=open]:animate-popup"> */}
      <div className="flex flex-col gap-4">
        <fieldset>
          <legend>Border</legend>
          <label className="flex gap-2 mb-0 w-max">
            <span>Border</span>
            <input
              type="checkbox"
              id={`${id}-${plate.type}-border`}
              checked={plate.isBorderEnabled}
              onChange={() => plate.setIsBorderEnabled((s) => !s)}
              className="w-auto"
            />
          </label>
          <div className="flex justify-between gap-4 mt-4">
            <div>
              <label htmlFor={`${id}-${plate.type}-borderwidth`}>Width</label>
              <input
                type="number"
                id={`${id}-${plate.type}-borderwidth`}
                value={plate.borderWidth}
                onChange={(e) => plate.setBorderWidth(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`${id}-${plate.type}-bordermargin`}>Margin</label>
              <input
                type="number"
                id={`${id}-${plate.type}-bordermargin`}
                value={plate.borderMargin}
                onChange={(e) => plate.setBorderMargin(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <label className="flex gap-2 mb-0 w-max">
            <span>Badge</span>
            <input
              type="checkbox"
              checked={plate.isBadgeEnabled}
              onChange={() => plate.setIsBadgeEnabled((s) => !s)}
              className="w-auto"
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>BSAU</legend>
          <div className="max-w-56 w-full">
            <label htmlFor={`${id}-${plate.type}-bsau`}>BSAU</label>
            <input
              id={`${id}-${plate.type}-bsau`}
              value={plate.bsau}
              onChange={(e) => plate.setBsau(e.target.value)}
            />
          </div>
          <div className="flex gap-2 justify-between">
            <label className="flex gap-2 mt-4 mb-0 w-max">
              <span>On border</span>
              <input
                type="checkbox"
                id={`${id}-${plate.type}-bsau-border`}
                checked={plate.isBsauOnBorder}
                onChange={() => plate.setIsBsauOnBorder((s) => !s)}
                className="w-auto"
              />
            </label>
            <label className="flex gap-2 mt-4 mb-0 w-max">
              <span>Pre-printed</span>
              <input
                type="checkbox"
                id={`${id}-${plate.type}-preprinted`}
                checked={plate.isBsauPrePrinted}
                onChange={() => plate.setIsBsauPrePrinted((s) => !s)}
                className="w-auto"
              />
            </label>
          </div>
        </fieldset>
      </div>
      {/* </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root> */}

      <div className="flex gap-4">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="bg-zinc-700 p-2 px-4 rounded-md hover:bg-zinc-600 transition-colors mt-4">
              Save plate
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/10 animate-overlay" />
            <Dialog.Content className="max-w-96 w-screen text-zinc-200 bg-zinc-800 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8"></Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {/* <button
          onClick={() => {
            setSavedPlates((s) => ([
              ...s,
              {
                plateSize: plate.plateSize,
                border: plate.border,
                borderWidth: plate.borderWidth,
                borderMargin: plate.borderMargin,
                isBadgeEnabled: plate.isBadgeEnabled,
                bsau: plate.bsau,
                isBsauOnBorder: plate.isBsauOnBorder,
                isBsauPrePrinted: plate.isBsauPrePrinted,
              }
            ]))
          }}
          className="bg-zinc-700 p-2 px-4 rounded-md hover:bg-zinc-600 transition-colors mt-4">
          Save plate
        </button> */}

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="bg-zinc-700 p-2 px-4 rounded-md hover:bg-zinc-600 transition-colors mt-4">
              Open plate
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/10 animate-appear" />
            <Dialog.Content className="max-w-96 w-screen text-zinc-200 bg-zinc-800 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 data-[state=open]:animate-popup">
              <fieldset>
                <legend>Select a plate</legend>
                <select name="plate-selection" id="">
                  {savedPlates.map((plate, i) => (
                    <option key={i}>{plate.bsau}</option>
                  ))}
                </select>
              </fieldset>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </fieldset>
  );
}

const plateSizes = [
  { value: '{"width":520,"height":110}', text: "Std Oblong (520mm x 110mm)" },
  {
    value: '{"width":229,"height":178}',
    text: 'Motorbike (229mm x 178mm) (9" x 7")',
  },
  { value: '{"width":237,"height":178}', text: "Motorbike 2 (237mm x 178mm) " },
  { value: '{"width":388,"height":111}', text: "388mm x 111mm" },
  { value: '{"width":443,"height":111}', text: "443mm x 111mm" },
  { value: '{"width":518,"height":111}', text: "518mm x 111mm" },
  { value: '{"width":254,"height":76}', text: "254mm x 76mm" },
  { value: '{"width":305,"height":152}', text: "305mm x 152mm" },
  { value: '{"width":330,"height":152}', text: "330mm x 152mm" },
  { value: '{"width":330,"height":171}', text: "330mm x 171mm" },
  { value: '{"width":330,"height":178}', text: "330mm x 178mm" },
  { value: '{"width":330,"height":203}', text: "330mm x 203mm" },
  { value: '{"width":356,"height":178}', text: "356mm x 178mm" },
  { value: '{"width":406,"height":89}', text: "406mm x 89mm" },
  { value: '{"width":520,"height":127}', text: "520mm x 127mm" },
  { value: '{"width":520,"height":152}', text: "520mm x 152mm" },
  { value: '{"width":520,"height":165}', text: "520mm x 165mm" },
  { value: '{"width":533,"height":152}', text: "533mm x 152mm" },
  { value: '{"width":559,"height":152}', text: "559mm x 152mm" },
  { value: '{"width":565,"height":184}', text: "565mm x 184mm" },
  { value: '{"width":640,"height":215}', text: "640mm x 215mm" },
  { value: '{"width":297,"height":210}', text: "297mm x 210mm" },
  { value: '{"width":340,"height":220}', text: "340mm x 220mm" },
  { value: '{"width":203,"height":152}', text: "203mm x 152mm" },
  { value: '{"width":228,"height":76}', text: "228mm x 76mm" },
  { value: '{"width":305,"height":76}', text: "305mm x 76mm" },
  { value: '{"width":330,"height":89}', text: "330mm x 89mm" },
  { value: '{"width":330,"height":111}', text: "330mm x 111mm" },
  { value: '{"width":355,"height":111}', text: "355mm x 111mm" },
  { value: '{"width":404,"height":111}', text: "404mm x 111mm" },
  { value: '{"width":434,"height":115}', text: "434mm x 115mm" },
  { value: '{"width":457,"height":111}', text: "457mm x 111mm" },
  { value: '{"width":460,"height":111}', text: "460mm x 111mm" },
];
