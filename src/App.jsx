import LetterControls from './LetterControls';
import LetterProvider from './LetterProvider';
import Plate from './Plate';

export default function App() {
  return (
    <LetterProvider>
      <LetterControls />
      <Plate type="front" />
      <Plate type="rear" />
    </LetterProvider>
  )
}
