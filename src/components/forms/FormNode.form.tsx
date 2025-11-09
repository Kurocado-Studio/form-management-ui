import type { Form } from '@kurocado-studio/formkit-ui-models';
import {
  AnimateMotionPresence,
  Card,
  useFadeAnimations,
} from '@kurocado-studio/react-design-system';
import { HtmlForm } from '@kurocado-studio/web-forms-react';
import { get } from 'lodash-es';
import React from 'react';

import { useFormKitService } from '../../application/useFormKitService';
import { useFormKitStore } from '../../application/useFormikStore';
import {
  FormNodeUpdaterSchema,
  formNodeFormSchema,
} from '../../schemas/formNode.schema';
import { JsonViewer } from '../JsonViewer';
import { TextField } from '../controls/TextField';

export function FormNodeEditor(): React.ReactNode {
  const { formsNodeTree, composePaths } = useFormKitStore((state) => state);
  const { toCurrentForm } = composePaths();

  const { executeUpdateForm } = useFormKitService();

  const { fadeInRight } = useFadeAnimations();

  const payload: Form & Omit<Form, 'sections'> = get(
    formsNodeTree,
    toCurrentForm,
    {},
  );

  const { title, id, description } = payload;

  const defaultValue = React.useMemo(() => {
    return {
      title,
      id,
      description,
    };
  }, [description, id, title]);

  return (
    <Card
      key={id}
      {...fadeInRight.initial}
      className='relative block h-full overflow-y-auto'
    >
      <Card.Body>
        <HtmlForm<FormNodeUpdaterSchema>
          key={`html-form-${id}`}
          schema={formNodeFormSchema}
          defaultValue={defaultValue}
          shouldValidate='onInput'
          shouldRevalidate='onInput'
          onSuccess={(updatedProperties) => {
            executeUpdateForm({ updatedProperties });
          }}
        >
          <TextField name='id' disabled />
          <TextField name='title' label='Title' />
          <TextField name='description' label='Description' />
        </HtmlForm>
        <AnimateMotionPresence isVisible>
          <JsonViewer key={id} payload={payload} />
        </AnimateMotionPresence>
      </Card.Body>
    </Card>
  );
}
