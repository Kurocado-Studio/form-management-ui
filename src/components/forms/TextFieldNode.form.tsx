import {
  AnimateMotionPresence,
  Card,
  PolymorphicMotionElement,
  useFadeAnimations,
} from '@kurocado-studio/react-design-system';
import { HtmlForm } from '@kurocado-studio/web-forms-react';
import { get } from 'lodash-es';
import React from 'react';

import { useFormKitService } from '../../application/useFormKitService';
import { useFormKitStore } from '../../application/useFormikStore';
import { textFieldNodeFormSchema } from '../../schemas/textFieldNode.schema';
import type { TextFieldNodeUpdaterSchema } from '../../types';
import { JsonViewer } from '../JsonViewer';
import { TextField } from '../controls/TextField';

export function TextFieldNodeForm(): React.ReactNode {
  const { formsNodeTree, composePaths } = useFormKitStore((state) => state);
  const { executeUpdateQuestion } = useFormKitService();
  const { fadeInBottom, fadeInDefault } = useFadeAnimations();

  const { toCurrentQuestion, toQuestions } = composePaths();

  const questionBeingEdited = get(formsNodeTree, toCurrentQuestion, {});
  const questionMap = get(formsNodeTree, toQuestions, {});

  const [isAnimationReady, setIsAnimationReady] = React.useState(false);

  const [defaultValue, setDefaultValue] = React.useState({
    id: '',
    question: '',
  });

  React.useEffect(() => {
    setIsAnimationReady(false);

    const timeout = setTimeout(() => {
      setDefaultValue({
        id: questionBeingEdited.id,
        question: questionBeingEdited.question,
      });
      setIsAnimationReady(true);
    }, 400);
    return () => clearTimeout(timeout);
  }, [questionBeingEdited.id]);

  return (
    <Card
      {...fadeInBottom.initial}
      className='relative block h-screen overflow-y-auto'
    >
      <Card.Body>
        <AnimateMotionPresence isVisible={isAnimationReady}>
          <PolymorphicMotionElement {...fadeInDefault.initial}>
            <HtmlForm<TextFieldNodeUpdaterSchema>
              schema={textFieldNodeFormSchema}
              id={defaultValue.id}
              key={defaultValue.id}
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
          </PolymorphicMotionElement>
          <JsonViewer
            payload={isAnimationReady ? questionMap[defaultValue.id] : {}}
          />
        </AnimateMotionPresence>
      </Card.Body>
    </Card>
  );
}
