import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f8f8f8;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  justify-content: center;
  text-align: center;
`;
export const Subcontainer = styled.div`
  position: absolute;
  top: 43vh;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0px 16px 30px #00000014;
`;
export const Form = styled.form`
  background-color: #ffffff;
  padding: 30px;
`;
export const H2 = styled.h2`
  color: #e23428;
  line-height: 30px;
  cursor: default;
`;
export const Label = styled.label`
  display: block;
  text-align: left;
`;

export const P = styled.p`
  font-size: 12px;
`;