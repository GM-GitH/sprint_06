import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import { ButtonRed } from "./StyledBtn";

const NavbarStyle = styled.div`
  .navbar-container {
    display: flex;
    position: sticky;
    justify-content: space-between;
    top: 0;
    background-color: #ffffff;
    z-index: 2;
    padding: 0.01em 16px;
    box-shadow: 0pt 3pt 10pt #00000005;
    user-select: none;
    cursor: default;
    /* transition: left 400ms; */
  }
  .left-active {
    margin-left: 20%;
    transition: all 0.5s;
    /* transition: left 400ms; */
  }
  .left-inactive {
    margin-left: 0%;
    transition: all 0.5s;
    /* transition: left 400ms; */
  }
  .navbar-buttons {
    display: inline-block;
    margin-top: 15px;
  }
  .material-symbols-outlined {
    margin-right: 30px;
    color: #135846;
    transition: transform 0.1s;
    &:hover {
      color: #e23428;
      transform: scale(1.2);
    }
  }
  .logo {
    box-sizing: border-box;
    max-width: 100%;
    padding: 9% 20% 18% 16%;
  }
  a {
    display: block;
    padding: 8px 16px;
    text-decoration: none;
    text-align: left;
    cursor: pointer;
    padding: 21px 0 21px 56px;
    width: 100%;
    color: #799283;
    &:hover {
      color: #e23428;
      border-left: 5px solid #e23428;
      & img {
        filter: brightness(0.55) hue-rotate(241deg) saturate(20);
      }
    }
    & img {
      width: 24px;
      vertical-align: middle;
      margin-right: 20px;
    }
  }
  img {
    position: relative;
    z-index: 0;
    width: 100%;
  }
  h1 {
    display: inline-block;
    color: #262626;
    font-family: "Poppins", sans-serif;
    font-size: 28;
    line-height: 42px;
    margin-left: 80px;
  }
  #logout {
    cursor: pointer;
    display: inline;
    vertical-align: bottom;
    margin-left: 50px;
  }
`;
export const NavbarContent = ({ logout }) => {
  const isLogin = localStorage.getItem("isLogin");
  const navigate = useNavigate();
  const { id, toggleAuth } = useContext(AuthContext);

  function handleLocalStorage() {
    localStorage.removeItem("isLogin");
    logout();
    toggleAuth(id)
    navigate("/login");
  }
  return (
    <>
      <NavbarStyle>
        <div className="navbar-container">
          <div className="navbar-title">
            <h1>Dashboard</h1>
          </div>
          <div className="navbar-buttons">
            <span className="material-symbols-outlined">search</span>
            <span className="material-symbols-outlined">favorite</span>
            <span className="material-symbols-outlined">mail</span>
            <span className="material-symbols-outlined">notifications</span>
            <span className="material-symbols-outlined">chat</span>
            {/******************************* MUST CLICK TWICE TEMPORARILY BY LOCAL STORAGE AND STATE ********************************/}
            <ButtonRed id="logout" onClick={isLogin ? handleLocalStorage : logout}>
              {/* {isLogin ? "Logout" : "Confirm"} */}
              Logout
            </ButtonRed>
          </div>
        </div>
      </NavbarStyle>
    </>
  );
};
