import { createRoot } from 'react-dom/client';
import DictionaryApp from './DictionaryApp'; // Correctly import DictionaryApp

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<DictionaryApp />);
