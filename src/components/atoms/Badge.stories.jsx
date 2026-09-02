import Badge from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'badge clicked' },
  },
};

export default meta;

export const Static = {
  args: {
    label: 'react',
  },
};

export const Clickable = {
  args: {
    label: 'redux',
    onClick: () => {},
  },
};

export const Active = {
  args: {
    label: 'testing',
    active: true,
    onClick: () => {},
  },
};
