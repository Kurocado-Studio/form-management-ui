import { get } from 'lodash-es';
import React from 'react';
import JsonView from 'react18-json-view';

import { HtmlForm } from '../../lib';
import type {
  FormDesignerEditorDto,
  FormNodeUpdaterDto,
  TextFieldQuestionUpdaterDto,
} from '../../types';
import { TextField } from '../TextField';
import {
  type TextFieldNodeUpdaterSchema,
  textFieldNodeFormSchema,
} from './TextFieldNode.schema';

export type TextFieldQuestionUpdaterHandler = (
  payload: TextFieldQuestionUpdaterDto,
) => Promise<void>;

export type FormNodeUpdaterHandler = (
  payload: FormNodeUpdaterDto,
) => Promise<void>;

export interface TextFieldNodeFormProperties extends FormDesignerEditorDto {
  handleUpdateQuestion: TextFieldQuestionUpdaterHandler;
}

export function TextFieldNodeForm(
  properties: React.PropsWithChildren<TextFieldNodeFormProperties>,
): React.ReactNode {
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
    <div className="block relative h-full">
      <HtmlForm<TextFieldNodeUpdaterSchema>
        id='text-field-node-form'
        key={get(variants, [variant as string, 'id'])}
        schema={textFieldNodeFormSchema}
        defaultValue={defaultValue}
        shouldValidate='onInput'
        shouldRevalidate='onInput'
        onSuccess={async (payload) => {
          await handleUpdateQuestion({
            formBeingEdited,
            sectionBeingEdited,
            updatedProperties: payload,
            questionBeingEdited: properties.questionBeingEdited,
          });
        }}
      >
        <TextField name='id' disabled />
        <TextField name='question' label='Question' />
      </HtmlForm>
      <JsonView
        className="text-xs overflow-y-auto"
        src={properties.questionBeingEdited}
      />
    </div>
  );
}
