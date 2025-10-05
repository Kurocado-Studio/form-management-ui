import type { Question } from '@kurocado-studio/html-form-service-ui-config';
import { HtmlForm } from '@kurocado-studio/web-forms-react';
import { get } from 'lodash-es';
import React from 'react';
import JsonView from 'react18-json-view';

import { useFormKitStore } from '../../store/useFormikStore';
import type {
  FormDesignerEditorDto,
  TextFieldQuestionUpdaterDto,
} from '../../types';
import { TextField } from '../TextField';
import {
  type TextFieldNodeUpdaterSchema,
  textFieldNodeFormSchema,
} from './TextFieldNode.schema';

export type TextFieldQuestionUpdaterHandler = (
  payload: TextFieldQuestionUpdaterDto,
) => Promise<Question>;

export interface TextFieldNodeFormProperties extends FormDesignerEditorDto {
  handleUpdateQuestion: TextFieldQuestionUpdaterHandler;
}

export function TextFieldNodeForm(
  properties: React.PropsWithChildren<TextFieldNodeFormProperties>,
): React.ReactNode {
  const {
    formsNodeTree,
    questionIdBeingEdited,
    formIdBeingEdited,
    sectionIdBeingEdited,
  } = useFormKitStore((state) => state);

  const { question, id, variant, variants, ...rest } = get(formsNodeTree, [
    formIdBeingEdited ?? '',
    'sections',
    sectionIdBeingEdited ?? '',
    'questions',
    questionIdBeingEdited ?? '',
  ]);

  const defaultValue = React.useMemo(() => {
    return {
      id,
      question,
    };
  }, [id, question]) as Record<string, string>;

  return (
    <div className='block relative h-screen'>
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
            updatedQuestion: payload,
            questionBeingEdited: properties.questionBeingEdited,
          });
        }}
      >
        <TextField name='id' disabled />
        <TextField name='question' label='Question' />
      </HtmlForm>
      <JsonView
        className='text-xs overflow-y-auto'
        src={{ question, id, variant, variants, ...rest }}
      />
    </div>
  );
}
