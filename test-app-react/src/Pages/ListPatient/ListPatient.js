import "./ListPatient.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientList from '../../Components/PatientList/PatientList'
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"

const ListPatient = () => {
    const [patients, setPatients] = useState();

    useEffect(() => {
        const getPatients = () => {
          axios.get('https://localhost:7047/api/patient/GetAllPatients').then(
            response => {
              setPatients(response.data)
              console.log(response.data)
            }
          ).catch(err => {
            console.log('Error while fetching data')
          })
        }
        getPatients()
      }, []);

    return (
        <>
        <div className="list-cont">
          <Header string={"List Patients"} />
          <div className="list-patients-container">
            <h1>Click to sort</h1>
            {patients && <PatientList patients={patients} />}
          </div>
          <Footer/>
          </div>
        </>
    )
}
export default ListPatient;