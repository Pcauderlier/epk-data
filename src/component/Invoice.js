import SearchBar from "./SearchBar"
import comandes from '../data/data.json'
import { useState } from "react"
import React from "react"
import CreateInvoice from "./CreateInvoice"


export default function Invoice(){
    let [search, updateSearch] = useState('')
    let [afficherDonne, updateAfficherDonne] = useState(false)
    let [com, updateCom] =useState('')

    function searchCom(){
        for (let order of comandes){
            if (order.order_number === search){
                updateCom(order)
                console.log(order)                
            }
        }
        if (com === ''){
            updateCom(false)
        }
        updateAfficherDonne(true)
    }
    return (
        <div>
            <SearchBar/>
            <div id="boiteCours">
                <div>
                    <label>Entrer un Numéros de comande  </label>
                    <input type='number' onChange={(e) => updateSearch(e.target.value)}></input>
                    <button onClick={()=>{searchCom()}}>rechercher</button>
                </div>
                {!afficherDonne ? 
                null
                :
                (typeof(com) === 'boolean' ? 
                <div> Numéros de comande invalide ou introuvable </div>
                :
                <div>
                    <div>
                        Numéros de comande :  {com.order_number} 
                    </div>
                    <div>
                        <label>Nom du client  :  </label>
                        <input type='text' value={com.billing_name}></input> 
                    </div>
                    <div>
                        <label>Date  :  </label>
                        <input type='text' value={com.order_date}></input> 
                    </div>
                    <div>
                        <label>Nom de la societé :  </label>
                        <input type='text' value={com.sociaty}></input> 
                    </div>
                    <div>
                        <label>Adresse societé :  </label>
                        <input type='text' value={com.sociaty_adress}></input> 
                    </div>
                    <div>
                        <label>Ville :  </label>
                        <input type='text' value={com.sociaty_city}></input> 
                    </div>
                    <div>
                        <label>Description :  </label>
                        <input type='text' value={com.products[0].name}></input> 
                    </div>
                    <div>
                        <label>Total TVAC :  </label>
                        <input type='text' value={com.order_total}></input> 
                    </div>
                    <div>
                        <label>Total HTVA :  </label>
                        <input type='text' value={com.products[0].item_price}></input> 
                    </div>
                    <div>
                        <label>Total TVA :  </label>
                        <input type='text' value={(com.order_total-com.products[0].item_price).toFixed(2)}></input> 
                    </div>
                    <div>
                        <label>Numéros de TVA : </label>
                        <input type='text'></input>
                    </div>
                    <div>
                        <CreateInvoice commande={com}/>
                    </div>

                    
                </div>
                )
                }

            </div>
            
            {/* <PDFDownloadLink document={<CreateInvoice/>} fileName="Test">
                            {({loading}) => (loading ? <button>Chargement ... </button> : <button>Telecharger Facture</button>)}
            </PDFDownloadLink> */}
        </div>
        
    )   
    }