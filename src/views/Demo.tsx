import { useWindowSize } from '@kurocado-studio/react-utils';
import {
  Button,
  Card,
  Grid,
  Panel,
} from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { Header } from '../components/Header';
import { QuestionControls } from '../components/QuestionControls';
import { QuestionTypeCreator } from '../components/QuestionTypeCreator';
import { QuestionTypeManager } from '../components/QuestionTypeManager';
import { FormDesignerManager } from '../components/forms/FormDesignerManager';
import { CONTAINER_MAX_WIDTH, GRID_LAYOUT } from '../config/constants';
import { CurrentFormViewEnum } from '../config/enums';
import { useFormKitService } from '../hooks/useFormKitService';
import { HtmlForm } from '../lib';
import type { TextFieldQuestionCreatorDto } from '../types';

export function Demo(): React.ReactNode {
  const {
    isApiInProgress,
    sectionBeingEdited,
    questionBeingEdited,
    formBeingEdited,
    setQuestionToEdit,
    handleUpdateQuestion,
    handleAddTextFieldQuestion,
    getFormById,
  } = useFormKitService();

  const {
    size: { innerWidth },
  } = useWindowSize();

  const [currentView, setCurrentView] = React.useState<CurrentFormViewEnum>(
    CurrentFormViewEnum.FORM,
  );

  const [isConfigPanelOpen, setIsConfigPanelOpen] =
    React.useState<boolean>(false);

  const [isQuestionSelectorPanelOpen, setIsQuestionSelectorPanelOpen] =
    React.useState<boolean>(false);

  const handleSetQuestionToEdit = (
    questionToBeEdited: Record<string, unknown>,
    shouldTriggerPanel: boolean,
  ): void => {
    setQuestionToEdit(questionToBeEdited);
    if (shouldTriggerPanel) {
      setIsConfigPanelOpen(true);
    }
    handleScrollToQuestionNode(questionToBeEdited?.['id'] as string);
    setCurrentView(CurrentFormViewEnum.QUESTION);
  };

  const handleCreateTextFieldQuestion = async (
    payload: TextFieldQuestionCreatorDto,
  ): Promise<void> => {
    const newQuestion = await handleAddTextFieldQuestion(payload);

    const newId = get(newQuestion, ['id'], '') as string;
    handleScrollToQuestionNode(newId);
    setCurrentView(CurrentFormViewEnum.QUESTION);

    if (isQuestionSelectorPanelOpen) {
      handleQuestionSelectorPanel();
    }
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

  const handleQuestionSelectorPanel = (): void => {
    setIsQuestionSelectorPanelOpen((isOpen) => !isOpen);
  };

  const handleConfigPanel = (): void => {
    setIsConfigPanelOpen((isOpen) => !isOpen);
  };

  const handleFormSettingsPanel = (): void => {
    setCurrentView(CurrentFormViewEnum.FORM);
    handleConfigPanel();
  };

  React.useEffect(() => {
    if (formBeingEdited === undefined && !isApiInProgress) {
      getFormById('demo').then(() => {
        setCurrentView(CurrentFormViewEnum.FORM);
      });
    }
  }, [formBeingEdited, getFormById, isApiInProgress]);

  return (
    <main className='bg-gray-100 flex flex-col h-screen'>
      <Header />
      <Grid {...GRID_LAYOUT} className={'xl:hidden p-1'}>
        <div className={'w-full col-span-5'}>
          <Button onClick={handleQuestionSelectorPanel}>Add Question</Button>
        </div>
        <div className={'w-full col-start-8 col-span-5'}>
          <Button onClick={handleFormSettingsPanel}>Form Settings</Button>
        </div>
      </Grid>
      <Grid
        {...GRID_LAYOUT}
        className={twMerge('p-1 flex-1', CONTAINER_MAX_WIDTH)}
      >
        <Card
          className={'h-full hidden xl:block z-20 md:w-full md:col-span-2'}
          as={'aside'}
        >
          <Card.Body>
            <QuestionTypeCreator
              handleCreateTextFieldQuestion={handleCreateTextFieldQuestion}
              formBeingEdited={formBeingEdited}
              sectionBeingEdited={sectionBeingEdited}
            />
          </Card.Body>
        </Card>
        <div className='w-full overflow-y-auto col-span-12 lg:col-span-6'>
          <Grid
            {...GRID_LAYOUT}
            className={twMerge(
              'relative subgrid overflow-hidden',
              'w-full px-2 overflow-y-auto col-span-12 lg:col-span-6',
            )}
          >
            <header className='relative mb-2 w-full col-span-12 lg:col-span-8 lg:col-start-3'>
              <h1>{formBeingEdited?.title}</h1>
              <h1>{formBeingEdited?.description}</h1>
            </header>
            <HtmlForm id='form-designer-preview'>
              {sectionBeingEdited?.questions.map(
                (question: Record<string, unknown>): React.ReactNode => {
                  return (
                    <QuestionControls
                      key={question.id}
                      id={question.id}
                      question={question}
                      setQuestionToEdit={handleSetQuestionToEdit}
                      className={twMerge(
                        'z-20 mb-2 w-full col-span-12 lg:col-span-8 lg:col-start-3',
                        question.id === questionBeingEdited?.['id'] &&
                          'outline-none ring-2 ring-purple-600',
                      )}
                    >
                      <QuestionTypeManager questionBeingEdited={question} />
                    </QuestionControls>
                  );
                },
              )}
            </HtmlForm>
            <div
              className='z-10 w-screen h-screen absolute left-0 bottom-0 right-0 top-0'
              role='button'
              onClick={() => setCurrentView(CurrentFormViewEnum.FORM)}
            />
          </Grid>
        </div>
        <Card className={'hidden xl:block  md:w-full md:col-span-4 h-full'}>
          <Card.Body>
            {innerWidth > 768 && (
              <FormDesignerManager
                currentFormView={currentView}
                handleUpdateQuestion={handleUpdateQuestion}
                formBeingEdited={formBeingEdited}
                sectionBeingEdited={sectionBeingEdited}
                questionBeingEdited={questionBeingEdited}
              />
            )}
          </Card.Body>
        </Card>
      </Grid>
      <Panel triggerPanel={handleConfigPanel} isOpen={isConfigPanelOpen}>
        {innerWidth < 768 && (
          <FormDesignerManager
            currentFormView={currentView}
            handleUpdateQuestion={handleUpdateQuestion}
            formBeingEdited={formBeingEdited}
            sectionBeingEdited={sectionBeingEdited}
            questionBeingEdited={questionBeingEdited}
          />
        )}
        <Button variant='secondary'>dfjkl</Button>
      </Panel>
      <Panel
        triggerPanel={handleQuestionSelectorPanel}
        isOpen={isQuestionSelectorPanelOpen}
      >
        <QuestionTypeCreator
          handleCreateTextFieldQuestion={handleCreateTextFieldQuestion}
          formBeingEdited={formBeingEdited}
          sectionBeingEdited={sectionBeingEdited}
        />
      </Panel>
    </main>
  );
}
