import { ReactTestingLibrary } from '@kurocado-studio/qa';
import { useWindowSize } from '@kurocado-studio/react-utils';
import React from 'react';
import { vi } from 'vitest';

import { useFormKitStore } from '../application/useFormikStore';
import { useFormDesignerContext } from '../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../context/PanelsAndModalsContext';
import { FormDesignerPanelsEnum, ModalsAndPanelsViewsEnum } from '../enums';
import {
  mockedForm,
  mockedFormNodeTree,
  mockedQuestion1,
  mockedSection,
} from '../utils/mocks';
import { FormDesignerManager } from './FormDesignerManager';

const { render, screen, waitFor } = ReactTestingLibrary;

vi.mock('../application/useFormikStore', () => ({
  useFormKitStore: vi.fn(),
}));

vi.mock('../context/FormDesignerContext', () => ({
  useFormDesignerContext: vi.fn(),
}));

vi.mock('../context/PanelsAndModalsContext', () => ({
  usePanelsAndModalsContext: vi.fn(),
}));

vi.mock('@kurocado-studio/react-utils', () => ({
  ...vi.importActual('@kurocado-studio/react-utils'),
  useWindowSize: vi.fn(),
}));

describe('FormDesignerManager', () => {
  let mockUseFormDesignerContext: ReturnType<
    typeof vi.fn<typeof useFormDesignerContext>
  >;
  let mockUseFormKitStore: ReturnType<typeof vi.fn<typeof useFormKitStore>>;
  let mockUsePanelsAndModalsContext: ReturnType<
    typeof vi.fn<typeof usePanelsAndModalsContext>
  >;
  let mockUseWindowSize: ReturnType<typeof vi.fn<typeof useWindowSize>>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockUsePanelsAndModalsContext =
      usePanelsAndModalsContext as typeof mockUsePanelsAndModalsContext;

    mockUseFormKitStore =
      useFormKitStore as unknown as typeof mockUseFormKitStore;

    mockUseFormKitStore.mockReturnValue({
      formsNodeTree: mockedFormNodeTree,
      handleUpdateQuestionsStoreApiState: () => {},
      handleUpdateFormsStoreApiState: () => {},
      composePaths: () => ({
        toCurrentQuestion: [
          mockedForm.id,
          'sections',
          mockedSection.id,
          'questions',
          mockedQuestion1.id,
        ],
        toQuestions: [mockedForm.id, 'sections', mockedSection.id, 'questions'],
      }),
    });

    mockUseFormDesignerContext =
      useFormDesignerContext as typeof mockUseFormDesignerContext;

    mockUseWindowSize = useWindowSize as typeof mockUseWindowSize;
  });

  test('renders correctly when innerWidth < 1024 and formDesignerState = FORM', async () => {
    mockUseWindowSize.mockReturnValue({
      size: { innerWidth: 500, innerHeight: 500 },
    });

    mockUseFormDesignerContext.mockReturnValue({
      handleFormDesignerState: vi.fn(),
      formDesignerState: FormDesignerPanelsEnum.FORM,
    });

    mockUsePanelsAndModalsContext.mockReturnValue({
      handlePanelsAndModalsState: vi.fn(),
      panelsAndModalsState: {
        [ModalsAndPanelsViewsEnum.QUESTION_SELECTOR_PANEL]: false,
        [ModalsAndPanelsViewsEnum.FORM_DESIGNER_PANEL]: true,
        [ModalsAndPanelsViewsEnum.UNKNOWN]: false,
      },
    });

    render(<FormDesignerManager />);

    await waitFor(() => {
      expect(screen.getByTestId('form-node-editor-panel')).toBeVisible();
    });
  });

  test('renders correctly when innerWidth > 1024 and formDesignerState = QUESTION', async () => {
    mockUseWindowSize.mockReturnValue({
      size: { innerWidth: 2000, innerHeight: 2000 },
    });

    mockUseFormDesignerContext.mockReturnValue({
      handleFormDesignerState: vi.fn(),
      formDesignerState: FormDesignerPanelsEnum.QUESTION,
    });

    render(<FormDesignerManager />);

    await waitFor(() => {
      expect(screen.getByTestId('text-field-node-editor')).toBeVisible();
    });
  });
});
