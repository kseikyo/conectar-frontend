import React, { FormEvent, useState, useCallback, useRef } from 'react';
import { BodyLogin } from './styles';
import { Link } from 'react-router-dom';
import Input from '../Input';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Button from '../Button';
import api from "../../services/api";
import { AxiosError } from 'axios';
import { useHistory } from "react-router";
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
interface loginProps {
  onSuccessLogin(): void;
}
interface SignInFormData {
  email: string;
  senha: string;
}

const Login: React.FC<loginProps> = ({ onSuccessLogin }) => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  /**This function checks the profile is idealizer, collaborator or ally, then redirects to registration these */
  async function checkProfileType() {
    const { aliado, colaborador, idealizador } = (await api.get("/api/v1/pessoas/me")).data;
    if (!aliado || !colaborador || !idealizador) {
      history.push("/signup/2");
    }
  }
  /**Send email name and profile_pic to backend through the login route with provider=facebook then check profile type*/
  const responseFacebook = async (resposta: ReactFacebookLoginInfo) => {
    const { email, name } = resposta;
    const foto_perfil = resposta.picture?.data.url;
    const res = await api
      .post(`/api/login?provider=facebook`, {
        email,
        "nome": name,
        foto_perfil
      })
      .then(() => {
        checkProfileType();
        onSuccessLogin();
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });

    console.log(res);

  }
  const responseGoogle = async (response: GoogleLoginResponse | any) => {
    let { tokenId } = response;
    const res = await api
      .post(`/api/login?provider=google&token=${tokenId}`)
      .then(() => {
        checkProfileType();
        onSuccessLogin();
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
    console.log(res);
  }
  const handleSubmit = useCallback(
    async (formData: SignInFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup
            .string()
            .required('E-mail ou usuário obrigatório'),
          senha: Yup
            .string()
            .required('Senha obrigatória'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        const data = new FormData();
        data.append('username', formData.email);
        data.append('password', formData.senha);

        await api.post('/api/token', data);
        onSuccessLogin();

      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          console.log(error);
          
          return;
        }
        alert("Lgoin ou senha incorreto")
        

      }
    },
    [onSuccessLogin],
  );


  return (
    <BodyLogin onSubmit={handleSubmit} ref={formRef}>
      <Input
        name="email"
        label="E-mail ou nome de usuário"
      />
      <Input
        name="senha"
        type="password"
        label="Senha"
        subLabel="Esqueceu a senha?"
        pathSubLabel="#"
      />
      <Button
        type="submit"
        theme="primary-yellow"
      >
        Entrar
      </Button>
      <p>ou</p>
      <aside>
        <FacebookLogin
          textButton=""
          appId="364709984736964"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="facebook-button"
          icon={<FaFacebook />}
        />
        <GoogleLogin
          clientId="1027346829762-a6tjn6i5a8r50nn0cskrg4sholipvt5j.apps.googleusercontent.com"
          render={renderProps => (
            <button className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled}><FcGoogle /></button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </aside>
      <p>Novo no Conectar? <Link to="/signup/1">Crie uma conta</Link></p>
    </BodyLogin>
  )

}

export default Login;