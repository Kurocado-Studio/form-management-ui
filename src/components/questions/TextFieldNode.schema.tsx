import { type ZodTypeAny, z } from 'zod';

export interface TextFieldNodeUpdaterSchema extends Record<string, unknown> {
  question: string;
}

type TextFieldNodeUpdaterSchemaShape = {
  [K in keyof TextFieldNodeUpdaterSchema]: ZodTypeAny;
};

export const textFieldNodeFormSchema =
  z.object<TextFieldNodeUpdaterSchemaShape>({
    question: z.string().trim().min(1, {
      message: 'This field cannot be empty or contain only whitespace.',
    }),
  });

export type TextFieldNodeSchema = z.infer<typeof textFieldNodeFormSchema>;
