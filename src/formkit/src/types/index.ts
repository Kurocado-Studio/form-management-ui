import type {
  InputFieldAutocapitalizeEnum,
  InputFieldInputModeEnum,
  InputFieldTypeEnum,
  VariantEnum,
} from '../enums';

export interface TextFieldQuestionNode extends Record<string, unknown> {
  id: string;
  name: string;
  type: InputFieldTypeEnum;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  autocomplete?: string;
  autocapitalize?: InputFieldAutocapitalizeEnum;
  spellcheck?: boolean;
  inputmode?: InputFieldInputModeEnum;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export type VariantMap = {
  [VariantEnum.TEXT]?: TextFieldQuestionNode;
};

export interface Question extends Record<string, unknown> {
  id: string;
  question: string;
  description?: string;
  hint?: string;
  tooltip?: string;
  name?: string;
  hidden: boolean;
  required: boolean;
  variant: VariantEnum;
  variants: VariantMap;
}

export interface Form extends Record<string, unknown> {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  sections: Array<Section>;
}

export interface Section extends Record<string, unknown> {
  id: string;
  title: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  questions: Array<Question>;
}
