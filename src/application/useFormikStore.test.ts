import { ReactTestingLibrary } from '@kurocado-studio/qa';

import { useFormKitStore } from './useFormikStore';

const { renderHook } = ReactTestingLibrary;

describe('useFormKitStore', () => {
  it('should return correct composeApiLoadingState and composePaths', () => {
    const { result } = renderHook(() => useFormKitStore());

    expect(result.current.composeApiLoadingState()).toEqual({
      getFormById: false,
      createQuestion: false,
      isAnyLoading: false,
    });

    const paths = result.current.composePaths();

    expect(paths.toCurrentForm).toEqual([
      result.current.formIdBeingEdited ?? '',
    ]);

    expect(paths.toSections).toEqual([
      result.current.formIdBeingEdited ?? '',
      'sections',
    ]);

    expect(paths.toCurrentSection).toEqual([
      result.current.formIdBeingEdited ?? '',
      'sections',
      result.current.sectionIdBeingEdited ?? '',
    ]);

    expect(paths.toQuestions).toEqual([
      result.current.formIdBeingEdited ?? '',
      'sections',
      result.current.sectionIdBeingEdited ?? '',
      'questions',
    ]);

    expect(paths.toCurrentQuestion).toEqual([
      result.current.formIdBeingEdited ?? '',
      'sections',
      result.current.sectionIdBeingEdited ?? '',
      'questions',
      result.current.questionIdBeingEdited ?? '',
    ]);
  });
});
