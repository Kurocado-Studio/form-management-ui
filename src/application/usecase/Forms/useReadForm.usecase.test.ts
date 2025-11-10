import { ReactTestingLibrary } from '@kurocado-studio/qa';

import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import {
  FormDesignerPanelsEnum,
  ModalsAndPanelsViewsEnum,
} from '../../../enums';
import { useFormKitStore } from '../../useFormikStore';
import { useReadFormUseCase } from './useReadForm.usecase';

const { act, renderHook } = ReactTestingLibrary;

vi.mock('../../useFormikStore', () => ({
  useFormKitStore: vi.fn(),
}));

vi.mock('../../../context/PanelsAndModalsContext', () => ({
  usePanelsAndModalsContext: vi.fn(),
}));

vi.mock('../../../context/FormDesignerContext', () => ({
  useFormDesignerContext: vi.fn(),
}));

describe('useReadFormUseCase', () => {
  const handleSetFormBeingEdited = vi.fn();
  const handleSetQuestionToBeEdited = vi.fn();
  const handlePanelsAndModalsState = vi.fn();
  const handleFormDesignerState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useFormKitStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleSetFormBeingEdited,
      handleSetQuestionToBeEdited,
    });

    (
      usePanelsAndModalsContext as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      handlePanelsAndModalsState,
    });

    (
      useFormDesignerContext as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      handleFormDesignerState,
    });
  });

  it('does nothing if id is undefined', () => {
    const { result } = renderHook(() => useReadFormUseCase());

    act(() => {
      result.current.executeReadForm({ id: undefined });
    });

    expect(handleSetFormBeingEdited).not.toHaveBeenCalled();
    expect(handleSetQuestionToBeEdited).not.toHaveBeenCalled();
    expect(handleFormDesignerState).not.toHaveBeenCalled();
    expect(handlePanelsAndModalsState).not.toHaveBeenCalled();
  });

  it('sets form and question and updates form designer state', () => {
    const { result } = renderHook(() => useReadFormUseCase());

    act(() => {
      result.current.executeReadForm({ id: 'form123' });
    });

    expect(handleSetQuestionToBeEdited).toHaveBeenCalledWith({ id: undefined });
    expect(handleSetFormBeingEdited).toHaveBeenCalledWith({ id: 'form123' });
    expect(handleFormDesignerState).toHaveBeenCalledWith(
      FormDesignerPanelsEnum.FORM,
    );
    expect(handlePanelsAndModalsState).not.toHaveBeenCalled();
  });

  it('opens form designer panel if shouldOpenFormDesignerPanel is true', () => {
    const { result } = renderHook(() => useReadFormUseCase());

    act(() => {
      result.current.executeReadForm({
        id: 'form123',
        shouldOpenFormDesignerPanel: true,
      });
    });

    expect(handlePanelsAndModalsState).toHaveBeenCalledWith(
      ModalsAndPanelsViewsEnum.FORM_DESIGNER_PANEL,
    );
  });
});
