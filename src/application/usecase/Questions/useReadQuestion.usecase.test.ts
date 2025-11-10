import { ReactTestingLibrary } from '@kurocado-studio/qa';
import { useWindowSize } from '@kurocado-studio/react-utils';

import { VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL } from '../../../config/constants';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import {
  FormDesignerPanelsEnum,
  ModalsAndPanelsViewsEnum,
} from '../../../enums';
import { scrollToElement } from '../../../utils/scrollToElement';
import { useFormKitStore } from '../../useFormikStore';
import { useReadQuestionUseCase } from './useReadQuestion.usecase';

const { act, renderHook } = ReactTestingLibrary;

vi.mock('../../useFormikStore', () => ({ useFormKitStore: vi.fn() }));
vi.mock('../../../context/FormDesignerContext', () => ({
  useFormDesignerContext: vi.fn(),
}));
vi.mock('../../../context/PanelsAndModalsContext', () => ({
  usePanelsAndModalsContext: vi.fn(),
}));
vi.mock('@kurocado-studio/react-utils', () => ({ useWindowSize: vi.fn() }));
vi.mock('../../../utils/scrollToElement', () => ({ scrollToElement: vi.fn() }));

describe('useReadQuestionUseCase', () => {
  const handleSetQuestionToBeEdited = vi.fn();
  const handleFormDesignerState = vi.fn();
  const handlePanelsAndModalsState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useFormKitStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleSetQuestionToBeEdited,
    });

    (
      useFormDesignerContext as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      handleFormDesignerState,
    });

    (
      usePanelsAndModalsContext as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      handlePanelsAndModalsState,
    });

    (useWindowSize as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      size: { innerWidth: 1024, innerHeight: 768 },
    });
  });

  it('should set question to be edited and scroll to element', () => {
    const questionId = 'q1';
    const { result } = renderHook(() => useReadQuestionUseCase());

    act(() => {
      result.current.executeReadQuestion({ question: { id: questionId } });
    });

    expect(handleSetQuestionToBeEdited).toHaveBeenCalledWith({
      id: questionId,
    });
    expect(handleFormDesignerState).toHaveBeenCalledWith(
      FormDesignerPanelsEnum.QUESTION,
    );
    expect(scrollToElement).toHaveBeenCalledWith(questionId);
    expect(handlePanelsAndModalsState).not.toHaveBeenCalled();
  });

  it('should trigger mobile panel if viewport is small', () => {
    (useWindowSize as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      size: {
        innerWidth: VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL - 10,
        innerHeight: 768,
      },
    });

    const questionId = 'q2';
    const { result } = renderHook(() => useReadQuestionUseCase());

    act(() => {
      result.current.executeReadQuestion({ question: { id: questionId } });
    });

    expect(handlePanelsAndModalsState).toHaveBeenCalledWith(
      ModalsAndPanelsViewsEnum.FORM_DESIGNER_PANEL,
    );
  });
});
