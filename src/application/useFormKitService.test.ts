import { ReactTestingLibrary } from '@kurocado-studio/qa';

import { useFormKitService } from './useFormKitService';

const { renderHook } = ReactTestingLibrary;

vi.mock('./usecase/Forms/useGetFormById.usecase', () => ({
  useGetFormByIdUseCase: vi.fn(() => ({ executeGetFormById: vi.fn() })),
}));
vi.mock('./usecase/Forms/useReadForm.usecase', () => ({
  useReadFormUseCase: vi.fn(() => ({ executeReadForm: vi.fn() })),
}));
vi.mock('./usecase/Forms/useUpdateForm.usecase', () => ({
  useUpdateFormUseCase: vi.fn(() => ({ executeUpdateForm: vi.fn() })),
}));
vi.mock('./usecase/Questions/useCreateQuestion.usecase', () => ({
  useCreateTextFieldQuestionUseCase: vi.fn(() => ({
    executeCreateTextFieldQuestion: vi.fn(),
  })),
}));
vi.mock('./usecase/Questions/useReadQuestion.usecase', () => ({
  useReadQuestionUseCase: vi.fn(() => ({ executeReadQuestion: vi.fn() })),
}));
vi.mock('./usecase/Questions/useUpdateQuestion.usecase', () => ({
  useUpdateQuestionUseCase: vi.fn(() => ({ executeUpdateQuestion: vi.fn() })),
}));

describe('useFormKitService', () => {
  it('should expose all expected service methods', () => {
    const { result } = renderHook(() => useFormKitService());

    expect(result.current).toHaveProperty('executeGetFormById');
    expect(result.current).toHaveProperty('executeReadForm');
    expect(result.current).toHaveProperty('executeReadQuestion');
    expect(result.current).toHaveProperty('executeUpdateQuestion');
    expect(result.current).toHaveProperty('executeUpdateForm');
    expect(result.current).toHaveProperty('executeCreateTextFieldQuestion');
  });
});
