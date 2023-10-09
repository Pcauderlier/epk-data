import "../style/TableauCours.css"


export default function TableauCours({cours}){//cours est une liste contenant en [0], le nom du cours et en [1], une liste d'éleve
    let num = 0;
    return (
        <div id="container">
       
            <h3>{cours[0]}</h3>
            
        <table>
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Numeros de Client</th>
                    <th>Nom</th>
                    <th>Etat de la comande</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {
                cours[1].map((eleve) => {
                    num+=1;
                    return(
                <tr>
                    <td>{num}</td>
                    <td className="numberCenter">{eleve.order_number}</td>
                    <td>{eleve.billing_name}</td>
                    <td className="numberCenter">{eleve.order_status}</td>
                    <td>{eleve.billing_email}</td>
                </tr>
                )}
                )
            }
            </tbody>
        </table>
        </div>
    )
}