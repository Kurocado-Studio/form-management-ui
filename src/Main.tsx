import { ThemeProvider } from '@kurocado-studio/react-ui-kit';
import React from 'react';
import ReactDOM from 'react-dom/client';

import '../tailwind.css';
import { kurocadoCssVariables } from './config/kurocado.css.variables';
import { Demo } from './views/Demo';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider cssVariables={kurocadoCssVariables}>
      <Demo />
    </ThemeProvider>
  </React.StrictMode>,
);
