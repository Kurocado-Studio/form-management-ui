import { ThemeProvider } from '@kurocado-studio/react-design-system';
import React from 'react';
import 'react18-json-view/src/style.css';
import ReactDOM from 'react-dom/client';

import '../tailwind.css';
import { kurocadoCssVariables } from './config/kurocado.css.variables';
import { FormDesignerProvider } from './context/FormDesignerContext';
import { PanelsAndModalsProvider } from './context/PanelsAndModalsContext';
import { Demo } from './views/Demo';

const rootElement = document.querySelector('#root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ThemeProvider cssVariables={kurocadoCssVariables}>
        <PanelsAndModalsProvider>
          <FormDesignerProvider>
            <Demo />
          </FormDesignerProvider>
        </PanelsAndModalsProvider>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
