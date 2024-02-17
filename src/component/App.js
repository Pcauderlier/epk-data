
import '../style/App.css';
import TableauCours from './TableauCours';
import SearchBar from './SearchBar';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import host from '../host/host.json'



function App() {
  let [courseList, updateCourseList] = useState(false);
  let [message, updateMessage] = useState('')
  let [messageStat, updateMessageStat] = useState('')
  let [buttonMessage, updateButtonMessage] =  useState('Refresh');
  let [buttonStatus, updateButtonStatus] =  useState('Refresh Status');
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
  const updateStatus = async () => {
    updateMessageStat('requete en cours, ne pas reapuyer sur les bouton avant que ce message n ai changer !');
    updateButtonStatus("Ne pas réapuyer sur le bouton ! (cela peut prendre jusqu'a 5 minutes)")
    try{
      let response = await Axios.put(`http://${host.ipLocal}/orders/updateStatus`);
      console.log(response);
      if (response.status ===200){
        updateMessageStat(response.data.message);
        updateButtonStatus("Refresh Status");
      }
    }
    catch(err){
      updateMessageStat(err)
    }

  }  
  useEffect(() => {
    getCourse()
  },[message,messageStat])
  // let sortedData= dataSort(comandes)
  return (
    <div >
      <SearchBar titre={"Présence à l'EPK"}/>
      <div id="page"> 
        <div id='search'> 
        <div>
          <button className="button" onClick={()=> update()} style={{backgroundColor :  buttonMessage !==  "Refresh" && "red" }}>{buttonMessage} </button>
          <div>{message}</div>
        </div>
        <div>
          <button className='button' onClick={() => updateStatus()} style={{backgroundColor :  buttonStatus !==  "Refresh Status" && "red" }}>{buttonStatus} </button>
          <div>{messageStat}</div>
        </div>
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
