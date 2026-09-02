import React from 'react';
import PropTypes from 'prop-types';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import useInput from '../../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <FormField id="name" label="Nama" value={name} onChange={onNameChange} required />
      <FormField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={onEmailChange}
        required
      />
      <FormField
        id="password"
        label="Kata sandi"
        type="password"
        value={password}
        onChange={onPasswordChange}
        minLength={6}
        required
      />
      <Button isSubmit className="button button--block">Daftar</Button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
