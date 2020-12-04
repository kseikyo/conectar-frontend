import styled, { css } from 'styled-components';






export const BodySignUp = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    width:100vw;
    background:var(--green-bg);
    
    form.area-central{
        background:var(--white);
        padding:2.4rem;
        border-radius:0.8rem;
        border:2px solid var(--green);
        img{
            width:40%;
        }
        h1{
            margin:1.4rem 0;
            color: var(--green-bg);
        }
        .primeira-etapa{
            display:grid;
            .area-img{
                grid-area:img;
                display:flex;
                img{
                    width:100%;

                }
            }
            grid-template-rows: 500px;
            grid-template-columns: 60% 40%;
            grid-template-areas:"form img";
            grid-gap: 1.8rem;
            section{
                display:flex;
                justify-content:space-between;
                align-items: center;
                div + div {
                    margin-left:0.8rem;
                }
            }
            .area-form{
                grid-area:form;
                .google-button, .facebook-button {
                    display: flex;
                    align-items: center;
                    position: relative;
                    cursor: pointer;
                    font:400 0.9rem Roboto;
                    height:2.8rem;
                    width: 15rem;
                    border-radius:0.4rem;
                    padding:0.4rem;
                    >svg{
                        color:#3b5998;
                        padding: 0 0.4rem;
                        border-right: 1px solid var(--green);
                        width:2rem;
                        height:1.2rem;
                        margin-right:0.4rem;
                    }
                }
                .google-button{
                    border: 1px solid var(--green);
                    background-color: var(--white);
                    margin: 0.5rem 0 0.5rem 0.2rem; 
                }
                .facebook-button{              
                    border: 1px solid var(--green);
                    background-color:var(--blue);
                    margin: 0.5rem 0.2rem 0.5rem 0;
                }
                a{
                    font:400 1.2rem Roboto;
                    text-decoration:none;
                    color:var(--yellow);
                }
                p {
                    margin:1rem 0;
                    font:400 1rem Roboto;
                    a{
                        text-decoration:none;
                        color:var(--green);
                    }
                }
            }

        }
        .segunda-etapa {
           
            display:flex;
              
            flex-direction:column;
            >section{
                display:flex;
                justify-content:space-between;
                align-items:flex-end;
                margin:0.6rem 0;
                >div + div {
                    margin-left:0.8rem;
                    width:auto;     
                }
                >legend{
                    font:400 1rem Roboto;
                    color:var(--orange);
                }
                >span{
                    font:400 .8rem Roboto;
                    color:var(--gray);
                }
            }
            .tipo-perfil{
                justify-content:space-around;
                flex-wrap:wrap;
                >fieldset{
                    margin-top:0.4rem;
                    width: max(30% ,150px);
                    legend{
                        border-radius:0.3rem 0.3rem 0 0;
                        width:100%;
                        background:var(--green-bg);
                        padding:0.2rem;
                        color:white;
                        text-align:center;
                        margin-bottom:0;
                    }
                    >aside{
                        border-radius:0 0 0.3rem 0.3rem ;
                        display:flex;
                        flex-direction:column;
                        justify-content:space-around;
                        align-items:center;
                        height:200px;
                        border:2px solid var(--yellow);
                        border-top:0;
                        padding-bottom:0.8rem;
                        p{
                            margin-bottom:0.8rem;
                        }
                    }
                }
            }
            button.voltar {
                border: 0;
                cursor:pointer;
                background:none;
                font:500 1rem Roboto;
                color:var(--yellow);
                :hover{
                    color:var(--yellow-dark);
                }
            }
        }
    }
`;