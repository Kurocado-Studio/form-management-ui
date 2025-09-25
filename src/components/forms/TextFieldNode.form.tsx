import { useWindowSize } from '@kurocado-studio/react-utils';
import { get } from 'lodash-es';
import React from 'react';

import { HtmlForm } from '../../lib';
import type {
  FormDesignerEditorDto,
  TextFieldQuestionUpdaterDto,
} from '../../types';
import { TextField } from '../TextField';
import {
  type TextFieldNodeUpdaterSchema,
  textFieldNodeFormSchema,
} from '../questions/TextFieldNode.schema';

export type TextFieldQuestionUpdaterHandler = (
  payload: TextFieldQuestionUpdaterDto,
) => Promise<void>;

export interface TextFieldNodeFormProperties extends FormDesignerEditorDto {
  handleUpdateQuestion: TextFieldQuestionUpdaterHandler;
}

export const TextFieldNodeForm = (
  properties: React.PropsWithChildren<TextFieldNodeFormProperties>,
): React.ReactNode => {
  const { formBeingEdited, sectionBeingEdited, handleUpdateQuestion } =
    properties;

  const { question, id, variant, variants } = properties.questionBeingEdited;

  const defaultValue = React.useMemo(() => {
    return {
      id,
      question,
    };
  }, [id, question]) as Record<string, string>;

  return (
    <HtmlForm<TextFieldNodeUpdaterSchema>
      id='text-field-node-form'
      key={get(variants, [variant as string, 'id'])}
      schema={textFieldNodeFormSchema}
      defaultValue={defaultValue}
      shouldValidate={'onInput'}
      shouldRevalidate={'onInput'}
      onSuccess={async (payload) => {
        await handleUpdateQuestion({
          formBeingEdited: formBeingEdited,
          sectionBeingEdited: sectionBeingEdited,
          updatedProperties: payload,
          questionBeingEdited: properties.questionBeingEdited,
        });
      }}
    >
      <TextField name='id' disabled />
      <TextField name='question' label='Question' />
    </HtmlForm>
  );
};
