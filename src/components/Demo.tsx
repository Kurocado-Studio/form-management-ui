import {
  Avatar,
  Button,
  Card,
  Grid,
  type GridProps,
  Panel,
} from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { CONTAINER_MAX_WIDTH } from '../config/constants';
import { useFormKitService } from '../hooks/useFormKitService';
import { HtmlForm } from '../lib';
import type { TextFieldQuestionCreatorDto } from '../types';
import { QuestionControls } from './QuestionControls';
import { QuestionTypeCreator } from './QuestionTypeCreator';
import { TextField } from './TextField';

const gridLayout: GridProps = {
  gap: '1',
  columns: {
    base: '12',
  },
};

const schema = z.object({
  MY_INPUT: z.string().email('Incorrect email format'),
  MY_INPUT_THREE: z.string(),
  MY_INPUT_TWO: z.enum(['General', 'Bugs', 'Collab']),
});

enum CurrentViewEnum {
  QUESTION = 'QUESTION',
  SECTION = 'SECTION',
  FORM = 'FORM',
}

export function Demo(): React.ReactNode {
  const {
    isApiInProgress,
    sectionBeingEdited,
    questionBeingEdited,
    formBeingEdited,
    setQuestionToEdit,
    addTextFieldQuestion,
    getFormById,
  } = useFormKitService();

  const [currentView, setCurrentView] = React.useState<CurrentViewEnum>(
    CurrentViewEnum.FORM,
  );

  const [isConfigPanelOpen, setIsConfigPanelOpen] =
    React.useState<boolean>(false);

  const [isQuestionSelectorPanelOpen, setIsQuestionSelectorPanelOpen] =
    React.useState<boolean>(false);

  const [
    isPreviewConfigPanelOpensConfigPanelOpen,
    setIsPreviewConfigPanelOpen,
  ] = React.useState<boolean>(false);

  const [isQuestionEditorOpen, setIsQuestionEditorOpen] =
    React.useState<boolean>(false);

  const handleSetQuestionToEdit = (
    questionToBeEdited: Record<string, unknown>,
    shouldTriggerPanel: boolean,
  ): void => {
    setQuestionToEdit(questionToBeEdited);
    if (shouldTriggerPanel) {
      setIsQuestionSelectorPanelOpen(true);
    }
    handleScrollToQuestionNode(questionToBeEdited?.['id'] as string);
    setCurrentView(CurrentViewEnum.QUESTION);
  };

  const handleCreateTextFieldQuestion = async (
    payload: TextFieldQuestionCreatorDto,
  ): Promise<void> => {
    const newQuestion = await addTextFieldQuestion(payload);

    const newId = get(newQuestion, ['id'], '') as string;
    handleScrollToQuestionNode(newId);
    setCurrentView(CurrentViewEnum.QUESTION);
  };

  const handleScrollToQuestionNode = (questionNodeId: string): void => {
    requestAnimationFrame(() => {
      const element = document.getElementById(questionNodeId);
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    });
  };

  React.useEffect(() => {
    if (formBeingEdited === undefined && !isApiInProgress) {
      getFormById('demo').then(() => {
        setCurrentView(CurrentViewEnum.FORM);
      });
    }
  }, [formBeingEdited, getFormById, isApiInProgress]);

  return (
    <main className='bg-gray-100 flex flex-col h-screen'>
      <Grid
        {...gridLayout}
        className={twMerge('shadow bg-white p-1', CONTAINER_MAX_WIDTH)}
      >
        <Avatar
          alt='kurocado-studio'
          src='https://avatars.githubusercontent.com/u/148841069?s=200&v=4'
          className='col-span-3'
        />
      </Grid>
      <Grid {...gridLayout} className={'xl:hidden p-1'}>
        <div className={'w-full col-span-5'}>
          <Button>Add Question</Button>
        </div>
        <div className={'w-full col-start-8 col-span-5'}>
          <Button>Add Question</Button>
        </div>
      </Grid>
      <Grid
        {...gridLayout}
        className={twMerge('p-1 flex-1', CONTAINER_MAX_WIDTH)}
      >
        <aside className='hidden xl:block  md:w-full md:col-span-2'>
          <Card className={'h-full'}>
            <Card.Body>
              <QuestionTypeCreator
                handleCreateTextFieldQuestion={handleCreateTextFieldQuestion}
                formBeingEdited={formBeingEdited}
                sectionBeingEdited={sectionBeingEdited}
              />
            </Card.Body>
          </Card>
        </aside>
        <div className='w-full overflow-y-auto col-span-12 lg:col-span-6'>
          <Grid {...gridLayout} className={'relative subgrid'}>
            <header className='z-20 mb-2 w-full col-span-12 lg:col-span-8 lg:col-start-3'>
              <h1>{formBeingEdited?.title}</h1>
              <h1>{formBeingEdited?.description}</h1>
            </header>
            <HtmlForm id='my-form' schema={schema}>
              {formBeingEdited?.sections.map(
                (section: Record<string, unknown>) => {
                  return section.questions.map(
                    ({ question, id, ...rest }: Record<string, unknown>) => {
                      return (
                        <QuestionControls
                          id={id}
                          question={{ question, id, ...rest }}
                          setQuestionToEdit={handleSetQuestionToEdit}
                          className={twMerge(
                            'z-20 mb-2 w-full col-span-12 lg:col-span-8 lg:col-start-3',
                            id === questionBeingEdited?.['id'] &&
                              'outline-none ring-2 ring-purple-600',
                          )}
                          key={id}
                        >
                          <TextField name='MY_INPUT' label='Email' />
                          <TextField name='MY_INPUT_TWO' label='Some Email' />
                        </QuestionControls>
                      );
                    },
                  );
                },
              )}
              <div
                className={
                  'z-10 w-screen h-screen absolute left-0 bottom-0 right-0 top-0'
                }
                role='button'
                onClick={() => setCurrentView(CurrentViewEnum.FORM)}
              />
            </HtmlForm>
          </Grid>
        </div>
        <aside className='hidden xl:block  md:w-full md:col-span-4'>
          <Card className={'h-full'}>
            <Card.Body>
              {currentView === CurrentViewEnum.FORM && (
                <>
                  <p>formBeingEdited</p>
                  <pre>{JSON.stringify(formBeingEdited, null, 2)}</pre>
                </>
              )}
              {currentView === CurrentViewEnum.SECTION && (
                <>
                  <p>sectionBeingEdited</p>
                  <pre>{JSON.stringify(sectionBeingEdited, null, 2)}</pre>
                </>
              )}
              {currentView === CurrentViewEnum.QUESTION && (
                <>
                  <p>questionBeingEdited</p>
                  <pre>{JSON.stringify(questionBeingEdited, null, 2)}</pre>
                </>
              )}
            </Card.Body>
          </Card>
        </aside>
      </Grid>
      <Panel
        triggerPanel={() => setIsConfigPanelOpen((isOpen) => !isOpen)}
        isOpen={isConfigPanelOpen}
      >
        isConfigPanelOpen
      </Panel>
      <Panel
        triggerPanel={() => setIsQuestionSelectorPanelOpen((isOpen) => !isOpen)}
        isOpen={isQuestionSelectorPanelOpen}
      >
        <QuestionTypeCreator
          handleCreateTextFieldQuestion={handleCreateTextFieldQuestion}
          formBeingEdited={formBeingEdited}
          sectionBeingEdited={sectionBeingEdited}
        />
      </Panel>
      <Panel
        triggerPanel={() => setIsPreviewConfigPanelOpen((isOpen) => !isOpen)}
        isOpen={isPreviewConfigPanelOpensConfigPanelOpen}
      >
        isPreviewConfigPanelOpensConfigPanelOpen
      </Panel>
      <Panel
        triggerPanel={() => setIsQuestionEditorOpen((isOpen) => !isOpen)}
        isOpen={isQuestionEditorOpen}
      >
        isPreviewConfigPanelOpensConfigPanelOpen
      </Panel>
    </main>
  );
}
