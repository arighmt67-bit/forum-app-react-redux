import LoginInput from './LoginInput';

const meta = {
  title: 'Components/LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
  argTypes: {
    login: { action: 'login clicked' },
  },
};

export default meta;

export const Default = {
  args: {
    login: () => {},
  },
};
