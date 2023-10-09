import "../style/SearchBar.css"
import logo from "../img/LOGO_EPK.png"
import { Link } from 'react-router-dom';

export default function SearchBar(){
    return (
        <div className="topBorder" >
            <img src={logo} alt="Logo EPK" id="logoEPK"/>
            <h1>Présences a l'EPK</h1>
            <nav>
                <Link to="/"> Acceil </Link>
                <Link to='/invoice'> Facture </Link>
            </nav>
        </div>
    )
}
