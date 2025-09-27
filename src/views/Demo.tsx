import {
  Button,
  Card,
  Grid,
  Panel,
  Typography,
} from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { FormDesignerManagerPanel } from '../components/FormDesignerManagerPanel';
import { Header } from '../components/Header';
import { QuestionControls } from '../components/QuestionControls';
import { QuestionTypeCreator } from '../components/QuestionTypeCreator';
import { QuestionTypeManager } from '../components/QuestionTypeManager';
import { CONTAINER_MAX_WIDTH, GRID_LAYOUT } from '../config/constants';
import { CurrentFormViewEnum } from '../config/enums';
import { useFormKitService } from '../hooks/useFormKitService';
import { HtmlForm, type QuestionNode } from '../lib';
import type { TextFieldQuestionCreatorDto } from '../types';

export function Demo(): React.ReactNode {
  const {
    isApiInProgress,
    formByIdState,
    sectionBeingEdited,
    questionBeingEdited,
    formBeingEdited,
    setQuestionToEdit,
    setFormToEdit,
    handleUpdateForm,
    handleUpdateQuestion,
    handleAddTextFieldQuestion,
    getFormById,
  } = useFormKitService();

  const [currentView, setCurrentView] = React.useState<CurrentFormViewEnum>(
    CurrentFormViewEnum.UNKNOWN,
  );

  const [isConfigPanelOpen, setIsConfigPanelOpen] =
    React.useState<boolean>(false);

  const [isQuestionSelectorPanelOpen, setIsQuestionSelectorPanelOpen] =
    React.useState<boolean>(false);

  const handleSetQuestionToEdit = (
    questionToBeEdited: QuestionNode,
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

  const handleClickOnBackground = (): void => {
    setQuestionToEdit(undefined);
    setCurrentView(CurrentFormViewEnum.FORM);
  };

  React.useEffect(() => {
    if (
      formByIdState.error === undefined &&
      formBeingEdited === undefined &&
      !isApiInProgress
    ) {
      getFormById('demo').then(() => {
        setCurrentView(CurrentFormViewEnum.FORM);
      });
    }
  }, [
    formByIdState.error,
    formBeingEdited,
    setFormToEdit,
    getFormById,
    isApiInProgress,
  ]);

  return (
    <main className='bg-gray-100 flex flex-col h-screen'>
      <Header />
      <Grid {...GRID_LAYOUT} className='z-20 lg:hidden p-1'>
        <div className='w-full col-span-5'>
          <Button
            disabled={formByIdState.isLoading}
            onClick={handleQuestionSelectorPanel}
          >
            Add Question
          </Button>
        </div>
        <div className='w-full col-start-8 flex justify-end col-span-5'>
          <Button
            disabled={formByIdState.isLoading}
            onClick={handleFormSettingsPanel}
          >
            Form Settings
          </Button>
        </div>
      </Grid>
      <Grid
        {...GRID_LAYOUT}
        className={twMerge('p-1 flex-1', CONTAINER_MAX_WIDTH)}
      >
        <Card
          className='h-full hidden lg:block z-20 md:w-full md:col-span-3 xl:md:col-span-2'
          as='aside'
        >
          <Card.Body>
            <QuestionTypeCreator
              handleCreateTextFieldQuestion={handleCreateTextFieldQuestion}
              formBeingEdited={formBeingEdited}
              sectionBeingEdited={sectionBeingEdited}
            />
          </Card.Body>
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
              onClick={handleClickOnBackground}
              id={formBeingEdited?.id}
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
                {formByIdState.isLoading
                  ? 'Loading...'
                  : get(formBeingEdited, ['title'])}
              </Typography>
              <Typography
                as='h2'
                className='prose mb-4'
                size={{ base: 'md', xl: 'xl' }}
              >
                {formByIdState.isLoading
                  ? null
                  : get(formBeingEdited, ['description'])}
              </Typography>
            </header>
            <HtmlForm id='form-designer-preview'>
              {get(sectionBeingEdited, ['questions'], []).map(
                (question): React.ReactNode => {
                  return (
                    <QuestionControls
                      key={question?.id}
                      id={question?.id}
                      question={question}
                      setQuestionToEdit={handleSetQuestionToEdit}
                      className={twMerge(
                        'z-20 mb-2 w-full col-span-12',
                        'md:col-span-12',
                        'xl:col-span-10 xl:col-start-2',
                        question?.id === questionBeingEdited?.['id'] &&
                          'outline-none ring-2 ring-purple-600',
                      )}
                    >
                      <QuestionTypeManager questionBeingEdited={question} />
                    </QuestionControls>
                  );
                },
              )}
            </HtmlForm>
          </Grid>
          <div
            className='absolute inset-0 z-0'
            role='button'
            onClick={handleClickOnBackground}
          />
        </section>
        <FormDesignerManagerPanel
          isOpen={isConfigPanelOpen}
          handleTriggerPanel={handleConfigPanel}
          currentFormView={currentView}
          handleUpdateForm={handleUpdateForm}
          handleUpdateQuestion={handleUpdateQuestion}
          formBeingEdited={formBeingEdited}
          sectionBeingEdited={sectionBeingEdited}
          questionBeingEdited={questionBeingEdited}
        />
      </Grid>
      <Panel
        triggerPanel={handleQuestionSelectorPanel}
        isOpen={isQuestionSelectorPanelOpen}
      >
        <QuestionTypeCreator
          handleCreateTextFieldQuestion={handleCreateTextFieldQuestion}
          formBeingEdited={formBeingEdited}
          sectionBeingEdited={sectionBeingEdited}
        />
        <div className='sticky bottom-8 right-8'>
          <Button fullWidth onClick={handleQuestionSelectorPanel}>
            Close Panel
          </Button>
        </div>
      </Panel>
    </main>
  );
}
