import {
  FullScreenLoader,
  KurocadoStudioThemeProvider,
} from '@kurocado-studio/react-design-system';
import React from 'react';
import 'react18-json-view/src/style.css';
import ReactDOM from 'react-dom/client';

import '../tailwind.css';
import { FormDesignerProvider } from './context/FormDesignerContext';
import { PanelsAndModalsProvider } from './context/PanelsAndModalsContext';
import { Demo } from './views/Demo';

const rootElement = document.querySelector('#root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <KurocadoStudioThemeProvider LoaderComponent={FullScreenLoader}>
        <PanelsAndModalsProvider>
          <FormDesignerProvider>
            <Demo />
          </FormDesignerProvider>
        </PanelsAndModalsProvider>
      </KurocadoStudioThemeProvider>
    </React.StrictMode>,
  );
}
