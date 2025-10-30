import type { Form } from '@kurocado-studio/html-form-service-ui-config';
import { Card } from '@kurocado-studio/react-design-system';
import { FadeIn } from '@kurocado-studio/ui-react-research-and-development';
import { HtmlForm } from '@kurocado-studio/web-forms-react';
import { get } from 'lodash-es';
import React from 'react';
import JsonView from 'react18-json-view';

import { useFormKitService } from '../../application/useFormKitService';
import { useFormKitStore } from '../../application/useFormikStore';
import { TextField } from '../TextField';
import { FormNodeUpdaterSchema, formNodeFormSchema } from './FormNode.schema';

export function FormNodeEditor(): React.ReactNode {
  const { formsNodeTree, composePaths } = useFormKitStore((state) => state);
  const { toCurrentForm } = composePaths();
  const { executeUpdateForm } = useFormKitService();

  const payload: Form & Omit<Form, 'sections'> = get(
    formsNodeTree,
    toCurrentForm,
  );

  const { title, id, description } = payload;

  const defaultValue = React.useMemo(() => {
    return {
      title,
      id,
      description,
    };
  }, [description, id, title]) as Record<string, string>;

  return (
    <HtmlForm<FormNodeUpdaterSchema>
      className='relative block h-full overflow-y-auto'
      id='form-node-form'
      key={id}
      schema={formNodeFormSchema}
      defaultValue={defaultValue}
      shouldValidate='onInput'
      shouldRevalidate='onInput'
      onSuccess={(updatedProperties) => {
        executeUpdateForm({ updatedProperties });
      }}
    >
      <FadeIn fadeInDirection={'UP'} viewport={{ once: true }}>
        <TextField name='id' disabled />
      </FadeIn>
      <FadeIn fadeInDirection={'UP'} viewport={{ once: true }}>
        <TextField name='title' label='Title' />
      </FadeIn>
      <FadeIn fadeInDirection={'UP'} viewport={{ once: true }}>
        <TextField name='description' label='Description' />
      </FadeIn>
      <FadeIn fadeInDirection={'UP'} viewport={{ once: true }}>
        <Card>
          <Card.Body>
            <JsonView className='overflow-y-auto text-xs' src={payload} />
          </Card.Body>
        </Card>
      </FadeIn>
    </HtmlForm>
  );
}
