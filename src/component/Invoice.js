import SearchBar from "./SearchBar"
import comandes from '../data/data.json'
import { useRef, useState } from "react"
import React from "react"
import CreateInvoice from "./CreateInvoice"
import '../style/Invoice.css'

export default function Invoice(){
    let [search, updateSearch] = useState('')
    let [afficherDonne, updateAfficherDonne] = useState(false)
    let [com, updateCom] =useState(false);
    let [resetVar, updateResetVar] = useState(false)
    let sociaty = useRef();
    let TVA = useRef();
    let adress = useRef();
    let city = useRef();

    function searchCom(){
        if (resetVar){
            TVA.current.value = '';
            sociaty.current.value = '';
            adress.current.value = '';
            city.current.value = '';
        }  
        updateCom(false)
        for (let order of comandes){
            if (order.order_number === search){
                updateCom(order)
                updateResetVar(true)                             
            }
        }
        updateAfficherDonne(true)
              
    }

    function modfif(){
        let newSociaty = com.sociaty;
        let newSociatyCity = com.sociaty_city;
        let newSociatyAdress = com.sociaty_adress;

        if (sociaty.current.value !== ''){
            newSociaty = sociaty.current.value
        }        
        if (city.current.value !== ''){
            newSociatyCity = city.current.value
        }
        if (adress.current.value !== ''){
            newSociatyAdress = adress.current.value
        }
        updateCom({...com, sociaty : newSociaty, sociaty_adress : newSociatyAdress, sociaty_city : newSociatyCity, TVA : TVA.current.value})
        console.log(com)
    }
    
    return (
        <div>
            <SearchBar/>
            <div id="invoicePage">
                <div id="searchBox">
                    <label>Entrer un Numéros de comande  </label>
                    <input type='number' onChange={(e) => updateSearch(e.target.value)}></input>
                    <button className="button" onClick={()=>{searchCom()}}>rechercher</button>
                </div>
                <div id="data">
                    {!afficherDonne ? 
                    <div></div>
                    :
                    (typeof(com) === 'boolean' ? 
                    <div>Numéros de comande invalide ou introuvable</div>
                    :
                    <div id="formBox">
                        <div className="infoBox">
                            Numéros de commande :  {com.order_number} 
                        </div>
                        <div className="infoBox">
                            Etats de la commande :  {com.order_status} 
                        </div>
                        <div className="infoBox">
                            <div>Nom du client : {com.billing_name}</div>
                        </div>
                        <div className="infoBox">
                            <div>Description : {com.products[0].name}</div>
                        </div>
                        <div className="infoBox">
                            <div>Date : {com.order_date}</div>
                        </div>
                        <div className="infoBox">
                            <label>Nom de la societé :  </label>
                            <input type='text' placeholder={com.sociaty} ref={sociaty}></input> 
                        </div>
                        <div className="infoBox">
                            <label>Numéros de TVA : </label>
                            <input type='text' ref={TVA}></input>
                        </div>
                        <div className="infoBox">
                            <label>Adresse societé :  </label>
                            <input type='text' placeholder={com.sociaty_adress} ref={adress}></input> 
                        </div>
                        <div className="infoBox">
                            <label>Ville :  </label>
                            <input type='text' placeholder={com.sociaty_city} ref={city}></input> 
                        </div>              
                        <div className="infoBox">
                            <div>Total TVAC : {com.order_total} € </div>
                        </div>
                        <div className="infoBox">
                            <div>Total HTVA : {com.products[0].item_price} €</div>
                        </div>
                        <div className="infoBox">
                            <div>Total TVA : {(com.order_total-com.products[0].item_price).toFixed(2)} €</div>
                        </div>
                        <div>
                            <button className="button" onClick={() => modfif()}>Modifier</button>
                        </div>
                                            
                    </div>
                    )
                    }
                    <div id="invoiceBox">                
                        <CreateInvoice commande={com}/>                    
                    </div>
                </div>
                

            </div>
            
            {/* <PDFDownloadLink document={<CreateInvoice/>} fileName="Test">
                            {({loading}) => (loading ? <button>Chargement ... </button> : <button>Telecharger Facture</button>)}
            </PDFDownloadLink> */}
        </div>
        
    )   
    }

    // date.split(' ')[0])
    // city.replace(',','')