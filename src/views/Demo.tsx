import type {
  Form,
  Question,
} from '@kurocado-studio/html-form-service-ui-config';
import { Card } from '@kurocado-studio/react-design-system';
import {
  Button,
  Grid,
  Typography,
} from '@kurocado-studio/ui-react-research-and-development';
import { HtmlForm } from '@kurocado-studio/web-forms-react';
import { get } from 'lodash-es';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { useFormKitService } from '../application/useFormKitService';
import { FormDesignerManagerPanel } from '../components/FormDesignerManagerPanel';
import { Header } from '../components/Header';
import { QuestionControls } from '../components/QuestionControls';
import { QuestionCreator } from '../components/QuestionCreator';
import { QuestionRenderer } from '../components/QuestionRenderer';
import {
  CONTAINER_MAX_WIDTH,
  EMPTY_FORM_NODE,
  GRID_LAYOUT,
} from '../config/constants';
import { useFormDesignerContext } from '../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../context/PanelsAndModalsContext';
import { FormDesignerPanelsEnum, ModalsAndPanelsViewsEnum } from '../enums';
import { useFormKitStore } from '../store/useFormikStore';

export function Demo(): React.ReactNode {
  const { executeGetFormById, executeReadForm } = useFormKitService();
  const { handleFormDesignerState } = useFormDesignerContext();
  const {
    getFormByIdState,
    formsNodeTree,
    handleSetQuestionToBeEdited,
    formIdBeingEdited,
    questionIdBeingEdited,
    composePaths,
  } = useFormKitStore();

  const { QUESTION_SELECTOR_PANEL } = ModalsAndPanelsViewsEnum;

  const { handlePanelsAndModalsState } = usePanelsAndModalsContext();
  const { toQuestions, toCurrentForm } = composePaths();

  const questionsMap = get(formsNodeTree, toQuestions, {});
  const formBeingEdited: Omit<Form, 'sections' | 'questions'> = get(
    formsNodeTree,
    toCurrentForm,
    EMPTY_FORM_NODE,
  );

  const handleClickOnFormBackground = (): void => {
    handleSetQuestionToBeEdited({ id: undefined });
    handleFormDesignerState(FormDesignerPanelsEnum.FORM);
  };

  const questionsBeingEdited: Array<Question> = Object.values(questionsMap);

  React.useEffect(() => {
    if (
      getFormByIdState.error === undefined &&
      !formIdBeingEdited &&
      !getFormByIdState.isLoading
    ) {
      executeGetFormById({ id: 'demo' }).then();
    }
  }, [
    executeGetFormById,
    formIdBeingEdited,
    getFormByIdState.error,
    getFormByIdState.isLoading,
  ]);

  return (
    <main className='bg-gray-100 flex flex-col h-screen'>
      <Header />
      <Grid {...GRID_LAYOUT} className='z-20 lg:hidden p-1'>
        <div className='w-full col-span-5'>
          <Button
            disabled={getFormByIdState.isLoading}
            onClick={() => handlePanelsAndModalsState(QUESTION_SELECTOR_PANEL)}
          >
            Add Question
          </Button>
        </div>
        <div className='w-full col-start-8 flex justify-end col-span-5'>
          <Button
            disabled={getFormByIdState.isLoading}
            onClick={() => executeReadForm({ id: formIdBeingEdited })}
          >
            Form Settings
          </Button>
        </div>
      </Grid>
      <Grid
        {...GRID_LAYOUT}
        className={twMerge('p-1 flex-1', CONTAINER_MAX_WIDTH)}
      >
        <Card className='h-full hidden lg:block z-20 md:w-full md:col-span-3 xl:md:col-span-2'>
          <Card.Header>
            <QuestionCreator />
          </Card.Header>
        </Card>
        <section className='w-full z-10 overflow-y-auto col-span-12 lg:col-span-5 xl:col-span-6'>
          <Grid
            {...GRID_LAYOUT}
            className={twMerge(
              'relative subgrid overflow-hidden',
              'w-full px-2 overflow-y-auto col-span-12',
            )}
          >
            <header
              role='button'
              onClick={handleClickOnFormBackground}
              className={twMerge(
                'relative z-20 px-2 mt-8 mb-2 w-full col-span-12',
                'md:col-span-12',
                'xl:col-span-10 xl:col-start-2',
              )}
            >
              <Typography
                as='h1'
                className='font-display prose font-semibold'
                size={{
                  base: 'xl',
                  xl: '2xl',
                }}
              >
                {getFormByIdState.isLoading
                  ? 'Loading...'
                  : get(formBeingEdited, ['title'], 'No title provided')}
              </Typography>
              <Typography
                as='h2'
                className='prose mb-4'
                size={{ base: 'md', xl: 'xl' }}
              >
                {getFormByIdState.isLoading
                  ? null
                  : get(
                      formBeingEdited,
                      ['description'],
                      'No description provided',
                    )}
              </Typography>
            </header>
            <HtmlForm id='form-designer-preview'>
              {questionsBeingEdited.map(
                (question: Question): React.ReactNode => {
                  return (
                    <QuestionControls
                      key={question.id}
                      question={question}
                      className={twMerge(
                        'z-20 mb-2 w-full col-span-12',
                        'md:col-span-12',
                        'xl:col-span-10 xl:col-start-2',
                        question.id === questionIdBeingEdited &&
                          'outline-none ring-2 ring-purple-600',
                      )}
                    >
                      <QuestionRenderer questionBeingEdited={question} />
                    </QuestionControls>
                  );
                },
              )}
            </HtmlForm>
          </Grid>
          <div
            className='absolute inset-0 z-0'
            role='button'
            onClick={handleClickOnFormBackground}
          />
        </section>
        <FormDesignerManagerPanel />
      </Grid>
    </main>
  );
}
