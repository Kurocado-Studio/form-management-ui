import { ReactTestingLibrary } from '@kurocado-studio/qa';
import { get } from 'lodash-es';

import { useFormKitStore } from '../../useFormikStore';
import { useUpdateQuestionUseCase } from './useUpdateQuestion.usecase';

const { act, renderHook } = ReactTestingLibrary;

vi.mock('../../useFormikStore', () => ({ useFormKitStore: vi.fn() }));

describe('useUpdateQuestionUseCase', () => {
  const handleUpdateFormsNodeTree = vi.fn();

  const initialNodeTree = {
    form1: {
      sections: {
        section1: {
          questions: {
            q1: {
              id: 'q1',
              title: 'Original Title',
              description: 'Original description',
            },
          },
        },
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    (useFormKitStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      formsNodeTree: initialNodeTree,
      handleUpdateFormsNodeTree,
      composePaths: () => ({
        toCurrentQuestion: 'form1.sections.section1.questions.q1',
      }),
    });
  });

  it('should update question properties in formsNodeTree', () => {
    const { result } = renderHook(() => useUpdateQuestionUseCase());

    const updatedProperties = {
      title: 'Updated Title',
      description: 'Updated description',
    };

    act(() => {
      result.current.executeUpdateQuestion({
        updatedQuestionProperties: updatedProperties,
      });
    });

    expect(handleUpdateFormsNodeTree).toHaveBeenCalledTimes(1);

    const updatedNodeTree = get(handleUpdateFormsNodeTree, [
      'mock',
      'calls',
      0,
      0,
    ]);
    const updatedQuestion = get(
      updatedNodeTree,
      'form1.sections.section1.questions.q1',
    );

    expect(updatedQuestion).toEqual({
      id: 'q1',
      title: 'Updated Title',
      description: 'Updated description',
    });
  });

  it('should not call handleUpdateFormsNodeTree if current question is undefined', () => {
    (useFormKitStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      formsNodeTree: initialNodeTree,
      handleUpdateFormsNodeTree,
      composePaths: () => ({
        toCurrentQuestion: 'form1.sections.section1.questions.q2',
      }),
    });

    const { result } = renderHook(() => useUpdateQuestionUseCase());

    act(() => {
      result.current.executeUpdateQuestion({
        updatedQuestionProperties: { title: 'Won’t update' },
      });
    });

    expect(handleUpdateFormsNodeTree).not.toHaveBeenCalled();
  });
});
