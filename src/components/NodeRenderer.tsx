import {
  type FormKitNodeVariantMap,
  VariantEnum,
  formRendererComposer,
} from '@kurocado-studio/formkit-ui-react-renderer';

import { TextFieldNode } from './nodes/TextFieldNode';

const nodeComponentMap: FormKitNodeVariantMap = {
  [VariantEnum.TEXT]: TextFieldNode,
};

export const NodeRenderer = formRendererComposer(nodeComponentMap);
