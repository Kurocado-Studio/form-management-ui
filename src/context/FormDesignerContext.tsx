import React, { createContext, useContext, useState } from 'react';

import { FormDesignerPanelsEnum } from '../enums';
import type { FormDesignerContext } from '../types';

const FormDesignerContext = createContext<FormDesignerContext>({
  handleFormDesignerState: () => {},
  formDesignerState: FormDesignerPanelsEnum.UNKNOWN,
});

export function FormDesignerProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [formDesignerState, setFormDesignerState] =
    useState<FormDesignerPanelsEnum>(FormDesignerPanelsEnum.UNKNOWN);

  const handleFormDesignerState = (payload: FormDesignerPanelsEnum): void => {
    setFormDesignerState(payload);
  };

  return (
    <FormDesignerContext.Provider
      value={{
        formDesignerState,
        handleFormDesignerState,
      }}
    >
      {children}
    </FormDesignerContext.Provider>
  );
}

export const useFormDesignerContext = (): FormDesignerContext => {
  return useContext(FormDesignerContext);
};
