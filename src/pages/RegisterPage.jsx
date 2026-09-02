import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthTemplate from '../components/templates/AuthTemplate';
import RegisterInput from '../components/organisms/RegisterInput';
import { asyncRegisterUser } from '../states/authUser/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      navigate('/login');
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <AuthTemplate
      title="Daftar Akun"
      hintText="Sudah punya akun?"
      hintLinkTo="/login"
      hintLinkLabel="Masuk di sini"
    >
      <RegisterInput register={onRegister} />
    </AuthTemplate>
  );
}

export default RegisterPage;
