import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 100vh;
`;

export const NotFound = styled.div`
  max-width: 520px;
  width: 100%;
  line-height: 1.4;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const InnerContainer = styled.div`
  position: relative;
  height: 240px;
`;

export const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  font-size: 252px;
  font-weight: 900;
  margin: 0px;
  color: #262626;
  text-transform: uppercase;
  letter-spacing: -40px;
  margin-left: -20px;
`;

export const Text = styled.span`
  text-shadow: -8px 0px 0px #fff;
`;

export const SubTitle = styled.h3`
  font-family: 'Cabin', sans-serif;
  position: relative;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: #262626;
  margin: 0px;
  letter-spacing: 3px;
  padding-left: 6px;
`;
