import { AuthContext } from "../context/AuthContext";
import { ButtonGreen } from "../components/styled/StyledBtn";
import { Container, Form, H2, Label, P, Subcontainer } from "../components/styled/StyledLogin";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import userlogo from "../assets/icon/user.svg";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {store} from "../app/store"
// import {fetchRooms} from "../features/rooms/roomsSlice"
// store.dispatch(fetchRooms)

const InputValid = styled.input`
  font-size: 18px;
  padding: 5px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  border-bottom: 2px solid #c5c5c5;
`;
const InputInvalid = styled.input`
  font-size: 18px;
  padding: 5px;
  margin-bottom: 30px;
  border: none;
  outline: none;
  border-bottom: 2px solid red;
`;
let Input = InputValid;

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("example");
  const { userLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "example") {
      setUser({ email: email, password: password });
      localStorage.setItem("isLogin", true);
      userLogin();
      Input = InputValid;
    } else {
      Input = InputInvalid;
    }
    return navigate("/login");
  };

  useEffect(() => {
    document.title = "Dashboard | Login";
  }, []);

  return (
    <Container>
      <Subcontainer>
        <Form onSubmit={handleSubmit}>
          <img src={userlogo} alt="" />
          <H2>Login</H2>
          <Label>Email:</Label>
          <Input type="email" name="email" id="email" placeholder="email" defaultValue="admin@example.com" required onChange={(e) => setEmail(e.target.value)} />
          <Label>Password:</Label>
          <Input type="password" name="password" id="password" placeholder="password" defaultValue="example" required onChange={(e) => setPassword(e.target.value)} />
          <ButtonGreen type="submit" name="submit" id="submit">
            Login
          </ButtonGreen>
          <P>*Just click "Login" to start.</P>
        </Form>
      </Subcontainer>
    </Container>
  );
};

export default Login;
