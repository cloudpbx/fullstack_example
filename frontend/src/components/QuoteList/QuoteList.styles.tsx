import styled from 'styled-components';

export const StyledQuoteText = styled.p`
  font-size: 20px;
  font-weight: 800;
  color: #0a152e;
  p {
    margin: 0;
    padding: 0;
  }
`;

export const StyledDiv = styled.div`
  position: absolute as absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 400;
  background-color: white;
  padding: 4;
`;

export const BottomEdit = styled.div`
  display: flex;
`;

export const EditText = styled.p`
  font-weight: bold;
  text-decoration: underline;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const StyledAuthurText = styled.p`
  font-style: italic;
  font-size: 16px;
  font-weight: 800;
  color: grey;
`;

export const QuoteCard = styled.div`
  /* max-width: 400px; */
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  padding: 20px;
  margin-bottom: 10px;
  p {
    margin: 0;
    padding: 0;
  }
`;

export const ListContainer = styled.div`
  /* margin-left: 10px; */
`;

export const BottomCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 5px 0;
`;

export const TopCard = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: flex-end; */
  padding: 5px 0;
`;
