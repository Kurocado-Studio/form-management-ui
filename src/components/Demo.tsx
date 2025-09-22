import { useAxios } from '@kurocado-studio/axios-client-react';
import {
  Avatar,
  Button,
  Card,
  Grid,
  type GridProps,
  Panel,
} from '@kurocado-studio/ui-react-research-and-development';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { CONTAINER_MAX_WIDTH } from '../config/constants';
import { axiosHtmlFormsService } from '../config/htmlFormsServiceInstance';
import { useWindowSize } from '../hooks/useWindowSize';
import { HtmlForm } from '../lib';
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

export function Demo(): React.ReactNode {
  const { size } = useWindowSize();

  const shouldTriggerMobilePanel = size.innerWidth < 1370;

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

  const [questionToEdit, setQuestionToEdit] = React.useState<
    Record<string, unknown> | undefined
  >(undefined);

  const [formToEdit, setFormToEdit] = React.useState<
    Record<string, unknown> | undefined
  >(undefined);

  const [{ data, isLoading, error }, handler] = useAxios({
    axiosInstance: axiosHtmlFormsService,
  });

  const handleSetQuestionToEdit = (
    questionToBeEdited: Record<string, unknown>,
    shouldTriggerPanel: boolean,
  ): void => {
    setFormToEdit(undefined);
    setQuestionToEdit(questionToBeEdited);

    if (shouldTriggerPanel) {
      setIsQuestionSelectorPanelOpen(shouldTriggerPanel);
    }
  };

  const handleSetFormToEdit = React.useCallback((): void => {
    setQuestionToEdit(undefined);
    setFormToEdit(data);
  }, [data]);

  React.useEffect(() => {
    const shouldGetData = [
      !isLoading,
      data === undefined,
      error === undefined,
    ].every((isTrue) => isTrue);

    if (shouldGetData) {
      handler({ url: '/forms/demo', method: 'GET' }).then();
    }

    if (
      [
        data !== undefined,
        formToEdit === undefined,
        questionToEdit === undefined,
      ].every(Boolean)
    ) {
      handleSetFormToEdit();
    }
  }, [
    data,
    handler,
    questionToEdit,
    error,
    formToEdit,
    isLoading,
    handleSetFormToEdit,
  ]);

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
              <QuestionTypeCreator />
            </Card.Body>
          </Card>
        </aside>
        <div className='w-full overflow-y-auto col-span-12 lg:col-span-6'>
          <Grid {...gridLayout} className={'relative subgrid'}>
            <header className='z-20 mb-2 w-full col-span-12 lg:col-span-8 lg:col-start-3'>
              <h1>{data?.title}</h1>
              <h1>{data?.description}</h1>
            </header>
            <HtmlForm id='my-form' schema={schema}>
              {data?.sections.map((section: IFormSection) => {
                return section.questions.map(
                  ({ question, id, ...rest }: IQuestion) => {
                    return (
                      <QuestionControls
                        question={{ question, id, ...rest }}
                        setQuestionToEdit={handleSetQuestionToEdit}
                        className='z-20 mb-2 w-full col-span-12 lg:col-span-8 lg:col-start-3'
                        key={id}
                      >
                        <TextField name='MY_INPUT' label='Email' />
                        <TextField name='MY_INPUT_TWO' label='Some Email' />
                        <button type='submit'>Submit</button>
                      </QuestionControls>
                    );
                  },
                );
              })}
              <div
                className={
                  'z-10 w-screen h-screen absolute left-0 bottom-0 right-0 top-0'
                }
                role='button'
                onClick={handleSetFormToEdit}
              ></div>
            </HtmlForm>
          </Grid>
        </div>
        <aside className='hidden xl:block  md:w-full md:col-span-4'>
          <Card className={'h-full'}>
            <Card.Body>
              <pre>{JSON.stringify(questionToEdit, null, 2)}</pre>
              <pre>{JSON.stringify(formToEdit, null, 2)}</pre>
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
        <QuestionTypeCreator />
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
