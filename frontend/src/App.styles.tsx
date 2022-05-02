import styled from 'styled-components';

export const Banner = styled.div`
  margin-top: 20px;
  @media screen and (min-width: 1080px) {
    flex-direction: row;
    margin-top: 100px;
  }
`;

export const InstructionsText = styled.p`
  color: grey;
  font-weight: 300;
  font-size: 56px;
  padding: 0;
  margin: 0;
`;

export const ListDiv = styled.div`
  @media screen and (min-width: 1080px) {
    width: 100%;
    margin-left: 20px;
  }
`;
export const CompanyLogo = styled.p`
  margin: 100px;
  text-decoration: none;
  cursor: pointer;
  color: #0a152e;
  font-weight: regular;
  font-size: 48px;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid rgb(221, 221, 221);
`;

export const ContentWrapper = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1080px) {
    flex-direction: row;
  }
`;
