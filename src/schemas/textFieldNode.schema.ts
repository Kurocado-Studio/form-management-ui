import { z } from 'zod';

import { TextFieldNodeUpdaterSchemaShape } from '../types.ts';

export const textFieldNodeFormSchema =
  z.object<TextFieldNodeUpdaterSchemaShape>({
    question: z.string().trim().min(1, {
      message: 'This field cannot be empty or contain only whitespace.',
    }),
  });
