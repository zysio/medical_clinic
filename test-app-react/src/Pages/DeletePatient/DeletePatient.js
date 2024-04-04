import "./DeletePatient.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";


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

    const handlePatient = (clickedTerm) => {
        setPatient(clickedTerm);
        console.log(patient)
    };


    return (
        <>
            <div className="body-container">
                <div className="input-group">
                    <input
                        type="search"
                        placeholder="Search patient by last name"
                        aria-describedby="button-addon1"
                        className=" serc"
                        value={searchTerm}
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
                                    onClick={() => {handleResultClick(patient.patient_id); handlePatient(patient);}}>
                                     <p className="list-element">{patient.patient_id}</p>
                                     <p className="list-element">{patient.first_name}</p>
                                     <p className="list-element">{patient.last_name}</p>
                                </li>))}
                            </ul>)}
                </div>
                <div>
                {patient &&(
                    <>
                        <p>{patient.first_name}</p>
                        <p>{patient.last_name}</p>
                        <p>{patient.pesel}</p>
                    </>
                )}
                <button onClick={togglePopup}>Delete Patient</button>

                {isPopupOpen && (
                    <div className="overlay">
                        <div className="popup">
                            <div className="popup-content">
                                <h2>Delete Patient</h2>
                                <p>Are you sure?</p>
                                <div className="popupButtons">
                                    <button onClick={DeletePatient}>Delete</button>
                                    <button onClick={togglePopup}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                </div>


            </div>

                

        </>
    )
}
export default DeletePatient;
