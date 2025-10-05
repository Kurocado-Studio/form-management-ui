import type { Form } from '@kurocado-studio/html-form-service-ui-config';
import { chain, keyBy } from 'lodash-es';

import type { FormsNodeTree } from '../../types';

export function composeFormsNodeTree(apiForms: Form[]): FormsNodeTree {
  return chain(apiForms)
    .map((form) => ({
      ...form,
      sections: chain(form.sections)
        .map((section) => ({
          ...section,
          questions: keyBy(section.questions, 'id'),
        }))
        .keyBy('id')
        .value(),
    }))
    .keyBy('id')
    .value();
}

export function adaptFormToNodeTree(form: Form): FormsNodeTree {
  return {
    [form.id]: {
      ...form,
      sections: chain(form.sections)
        .map((section) => ({
          ...section,
          questions: keyBy(section.questions, 'id'),
        }))
        .keyBy('id')
        .value(),
    },
  };
}
