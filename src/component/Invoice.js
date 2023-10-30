import SearchBar from "./SearchBar"
import { useRef, useState } from "react"
import React from "react"
import CreateInvoice from "./CreateInvoice"
import '../style/Invoice.css'
import Axios from "axios"


export default function Invoice(){
    let [input, updateInput] = useState('');
    let [order, updateOrder] = useState(false);
    let [course, updateCourse] = useState();
    let [eleve, updateEleve] = useState();
    let sociaty = useRef();
    let TVA = useRef();
    let adress = useRef();
    let city = useRef();
    let postcode = useRef();

    async function search(){ 
        
        // if (resetVar){
        //     TVA.current.value = '';
        //     sociaty.current.value = '';
        //     adress.current.value = '';
        //     city.current.value = '';
        //     postcode.current.value ='';
        // }
        
        try{
            let response = await Axios.get(`http://localhost:3001/orders/${input}`)
            if (response.status === 200){
                
                const courseRequest = await Axios.get(`http://localhost:3001/course/${response.data.course_id}`)
                const eleveRequest = await Axios.get(`http://localhost:3001/eleve/${response.data.customer_id}`)
                if(courseRequest.status === 200){
                    updateCourse(courseRequest.data)
                    console.log(course)
                }
                if(eleveRequest.status === 200){
                    updateEleve(eleveRequest.data)
                }
                updateOrder(response);
            }
        }
        catch (err){
            updateOrder(err.response)
            console.log(err)
        }
            
    }

    async function modfif(){
        let newSociaty = sociaty.current.value === ''? eleve.sociaty : sociaty.current.value;
        let newSociatyCity = city.current.value === '' ? eleve.adress.city : city.current.value;
        let newSociatyAdress = adress.current.value === '' ? eleve.adress.street : adress.current.value;
        let newTVA = TVA.current.value === '' ? eleve.TVA : TVA.current.value;
        let newPostcode = postcode.current.value === '' ? eleve.adress.postcode : postcode.current.value;
        updateEleve({...eleve, sociaty : newSociaty, adress : {city : newSociatyCity , street : newSociatyAdress, postcode : newPostcode}, TVA : newTVA});
       // A rajouter : methode pour update la base de donnée avec PUT
    }
    
    return (
        <div>
            <SearchBar titre={'Création de facture'}/>
            <div id="invoicePage">
                <div id="searchBox">
                    <label>Entrer un Numéro de commande  </label>
                    <input type='number' onChange={(e) => updateInput(e.target.value)}></input>
                    <button className="button" onClick={()=>{search()}}>rechercher</button>
                </div>
                
                    {order !== false && 
                    
                    (order.status === 404 ? 
                    <div id="erreurMessage">{order.data.message}</div>
                    :
                    <div id="data">
                        <div id="formBox">
                            <div className="infoBox">
                                Numéros de commande :  {order.data.orders_id} 
                            </div>
                            <div className="infoBox">
                                Etats de la commande :  {order.data.status} 
                            </div>
                            <div className="infoBox">
                                <div>Nom du client : {order.data.customer_name}</div>
                            </div>
                            <div className="infoBox">
                                <div>Description : {course.name}</div>
                            </div>
                            <div className="infoBox">
                                <div>Date : {order.data.date_created}</div>
                            </div>
                            <div className="infoBox">
                                <label>Nom de la societé :  </label>
                                <input type='text' placeholder={eleve.sociaty} ref={sociaty}></input> 
                            </div>
                            <div className="infoBox">
                                <label>Numéros de TVA : </label>
                                <input type='text' placeholder={eleve.TVA} ref={TVA}></input>
                            </div>
                            <div className="infoBox">
                                <label>Adresse societé :  </label>
                                <input type='text' placeholder={eleve.adress.street} ref={adress}></input> 
                            </div>
                            <div className="infoBox">
                                <label>Ville :  </label>
                                <input type='text' placeholder={eleve.adress.city } ref={city}></input> 
                            </div>  
                            <div className="infoBox">
                                <label>Code Postal :  </label>
                                <input type='text' placeholder={eleve.adress.postcode} ref={postcode}></input> 
                            </div>              
                            <div className="infoBox">
                                <div>Total TVAC : {order.data.price.TVAC} € </div>
                            </div>
                            <div className="infoBox">
                                <div>Total HTVA : {order.data.price.HTVA} €</div>
                            </div>
                            <div className="infoBox">
                                <div>Total TVA : {order.data.price.TVA} €</div>
                            </div>
                            <div>
                                <button className="button" onClick={() => modfif()}>Modifier</button>
                            </div>
                                                
                        </div>
                        <div id="invoiceBox">
                        <CreateInvoice orders={order.data} course={course} eleve={eleve}/>
                        </div>
                    </div>
                    )
                    }            
                </div>
            
            </div>
        
    )   
    }