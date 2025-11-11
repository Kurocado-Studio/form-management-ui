import { VariantEnum } from '@kurocado-studio/formkit-ui-models';
import { ReactTestingLibrary } from '@kurocado-studio/qa';
import { Controls } from '@kurocado-studio/ui-react-research-and-development';
import { get } from 'lodash-es';
import * as React from 'react';

import { mockedQuestion1 } from '../../utils/mocks';
import { TextFieldNode } from './TextFieldNode';

const { render, screen } = ReactTestingLibrary;

describe('Testing TextFieldNode function', () => {
  it('should render InputTextField with correct props', async () => {
    render(
      <Controls.HtmlForm id={'test-html-form'}>
        <TextFieldNode question={mockedQuestion1} />
      </Controls.HtmlForm>,
    );

    const mockedQuestion1VariantId = get(mockedQuestion1, [
      'variants',
      VariantEnum.TEXT,
      'id',
    ]);

    const inputElement = screen.getByLabelText(mockedQuestion1.question);

    expect(inputElement).toHaveAttribute('name', mockedQuestion1VariantId);
    expect(inputElement).toHaveAttribute(
      'aria-label',
      mockedQuestion1.question,
    );
    expect(inputElement).toHaveAttribute(
      'aria-describedby',
      `test-html-form-${mockedQuestion1VariantId}-description`,
    );
  });
});
