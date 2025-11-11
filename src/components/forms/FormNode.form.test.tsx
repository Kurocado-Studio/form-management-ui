import { ReactTestingLibrary } from '@kurocado-studio/qa';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { vi } from 'vitest';

import { useFormKitService } from '../../application/useFormKitService';
import { useFormKitStore } from '../../application/useFormikStore';
import { FormNodeEditor } from './FormNode.form';

const { render, screen } = ReactTestingLibrary;

vi.mock('../../application/useFormKitService', () => ({
  useFormKitService: vi.fn(),
}));

vi.mock('../../application/useFormikStore', () => ({
  useFormKitStore: vi.fn(),
}));

describe('FormNodeEditor', () => {
  let formIdLabel: HTMLElement;
  let titleLabel: HTMLElement;
  let descriptionLabel: HTMLElement;
  const mockExecuteUpdateForm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useFormKitStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      formsNodeTree: {
        form_1: { id: 'form-1', title: 'My Form', description: 'A test form' },
      },
      composePaths: () => ({ toCurrentForm: ['form_1'] }),
    });

    (useFormKitService as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      executeUpdateForm: mockExecuteUpdateForm,
    });

    render(<FormNodeEditor />);

    formIdLabel = screen.getByLabelText('Form Id');
    titleLabel = screen.getByLabelText('Title');
    descriptionLabel = screen.getByLabelText('Description');
  });

  it('renders default values correctly', () => {
    expect(formIdLabel).toHaveValue('form-1');
    expect(titleLabel).toHaveValue('My Form');
    expect(descriptionLabel).toHaveValue('A test form');
  });

  it('calls executeUpdateForm on success validation', async () => {
    await userEvent.clear(titleLabel);
    await userEvent.type(titleLabel, 'New Title');

    await userEvent.clear(descriptionLabel);
    await userEvent.type(descriptionLabel, 'New description about this form');

    expect(titleLabel).toHaveValue('New Title');
    expect(descriptionLabel).toHaveValue('New description about this form');

    await userEvent.tab();

    expect(mockExecuteUpdateForm).toHaveBeenLastCalledWith({
      updatedProperties: {
        title: 'New Title',
        description: 'New description about this form',
      },
    });
  });

  it(`displays 'required' when title is empty`, async () => {
    const errorElement = document.querySelector('[id$="-title-error"]'); // ends with -title-error

    expect(titleLabel).toHaveValue('My Form');

    await userEvent.clear(titleLabel);
    await userEvent.tab();

    expect(errorElement).toBeInTheDocument();
    expect(mockExecuteUpdateForm).not.toHaveBeenCalled();
  });

  it(`displays 'required' when description is empty`, async () => {
    const errorElement = document.querySelector('[id$="-description-error"]'); // ends with -title-error

    expect(descriptionLabel).toHaveValue('A test form');

    await userEvent.clear(descriptionLabel);
    await userEvent.tab();

    expect(errorElement).toBeInTheDocument();
    expect(mockExecuteUpdateForm).not.toHaveBeenCalled();
  });
});
