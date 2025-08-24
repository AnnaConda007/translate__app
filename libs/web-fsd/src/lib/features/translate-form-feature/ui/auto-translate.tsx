 import React, { useEffect, useRef, useState } from "react";
import { useTranslateForm } from "../model/use-translate-form";
import { AddWordToDictionaryFeature } from "../../add-word-to-dictionary-feature/ui/add-word-to-dictionary";
import { ModalPosition } from "../../reader-feature/model/useWord";
import { sendTextToApi } from "../api/send-text-to-api";

type Props = {
  value: string;
  position: ModalPosition;
};

export const AutoTranslate = React.memo(({ value, position }: Props) => {
   const [translated, setTranslated] = useState("");
  const [adjustedPos, setAdjustedPos] = useState<ModalPosition>(position);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const translate = async () => {
      const sourceValue = value.toLowerCase();
      const translated = await   sendTextToApi(sourceValue)
       
      setTranslated(translated);
    };

    translate();
    return () => setTranslated("");
  }, [value,   sendTextToApi]);

  useEffect(() => {
     requestAnimationFrame(() => {
      const box = boxRef.current;
      if (!box) return;

      const rect = box.getBoundingClientRect();
      const padding = 8;

      const newX = Math.min(position.x, window.innerWidth - rect.width - padding);
      const newY = Math.min(position.y, window.innerHeight - rect.height - padding);

      setAdjustedPos({ x: newX, y: newY });
    });
  }, [translated, position]);

  if (!translated) return null;

  return (
    <div className="fixed inset-0 z-50" style={{ pointerEvents: "none" }}>
      <div
        ref={boxRef}
        className="absolute bg-yellow-100 shadow-md flex justify-between p-2 max-w-[90vw]"
        style={{
          left: adjustedPos.x,
          top: adjustedPos.y,
          pointerEvents: "auto",
        }}
      >
        <p className="pr-2">{translated}</p>
        <AddWordToDictionaryFeature source={value} translation={translated} />
      </div>
    </div>
  );
});
