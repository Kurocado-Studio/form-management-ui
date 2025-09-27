import { VariantEnum } from '@kurocado-studio/html-form-service-ui-config';
import type { GridProps } from '@kurocado-studio/ui-react-research-and-development';

import type { FormNode, QuestionNode, SectionNode } from '../lib';

export const CONTAINER_MAX_WIDTH = 'w-full mx-auto max-w-[2440px]';

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const GRID_LAYOUT: GridProps = {
  gap: '1',
  columns: {
    base: '12',
  },
};

export const EMPTY_FORM_NODE: FormNode = {
  createdAt,
  description: '',
  id: '',
  sections: [],
  updatedAt,
  title: '',
};

export const EMPTY_SECTION_NODE: SectionNode = {
  createdAt,
  description: 'No description provided',
  id: '',
  order: 0,
  questions: [],
  title: '',
  updatedAt,
};

export const EMPTY_QUESTION_NODE: QuestionNode = {
  hidden: false,
  id: '',
  question: 'No name provided',
  required: false,
  variant: VariantEnum.TEXT,
  variants: {},
};
