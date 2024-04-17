import { useId } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useLetters } from "./LetterProvider";

export default function LetterControls() {
  const ctx = useLetters();
  const id = useId();

  return (
    <>
      <div className="flex gap-4 bg-gray-900 text-zinc-200 p-4">
        <fieldset>
          <legend>Registration</legend>
          <div className="w-full">
            <label htmlFor="letters">Letters</label>
            <input
              id="letters"
              value={ctx.letters}
              onChange={(e) => ctx.setLetters(e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Personalization</legend>

          <div className="flex gap-8">
            <div className="w-full">
              <label htmlFor="dealer">Dealer Name</label>
              <div className="flex gap-2 items-center">
                <input
                  id="dealer"
                  value={ctx.dealerName}
                  onChange={(e) => ctx.setDealerName(e.target.value)}
                />

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button className="bg-zinc-700 p-2 px-4 rounded-md hover:bg-zinc-600 transition-colors">
                      Font
                    </button>
                  </Dialog.Trigger>

                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-gradient-to-b from-black/30 to-black/10 animate-appear" />

                    <Dialog.Content className="max-w-96 w-screen text-zinc-200 bg-zinc-800 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 border border-zinc-600 data-[state=open]:animate-popup">
                      <fieldset>
                        <legend>Dealer Font settings</legend>
                        <label htmlFor={`${id}-dealer-font-style`}>
                          Font style
                        </label>
                        <select
                          id={`${id}-dealer-font-style`}
                          value={ctx.dealerNameFontStyle}
                          onChange={ctx.setdealerNameFontStyle}
                        >
                          <option key="roboto" value="roboto">
                            Roboto
                          </option>
                        </select>

                        <div className="mt-4 max-w-32">
                          <label htmlFor={`${id}-dealer-font-size`}>Size</label>
                          <input
                            type="number"
                            id={`${id}-dealer-font-size`}
                            value={ctx.dealerNameFontSize}
                            onChange={(e) =>
                              ctx.setdealerNameFontSize(e.target.value)
                            }
                          />
                        </div>
                      </fieldset>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="postcode">Postcode</label>
              <div className="flex gap-2 items-center">
                <input
                  id="postcode"
                  value={ctx.postcode}
                  onChange={(e) => ctx.setPostcode(e.target.value)}
                />
                <button className="bg-zinc-700 p-2 px-4 rounded-md hover:bg-zinc-600 transition-colors">
                  Font
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
}
