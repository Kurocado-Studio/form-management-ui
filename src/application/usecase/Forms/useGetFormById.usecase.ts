import { useAxios } from '@kurocado-studio/axios-react';
import type { Form } from '@kurocado-studio/html-form-service-ui-config';
import { get } from 'lodash-es';
import React from 'react';

import { axiosFormKitInstance } from '../../../config/axiosFormKitInstance';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { FormDesignerPanelsEnum } from '../../../enums';
import { useFormKitStore } from '../../../store/useFormikStore';
import type { FormsNodeTree } from '../../../types';

export type UseGetFormByIdUseCase = () => {
  executeGetFormById: (payload: {
    id: string;
  }) => Promise<FormsNodeTree | undefined>;
};

export const useGetFormByIdUseCase: UseGetFormByIdUseCase = () => {
  const {
    formsNodeTree,
    handleSetQuestionToBeEdited,
    handleUpdateFormsStoreApiState,
    handleSetFormBeingEdited,
    handleComposeFormsNodeTree,
    handleUpdateSectionBeingEdited,
  } = useFormKitStore((state) => state);

  const { handleFormDesignerState } = useFormDesignerContext();

  const [{ resetState, isLoading, error }, getSingleFormHandler] =
    useAxios<Form>({
      axiosInstance: axiosFormKitInstance,
    });

  React.useEffect(() => {
    handleUpdateFormsStoreApiState({ isLoading, error }, 'getFormByIdState');
  }, [handleUpdateFormsStoreApiState, error, isLoading]);
  const { FORM } = FormDesignerPanelsEnum;

  const executeGetFormById = async (payload: {
    id: string;
  }): Promise<FormsNodeTree | undefined> => {
    const { id } = payload;

    try {
      resetState();

      const formById = await getSingleFormHandler({
        url: `/forms/${id}`,
        method: 'GET',
      });

      if (formById === undefined) return;

      handleComposeFormsNodeTree({ forms: [formById] });
      handleSetQuestionToBeEdited({ id: undefined });
      handleSetFormBeingEdited({ id: formById.id });
      handleUpdateSectionBeingEdited({
        id: get(formById, ['sections', 0, 'id']),
      });
      handleFormDesignerState(FORM);
      return formsNodeTree;
    } catch {
      return undefined;
    }
  };

  return { executeGetFormById };
};
