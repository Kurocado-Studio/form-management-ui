import type { Question } from '@kurocado-studio/html-form-service-ui-config';
import {
  AnimateMotionPresence,
  Card,
  useFadeAnimations,
} from '@kurocado-studio/react-design-system';
import { HtmlForm } from '@kurocado-studio/web-forms-react';
import { get } from 'lodash-es';
import React from 'react';

import { useFormKitService } from '../../application/useFormKitService.ts';
import { useFormKitStore } from '../../application/useFormikStore.ts';
import type { TextFieldQuestionUpdaterDto } from '../../types.ts';
import { JsonViewer } from '../JsonViewer.tsx';
import { TextField } from '../controls/TextField.tsx';
import {
  type TextFieldNodeUpdaterSchema,
  textFieldNodeFormSchema,
} from '../nodes/TextFieldNode';

export type TextFieldQuestionUpdaterHandler = (
  payload: TextFieldQuestionUpdaterDto,
) => Promise<Question>;

export function TextFieldNodeForm(): React.ReactNode {
  const { formsNodeTree, composePaths } = useFormKitStore((state) => state);
  const { executeUpdateQuestion } = useFormKitService();

  const { toCurrentQuestion } = composePaths();

  const { fadeInBottom } = useFadeAnimations();

  const { question, id } = get(formsNodeTree, toCurrentQuestion, {});

  const questionBeingEdited = get(formsNodeTree, toCurrentQuestion, {});

  const [isAnimationReady, setIsAnimationReady] = React.useState(false);

  const [defaultValue, setDefaultValue] = React.useState({
    id,
    question,
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const { id, question } = questionBeingEdited;
      setDefaultValue({
        id,
        question,
      });
      setIsAnimationReady(true);
    }, 300);

    return () => {
      clearTimeout(timeout);
      setIsAnimationReady(false);
    };
  }, [questionBeingEdited]);

  return (
    <Card
      {...fadeInBottom.initial}
      className='relative block h-screen overflow-y-auto'
    >
      <Card.Body>
        <HtmlForm<TextFieldNodeUpdaterSchema>
          id='text-field-node-form'
          key={id}
          schema={textFieldNodeFormSchema}
          defaultValue={defaultValue}
          shouldValidate='onInput'
          shouldRevalidate='onInput'
          onSuccess={(updatedQuestion) => {
            executeUpdateQuestion({
              updatedQuestionProperties: updatedQuestion,
            });
          }}
        >
          <TextField name='id' disabled />
          <TextField name='question' label='Question' />
        </HtmlForm>
        <AnimateMotionPresence isVisible={isAnimationReady}>
          <JsonViewer
            key={questionBeingEdited.id}
            payload={questionBeingEdited}
          />
        </AnimateMotionPresence>
      </Card.Body>
    </Card>
  );
}
