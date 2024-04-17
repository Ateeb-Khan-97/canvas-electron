import { createContext, useState, useContext } from "react";

const LetterContext = createContext(null);

export default function LetterProvider({ children }) {
  const [letters, setLetters] = useState("PLATE-TXT");
  const [dealerName, setDealerName] = useState("DEALER-NAME");
  const [postcode, setPostcode] = useState("0000");

  const [dealerNameFontStyle, setdealerNameFontStyle] = useState("Roboto");
  const [dealerNameFontSize, setdealerNameFontSize] = useState(7);

  const [postCodeFontStyle, setPostCodeFontStyle] = useState("Roboto");
  const [postCodeFontSize, setPostCodeFontSize] = useState(7);

  return (
    <LetterContext.Provider
      value={{
        letters,
        setLetters,
        dealerName,
        setDealerName,
        dealerNameFontSize,
        dealerNameFontStyle,
        setdealerNameFontSize,
        setdealerNameFontStyle,
        postcode,
        setPostcode,
        postCodeFontSize,
        postCodeFontStyle,
        setPostCodeFontSize,
        setPostCodeFontStyle,
      }}
    >
      <main className="bg-white text-zinc-200 min-h-screen max-w-screen-2xl mx-auto">
        {children}
      </main>
    </LetterContext.Provider>
  );
}

export function useLetters() {
  return useContext(LetterContext);
}
