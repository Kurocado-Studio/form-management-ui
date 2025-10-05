import { HtmlForm } from '@kurocado-studio/web-forms-react';
import { get } from 'lodash-es';
import React from 'react';
import JsonView from 'react18-json-view';

import { useFormKitService } from '../../application/useFormKitService';
import { useFormKitStore } from '../../store/useFormikStore';
import { TextField } from '../TextField';
// eslint-disable-next-line
import { FormNodeUpdaterSchema, formNodeFormSchema } from './FormNode.schema';

export function FormNodeEditor(): React.ReactNode {
  const { formsNodeTree, formIdBeingEdited } = useFormKitStore(
    (state) => state,
  );

  const { executeUpdateForm } = useFormKitService();

  const payload = get(formsNodeTree, [formIdBeingEdited ?? '']);
  const { title, id, description } = payload;

  const defaultValue = React.useMemo(() => {
    return {
      title,
      id,
      description,
    };
  }, [description, id, title]) as Record<string, string>;

  return (
    <div className='block relative h-full overflow-y-auto'>
      <HtmlForm<FormNodeUpdaterSchema>
        id='form-node-form'
        key={id ?? 'form-node-form-key'}
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
      <JsonView className='text-xs overflow-y-auto' src={payload} />
    </div>
  );
}
