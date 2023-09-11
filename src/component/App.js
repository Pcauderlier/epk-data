
import '../style/App.css';
import comandes from '../data/data.json'
import { useState } from 'react';
import dataSort from './dataSort'
import TableauCours from './TableauCours';
import SearchBar from './SearchBar';
/*
{"order_number":"13868",
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
],
  "coupons":[]
}
*/
function App() {
  let [sortedData, updateSortedData] = useState(dataSort(comandes));


  return (
    <div id="page ">
      <SearchBar/>
      <div id="boiteCours">
        {
          sortedData.map((eleve) => 
          <TableauCours cours={eleve}/>
          )
        }
      </div>
    </div>

  );
}

export default App;
