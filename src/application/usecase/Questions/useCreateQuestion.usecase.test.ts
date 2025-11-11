import { useAxios } from '@kurocado-studio/axios-react';
import { VariantEnum } from '@kurocado-studio/formkit-ui-models';
import { ReactTestingLibrary } from '@kurocado-studio/qa';

import { EMPTY_QUESTION_NODE } from '../../../config/constants';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import { useFormKitStore } from '../../useFormikStore';
import { useCreateTextFieldQuestionUseCase } from './useCreateQuestion.usecase';

const { act, renderHook } = ReactTestingLibrary;

vi.mock('../../useFormikStore', () => ({ useFormKitStore: vi.fn() }));
vi.mock('@kurocado-studio/axios-react', () => ({ useAxios: vi.fn() }));
vi.mock('../../../context/FormDesignerContext', () => ({
  useFormDesignerContext: vi.fn(),
}));
vi.mock('../../../context/PanelsAndModalsContext', () => ({
  usePanelsAndModalsContext: vi.fn(),
}));
vi.mock('../../../utils/scrollToElement', () => ({
  scrollToElement: vi.fn(),
}));

describe('useCreateTextFieldQuestionUseCase', () => {
  const resetState = vi.fn();
  const createQuestionHandler = vi.fn();

  const handleAddQuestionToForm = vi.fn();
  const handleSetQuestionToBeEdited = vi.fn();
  const handleUpdateQuestionsStoreApiState = vi.fn();
  const handleFormDesignerState = vi.fn();
  const handlePanelsAndModalsState = vi.fn();

  const formIdBeingEdited = 'form123';
  const sectionIdBeingEdited = 'section456';

  beforeEach(() => {
    vi.clearAllMocks();

    (useFormKitStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      formIdBeingEdited,
      sectionIdBeingEdited,
      handleAddQuestionToForm,
      handleSetQuestionToBeEdited,
      handleUpdateQuestionsStoreApiState,
    });

    (useAxios as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      { resetState, isLoading: false, error: undefined },
      createQuestionHandler,
    ]);

    (
      useFormDesignerContext as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      handleFormDesignerState,
    });

    (
      usePanelsAndModalsContext as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      panelsAndModalsState: { QUESTION_SELECTOR_PANEL: false },
      handlePanelsAndModalsState,
    });
  });

  it('creates a text field question successfully', async () => {
    const fakeQuestion = {
      id: 'q1',
      question: 'Test',
      variant: { variantType: VariantEnum.TEXT },
    };
    createQuestionHandler.mockResolvedValue(fakeQuestion);

    const { result } = renderHook(() => useCreateTextFieldQuestionUseCase());

    let returnedQuestion;
    await act(async () => {
      returnedQuestion = await result.current.executeCreateTextFieldQuestion({
        question: 'Test',
        variant: {},
      });
    });

    expect(createQuestionHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: expect.stringContaining(formIdBeingEdited),
      }),
    );

    expect(handleAddQuestionToForm).toHaveBeenCalledWith({
      question: fakeQuestion,
    });
    expect(handleSetQuestionToBeEdited).toHaveBeenCalledWith({ id: 'q1' });
    expect(handleFormDesignerState).toHaveBeenCalled();
    expect(returnedQuestion).toEqual(fakeQuestion);
  });

  it('returns EMPTY_QUESTION_NODE if API call fails', async () => {
    createQuestionHandler.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useCreateTextFieldQuestionUseCase());

    let returnedQuestion;
    await act(async () => {
      returnedQuestion = await result.current.executeCreateTextFieldQuestion({
        question: 'FailTest',
        variant: {},
      });
    });

    expect(returnedQuestion).toEqual(EMPTY_QUESTION_NODE);
    expect(handleAddQuestionToForm).not.toHaveBeenCalled();
  });

  it('closes question selector panel if open', async () => {
    (
      usePanelsAndModalsContext as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue({
      panelsAndModalsState: { QUESTION_SELECTOR_PANEL: true },
      handlePanelsAndModalsState,
    });

    const fakeQuestion = {
      id: 'q2',
      question: 'Test2',
      variant: { variantType: VariantEnum.TEXT },
    };
    createQuestionHandler.mockResolvedValue(fakeQuestion);

    const { result } = renderHook(() => useCreateTextFieldQuestionUseCase());

    await act(async () => {
      await result.current.executeCreateTextFieldQuestion({
        question: 'Test2',
        variant: {},
      });
    });

    expect(handlePanelsAndModalsState).toHaveBeenCalled();
  });
});
