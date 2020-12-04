import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useContext,
  useRef,
  useCallback,
} from "react";
import { BodyCreateProject } from "./styles";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import ToggleSwitch from "../../components/ToggleSwitch";
import { useHistory } from "react-router";
import SelectArea, { AreaType } from "../../components/SelectArea";
import SelectTool, { ToolType } from "../../components/SelectTools";
import { AxiosError } from "axios";
import api from "../../services/api";
import Modal from "../../components/Modal";
import Login from "../../components/Login";
import Dropzone from "../../components/Dropzone";
import { Beforeunload } from 'react-beforeunload';
import { Context } from "../../context/AuthContext";
import Logged from "../../components/Logged";
import { BodyModalDefault } from '../../components/Modal/styles';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../utils/getValidationErrors';

interface ProjectType {
  nome: string;
  descricao: string;
  visibilidade: string;
  objetivo: string;
}

function CreateProject() {
  const { loading, isAuthenticated } = useContext(Context);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();


  const [selectedTools, setSelectedTools] = useState<ToolType[]>([]);
  const [showNextStep, setShowNextStep] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(!isAuthenticated);
  const [selectedAreas, setSelectedAreas] = useState<AreaType[]>([]);
  const [idProject, setIdProject] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleSubmit = useCallback(
    async (formData: ProjectType) => {
      console.log(formData);
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome é obrigatório'),
          visibilidade: Yup.string(),
        });
        await schema.validate(formData, {
          abortEarly: false,
        });
        // Validation passed
        const visibilidade = formData.visibilidade === 'visibilidade' ? true : false;
        const data = new FormData();

        data.append("nome", formData.nome);
        data.append("visibilidade", JSON.stringify(visibilidade));
        selectedFile && data.append("foto_capa", selectedFile, `${formData.nome}pic.jpg`);
        data.append("descricao", "Não informado");
        data.append("objetivo", "Não informado");
        const { id } = await (await api.post("/api/v1/projeto", data, {
          withCredentials: true,
        })).data;
        setIdProject(id);
        setShowNextStep(true);

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    }, []
  );
  const handleSecondSubmit = useCallback(
    async (formData: ProjectType) => {
      console.log(formData)
      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          descricao: Yup.string().required('Descrição é obrigatório'),
          objetivo: Yup.string().required('Objetivo é obrigatório'),
        });
        await schema.validate(formData, {
          abortEarly: false,
        });
        // Validation passed
        const data = {
          ...formData,
          habilidades: selectedTools,
          areas: selectedAreas,
        };

        await api.put(`/api/v1/projeto/${idProject}`, data, {
          withCredentials: true,
        })

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    }, []
  );

  return (
    <BodyCreateProject showSecondStep={showNextStep}>
      <Beforeunload onBeforeunload={(event) => event.preventDefault()} />
      <Logged />
      <Modal
        open={showModal}
        setOpen={setShowModal}
        onAfterClose={() => {
          setShowModal(!isAuthenticated);
        }}
      >
        <BodyModalDefault>

          <h1>Para prosseguir, você precisa estar logado</h1>
          <Login onSuccessLogin={() => setShowModal(isAuthenticated)} />
        </BodyModalDefault>
      </Modal>
      <div className="area-central container">
        <h1>Criar Projeto</h1>

        {!showNextStep ?
          <Form ref={formRef} className="primeira-etapa" onSubmit={handleSubmit}>
            <div className="coluna-um">
              <Input
                name="nome"
                label="Título do projeto"
              />
              <div className="upload-img">
                <Dropzone onFileUploaded={setSelectedFile} />
              </div>

              <ToggleSwitch
                name="visibilidade"
                value="visibilidade"
                label="Tornar este projeto privado"
              />
            </div>
            <div className="coluna-dois">
              <SelectArea
                label="Área de desenvolvimento"
                callbackSelectedAreas={selectedAreas}
                setCallbackSelectedAreas={setSelectedAreas}
              />
            </div>
            <section>
              <Button
                type="button"
                onClick={history.goBack}
                theme="secondary-yellow"
              >
                Cancelar
            </Button>
              <Button
                theme="primary-yellow"
                type="submit"
              >
                Continuar
            </Button>
            </section>
          </Form> :

          <Form ref={formRef} className="segunda-etapa" onSubmit={handleSecondSubmit}>
            <div className="coluna-um">
              <Textarea
                label="Objetivo do projeto"
                name="objetivo"
              />
              <Textarea
                label="Descrição simples"
                name="descricao"
              />
            </div>
            <div className="coluna-dois">
              <SelectTool
                callbackSelectedTools={selectedTools}
                setCallbackSelectedTools={setSelectedTools}
                label="Ferramentas, matérias e habilidades que o time precisa dominar"
              />
            </div>
            <section>
              <Button
                className="voltar"
                type="button"
                onClick={() => setShowNextStep(false)}
                theme="secondary-yellow"
              >
                Voltar
            </Button>
              <Button
                theme="primary-yellow"
                type="submit"
              >
                Concluir
            </Button>
            </section>
          </Form>
        }
      </div>
    </BodyCreateProject>
  );
}
export default CreateProject;
