import { get } from 'lodash-es';
import React from 'react';
import JsonView from 'react18-json-view';

import { type FormNode, HtmlForm } from '../../lib';
import type {
  FormDesignerEditorDto,
  FormNodeUpdaterDto,
  TextFieldQuestionUpdaterDto,
} from '../../types';
import { TextField } from '../TextField';
// eslint-disable-next-line
import { FormNodeUpdaterSchema, formNodeFormSchema } from './FormNode.schema';

export type TextFieldQuestionUpdaterHandler = (
  payload: TextFieldQuestionUpdaterDto,
) => Promise<void>;

export type FormNodeUpdaterHandler = (
  payload: FormNodeUpdaterDto,
) => Promise<FormNode>;

export interface FormEditorSelectorProperties extends FormDesignerEditorDto {
  handleUpdateForm: FormNodeUpdaterHandler;
}

export function FormNodeEditor(
  properties: React.PropsWithChildren<FormEditorSelectorProperties>,
): React.ReactNode {
  const { formBeingEdited, handleUpdateForm } = properties;
  const { title, id, description } = formBeingEdited || {};

  const defaultValue = React.useMemo(() => {
    return {
      title,
      id,
      description,
    };
  }, [description, id, title]) as Record<string, string>;

  return (
    <div className='block relative h-full overflow-y-auto'>
      <HtmlForm<FormNodeUpdaterSchema>
        id='form-node-form'
        key={get(formBeingEdited, ['id' as string, 'form-node-id'])}
        schema={formNodeFormSchema}
        defaultValue={defaultValue}
        shouldValidate='onInput'
        shouldRevalidate='onInput'
        onSuccess={async (payload) => {
          await handleUpdateForm({
            formBeingEdited,
            updatedProperties: payload,
          });
        }}
      >
        <TextField name='id' disabled />
        <TextField name='title' label='Title' />
        <TextField name='description' label='Description' />
      </HtmlForm>
      <JsonView
        className="text-xs overflow-y-auto"
        src={properties.formBeingEdited}
      />
    </div>
  );
}
