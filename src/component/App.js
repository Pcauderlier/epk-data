
import '../style/App.css';
import TableauCours from './TableauCours';
import SearchBar from './SearchBar';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import host from '../host/host.json'



function App() {
  let [courseList, updateCourseList] = useState(false);
  let [message, updateMessage] = useState('')
  let [buttonMessage, updateButtonMessage] =  useState('Refresh');
  const getOrders = async (course) => {
    try{
      console.log('get orders est appelé')
      if (course.orders_list.length !== 0){
        const response = await Axios.get(`http://${host.ipLocal}/orders/course/${course.course_id}`);
        if (response.status === 200){
          let r = await response.data
          return(r)
        }
      }
      else{
        return []
      }
    }
    catch(err){
        console.log(err)
        return []
    }
  };
  const getCourse = async () => {
    console.log("get course appelé")
    let ajd = new Date();
    let date = new Date().setDate(ajd.getDate()-7)
    try{
      let response = await Axios.get(`http://${host.ipLocal}/course/after/${date}`);
      if( response.status === 200 ){
        updateCourseList(response.data)
      }
    }
    catch(err){
      alert("server surement turn off")
      return false
    }
  }
  const update = async () => {
    updateMessage('requete en cours, ne pas reapuyer sur le bouton avant que ce message n ai changer !');
    updateButtonMessage("Ne pas réapuyer sur le bouton !");
    try{
      let response = await Axios.post(`http://${host.ipLocal}/orders/`);
      if (response.status ===200){
        updateMessage(response.data.message);
        updateButtonMessage("Refresh");
      }
    }
    catch(err){
      updateMessage(err)
    }

  }  
  useEffect(() => {
    getCourse()
  },[message])
  // let sortedData= dataSort(comandes)
  return (
    <div >
      <SearchBar titre={"Présence à l'EPK"}/>
      <div id="page"> 
        <div id='search'> 
          <button className="button" onClick={()=> update()} style={{backgroundColor :  buttonMessage !==  "Refresh" && "red" }}>{buttonMessage} </button>
          <div>{message}</div>
        </div>
        <div className='filter'>
        {/* Filtre sur le status des cours ? */}
        </div>
        <div id="boiteCours">
          {
            courseList !== false &&
            courseList.map((course) => (

            <TableauCours key={course.id} course={course} ordersList={getOrders(course)}/>
          ))
          }
        </div>
      </div>
    </div>

  );
}

export default App;
