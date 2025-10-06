import type {
  Form,
  Section,
} from '@kurocado-studio/html-form-service-ui-config';
import { chain, keyBy } from 'lodash-es';

import type { FormsNode, FormsNodeTree } from '../../types';

export function composeFormsNodeTree(apiForms: Form[]): FormsNodeTree {
  return chain(apiForms)
    .map((form: Form) => ({
      ...form,
      sections: chain(form.sections)
        .map((section: Section) => ({
          ...section,
          questions: keyBy(section.questions, 'id'),
        }))
        .keyBy('id')
        .value(),
    }))
    .keyBy('id')
    .value();
}

export function adaptFormToNodeTree(form: Form): FormsNode {
  return {
    [form.id]: {
      ...form,
      sections: chain(form.sections)
        .map((section: Section) => ({
          ...section,
          questions: keyBy(section.questions, 'id'),
        }))
        .keyBy('id')
        .value(),
    },
  };
}
