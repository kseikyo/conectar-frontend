import styled from "styled-components";

export const BodyDropzone = styled.div`
    position: relative;
    padding:.5rem 0;
    >main{
      margin: 0.4rem 0;
      border: 2px dashed var(--yellow);
      border-radius: 0.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 0.8rem;
      outline: 0;
      label {
        margin-top: 1.6rem;
        padding: 0.6em;
        cursor: pointer;
        border-radius: 0.4rem;
        background: var(--green-bg);
        color: white;
        font: 500 1rem Roboto;
      }
      input {
        display: none;
      }
      p {
        margin-top: 0.8rem;
        color: gray;
        font-size: 0.8rem;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    span{
      color:red;
      font:400 .8rem Roboto;
      position:absolute;
      left:0;
      bottom:0;
    }
`;
