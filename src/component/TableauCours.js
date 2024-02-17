import { useEffect, useState } from "react";
import "../style/TableauCours.css"


export default function TableauCours({course,ordersList}){
    const [orders, updateOrders] = useState([]);
    useEffect(() => {
        if (ordersList){
            ordersList.then((response) => {
                updateOrders(combineNames(response))
            })
        }
    },[ordersList]);
    function combineNames(l){
        let newL = [];
        let customerL = []
        for (let order of l){
            if (customerL.indexOf(order.customer_id) === -1){
                customerL.push(order.customer_id)
                newL.push(order)
            }
            else{
                for (let newOrder of newL){
                    if (newOrder.customer_id === order.customer_id){
                        newOrder.price.TVAC += order.price.TVAC;
                        newOrder.status += " + " + order.status;
                        newOrder.orders_id += " + " + order.orders_id;
                    }
                }
            }
        }
        return newL
    }
    return (
        <div id="container">
       
            <h3>{course.name}</h3>
            
        <table>
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Numeros de Client</th>
                    <th>Nom</th>
                    <th>Etat de la comande</th>
                    <th>Prix TVAC </th>
                    
                </tr>
            </thead>
            <tbody>
            {
                orders.length !== 0 &&
                orders.map((order) => {
                    return(
                <tr key={order.id}>
                    <td>{orders.indexOf(order)+1}</td>
                    <td className="numberCenter">{order.orders_id}</td>
                    <td>{order.customer_name}</td>
                    <td className="numberCenter">{order.status}</td>
                    <td className="numberCenter">{order.price.TVAC} €</td>
                    
                </tr>
                )}
                )
            }
            </tbody>
        </table>
        </div>
    )
}