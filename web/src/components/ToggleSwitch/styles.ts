import styled from 'styled-components';



export const BodySwitch = styled.label`
    display:flex;
    flex-direction:row-reverse;
    align-items:center;
    margin:0.6rem;
    label{
        margin-left:0.8rem;
        color:var(--orange);
    }
    
    
    aside{
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
        margin: .4rem;
        input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        input:checked + .slider {
            background-color: var(--green-bg);
        }
        input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
        }
        input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
        }
        .slider {
            border:2px solid var(--green-bg);
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--white);
            -webkit-transition: .2s;
            transition: .2s;
            border-radius: 34px;
        }

        .slider:before {
            border:2px solid var(--green-bg);
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: -2px;
            bottom: -2px;
            background-color: var(--green);
            -webkit-transition: .2s;
            transition: .2s;
            border-radius: 50%;
        }  
    }

`;
