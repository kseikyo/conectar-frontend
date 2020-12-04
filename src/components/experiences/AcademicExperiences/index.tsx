import React, {
  useRef,
  FormEvent,
  useState,
  useCallback,
  useEffect,
  OptionHTMLAttributes,
} from "react";
import Input from "../../Input";
import Textarea from "../../Textarea";
import Select from "../../Select";
import ToggleSwitch from "../../ToggleSwitch";
import Button from "../../Button";
import { BodyExperiences } from "../styles";
import { finalYearOptions, yearOptions } from "../../../utils/dates";
import { AxiosError } from "axios";
import api from "../../../services/api";
import edit from "../../../assets/icon/editar.svg";
import trash from "../../../assets/icon/lixeira.svg";
import Modal from "../../Modal";
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import getValidationErrors from '../../../utils/getValidationErrors';
/**
 * As this type is used from data that comes from the backend, it comes with
 * data_fim and data_inicio, but we need data_inicio and data_fim as placeholders
 * so we can create a full date from it and modify the state properly
 */
interface AcademicType {
  id: number;
  instituicao: string;
  escolaridade: string;
  curso: string;
  situacao: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
}


const AcademicExperiences: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [isIncomplete, setIsIncomplete] = useState<boolean>(false);
  const [initialYear, setInitialYear] = useState<number>(1970);
  const [stored, setStored] = useState<AcademicType[]>([]);
  const initialAcademicData = {
    id: 0,
  } as AcademicType;
  const [editStored, setEditStored] = useState<AcademicType>(initialAcademicData);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [experienceExcluded, setExperienceExcluded] = useState({
    id: 0,
    nome: "",
  })
  const niveisFormacao: OptionHTMLAttributes<HTMLOptionElement>[] = [
    { label: "Ensino Fundamental", value: "Ensino Fundamental" },
    { label: "Ensino Médio", value: "Ensino Médio" },
    { label: "Ensino Técnico", value: "Ensino Técnico" },
    { label: "Graduação", value: "Graduação" },
    { label: "Mestrado", value: "Mestrado" },
    { label: "Mestrado Profissional", value: "Mestrado Profissional" },
    { label: "Doutorado", value: "Doutorado" },
    { label: "Especialização", value: "Especialização" },
    { label: "Residência Médica", value: "Residência Médica" },
    { label: "Aperfeiçoamento", value: "Aperfeiçoamento" },
  ];
  useEffect(() => {
    api
      .get("/api/v1/experiencias/academica/me", {
        withCredentials: true,
      })
      .then((response) => {
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
      .delete(`/api/v1/experiencias/academica/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setShowRegister(false);
        setOpenModal(false);
        setEditStored(initialAcademicData);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }
  const handleSubmit = useCallback(
    async (formData: AcademicType) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          escolaridade: Yup
            .string()
            .required('Informe a escolaridade'),
          descricao: Yup
            .string()
            .min(20, 'Descreva um pouco mais')
            .max(500, 'Excedeu o limite de caractéres (500)')
            .required('Informe a descrição'),
          data_fim: Yup
            .string()
            .required('Ano final é obrigatório'),
          data_inicio: Yup
            .string()
            .required('Ano inicial é obrigatório'),
          curso: Yup
            .string()
            .required('Informe o curso'),
          instituicao: Yup
            .string()
            .required('Informe a instituição'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });
        // Validation passed
        const {
          instituicao,
          escolaridade,
          curso,
          descricao,
          data_fim,
          data_inicio,
          situacao,
        } = formData;


        const data = {
          instituicao,
          descricao,
          data_inicio: `${data_inicio}-02-01`,
          data_fim: (situacao !== "Incompleto" && data_fim) ? `${data_fim}-02-01` : null,
          escolaridade,
          curso,
          situacao,
        };



        /**
         * Sends data to backend
         * It's important to notice the withCredentials being true here
         * so it will send the JWT token as cookie
         * */
        const res = editStored.id
          ? await api
            .put(`/api/v1/experiencias/academica/${editStored.id}`, data, {
              withCredentials: true,
            })
            .then(() => {
              setShowRegister(false);
              setEditStored(initialAcademicData);
            })
            .catch((err: AxiosError) => {
              // Returns error message from backend
              return err?.response?.data.detail;
            })
          : await api
            .post("/api/v1/experiencias/academica", data, {
              withCredentials: true,
            }).then(() => {
              setShowRegister(false);
              setEditStored(initialAcademicData);
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
        alert("Lgoin ou senha incorreto")
      }

      // Do something
    }, [isIncomplete,editStored]);
  function handleEditExperience(experience: AcademicType) {
    let {
      id,
      instituicao,
      escolaridade,
      curso,
      descricao,
      data_fim,
      data_inicio,
      situacao,
    }: AcademicType = experience;


    const data = {
      id,
      instituicao,
      escolaridade,
      curso,
      descricao,
      data_fim: (situacao !== "Incompleto" && data_fim) ? data_fim.split("-")[0] : "",
      data_inicio: data_inicio.split("-")[0],
      situacao,
    };


    setShowRegister(true);
    setEditStored(data);

  }


  return (
    <BodyExperiences>
      <Modal setOpen={setOpenModal} open={openModal}>
        <h1>Deseja realmente excluir {experienceExcluded.nome}?</h1>
        <footer>
          <Button
            theme="primary-yellow"
            onClick={() => handleDeleteExperience(experienceExcluded.id)}
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
      <h2>Educação</h2>
      {!showRegister ? (
        <div className="experiencias">
          {stored?.map((experience: AcademicType) => (
            <div key={experience.id} className="experiencia-cadastrada">

              <section className="icones">
                <img
                  src={edit}
                  alt="editar experiencia"
                  onClick={() => {
                    handleEditExperience(experience)
                  }}
                />
                <img
                  src={trash}
                  alt="apagar experiencia"
                  onClick={() => {
                    setOpenModal(true);
                    setExperienceExcluded({ ...experience, "nome": experience.curso });
                  }}
                />
              </section>
              <fieldset className="info-experiencias">
                <legend>
                  {`${experience.escolaridade} em ${experience.curso}`}
                </legend>
                <p>
                  {experience.instituicao} <br />
                  {experience.situacao} <br />
                  {/* 
                      Get only the year from data by spliting the date and getting the first
                      index of the array.
                  */}
                  {`${experience?.data_inicio?.split("-")[0]} até ${experience?.data_fim?.split("-")[0]
                    }`}
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
                  label="Instituição de ensino"
                  name="instituicao"
                  defaultValue={editStored?.instituicao}
                />
                <Input
                  label="Curso"
                  name="curso"
                  defaultValue={editStored?.curso}
                />
              </section>
              <section className="bloco-dois">
                <Select
                  label="Nível de formação"
                  name="escolaridade"
                  options={niveisFormacao}
                  onChange={(option: any) => {
                    setIsIncomplete(option.value !== "Incompleto" ? false : true)
                  }}
                  defaultValue={editStored.id ?
                    {
                      label: editStored?.escolaridade,
                      value: editStored?.escolaridade
                    } : null
                  }
                />
                <aside>
                  <Select
                    label="Ano inicial"
                    name="data_inicio"
                    options={yearOptions}
                    onChange={(option: any) => {
                      setInitialYear(Number(option.value))
                    }}
                    defaultValue={editStored.id ?
                      {
                        label: editStored?.data_inicio,
                        value: editStored?.data_inicio
                      } : null
                    }
                  />
                  {!isIncomplete &&
                    <Select
                      label="Ano final"
                      name="data_fim"
                      options={finalYearOptions(Number(initialYear))}
                      defaultValue={editStored.id ?
                        {
                          label: editStored.data_fim.split("-")[0],
                          value: editStored?.data_fim.split("-")[0]
                        } : null
                      }
                    />
                  }
                </aside>
              </section>
              <section className="bloco-tres area-toggle">
                <ToggleSwitch
                  label="Incompleto"
                  name="situacao"
                  type="radio"
                  value="Incompleto"
                />
                <ToggleSwitch
                  label="Em andamento"
                  name="situacao"
                  type="radio"
                  value="Em andamento"
                />
                <ToggleSwitch
                  label="Concluído"
                  name="situacao"
                  type="radio"
                  value="Concluído"
                />
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
                >
                  Salvar
              </Button>
                <Button
                  theme="secondary-green"
                  onClick={() => {
                    if (editStored.id) {
                      setOpenModal(true);
                      setExperienceExcluded({ "nome": editStored.curso, "id": editStored?.id })
                    }
                    else {
                      setShowRegister(false)
                    }
                  }}
                >
                  Excluir
              </Button>
                <Button
                  onClick={() => {
                    setShowRegister(false);
                    setEditStored(initialAcademicData);
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

export default AcademicExperiences;
