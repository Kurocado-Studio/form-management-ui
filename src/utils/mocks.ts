import {
  type Form,
  InputFieldTypeEnum,
  type Question,
  type Section,
  VariantEnum,
} from '@kurocado-studio/formkit-ui-models';

import { FormsNodeTree, SectionNodeTree } from '../types';

export const mockedQuestion1: Question = {
  id: '391a5218-2a40-4652-895b-683e2e25dd96',
  question: 'What’s the name of your form or project?',
  description: 'Who is this description for?',
  hidden: false,
  required: false,
  variant: VariantEnum.TEXT,
  variants: {
    TEXT: {
      id: '10ae5f58-6de4-4aef-999e-d7b9df78056b',
      name: 'unknown',
      type: InputFieldTypeEnum.TEXT,
      required: false,
    },
  },
  name: '4c9107e4-2a29-4460-ab77-648974e2634f',
};

export const mockedQuestion2: Question = {
  id: 'c2bb388c-e187-440b-b4d7-092c0be49c6f',
  question: 'Who is this form for?',
  description: 'Who is this description for?',
  hidden: false,
  required: false,
  variant: VariantEnum.TEXT,
  variants: {
    TEXT: {
      id: '01e3f9d0-d4c7-43f4-aa48-2987edcdafea',
      name: 'unknown',
      type: InputFieldTypeEnum.TEXT,
      required: false,
    },
  },
  name: 'e28e40c9-6821-43d7-a018-c81cf3a29dd6',
};

export const mockedSection: Section = {
  id: '821efcf2-cc16-4fa3-9ae9-b467738e2c4a',
  title: 'Section 1',
  description: 'This is a section',
  order: 0,
  createdAt: '2025-11-11T16:05:23.351Z',
  updatedAt: '2025-11-11T16:05:23.351Z',
  questions: [mockedQuestion1, mockedQuestion2],
};

export const mockedSectionNodeTree: SectionNodeTree = {
  ...mockedSection,
  questions: {
    [mockedQuestion1.id]: mockedQuestion1,
    [mockedQuestion2.id]: mockedQuestion2,
  },
};

export const mockedForm: Form = {
  id: '2305e7ed-b583-4ef7-9a4c-2bc094b34894',
  title: 'Welcome to FormKit',
  description:
    'This short demo introduces how FormKit lets you design and (soon) embed forms dynamically. You can edit any title, description, or question — just click and edit!',
  createdAt: '2025-11-11T16:05:23.351Z',
  updatedAt: '2025-11-11T16:05:23.351Z',
  sections: [mockedSection],
};

export const mockedFormNodeTree: FormsNodeTree = {
  [mockedForm.id]: {
    ...mockedForm,
    sections: {
      [mockedSection.id]: mockedSectionNodeTree,
    },
  },
};
