import type { Question } from '@kurocado-studio/html-form-service-ui-config';
import { Card } from '@kurocado-studio/react-design-system';
import { FadeIn } from '@kurocado-studio/ui-react-research-and-development';
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
} from '../questions/TextFieldNode.schema';

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
        <FadeIn fadeInDirection={'UP'} viewport={{ once: true }}>
          <TextField name='id' disabled />
        </FadeIn>
        <FadeIn fadeInDirection={'UP'} iewport={{ once: true }}>
          <TextField name='question' label='Question' />
        </FadeIn>
        <FadeIn fadeInDirection={'UP'} viewport={{ once: true }}>
          <Card>
            <Card.Body>
              <JsonView
                className='overflow-y-auto text-xs'
                src={{ question, id, variant, variants, ...rest }}
              />
            </Card.Body>
          </Card>
        </FadeIn>
      </HtmlForm>
    </div>
  );
}
