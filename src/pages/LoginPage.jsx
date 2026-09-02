import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthTemplate from '../components/templates/AuthTemplate';
import LoginInput from '../components/organisms/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    try {
      await dispatch(asyncSetAuthUser({ email, password }));
      navigate('/');
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <AuthTemplate
      title="Masuk"
      hintText="Belum punya akun?"
      hintLinkTo="/register"
      hintLinkLabel="Daftar di sini"
    >
      <LoginInput login={onLogin} />
    </AuthTemplate>
  );
}

export default LoginPage;
