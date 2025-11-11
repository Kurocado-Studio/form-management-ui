import { useAxios } from '@kurocado-studio/axios-react';
import type { Form } from '@kurocado-studio/formkit-ui-models';
import { ReactTestingLibrary } from '@kurocado-studio/qa';

import { FormKitStore, useFormKitStore } from '../../useFormikStore';
import { useGetFormByIdUseCase } from './useGetFormById.usecase';

const { act, renderHook } = ReactTestingLibrary;

vi.mock('../../useFormikStore', () => ({
  useFormKitStore: vi.fn(),
}));

vi.mock('@kurocado-studio/axios-react', () => ({
  useAxios: vi.fn(),
}));

describe('useGetFormByIdUseCase', () => {
  const resetState = vi.fn();
  const getSingleFormHandler = vi.fn();

  const handleUpdateFormsStoreApiState = vi.fn();
  const handleSetFormBeingEdited = vi.fn();
  const handleComposeFormsNodeTree = vi.fn();
  const handleUpdateSectionBeingEdited = vi.fn();

  const formsNodeTreeMock = {};

  beforeEach(() => {
    vi.clearAllMocks();

    (useFormKitStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector: (payload: Partial<FormKitStore>) => FormKitStore) =>
        selector({
          formsNodeTree: formsNodeTreeMock,
          handleUpdateFormsStoreApiState,
          handleSetFormBeingEdited,
          handleComposeFormsNodeTree,
          handleUpdateSectionBeingEdited,
        }),
    );

    (useAxios as unknown as ReturnType<typeof vi.fn>).mockReturnValue([
      { resetState, isLoading: false, error: undefined },
      getSingleFormHandler,
    ]);
  });

  it('should call API and update store on success', async () => {
    const fakeForm: Form = {
      id: 'form123',
      title: 'Test Form',
      createdAt: '',
      updatedAt: '',
      sections: [
        {
          id: 'section1',
          title: 'Section 1',
          order: 0,
          createdAt: '',
          updatedAt: '',
          questions: [],
        },
      ],
    };

    getSingleFormHandler.mockResolvedValue(fakeForm);

    const { result } = renderHook(() => useGetFormByIdUseCase());

    await act(async () => {
      const returnedTree = await result.current.executeGetFormById({
        id: 'form123',
      });

      expect(getSingleFormHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining('/api/v1/organizations'),
          method: 'GET',
        }),
      );

      expect(handleComposeFormsNodeTree).toHaveBeenCalledWith({
        forms: [fakeForm],
      });
      expect(handleSetFormBeingEdited).toHaveBeenCalledWith({ id: 'form123' });
      expect(handleUpdateSectionBeingEdited).toHaveBeenCalledWith({
        id: 'section1',
      });

      expect(returnedTree).toBe(formsNodeTreeMock);
    });
  });

  it('should return formsNodeTree and not throw if API fails', async () => {
    getSingleFormHandler.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useGetFormByIdUseCase());

    await act(async () => {
      const returnedTree = await result.current.executeGetFormById({
        id: 'form123',
      });

      expect(handleComposeFormsNodeTree).not.toHaveBeenCalled();
      expect(handleSetFormBeingEdited).not.toHaveBeenCalled();
      expect(handleUpdateSectionBeingEdited).not.toHaveBeenCalled();

      expect(returnedTree).toBe(formsNodeTreeMock);
    });
  });

  it('should update store API state on render', () => {
    renderHook(() => useGetFormByIdUseCase());

    expect(handleUpdateFormsStoreApiState).toHaveBeenCalledWith(
      { isLoading: false, error: undefined },
      'getFormByIdState',
    );
  });
});
