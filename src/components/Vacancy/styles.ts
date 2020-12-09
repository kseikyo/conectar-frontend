import styled from 'styled-components';



export const BodyVacancy = styled.section`
    background:white;
    padding:0.8rem;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items: flex-start;
    width:100%;
    height:100%;
    .vagas{
            width:100%;
            height:100%;
            max-height:80vh;
            overflow-y:auto;
        .vaga-cadastrada{
            border-radius:0.4rem;
            border:2px solid var(--green);
            display:flex;
            justify-content:flex-start;
            align-items:center;
            margin:0.8rem 0;
            padding:0.5rem;
            fieldset{
                margin-left:1.2rem;
                legend{
                    font:500 1.4rem Roboto;
                }
                font:400 1.2rem Roboto;
                color:var(--green-bg); 
                .textos{
                    display:flex;
                    align-items:flex-start;
                    justify-content:space-between;
                    p + p{
                        border-left:solid 2px var(--green);
                        margin-left:3rem;
                        padding:0.8rem 0.3rem 0.8rem 2rem;
                        word-break:break-all;
                    }
                    
                }
            }
            .icones{
                border-right:2px solid var(--green);
                display:flex;
                min-height:100px;
                flex-direction:column;
                justify-content:space-between;
                align-items:center;
                padding:0.6rem;
                img{
                    
                    height:1.4rem;
                    cursor:pointer;
                }
            }
        }
        >button{
            border:0;
            background:none;
            font:500 1rem Roboto;
            color:var(--yellow);
            >span{
                font:500 1.2rem Roboto;
            }
        }
    }
    >h2{
        margin:1.4rem 0;
        color: var(--green-bg);
    }
    .form-vaga {
        overflow-y:auto;
        width:100%;
        .area-botoes{
            display:flex;
            justify-content:space-evenly;
            margin: .4rem 0;
        }
        form{
            display:flex;
            flex-direction:column;
            align-items:flex-start;
            justify-content:center;
            height:100%;
        }
        >span{
            color:var(--yellow-dark);
        }
        
        aside{
            display:flex;
            align-items:center;
            justify-content:flex-start;
            margin:0;
            div + div{
                margin-left:.4rem;
            }
        }
    }
    @media(min-width:768px){
        border-radius:0.4rem;
        border:2px solid var(--green);
        height:auto;
        .form-vaga {
        
            
            display:grid;
            width:100%;
            grid-template-columns:calc(50% - 10px) calc(30% - 10px) calc(20% - 10px);
            grid-template-rows:repeat(4, auto);
            grid-gap: 10px;
            .area-botoes{
                grid-column:1/-1;
                grid-row:4;
            }
            
            .bloco-area{
                grid-column:2 / -1;
                grid-row:2 ;
            }
            
            .bloco-contrato{
                grid-column:2 / -1;
                grid-row:3;
                display:flex;
                justify-content:space-around;
                align-items:center;
                flex-direction:column;
                height:100%;
                width:100%;
                
            }
        }
    }
    
        
`;
