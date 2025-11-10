import { useAxios } from '@kurocado-studio/axios-react';
import type { Form } from '@kurocado-studio/formkit-ui-models';
import { get } from 'lodash-es';
import React from 'react';

import { axiosFormKitInstance } from '../../../config/axiosFormKitInstance';
import { KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT } from '../../../config/constants';
import type { UseGetFormByIdUseCase } from '../../../types';
import { useFormKitStore } from '../../useFormikStore';

export const useGetFormByIdUseCase: UseGetFormByIdUseCase = () => {
  const {
    formsNodeTree,
    handleUpdateFormsStoreApiState,
    handleSetFormBeingEdited,
    handleComposeFormsNodeTree,
    handleUpdateSectionBeingEdited,
  } = useFormKitStore((state) => state);

  const [{ resetState, isLoading, error }, getSingleFormHandler] =
    useAxios<Form>({
      axiosInstance: axiosFormKitInstance,
    });

  React.useEffect(() => {
    handleUpdateFormsStoreApiState({ isLoading, error }, 'getFormByIdState');
  }, [handleUpdateFormsStoreApiState, error, isLoading]);

  const executeGetFormById: ReturnType<UseGetFormByIdUseCase>['executeGetFormById'] =
    async (payload) => {
      const { id } = payload;

      try {
        resetState();

        const formById = await getSingleFormHandler({
          url: `/api/v1/organizations/${KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT}/forms/${id}`,
          method: 'GET',
        });

        handleComposeFormsNodeTree({ forms: [formById] });
        handleSetFormBeingEdited({ id: formById.id });
        handleUpdateSectionBeingEdited({
          id: get(formById, ['sections', 0, 'id']),
        });
        return formsNodeTree;
      } catch {
        return formsNodeTree;
      }
    };

  return { executeGetFormById };
};
