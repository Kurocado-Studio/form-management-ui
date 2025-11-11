import { type Form, VariantEnum } from '@kurocado-studio/formkit-ui-models';
import { expect } from 'vitest';

import { SectionNodeTree } from '../../types';
import { composeFormsNodeTree } from './composeFormsNodeTree';

describe('composeFormsNodeTree', () => {
  const testForm: Form[] = [
    {
      id: '1',
      title: 'Form1',
      createdAt: '2022-06-06',
      updatedAt: '2022-06-06',
      sections: [
        {
          id: '1',
          title: 'Section1',
          questions: [
            {
              id: 'Q1',
              title: 'Question1',
              answer: 'Answer1',
              question: '',
              description: '',
              hidden: false,
              required: false,
              variant: VariantEnum.TEXT,
              variants: {
                TEXT: undefined,
              },
            },
          ],
          order: 0,
          createdAt: '',
          updatedAt: '',
        },
      ],
    },
    {
      id: '2',
      title: 'Form2',
      createdAt: '2022-06-06',
      updatedAt: '2022-06-06',
      sections: [
        {
          id: '2',
          title: 'Section2',
          questions: [
            {
              id: 'Q2',
              title: 'Question2',
              answer: 'Answer2',
              question: '',
              description: '',
              hidden: false,
              required: false,
              variant: VariantEnum.TEXT,
              variants: {
                TEXT: undefined,
              },
            },
          ],
          order: 0,
          createdAt: '',
          updatedAt: '',
        },
      ],
    },
  ];

  it('Should compose forms node tree correctly', async () => {
    const result = composeFormsNodeTree(testForm);

    const expected: Record<
      string,
      Omit<Form, 'sections'> & { sections: Record<string, SectionNodeTree> }
    > = {
      '1': {
        id: '1',
        title: 'Form1',
        createdAt: '2022-06-06',
        updatedAt: '2022-06-06',
        sections: {
          '1': {
            id: '1',
            title: 'Section1',
            order: 0,
            createdAt: '',
            updatedAt: '',
            questions: {
              Q1: {
                id: 'Q1',
                title: 'Question1',
                answer: 'Answer1',
                question: '',
                description: '',
                hidden: false,
                required: false,
                variant: VariantEnum.TEXT,
                variants: {
                  TEXT: undefined,
                },
              },
            },
          },
        },
      },
      '2': {
        id: '2',
        title: 'Form2',
        createdAt: '2022-06-06',
        updatedAt: '2022-06-06',
        sections: {
          '2': {
            id: '2',
            title: 'Section2',
            order: 0,
            createdAt: '',
            updatedAt: '',
            questions: {
              Q2: {
                id: 'Q2',
                title: 'Question2',
                answer: 'Answer2',
                question: '',
                description: '',
                hidden: false,
                required: false,
                variant: VariantEnum.TEXT,
                variants: {
                  TEXT: undefined,
                },
              },
            },
          },
        },
      },
    };

    expect(result).toEqual(expected);
  });
});
