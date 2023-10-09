import "../style/SearchBar.css"
import logo from "../img/LOGO_EPK.png"
import { Link } from 'react-router-dom';
import styled from "styled-components";

export default function SearchBar({titre}){
    const StyledLink = styled(Link)`
        border : 2px solid black;
        color : black;
        text-align: center;
        text-decoration: none;
        margin: 10px;
        margin-top : 30px;
        padding: 10px;
        height: 25%;
        background-color: white;
        font-weight : bolder;
        border-radius : 15px;
        &:hover {
            box-shadow : 2px 2px black
        }
        &:active {
            background-color : pink;
        }
    `
    return (
        <div className="topBorder" >
            <img src={logo} alt="Logo EPK" id="logoEPK"/>
            <h1>{titre}</h1>
            <nav>
                <StyledLink to='/'> Présence </StyledLink>
                <StyledLink to='/invoice'> Facture </StyledLink>
            </nav>
        </div>
    )
}
