import {
  type Form,
  type Question,
  type Section,
  VariantEnum,
} from '@kurocado-studio/html-form-service-ui-config';
import type { GridProps } from '@kurocado-studio/ui-react-research-and-development';

export const CONTAINER_MAX_WIDTH = 'w-full mx-auto max-w-[2440px]';

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const GRID_LAYOUT: GridProps = {
  gap: '1',
  columns: {
    base: '12',
  },
};

export const EMPTY_FORM_NODE: Form = {
  createdAt,
  description: '',
  id: '',
  sections: [],
  updatedAt,
  title: '',
};

export const EMPTY_SECTION_NODE: Section = {
  createdAt,
  description: 'No description provided',
  id: '',
  order: 0,
  questions: [],
  title: '',
  updatedAt,
};

export const EMPTY_QUESTION_NODE: Question = {
  hidden: false,
  id: '',
  question: 'No name provided',
  description: 'No description provided',
  required: false,
  variant: VariantEnum.TEXT,
  variants: {},
};
