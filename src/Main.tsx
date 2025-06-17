import { ThemeProvider } from '@kurocado-studio/ui-research-and-development/react';
import designTokens from '@kurocado-studio/ui-research-and-development/tokens.json';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Welcome } from './components/Welcome';
import './tailwind.css';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={designTokens}>
      <Welcome />
    </ThemeProvider>
  </React.StrictMode>,
);
