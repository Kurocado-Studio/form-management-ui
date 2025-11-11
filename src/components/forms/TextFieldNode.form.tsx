import { type Question } from '@kurocado-studio/formkit-ui-models';
import {
  AnimateMotionPresence,
  Card,
  useFadeAnimations,
} from '@kurocado-studio/react-design-system';
import { Controls } from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import React from 'react';

import { useFormKitService } from '../../application/useFormKitService';
import { useFormKitStore } from '../../application/useFormikStore';
import { textFieldNodeFormSchema } from '../../schemas/textFieldNode.schema';
import type { TextFieldNodeUpdaterSchema } from '../../types';
import { JsonViewer } from '../JsonViewer';

export function TextFieldNodeEditor(): React.ReactNode {
  const { formsNodeTree, composePaths } = useFormKitStore((state) => state);
  const { executeUpdateQuestion } = useFormKitService();
  const { fadeInBottom, fadeInDefault } = useFadeAnimations();

  const { toCurrentQuestion, toQuestions } = composePaths();

  const questionBeingEdited: Question = get(
    formsNodeTree,
    toCurrentQuestion,
    {},
  );
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
    }, 190);
    return () => clearTimeout(timeout);
  }, [questionBeingEdited.id]);

  return (
    <Card
      {...fadeInBottom.initial}
      data-testid='text-field-node-editor'
      className='relative block h-screen overflow-y-auto'
    >
      <AnimateMotionPresence mode={'sync'} isVisible={isAnimationReady}>
        <Card.Body {...fadeInDefault.initial}>
          <Controls.HtmlForm<TextFieldNodeUpdaterSchema>
            schema={textFieldNodeFormSchema}
            id={defaultValue.id}
            key={defaultValue.id}
            className={'space-y-4'}
            defaultValue={isAnimationReady ? defaultValue : questionBeingEdited}
            shouldValidate='onInput'
            shouldRevalidate='onInput'
            onSuccess={(updatedQuestion: TextFieldNodeUpdaterSchema) => {
              executeUpdateQuestion({
                updatedQuestionProperties: updatedQuestion,
              });
            }}
          >
            <Controls.InputTextField name='id' disabled label='Question Id' />
            <Controls.InputTextField name='question' label='Question' />
          </Controls.HtmlForm>
          <AnimateMotionPresence isVisible={isAnimationReady}>
            <JsonViewer payload={questionMap[defaultValue.id]} />
          </AnimateMotionPresence>
        </Card.Body>
      </AnimateMotionPresence>
    </Card>
  );
}
