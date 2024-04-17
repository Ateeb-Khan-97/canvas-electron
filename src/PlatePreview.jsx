import { forwardRef, useEffect } from "react";
import { usePlate } from "./PlateProvider";
import { useLetters } from "./LetterProvider";
import { useRef } from "react";

export default forwardRef(function PlatePreview(props, ref) {
  const textRef = useRef(null);
  const borderRef = useRef(null);

  const ctx = useLetters();
  const plate = usePlate();
  const subtext = `${ctx.dealerName} ${ctx.postcode}`;

  useEffect(() => {
    const container = ref.current;
    const plate = container.firstElementChild;

    const scale = Math.min(
      container.offsetWidth / plate.scrollWidth,
      container.offsetHeight / plate.scrollHeight,
    );

    // plate.style.transform = `translate(-50%, -50%) scale(${scale})`;
    plate.style.setProperty('--tw-scale-x', scale);
    plate.style.setProperty('--tw-scale-y', scale);
  }, [plate.plateSize]);

  useEffect(() => {
    if (!borderRef.current || !textRef.current || !ref.current) return;

    const scale = (ref.current.offsetWidth / plate.plateSize.width);
    const borderWidthInPx = scale * plate.borderWidth;
    const safeDistance = scale * 0;
    const rootMargin = borderWidthInPx + safeDistance;
    // console.log(rootMargin, safeDistance, borderWidthInPx, scale);

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio < 1) {
          console.log(entry);
          // console.log(ref.current.offsetWidth, ref.current.scrollWidth)
        }
      });
    }, {
      root: borderRef.current,
      rootMargin: `-${rootMargin}px`,
      threshold: 1,
    });

    obs.observe(textRef.current);
    return () => obs.disconnect();
  }, [plate.plateSize, plate.borderWidth]);

  return (
    <article id={plate.type === 'front' ? 'container-front' : 'container-rear'} className="bg-checkered bg-[length:20px_20px] bg-center overflow-hidden w-full min-h-96 flex items-center justify-center mt-4 p-2 relative print:bg-none" ref={ref}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center rounded-[8mm] font-bold print:border-black print:border-[0.5mm]"
        style={{
          width: plate.plateSize.width + 'mm',
          height: plate.plateSize.height + 'mm',
          padding: plate.borderMargin + 'mm',
          paddingLeft: plate.isBadgeEnabled ? `calc(45mm + ${plate.borderMargin}mm)` : `${plate.borderMargin}mm`,
          backgroundColor: plate.type === 'front' ? 'white' : '#eab308',
        }}
      >
        <div
          ref={borderRef}
          className="relative w-full h-full flex justify-center items-center rounded-[8mm] text-center text-black select-none"
          style={{
            outline: plate.isBorderEnabled ? `black solid ${plate.borderWidth}mm` : 'none',
            outlineOffset: plate.borderWidth * -1 + 'mm'
          }}
        >
          <div
            ref={textRef}
            className="flex justify-center items-center whitespace-nowrap"
            style={{
              fontSize: '79mm',
              lineHeight: 1,
            }}
          >
            {ctx.letters}
          </div>
          {(ctx.dealerName || ctx.postcode)  &&
            <div
              className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 px-[6mm]"
              style={{
                fontSize: `${ctx.postCodeFontSize}mm`,
                fontStyle: `${ctx.postCodeFontStyle}mm`,
                lineHeight: 1,
                paddingTop: `calc(${plate.borderWidth}mm - 0.9lh)`,
                backgroundColor: plate.type === 'front' ? 'white' : '#eab308',
              }}
            >
              {subtext}
            </div>
          }
          {
            plate.bsau !== '' && !plate.isBsauPrePrinted &&
            <div
              className="absolute right-[5mm] px-[6mm]"
              style={{
                fontSize: `${ctx.postCodeFontSize}mm`,
                fontStyle: `${ctx.postCodeFontStyle}mm`,
                lineHeight: 1,
                paddingTop: plate.isBsauOnBorder ? `calc(${plate.borderWidth}mm - 0.9lh)` : '0',
                bottom: plate.isBsauOnBorder ? '-2px' : `calc(${plate.borderWidth}mm + 2mm)`,
                right: `calc(${plate.borderWidth}mm + 8mm)`,
                backgroundColor: plate.type === 'front' ? 'white' : '#eab308',
              }}
            >
              {plate.bsau}
            </div>
          }
        </div>
      </div>
    </article>
  )
});
