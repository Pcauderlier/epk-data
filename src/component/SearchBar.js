import "../style/SearchBar.css"
import logo from "../img/LOGO_EPK.png"
import { useState } from "react"


export default function SearchBar(/*search , updateSearch, typeSearch, updateTypeSearch*/){
    let [search, updateSearch] = useState('')
    let [typeSearch, updateTypeSearch] = useState('')
    function upsearch(e){
        
    }
    console.log(search)

    return (
        <div className="topBorder" >
            <img src={logo} alt="Logo EPK" id="logoEPK"/>
            <h1>Présences a l'EPK</h1>
            <div id="search">
                <form>
                    <label for="choixCours">Type de recherche </label>
                    <select id="choixCours" name="choixCours" value={typeSearch} onChange={e=>updateTypeSearch(e.target.value)}>
                        <option value="cours">Cours</option>
                        <option value="prenom">Prenom</option>
                        <option value="nom">Nom</option>
                        <option value="numClient">Numeros de client</option>
                    </select>
                    <input type="text" placeholder="Recherche ..." onChange={e => updateSearch(e.target.value)}></input>

                </form>
                
            </div>
        </div>
    )
}
