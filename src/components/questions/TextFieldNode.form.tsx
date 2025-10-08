import type { Question } from '@kurocado-studio/html-form-service-ui-config';
import { HtmlForm } from '@kurocado-studio/web-forms-react';
import { get } from 'lodash-es';
import React from 'react';
import JsonView from 'react18-json-view';

import { useFormKitService } from '../../application/useFormKitService';
import { useFormKitStore } from '../../application/useFormikStore';
import type { TextFieldQuestionUpdaterDto } from '../../types';
import { TextField } from '../TextField';
import {
  type TextFieldNodeUpdaterSchema,
  textFieldNodeFormSchema,
} from './TextFieldNode.schema';

export type TextFieldQuestionUpdaterHandler = (
  payload: TextFieldQuestionUpdaterDto,
) => Promise<Question>;

export function TextFieldNodeForm(): React.ReactNode {
  const {
    formsNodeTree,
    questionIdBeingEdited,
    formIdBeingEdited,
    sectionIdBeingEdited,
  } = useFormKitStore((state) => state);

  const { executeUpdateQuestion } = useFormKitService();

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
    <div className='relative block h-screen'>
      <HtmlForm<TextFieldNodeUpdaterSchema>
        id='text-field-node-form'
        key={get(variants, [variant as string, 'id'])}
        schema={textFieldNodeFormSchema}
        defaultValue={defaultValue}
        shouldValidate='onInput'
        shouldRevalidate='onInput'
        onSuccess={(updatedQuestion) => {
          executeUpdateQuestion({ updatedQuestionProperties: updatedQuestion });
        }}
      >
        <TextField name='id' disabled />
        <TextField name='question' label='Question' />
      </HtmlForm>
      <JsonView
        className='overflow-y-auto text-xs'
        src={{ question, id, variant, variants, ...rest }}
      />
    </div>
  );
}
