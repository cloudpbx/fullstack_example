import styled from 'styled-components';

export const AddCard = styled.div`
  /* box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25); */
  border-bottom: 1px solid rgb(221, 221, 221);
  display: flex;
  flex-direction: column;
  /* min-width: 240px;
  max-width: 600px; */
  margin-bottom: 20px;
  padding-bottom: 20px;
  @media screen and (min-width: 1080px) {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    min-width: 220px;
    max-width: 356px;
    border: 1px solid rgb(221, 221, 221);
    padding: 30px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const GenerateButton = styled.button`
  padding: 0.5rem;
  cursor: pointer;
  background-color: #e4482d;
  font-weight: 700;
  color: white;
  border: none;
  font-size: 16px;
  margin: 5px 0px;
  font-weight: 600;
`;

export const AddButton = styled.button`
  padding: 0.5rem;
  cursor: pointer;
  background-color: #0a152e;
  font-weight: 700;
  color: white;
  border: none;
  font-size: 16px;
  margin: 5px 0px;
  font-weight: 600;
`;
