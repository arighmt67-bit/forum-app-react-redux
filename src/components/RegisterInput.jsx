import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

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
      <label htmlFor="name">Nama</label>
      <input id="name" type="text" value={name} onChange={onNameChange} required />
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={onEmailChange} required />
      <label htmlFor="password">Kata sandi</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        minLength={6}
        required
      />
      <button type="submit" className="button button--block">Daftar</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
