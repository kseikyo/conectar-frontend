import React, {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
  useCallback,
  useEffect,
  OptionHTMLAttributes
} from 'react'
import Input from '../Input'
import Textarea from '../Textarea'
import Select from '../Select'
import ToggleSwitch from '../ToggleSwitch'
import Button from '../Button'
import { BodyVacancy } from './styles'
import { inputChange } from '../../utils/inputChange'
import { selectChange } from '../../utils/selectChange'
import { textareaChange } from '../../utils/textareaChange'
import { finalYearOptions, yearOptions } from '../../utils/dates'
import { AxiosError } from 'axios'
import api from '../../services/api'
import edit from '../../assets/icon/editar.svg'
import trash from '../../assets/icon/lixeira.svg'
import Modal from '../Modal'
import { AreaType } from '../../components/SelectArea'
import { ToolType } from '../../components/SelectTools'
import { createOptionAreas, createOptionTools } from '../../utils/projects'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
interface VacanciesType {
  nome: string
  descricao: string
  visibilidade: true
  objetivo: string
  foto_capa: string
  id: number
}
interface ProjectType {
  nome: string
  descricao: string
  visibilidade: true
  objetivo: string
  foto_capa: string
  areas: AreaType[]
  habilidades: ToolType[]
  id: number
}
interface VacancyProps {
  project: ProjectType
}

const Vacancy: React.FC<VacancyProps> = ({ project }) => {
  const [showRegister, setShowRegister] = useState<boolean>(false)
  const [editingId, setEditingId] = useState<number>(0)
  const formRef = useRef<FormHandles>(null)
  const optionsContrato: Array<OptionHTMLAttributes<HTMLOptionElement>> = [
    { value: 'trainee', label: 'Trainee' },
    { value: 'terceirizado', label: 'Terceirizado' },
    { value: 'intermitente', label: 'Intermitente' },
    { value: 'aprendiz', label: 'Aprendiz' },
    { value: 'estágio', label: 'Estágio' },
    { value: 'temporário', label: 'Temporário' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'autônomo', label: 'Autônomo' },
    { value: 'meioPeríodo', label: 'Meio Período' },
    { value: 'tempoIntegral', label: ' Tempo Integral' }
  ]

  const optionsAreas: Array<
    OptionHTMLAttributes<HTMLOptionElement>
  > = createOptionAreas(project.areas)
  const optionsTools: Array<
    OptionHTMLAttributes<HTMLOptionElement>
  > = createOptionTools(project.habilidades)
  useEffect(() => {
    api
      .get('/api/v1/experiencias/academica/me', {
        withCredentials: true
      })
      .then(response => {})
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail
      })
  }, [editingId, showRegister])
  const handleSubmit = useCallback(async (formData: ProjectType) => {
    console.log(formData)
    try {
      // Remove all previogeus errors
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        nome: Yup.string().required('Nome é obrigatório')
      })
      await schema.validate(formData, {
        abortEarly: false
      })
      // Validation passed

      await api.put(`/api/v1/projeto/`, formData)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
      }
    }
  }, [])
  return (
    <BodyVacancy>
      <h2>Vagas</h2>
      {!showRegister ? (
        <div className="vagas">
          <div key={1} className="vaga-cadastrada">
            <section className="icones">
              <img src={edit} alt="editar vaga" />
              <img src={trash} alt="apagar vaga" />
            </section>
            <fieldset className="info-vagas">
              <legend>Ux Designer</legend>
              <p>
                Trainee | Não remunerado <br />2 Vagas
              </p>
            </fieldset>
          </div>
          <div key={1} className="vaga-cadastrada">
            <section className="icones">
              <img src={edit} alt="editar vaga" />
              <img src={trash} alt="apagar vaga" />
            </section>
            <fieldset className="info-vagas">
              <legend>Ux Designer</legend>
              <p>
                Trainee | Não remunerado <br />2 Vagas
              </p>
            </fieldset>
          </div>
          <div key={1} className="vaga-cadastrada">
            <section className="icones">
              <img src={edit} alt="editar vaga" />
              <img src={trash} alt="apagar vaga" />
            </section>
            <fieldset className="info-vagas">
              <legend>Ux Designer</legend>
              <p>
                Trainee | Não remunerado <br />2 Vagas
              </p>
            </fieldset>
          </div>
          <div key={1} className="vaga-cadastrada">
            <section className="icones">
              <img src={edit} alt="editar vaga" />
              <img src={trash} alt="apagar vaga" />
            </section>
            <fieldset className="info-vagas">
              <legend>Ux Designer</legend>
              <p>
                Trainee | Não remunerado <br />2 Vagas
              </p>
            </fieldset>
          </div>
          <div key={1} className="vaga-cadastrada">
            <section className="icones">
              <img src={edit} alt="editar vaga" />
              <img src={trash} alt="apagar vaga" />
            </section>
            <fieldset className="info-vagas">
              <legend>Ux Designer</legend>
              <p>
                Trainee | Não remunerado <br />2 Vagas
              </p>
            </fieldset>
          </div>
          <div key={1} className="vaga-cadastrada">
            <section className="icones">
              <img src={edit} alt="editar vaga" />
              <img src={trash} alt="apagar vaga" />
            </section>
            <fieldset className="info-vagas">
              <legend>Ux Designer</legend>
              <p>
                Trainee | Não remunerado <br />2 Vagas
              </p>
            </fieldset>
          </div>
          <div key={1} className="vaga-cadastrada">
            <section className="icones">
              <img src={edit} alt="editar vaga" />
              <img src={trash} alt="apagar vaga" />
            </section>
            <fieldset className="info-vagas">
              <legend>Ux Designer</legend>
              <p>
                Trainee | Não remunerado <br />2 Vagas
              </p>
            </fieldset>
          </div>
          <button onClick={() => setShowRegister(true)}>
            <span>+ </span>
            Adicionar
          </button>
        </div>
      ) : (
        <Form ref={formRef} onSubmit={handleSubmit} className="form-vaga">
          <Input
            label="Cargo"
            name="cargo"
            //defaultValue={academicFormData?.instituicao}
          />
          <Input
            label="Perfil"
            name="perfil"
            //defaultValue={academicFormData?.instituicao}
          />
          <Input
            label="Quantidade"
            name="quantidade"
            type="number"
            //defaultValue={academicFormData?.instituicao}
          />

          <div className="bloco-area">
            <Select
              label="Habilidade ou Ferramentas"
              name="habilidade"
              options={optionsTools}
              // isMulti
            />

            <Textarea name="descricao" label="Descrição" />
            <section className="bloco-contrato">
              <Select
                label="Tipo de contrato"
                options={optionsContrato}
                name="tipoContrato"
              />
              <ToggleSwitch
                label="Remunerado"
                name="remunerado"
                id="remunerado"
              />
            </section>
            <section className="area-botoes">
              <Button type="submit" theme="primary-green">
                Salvar
              </Button>
              <Button theme="secondary-green">Excluir</Button>
              <Button
                onClick={() => {
                  setShowRegister(false)
                  setEditingId(0)
                }}
              >
                Cancelar
              </Button>
            </section>
          </div>
        </Form>
      )}
    </BodyVacancy>
  )
}

export default Vacancy
