import {
  Card,
  type CardProps,
} from '@kurocado-studio/ui-research-and-development/react';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

function Template(args: CardProps): React.ReactElement {
  return <Card {...args} />;
}

const meta: Meta<CardProps> = {
  title: 'Components/Card',
  component: Template,
  argTypes: {
    children: {
      description: 'Is the Input disabled?',
    },
    className: {
      control: 'text',
      description: 'Optional Tailwind CSS class for styling',
    },
  },
  tags: ['autodocs'],
};

export const WithCardBody: StoryObj<CardProps> = {
  name: 'With Card Body',
  args: {
    children: (
      <Card.Body>
        <p className='text-sm'>Card Body</p>
      </Card.Body>
    ),
  },
  tags: ['autodocs'],
};

export const WithFramerMotionProps: StoryObj<CardProps> = {
  name: 'With Framer Motion Props',
  args: {
    children: (
      <Card.Body>
        <p className='text-base'>Card Body</p>
      </Card.Body>
    ),
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 },
  },
  tags: ['autodocs'],
};

export const WithCardHeader: StoryObj<CardProps> = {
  name: 'With Card Header',
  args: {
    children: (
      <>
        <Card.Header>
          <h1 className='text-3xl'>Card Header</h1>
        </Card.Header>
        <Card.Body>
          <p className='text-base'>Card Body</p>
        </Card.Body>
      </>
    ),
  },
  tags: ['autodocs'],
};

export const WithCardFooter: StoryObj<CardProps> = {
  name: 'With Card Footer',
  args: {
    children: (
      <>
        <Card.Header>
          <h1 className='text-3xl'>Card Header</h1>
        </Card.Header>
        <Card.Body>
          <p className='text-base'>Card Body</p>
        </Card.Body>
        <Card.Footer>
          <p className='text-base'>Card Footer</p>
        </Card.Footer>
      </>
    ),
  },
  tags: ['autodocs'],
};

/* eslint import/no-default-export: 0 */
export default meta;
