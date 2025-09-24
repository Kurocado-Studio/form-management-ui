import { get } from 'lodash-es';
import React from 'react';

import {
  type FormNode,
  HtmlForm,
  type QuestionNode,
  type SectionNode,
} from '../../lib';
import type { TextFieldQuestionUpdaterDto } from '../../types';
import { TextField } from '../TextField';
import {
  type TextFieldNodeUpdaterSchema,
  textFieldNodeFormSchema,
} from './TextFieldNode.schema';

export type TextInputNodeProps = React.PropsWithChildren<{
  question: QuestionNode;
  form: FormNode;
  section: SectionNode;
  handleUpdateQuestion: (payload: TextFieldQuestionUpdaterDto) => Promise<void>;
}>;

export const TextFieldNodeForm = (
  properties: TextInputNodeProps,
): React.ReactNode => {
  const { form, section, handleUpdateQuestion } = properties;
  const { question, id, variant, variants } = properties.question;

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
          formBeingEdited: form,
          sectionBeingEdited: section,
          updatedProperties: payload,
          questionBeingEdited: properties.question,
        });
      }}
    >
      <TextField name='id' disabled />
      <TextField name='question' label='Question' />
    </HtmlForm>
  );
};
