import { ThemeProvider } from '@kurocado-studio/react-ui-kit';
import React from 'react';
import ReactDOM from 'react-dom/client';

import '../tailwind.css';
import { Demo } from './components/Demo';
import { cssVariables } from './config/cssVariables';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider cssVariables={cssVariables}>
      <Demo />
    </ThemeProvider>
  </React.StrictMode>,
);
