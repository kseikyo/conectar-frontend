import styled from 'styled-components';



export const BodySelect = styled.div`
  width:100%;
  min-width:10rem;
  margin: 0.3rem 0 ;
  padding-bottom:.8rem;
  position: relative;
  label{
    display:flex;
    justify-content:space-between;
    align-items:center;
    font: 400 1rem Roboto;
    color:var(--orange);
    a{
      justify-content:flex-end;
      text-decoration:none;
      color: var(--gray);
      font-size:0.7rem;
    }
  }
  .react-select-container{
    .react-select__control{
      border: 2px solid var(--yellow);
      border-radius: .2rem;
      height: 2.4rem;
      margin: .2rem 0;
      outline: 0;
      :focus-within{
            box-shadow: 0 0 0 0;
        }
      .react-select__value-container{
      font:400 .85rem Roboto;

      }
      .react-select__indicators{
        svg{
          color:var(--green);
        }
      }
    }
    .react-select__menu{
      font:400 .85rem Roboto;
      .react-select__menu-list{
        .react-select__option{
          margin-left:0;
        }
      }
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
