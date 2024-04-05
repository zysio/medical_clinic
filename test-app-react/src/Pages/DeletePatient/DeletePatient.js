import "./DeletePatient.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"

const DeletePatient = () => {

    const navigate = useNavigate();

    const [Patients, setPatients] = useState();
    const [patient, setPatient] = useState();
    const [searchTerm, setSearchTerm] = useState(''); // selected result
    const [searchResults, setSearchResults] = useState([]); // search result
    const [isListVisible, setListVisible] = useState(true); // track list visibility

    const [errors, setErrors] = useState({});
    const [res, setRes] = useState({});

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    }


    const DeletePatient = async (e) => {
        e.preventDefault();
        console.log(patient)
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("https://localhost:7047/api/patient/DeletePatientAndAddress", patient);
                setRes(response.data);

            }
            catch (error) {
                console.error('Error while sending data: ', error);
            }
           
        }
        else {
            console.log('Form has errors, cannot submit.');
        }
        setIsPopupOpen(!isPopupOpen);
        setPatient("");
        setSearchTerm("");
        fetchData();
        alert("Patient has beed deleted")
        navigate('/DeletePatient');
    }

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

      const handleResultClick = (clickedTerm) => {
        setSearchTerm(clickedTerm);
        setListVisible(false);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get("https://localhost:7047/api/patient/GetAllPatients");
            setPatients(response.data);
        }
        catch (error) {
            console.error("Error while fetching data: ", error);
        }
    }


    const handlePatient = (clickedTerm) => {
        setPatient(clickedTerm);
        {patient &&
            setSearchTerm(patient.last_name)}
        console.log(patient)
        setListVisible(false);
    };

    return (
        <>
        <div className="edit-patient-container">
            <Header string={"Delete Patient"} />
            <div className="edit-cont">
                <div className="input-group">
                    <div>
                    <input
                        type="search"
                        placeholder="Search patient by last name"
                        aria-describedby="button-addon1"
                        className=" serc"
                        value={patient && patient.last_name !== '' ? patient.last_name : searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setListVisible(true)}
                        />
                        {isListVisible && searchTerm && (
                            <ul className="search-results-list">
                                <div className="search-patient">
                                    <p className="list-element">ID</p>
                                    <p className="list-element">First Name</p>
                                    <p className="list-element">Last Name</p>
                                </div>
                                {Patients.filter(patient =>
                                 patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                 .map((patient, index) => (
                                <li className="search-patient" key={index}
                                    onClick={() => {handlePatient(patient);}}>
                                     <p className="list-element">{patient.patient_id}</p>
                                     <p className="list-element">{patient.first_name}</p>
                                     <p className="list-element">{patient.last_name}</p>
                                </li>))}
                            </ul>)}
                            </div>
                    </div>
                <div>
                {patient &&(
                    <>
                    <div className="data-storage">
                        <div className="data-container">
                            <p className="data-header">Patient id:</p>
                            <p>{patient.patient_id}</p>
                        </div>
                        <div className="data-container">
                            <p className="data-header">First name:</p>
                            <p>{patient.first_name}</p>
                        </div>
                        <div className="data-container">
                            <p className="data-header">Last name:</p>
                            <p>{patient.last_name}</p>
                        </div>
                        <div className="data-container">
                            <p className="data-header">PESEL:</p>
                            <p>{patient.pesel}</p>
                        </div>
                        <div className="data-container">
                            <p className="data-header">City:</p>
                            <p>{patient.address.city}</p>
                        </div>
                        <div className="data-container">
                            <p className="data-header">Street:</p>
                            <p>{patient.address.street}</p>
                        </div>
                        <div className="data-container">
                            <p className="data-header">Zip-code:</p>
                            <p>{patient.address.zip_code}</p>
                        </div>
                        <button className="delete-button" onClick={togglePopup}>Delete Patient</button>
                    </div>
                    </>
                )}
            </div>

                {isPopupOpen && (
                    <div className="overlay">
                        <div className="popup">
                            <div className="popup-content">
                                <h2>Delete Patient</h2>
                                <p>Are you sure?</p>
                                <div className="popupButtons">
                                    <button className="pop-button" onClick={DeletePatient}>Delete</button>
                                    <button className="pop-button" onClick={togglePopup}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>
                <Footer />
            </div>  
        </>
    )
}
export default DeletePatient;
