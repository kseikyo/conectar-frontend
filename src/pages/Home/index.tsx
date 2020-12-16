import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { BodyHome } from './styles';
import Login from '../../components/Login';
import ProjectCards from '../../components/ProjectCards';
import hero from '../../assets/image/hero.svg';
import lamp from '../../assets/image/lampada.svg';
import card_colaborador from '../../assets/image/card_colaborador.svg';
import card_idealizador from '../../assets/image/card_idealizador.svg';
import card_aliado from '../../assets/image/card_aliado.svg';
import colaborador from '../../assets/image/colaborador.svg';
import idealizador from '../../assets/image/idealizador.svg';
import aliado from '../../assets/image/aliado.svg';
import passos_colaborador from '../../assets/image/passos_colaborador.svg';
import passos_idealizador from '../../assets/image/passos_idealizador.svg';
import passos_aliado from '../../assets/image/passos_aliado.svg';
import curtiu from '../../assets/image/curtiu.svg';
import migos from '../../assets/image/migos.svg';
import logo from '../../assets/image/logo.svg';

import Modal from '../../components/Modal';
import { IoIosArrowDown } from 'react-icons/io';
import { FaLinkedinIn } from 'react-icons/fa';
import { AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai';

import { Context } from "../../context/AuthContext";

import Logged from "../../components/Logged";
import Button from '../../components/Button';

function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { handleLogin } = useContext(Context);
  return (
    <BodyHome>
      
      <main>
        <div className="topo-background">
          <div className="container topo">
            <section className="hero">
              <img src={hero} alt="imagem de redes neurais" />
            </section>
            <section className="area-login">
              <h1>Encontre o </h1>
              <h1>time ideal</h1>
              
            </section>
            <label className="arrow-bottom">
              <a href="#introducao" >
                <IoIosArrowDown />
              </a>
            </label>

          </div>
        </div>
        <div id="introducao">
          <aside>
            <h3>Se liga em como tudo acontece</h3>
          </aside>
          <main>
            <section className="intro-box">

              <h4>Você já teve uma ideia fora da caixa e pensou:</h4>
              <p>
                “Mazolha com uma equipe qualificada, mentoria experiente e um
                investimento maroto este projeto ajudaria uma galera e de extra me faria o
                Bill Gates da minha cidade”? Ou já se viu sem oportunidade de trampar
                com o que realmente domina e curte?
              </p>

            </section>
            <section className="texto">
              <img src={lamp} alt="ideia" />
              <h4>
                Imagina quanto projeto da hora tá
                mofando numa gaveta neste
                exato momento
              </h4>
              <p>
                A gente tá aqui pra tirar a poeira dessas ideias e
                <strong> impulsionar </strong>
                o surgimento de novos projetos, conectando
                <strong> ideias inovadoras </strong>
                aos
                <strong> times perfeitos </strong>
                para que sejam desenvolvidas.
            </p>
            </section>
          </main>
          <label className="arrow-bottom">
            <a href="#perfis">
              <IoIosArrowDown />
            </a>
          </label>
        </div>
        <div id="perfis">
          <legend>Para fazer isso de forma <strong>automatizada</strong> nossos usuários podem escolher aquele(s) tipo(s) de perfil que mais se identificam dentre as seguintes opções:</legend>
          <main>

            <section className="area-cards">
              <input type="radio" id="radIdea" name="perfil" value="idealizador" defaultChecked />
              <aside>
                <label htmlFor="radIdea">
                  <div>

                    <img src={card_idealizador} alt="Idealizador" />
                    <legend>Idealizador</legend>
                  </div>
                </label>
                <div className="descricao">
                  <p>
                    Põe pra jogo sua ideia inovadora,
                    adicione os detalhes do seu projeto e encontre
                    o time perfeito para tirar sua ideia do papel e
                    finalmente colocá-la em prática.
                  </p>
                  <a href="#idealizador">
                    <Button theme="primary-green">Saiba mais</Button>
                  </a>
                </div>
              </aside>
              <input type="radio" id="radColab" name="perfil" value="colaborador" />
              <aside className="teste">
                <label htmlFor="radColab">
                  <div>
                    <img src={card_colaborador} alt="Colaborador" />
                    <legend>Colaborador</legend>
                  </div>
                </label>
                <div className="descricao">
                  <p>
                    Relatando suas experiências e habilidades
                    você pode ser selecionado para fazer parte de
                    um time que botou no mundo uma ideia
                    fresquinha e revolucionária
                  </p>
                  <a href="#colaborador">
                    <Button theme="primary-green">Saiba mais</Button>
                  </a>
                </div>
              </aside>
              <input type="radio" id="radAlia" name="perfil" value="aliado" />
              <aside>
                <label htmlFor="radAlia">
                  <div>
                    <img src={card_aliado} alt="Aliado" />
                    <legend>Aliado</legend>
                  </div>
                </label>
                <div className="descricao">
                  <p>
                    Conta pra gente suas experiências
                    e habilidades e apoie empreendedores
                    acompanhando a transformação de
                    pequenas ideias em grandes realizações.
                </p>
                  <a href="#aliado">
                    <Button theme="primary-green">Saiba mais</Button>
                  </a>
                </div>
              </aside>
            </section>
          </main>
          <label className="arrow-bottom">
            <a href="#idealizador">
              <IoIosArrowDown />
            </a>
          </label>
        </div>
        <div id="idealizador">

          <h3>Idealizador</h3>

          <section>
            <img src={idealizador} alt="Avatar fictício do idealizador" />
            <div className="area-texto">
              <p>
                Basicamente, o idealizador é o cara que propõe a ideia visando fazer dela um
                projeto ou até mesmo um produto. Se você se vê nesse perfil nós podemos te
                ajudar a encontrar um time de colaboradores com as habilidades necessárias
                para fazer acontecer, de quebra ter apoio de um aliado e quem sabe até conseguir
                um investimento. Tudo isso de forma automatizada. Basta seguir este tutorial:
              </p>
              <aside>
                <section>
                  <legend>Passo 01</legend>
                  <p>Faça uma conta e crie um novo projeto</p>
                </section>
                <section>
                  <legend>Passo 02</legend>
                  <p>
                    Adicione as vagas disponíveis no
                    projeto e as habilidades que os
                    candidatos devem dominar pra
                    botar pra quebrar nessa parada
                  </p>
                </section>
                <section>
                  <legend>Passo 03</legend>
                  <p>
                    Convide os candidatos do time
                    selecionado para o que você
                    precisa e após o aceite tenha
                    seu time perfeito
                  </p>
                </section>
              </aside>
            </div>
          </section>
          <label className="arrow-bottom">
            <a href="#colaborador">
              <IoIosArrowDown />
            </a>
          </label>
        </div>

        <div id="colaborador">
          <h3>Coladorador</h3>

          <section>
            <div className="area-texto">
              <p>
                O colaborador é o responsável pelo desenvolvimento do projeto, a galera da
                mão na massa. Se você se vê nesse perfil nós podemos te ajudar a ser convidado
                para um projeto no qual você é candidato ideal, o cara da vez. Além disso você
                pode demonstrar interesse em projetos públicos da aba “Explorar” e concorrer por
                vagas em áreas diferentes da sua linha de atuação mas que podem compensar o
                esforço para se aprender algo novo. Basta seguir este tutorial:
              </p>
              <aside>
                <section>
                  <legend>Passo 01</legend>
                  <p>Faça uma conta e nos conte sobre suas experiências</p>
                </section>
                <section>
                  <legend>Passo 02</legend>
                  <p>
                    Adicione suas áreas de atuação,
                    suas habilidades e as
                    ferramentas que você conhece
                    de cabo a rabo
                  </p>
                </section>
                <section>
                  <legend>Passo 03</legend>
                  <p>
                    Agora sim, além de ser um
                    candidato dos projetos daqui
                    você pode demonstrar interesse
                    nos que achar top
                  </p>
                </section>
              </aside>
            </div>
            <img src={colaborador} alt="Avatar fictício do colaborador" />
          </section>
          <label className="arrow-bottom">
            <a href="#aliado">
              <IoIosArrowDown />
            </a>
          </label>
        </div>
        <div id="aliado">
          <h3>Aliado</h3>

          <section>
            <img src={aliado} alt="Avatar fictício do colaborador" />
            <div className="area-texto">
              <p>
                O aliado é o apoiador do projeto, este apoio pode vir na forma de mentoria e
                consultoria, apoio técnico ou até mesmo financeiro, em forma de investimento
                para a proposta do idealizador. Se você se vê nesse perfil nós podemos te ajudar a
                encontrar um projeto que mereça sua atenção, que pode vir a render bons frutos
                para a comunidade e quem sabe até pro seu bolso. Basta seguir este tutorial:
              </p>
              <aside>
                <section>
                  <legend>Passo 01</legend>
                  <p>Faça uma conta e nos conte suas experiências</p>
                </section>
                <section>
                  <legend>Passo 02</legend>
                  <p>
                    Adicione suas áreas de atuação,
                    suas habilidades e as
                    ferramentas que você conhece
                    de cabo a rabo
                  </p>
                </section>
                <section>
                  <legend>Passo 03</legend>
                  <p>
                    Agora sim, além de ser um
                    candidato aos projetos daqui
                    você pode demonstrar interesse
                    nos que achar top
                  </p>
                </section>
              </aside>
            </div>
          </section>
          <label className="arrow-bottom">

            <a href="#rodape">
              <IoIosArrowDown />
            </a>
          </label>
        </div>

        <div id="rodape">
          <p>
            E ainda dá pra
            <strong> explorar </strong>
            e
            <strong> interagir </strong>
            com os projetos publicados por aqui.<br />
            Sinceramente, só falta
            <strong> você </strong>
          </p>
          <aside>
            <img src={curtiu} alt="e aí curtiu? vem pra cá!" />
          </aside>
          <footer>
            <img src={migos} alt=" vamos ser amigos nas redes sociais" />
            <section className="redes">
              <a href="https://www.facebook.com/boraConectar/">
                <AiFillFacebook />
                <span>/boraconectar</span>
              </a>
              <a href="https://www.instagram.com/boraconectar/">
                <AiOutlineInstagram />
                <span>/boraconectar</span>
              </a>
              <a href='https://www.linkedin.com/company/boraconectar/'>
                <FaLinkedinIn />
                <span>/company/boraconectar</span>
              </a>
            </section>
            <section>
              <img src={logo} alt="conectar logo" />
              <Link to="">Termos de Uso |  Política de privacidade </Link>
            </section>

            <p> © 2020, Conectar. Todos os direitos reservados.</p>
          </footer>
        </div>


      </main>

    </BodyHome>
  )
}
export default Home;