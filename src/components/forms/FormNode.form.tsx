import type { Form } from '@kurocado-studio/html-form-service-ui-config';
import {
  AnimateMotionPresence,
  Card,
  PolymorphicMotionElement,
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
  const { fadeInDefault } = useFadeAnimations();
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
      {...fadeInRight.initial}
      className='relative block h-full overflow-y-auto'
    >
      <Card.Body>
        <AnimateMotionPresence isVisible>
          <PolymorphicMotionElement {...fadeInDefault.initial}>
            <HtmlForm<FormNodeUpdaterSchema>
              key={id}
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
          </PolymorphicMotionElement>
          <JsonViewer key={id} payload={payload} />
        </AnimateMotionPresence>
      </Card.Body>
    </Card>
  );
}
