
import React, { ChangeEvent, FormEvent, useState, useCallback, useEffect, OptionHTMLAttributes, useRef } from 'react';
import Input from '../../Input';
import Textarea from '../../Textarea';
import Select from '../../Select';
import ToggleSwitch from '../../ToggleSwitch';
import Button from '../../Button';
import { BodyExperiences } from '../styles';
import { yearOptions, monthOptions, toMonth, finalYearOptions } from "../../../utils/dates";
import { AxiosError } from "axios";
import api from "../../../services/api";
import edit from '../../../assets/icon/editar.svg';
import trash from '../../../assets/icon/lixeira.svg';
import Modal from "../../Modal";
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../../utils/getValidationErrors';
interface ProjectType {
  id: number;
  nome: string,
  descricao: string,
  data_inicio: string,
  data_fim: string,
  cargo: string,
  situacao: string,
}
interface ProjectDataType {
  id?: number;
  nome: string;
  descricao: string;
  currentProject: boolean;
  cargo: string;
  situacao: string;
  initialYear: string;
  initialMonth: string;
  // Supressing "The operand of a 'delete' operator must be optional" warning
  finalYear: any;
  finalMonth: any;
}
const ProjectExperiences: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [initialYear, setInitialYear] = useState<number>(1970);
  const [currentilyProject, setCurrentilyProject] = useState<boolean>(false);
  const [stored, setStored] = useState<ProjectType[]>([]);
  const initialProjectData = {
    id: 0,
    currentProject: false,
  } as ProjectDataType;
  const [editStored, setEditStored] = useState<ProjectDataType>(initialProjectData);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [experienceExcluded, setExperienceExcluded] = useState({
    id: 0,
    nome: "",
  })
  const situacao: OptionHTMLAttributes<HTMLOptionElement>[] = [
    { label: "Desativado", value: "Desativado" },
    { label: "Em andamento", value: "Em andamento" },
    { label: "Conluído", value: "Conluído" },
  ];
  useEffect(() => {
    api
      .get("/api/v1/experiencias/projeto/me", {
        withCredentials: true,
      })
      .then(response => {
        setStored(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [editStored, showRegister, openModal]);
  async function handleDeleteExperience(id: number) {
    if (stored.length === 1) {
      stored.splice(0, 1);
    }
    await api
      .delete(`/api/v1/experiencias/projeto/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setShowRegister(false);
        setOpenModal(false);
        setEditStored(initialProjectData);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });


  }

  const handleSubmit = useCallback(
    async (formData: ProjectDataType) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          nome: Yup
            .string()
            .required('Informe o nome'),
          situacao: Yup
            .string()
            .max(50, 'Excedeu o limite de caractéres (50)')
            .required('Informe a organização'),
          cargo: Yup
            .string()
            .required('Informe o cargo'),
          descricao: Yup
            .string()
            .min(20, 'Descreva um pouco mais')
            .max(500, 'Excedeu o limite de caractéres (500)')
            .required('Informe a descrição'),
          finalYear: Yup
            .string()
            .required('Ano final é obrigatório'),
          initialYear: Yup
            .string()
            .required('Ano inicial é obrigatório'),
          initialMonth: Yup
            .string()
            .required('Mês inicial é obrigatório'),
          finalMonth: Yup
            .string()
            .required('Mês final é obrigatório'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });
        // Validation passed
        const {
          currentProject,
          nome,
          cargo,
          descricao,
          finalYear,
          initialYear,
          finalMonth,
          initialMonth,
          situacao,
        } = formData;
        //setting to null because if there a update an experience with an existing data_fim it will not send
        let data_fim = null;
        const data_inicio = `${initialYear}-${initialMonth}-01`;

        if (!currentProject) {
          data_fim = `${finalYear}-${finalMonth}-01`;
        }


        const data = {
          nome,
          descricao,
          data_inicio,
          data_fim,
          cargo,
          situacao,
        };
        console.log(data);
        /**
         * Sends data to backend
         * It's important to notice the withCredentials being true here
         * so it will send the JWT token as cookie
         * */
        const res = editStored.id
          ? await api
            .put(`/api/v1/experiencias/projeto/${editStored.id}`, data, {
              withCredentials: true,
            })
            .then(() => {
              setShowRegister(false);
              setEditStored(initialProjectData);
            })
            .catch((err: AxiosError) => {
              // Returns error message from backend
              return err?.response?.data.detail;
            })
          : await api
            .post("/api/v1/experiencias/projeto", data, {
              withCredentials: true,
            })
            .then(() => {
              setShowRegister(false);
              setEditStored(initialProjectData);
            })
            .catch((err: AxiosError) => {
              // Returns error message from backend
              return err?.response?.data.detail;
            });
        console.log(res);



      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          // Validation failed
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
          return;
        }
      }

      // Do something
    }, [currentilyProject,editStored]
  );
  function handleEditExperience(experience: ProjectType) {
    const {
      id,
      nome,
      descricao,
      data_inicio,
      data_fim,
      cargo,
      situacao,
    }: ProjectType = experience;

    const [initialYear, initialMonth] = data_inicio.split("-");

    const data = {
      id,
      nome,
      cargo,
      descricao,
      initialYear,
      initialMonth,
      situacao,
      currentProject: data_fim ? false : true,
      finalYear: data_fim ? data_fim.split("-")[0] : data_fim,
      finalMonth: data_fim ? data_fim.split("-")[1] : data_fim,
    };
    setShowRegister(true);
    setEditStored(data);
  }
  return (
    <BodyExperiences>
      <Modal setOpen={setOpenModal} open={openModal}>
        <h1>Deseja realmente excluir {experienceExcluded?.nome}?</h1>
        <footer>
          <Button
            theme="primary-yellow"
            onClick={() => experienceExcluded && handleDeleteExperience(experienceExcluded?.id)}
          >
            Excluir
          </Button>
          <Button
            theme="secondary-yellow"
            onClick={() => setOpenModal(false)}
          >
            Manter
          </Button>
        </footer>
      </Modal>
      <h2>Projetos</h2>

      {!showRegister ? (
        <div className="experiencias">
          {stored?.map((experience: ProjectType) => (
            <div
              key={experience.id}
              className="experiencia-cadastrada"
            >
              <section className="icones">
                <img
                  src={edit}
                  alt="editar experiencia"
                  onClick={() => handleEditExperience(experience)}
                />
                <img
                  src={trash}
                  alt="apagar experiencia"
                  onClick={() => {
                    setOpenModal(true);
                    setExperienceExcluded(experience);
                  }}
                />
              </section>
              <fieldset className="info-experiencias">
                <legend>
                  {`${experience.cargo} | ${experience.nome}`}
                </legend>

                <p>
                  {experience.situacao} <br />
                  {`
                  ${toMonth(experience.data_inicio.split("-")[1])} 
                  de 
                  ${experience.data_inicio.split("-")[0]} 
                  até 
                  ${experience.data_fim ? `
                      ${toMonth(experience.data_fim.split("-")[1])} 
                      de 
                      ${experience.data_fim.split("-")[0]}
                    ` :
                      "o momento atual"}
                  `}
                </p>


              </fieldset>
            </div>
          ))}
          <button onClick={() => setShowRegister(true)}>
            <span>+ </span>
            Adicionar
          </button>
        </div>
      ) : (
          <Form
            className="form--experiencia"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <aside className="area-registro">
              <section className="bloco-um">
                <Input
                  label="Nome do projeto"
                  name="nome"
                  defaultValue={editStored?.nome}
                />
              </section>
              <section className="bloco-dois">
                <Select
                  label="Situação"
                  name="situacao"
                  options={situacao}
                  defaultValue={editStored.id ?
                    {
                      label: editStored?.situacao,
                      value: editStored?.situacao
                    } : null
                  }
                />

                <Input
                  label="Cargo"
                  name="cargo"
                  defaultValue={editStored?.cargo}
                />
              </section>
              <section className="bloco-tres">
                <aside>
                  <Select
                    label="Mês inicial"
                    name="initialMonth"
                    options={monthOptions}
                    defaultValue={editStored.id ?
                      {
                        label: editStored?.initialMonth,
                        value: editStored?.initialMonth
                      } : null
                    }
                  />
                  <Select
                    label="Ano inicial"
                    name="initialYear"
                    options={yearOptions}
                    onChange={(option: any) => {
                      setInitialYear(Number(option.value))
                    }}
                    defaultValue={editStored.id ?
                      {
                        label: editStored?.initialYear,
                        value: editStored?.initialYear
                      } : null
                    }
                  />
                </aside>
                <aside>
                  <ToggleSwitch
                    label="Estou nesse projeto atualmente"
                    name="currentProject"
                    id="currentProject"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setCurrentilyProject(event.target.checked)}
                  />
                </aside>
                {!currentilyProject && (
                  <aside>
                    <Select
                      label="Mês final"
                      name="finalMonth"
                      options={monthOptions}
                      defaultValue={editStored.id ?
                        {
                          label: editStored?.finalMonth,
                          value: editStored?.finalMonth
                        } : null
                      }
                    />
                    <Select
                      label="Ano final"
                      name="finalYear"
                      options={finalYearOptions(initialYear)}

                      defaultValue={editStored.id && Number(editStored?.finalYear) > initialYear ?
                        {
                          label: editStored?.finalMonth,
                          value: editStored?.finalMonth
                        } : null
                      }

                    />
                  </aside>
                )}
              </section>
              <section className="bloco-quatro">
                <Textarea
                  name="descricao"
                  label="Detalhes"
                  defaultValue={editStored?.descricao}
                />
              </section>
              <section className="area-botoes">
                <Button
                  type="submit"
                  theme="primary-green"
                //disabled={academicFormData === {} as AcademicType? false:true}
                >Salvar</Button>
                <Button
                  theme="secondary-green"
                  onClick={() => {
                    if (editStored.id) {
                      setOpenModal(true);
                      setExperienceExcluded({ "nome": editStored.nome, "id": editStored?.id })
                    }
                    else {
                      setShowRegister(false)
                    }
                  }}
                >Excluir</Button>
                <Button
                  onClick={() => {
                    setShowRegister(false);
                    setEditStored(initialProjectData);
                  }}
                >
                  Cancelar
                </Button>
              </section>
            </aside>
          </Form>
        )}
    </BodyExperiences>
  );
};

export default ProjectExperiences;
