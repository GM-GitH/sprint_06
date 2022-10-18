import styled from "styled-components";

const greendk = "#135846";
const greenlt = "#ebf1ef";
const yellowdk = "#FF9C3A";
const yellowlt = "#FFFFFF";
const reddk = "#E23428";
const redlt = "#FFEDEC";
const color = [greendk, greenlt, yellowdk, yellowlt, reddk, redlt];

export const ButtonGreen = styled.button`
  display: block;
  border: none;
  border-radius: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  padding: 10px 40px;
  color: ${color[0]};
  background: ${color[1]};
  margin: 0 auto;
  &:hover {
    transition: all 0.3s ease 0s;
    color: ${color[1]};
    background-color: ${color[0]};
  }
`;
export const ButtonYellow = styled(ButtonGreen)`
  color: ${color[2]};
  background: ${color[3]};
  &:hover {
    transition: all 0.3s ease 0s;
    color: ${color[3]};
    background-color: ${color[2]};
  }
`;
export const ButtonRed = styled(ButtonGreen)`
  color: ${color[4]};
  background: ${color[5]};
  &:hover {
    transition: all 0.3s ease 0s;
    color: ${color[5]};
    background-color: ${color[4]};
  }
`;

export const ButtonYlw = (props) => {
  const ButtonY = styled.button`
    transition: all 0.3s ease 0s;
    color: ${color[2]};
    background-color: ${props.availib ? "#FF9C3A" : "gray"};
    &:hover {
      color: ${color[3]};
      background-color: ${color[2]};
    }
  `;
  return <ButtonY availib={props.availib}>{props.label}</ButtonY>;
};
