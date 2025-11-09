import { useAxios } from '@kurocado-studio/axios-react';
import type { Form } from '@kurocado-studio/formkit-ui-models';
import { get } from 'lodash-es';
import React from 'react';

import { axiosFormKitInstance } from '../../../config/axiosFormKitInstance';
import { KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT } from '../../../config/constants';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { FormDesignerPanelsEnum } from '../../../enums';
import type { FormsNodeTree } from '../../../types';
import { useFormKitStore } from '../../useFormikStore';

export type UseGetFormByIdUseCase = () => {
  executeGetFormById: (payload: {
    id: string;
  }) => Promise<FormsNodeTree | undefined>;
};

const { FORM } = FormDesignerPanelsEnum;

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

  const executeGetFormById = async (payload: {
    id: string;
  }): Promise<FormsNodeTree | undefined> => {
    const { id } = payload;

    try {
      resetState();

      const formById = await getSingleFormHandler({
        url: `/api/v1/organizations/${KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT}/forms/${id}`,
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
