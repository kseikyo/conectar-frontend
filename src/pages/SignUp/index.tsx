import React, { useState, ChangeEvent, FormEvent, useCallback, useEffect, useRef } from "react";
import { BodySignUp } from "./styles";
import logo from "../../assets/image/logo_fundoClaro.svg";
import cadastro_banner from "../../assets/image/cadastro_banner.svg";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import ToggleSwitch from "../../components/ToggleSwitch";
import {
  ReactFacebookLoginInfo,
  ReactFacebookFailureResponse,
} from "react-facebook-login";
import FacebookLogin from "react-facebook-login";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useHistory, useParams } from "react-router";
import { daysOptions, monthOptions, yearOptions } from "../../utils/dates";
import { AxiosError } from 'axios';
import api from "../../services/api";
import { createTrue } from "typescript";
import InputMask from "../../components/InputMask";
import * as Yup from 'yup';
import { FormHandles, UnformErrors } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValidationErrors';
interface renderFacebook {
  onClick: () => void;
  disabled?: boolean;
}
interface routeParms {
  step: string;
}
interface PessoaType {
  email: string;
  telefone: string;
  nome: string;
  username: string;
  password: string;
  year: string;
  month: string;
  day: string;
  idealizador: string;
  colaborador: string;
  aliado: string;
}
function SignUp() {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);

  const [showNextStep, setShowNextStep] = useState<boolean>(
    Number(useParams<routeParms>().step) === 2
      ? true
      : false
  );

  const handleSubmit = useCallback(
    async (formData: PessoaType) => {
      try {
        // Remove all previous errors
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup
            .string()
            .email('Não corresponde ao formato exemple@ex.com')
            .required('Email é obrigatório'),
          password: Yup
            .string()
            .matches(/(?=.*[!@#$%^&*])/g, "Deve conter caracteres especiais")
            .matches(/(?=.*[A-Z])/g, "Deve conter caracteres maiúsculas")
            .matches(/(?=.*[0-9])/g, "Deve conter caracteres numéricos")
            .matches(/(?=.*[a-z])/g, "Deve conter caracteres minúsculas")
            .min(8, 'Deve conter no mínimo 8 caracteres')
            .required('Senha é obritória'),
          username: Yup
            .string()
            .min(4, 'Deve conter no mínimo 4 caracteres')
            .max(20, 'Deve conter no máximo 20 caracteres')
            .required('Usuário é obrigatório'),
          nome: Yup
            .string()
            .max(80)
            .matches(/(?=.*[ ])/g, 'Informe o nome completo')
            .required('Usuário é obrigatório'),
        });
        await schema.validate(formData, {
          abortEarly: false,
        });
        // Validation passed
        const data = new FormData();

        data.append("email", formData.email);
        data.append("nome", formData.nome);
        data.append("username", formData.username);
        data.append("password", formData.password);
        await api.post("/api/signup", data);
        setShowNextStep(true);
        console.log(formData);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          //alert(errors);
        }
      }
    }
    , []
  );
  const handleSecondSubmit = useCallback(
    async (formData: PessoaType) => {

      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          telefone: Yup.string().required('Telefone é obrigatório'),
          year: Yup.string().required('Ano é obrigatório'),
          month: Yup.string().required('Mês é obrigatório'),
          day: Yup.string().required('Dia é obrigatório'),
          aliado: Yup.string(),
          colaborador: Yup.string(),
          idealizador: Yup.string(),
        });
        await schema.validate(formData, {
          abortEarly: false,
        });
        // Validation passed
        const { year, month, day, telefone } = formData;

        const data_nascimento = `${year}-${month}-${day}`;

        const aliado = formData.aliado === 'aliado' ? true : false
        const colaborador = formData.colaborador === 'colaborador' ? true : false
        const idealizador = formData.idealizador === 'idealizador' ? true : false

        const data = { data_nascimento, aliado, colaborador, idealizador, telefone };

        await api.put("/api/v1/pessoas", data, {
          withCredentials: true,
        });
        history.push("/experienceareas");

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    }, []
  );

  /**This function checks if the profile is idealizer, collaborator or ally then advances to the next form and set name and email in formData */
  async function checkProfileType() {
    const { aliado, colaborador, idealizador, nome, email } = (await api.get("/api/v1/pessoas/me")).data;
    if (!aliado || !colaborador || !idealizador) {
      setShowNextStep(true);
    }
    //setFormData({ ...formData, nome, email });
  }
  const responseFacebook = async (resposta: ReactFacebookLoginInfo) => {

    const { email, name } = resposta;
    const foto_perfil = resposta.picture?.data.url;
    const res = await api
      .post(`/api/login?provider=facebook`, {
        email,
        "nome": name,
        foto_perfil
      })
      .then(checkProfileType)
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
      .then(checkProfileType)
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
    console.log(res);
  }

  return (

    <BodySignUp>

      {!showNextStep && (
        <Form ref={formRef} onSubmit={handleSubmit} className="area-central container">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="primeira-etapa">
            <div className="area-img">
              <img src={cadastro_banner} alt="cadastro" />
            </div>

            <div className="area-form">
              <h1>Criar sua conta</h1>
              <Input
                name="nome"
                label="Nome Completo"
              />
              <Input
                type="email"
                name="email"
                label="E-mail"
              />
              <section>
                <Input
                  name="username"
                  label="Nome de usuário"
                />
                <Input
                  type="password"
                  name="password"
                  label="Senha"
                />
              </section>
              <p>
                Ao prosseguir, você concorda com os{" "}
                <Link to="#">Termos de Uso</Link> e{" "}
                <Link to="#">Política de Privacidade.</Link>
              </p>

              <section>
                <Link to="login">Já tem uma conta?</Link>
                <Button
                  theme="primary-yellow"
                  type="submit"
                >
                  Continuar
                </Button>
              </section>
              <section>
                <FacebookLogin
                  appId="1088597931155576"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  cssClass="facebook-button"
                  textButton="Cadastre-se com Facebook"
                  icon={<FaFacebookF />}
                />
                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      className="google-button"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <FcGoogle />
                      Inscreva-se com Google
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </section>
            </div>
          </div>
        </Form>
      )}
      {showNextStep && (
        <Form ref={formRef} onSubmit={handleSecondSubmit} className="area-central container">
          <div className="segunda-etapa">
            <legend>
              <h1>Bem vindo(a) ao Conectar</h1>
            </legend>
            <section>

              <InputMask
                type="tel"
                name="telefone"
                label="Celular"
                mask="(99) 99999-9999 "
              />
              <Select
                label="Data de Nascimento"
                name="year"
                defaultOption="Ano"
                options={yearOptions}
              />
              <Select
                name="month"
                defaultOption="Mês"
                options={monthOptions}
              />

              <Select
                name="day"
                defaultOption="Dia"
                options={daysOptions(4, 2000)}
              />
            </section>
            <section>
              <legend>Tipo de Perfil</legend>
              <span>Selecione um ou mais tipos</span>
            </section>
            <section className="tipo-perfil">
              <fieldset>
                <legend>Idealizador</legend>
                <aside>
                  <p>Interessado em criar projetos</p>
                  <ToggleSwitch
                    name="idealizador"
                    value="idealizador"
                  />
                </aside>
              </fieldset>
              <fieldset>
                <legend>Colaborador</legend>
                <aside>
                  <p>Interessado em participar de projetos</p>
                  <ToggleSwitch
                    name="colaborador"
                    value="colaborador"
                  />
                </aside>
              </fieldset>
              <fieldset>
                <legend>Aliado</legend>
                <aside>
                  <p>Interessado em ajudar projetos</p>
                  <ToggleSwitch
                    name="aliado"
                    value="aliado"
                  />
                </aside>
              </fieldset>
            </section>
            <section>
              <button
                className="voltar"
                type="button"
                onClick={() => setShowNextStep(false)}
              >
                Voltar
              </button>
              <Button
                theme="primary-yellow"
                type="submit"
                disabled={false}
              >
                Continuar
              </Button>
            </section>
          </div>
        </Form>
      )}
    </BodySignUp>
  );
}
export default SignUp;
