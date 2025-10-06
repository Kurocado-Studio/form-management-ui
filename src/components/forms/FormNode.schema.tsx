import { type ZodTypeAny, z } from 'zod';

export interface FormNodeUpdaterSchema extends Record<string, unknown> {
  title: string;
}

type FormNodeUpdaterSchemaShape = {
  [K in keyof FormNodeUpdaterSchema]: ZodTypeAny;
};

export const formNodeFormSchema = z.object<FormNodeUpdaterSchemaShape>({
  title: z.string().trim().min(1, {
    message: 'This field cannot be empty or contain only whitespace.',
  }),
  description: z.string().trim().min(1, {
    message: 'This field cannot be empty or contain only whitespace.',
  }),
});

export type FormNodeFormSchema = z.infer<typeof formNodeFormSchema>;
