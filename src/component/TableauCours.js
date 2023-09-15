import "../style/TableauCours.css"


export default function TableauCours({cours}){//cours est une liste contenant en [0], le nom du cours et en [1], une liste d'éleve
  /*  {"order_number":"13868",
    "order_status":"Termin\u00e9e",
    "order_date":"2023-09-04 21:18",
    "billing_first_name":"Genevi\u00e8ve",
    "billing_last_name":"Mottet",
    "billing_email":"plume0907@gmail.com",
    "billing_phone":"0475760941",
    "order_total":"100.00",
    "products":[
      {"sku":"ENTIB-231107",
      "line_id":1,
      "name":"\u00c9nergie tib\u00e9taine  07\/11\/2023",
      "qty":"1",
      "item_price":82.64}
    ],*/
    return (
        <div id="container">
       
            <h3>{cours[0]}</h3>
            
        <table>
            <thead>
                <tr>
                    <th>Numeros de Client</th>
                    <th>Prenom</th>
                    <th>Nom</th>
                    <th>Etat de la comande</th>
                </tr>
            </thead>
            <tbody>
            {
                cours[1].map((eleve) => 
                <tr>
                    <td className="numberCenter">{eleve.order_number}</td>
                    <td>{eleve.billing_first_name}</td>
                    <td>{eleve.billing_last_name}</td>
                    <td className="numberCenter">{eleve.order_status}</td>
                </tr>
                )
            }
            </tbody>
        </table>
        </div>
    )
}