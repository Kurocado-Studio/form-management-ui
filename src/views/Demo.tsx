// TODO: update styleguide to disable this rule on files ending with (.tsx)
/* eslint-disable unicorn/no-null */
import type { Form, Question } from '@kurocado-studio/formkit-ui-models';
import { useFadeAnimations } from '@kurocado-studio/react-design-system';
import {
  Controls,
  Grid,
  Text,
} from '@kurocado-studio/ui-react-research-and-development';
import { motion } from 'framer-motion';
import { get } from 'lodash-es';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import { useFormKitService } from '../application/useFormKitService';
import { useFormKitStore } from '../application/useFormikStore';
import { useReadFormUseCase } from '../application/usecase/Forms/useReadForm.usecase';
import { FormDesignerManager } from '../components/FormDesignerManager';
import { Header } from '../components/Header';
import { NodeDesignerControls } from '../components/NodeDesignerControls';
import { NodeRenderer } from '../components/NodeRenderer';
import { QuestionCreator } from '../components/QuestionCreator';
import {
  CONTAINER_MAX_WIDTH,
  EMPTY_FORM_NODE,
  GRID_LAYOUT,
  KUROCADO_STUDIO_DEMO_FORM_ID,
} from '../config/constants';

const questionControlWithinGridClassNamesOverwrites = [
  'z-20 col-span-12 mb-2 w-full',
  'md:col-span-12',
  'xl:col-span-10 xl:col-start-2',
];

export function Demo(): React.ReactNode {
  const { executeGetFormById } = useFormKitService();

  const { getFormByIdState, formsNodeTree, formIdBeingEdited, composePaths } =
    useFormKitStore();

  const { executeReadForm } = useReadFormUseCase();

  const { toQuestions, toCurrentForm } = composePaths();

  const questionsMap = get(formsNodeTree, toQuestions, {});

  const { title, description }: Form = get(
    formsNodeTree,
    toCurrentForm,
    EMPTY_FORM_NODE,
  );

  const handleReadCurrentFormById = React.useCallback((): void => {
    executeReadForm({ id: formIdBeingEdited });
  }, [formIdBeingEdited]);

  const questionsBeingEdited: Array<Question> = Object.values(questionsMap);

  const hasGetFormByIdApiError = getFormByIdState.error;
  const isLoadingGetFormByIdApi = getFormByIdState.isLoading;

  const { fadeInLeft, fadeInDefault } = useFadeAnimations();

  React.useEffect(() => {
    if (
      !isLoadingGetFormByIdApi &&
      formIdBeingEdited === undefined &&
      !hasGetFormByIdApiError
    ) {
      executeGetFormById({
        id: KUROCADO_STUDIO_DEMO_FORM_ID,
      }).then();
    }
  }, [
    executeGetFormById,
    hasGetFormByIdApiError,
    isLoadingGetFormByIdApi,
    formIdBeingEdited,
  ]);

  React.useEffect(() => {
    if (formIdBeingEdited) {
      handleReadCurrentFormById();
    }
  }, [formIdBeingEdited, handleReadCurrentFormById]);

  return (
    <main className='absolute inset-0 flex flex-col overflow-hidden bg-gray-100'>
      <Header />
      <Grid
        {...GRID_LAYOUT}
        className={twMerge('flex-1 overflow-hidden p-1', CONTAINER_MAX_WIDTH)}
      >
        <motion.div
          {...fadeInLeft.initial}
          className='z-20 hidden h-full md:col-span-3 md:w-full lg:block xl:md:col-span-2'
        >
          <QuestionCreator />
        </motion.div>
        <section className='relative z-10 col-span-12 w-full overflow-y-auto pt-24 md:pt-12 lg:col-span-5 xl:col-span-6'>
          <Controls.HtmlForm id='form-designer-preview'>
            <Grid
              {...GRID_LAYOUT}
              {...fadeInDefault.initial}
              className={twMerge(
                'subgrid relative pb-24',
                'col-span-12 w-full px-2',
              )}
            >
              <header
                className={twMerge(
                  'relative col-span-12 mt-8 mb-2 w-full px-2',
                  'md:col-span-12',
                  'xl:col-span-10 xl:col-start-2',
                )}
              >
                <Text.H3 as='h1' weight='bold' fontDisplay>
                  {getFormByIdState.isLoading
                    ? 'Loading...'
                    : (title ?? 'No title provided')}
                </Text.H3>
                <Text.BodySm className='mb-4'>
                  {getFormByIdState.isLoading
                    ? null
                    : (description ?? 'No description provided')}
                </Text.BodySm>
              </header>
              {questionsBeingEdited.map(
                (question: Question): React.ReactNode => {
                  return (
                    <NodeDesignerControls
                      key={question.id}
                      question={question}
                      className={twMerge(
                        questionControlWithinGridClassNamesOverwrites,
                      )}
                    >
                      <NodeRenderer questionNode={question} />
                    </NodeDesignerControls>
                  );
                },
              )}
            </Grid>
          </Controls.HtmlForm>
          <div
            aria-label='Click to see the form'
            className={twMerge(
              'cursor-pointer',
              'border border-transparent',
              'transition-colors duration-150',
              'hover:border-1 hover:border-blue-400 hover:bg-gray-400/15',
              'fixed inset-x-0 inset-y-0 z-0',
            )}
            role='button'
            onClick={handleReadCurrentFormById}
          />
        </section>
        <div className='z-20 hidden h-full overflow-y-auto md:col-span-4 md:w-full lg:block'>
          <FormDesignerManager />
        </div>
      </Grid>
    </main>
  );
}
