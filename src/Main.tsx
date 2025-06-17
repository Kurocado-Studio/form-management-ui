import { ThemeProvider } from '@kurocado-studio/ui';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Welcome } from './components/Welcome';
import './tailwind.css';
import themeTokens from './tokens/tokens.json';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeTokens}>
      <Welcome />
    </ThemeProvider>
  </React.StrictMode>,
);
