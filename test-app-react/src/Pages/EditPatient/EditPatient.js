import "./EditPatient.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"

const EditPatient = () => {
    const navigate = useNavigate();

    const [patients, setPatients] = useState();
    const [patient, setPatient] = useState();

    const [searchTerm, setSearchTerm] = useState(''); 
    const [searchResults, setSearchResults] = useState([]); 
    const [isListVisible, setListVisible] = useState(true); 

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

      const handlePatient = (clickedTerm) => {
        setPatient(clickedTerm);
        console.log(patient)
        setListVisible(false);
    };

    const [dataEditResponseStatus, setDataEditResponseStatus] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [editedUserData, setEditedUserData] = useState({
        patient_id: "",
        first_name: "",
        last_name: "",
        pesel: "",
        zip_code: "",
        city: "",
        street: ""
    });

    const handleEditClick = () => {
        setIsEditing(true);

        setEditedUserData({
            patient_id: patient.patient_id,
            first_name: patient.first_name,
            last_name: patient.last_name,
            pesel: patient.pesel,
            zip_code: patient.address.zip_code,
            city: patient.address.city,
            street: patient.address.street
        });
    };

    const handleDataInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({
            ...editedUserData,
            [name]: value
        });
    };

    const editPersonalData = async (e) => {
        e.preventDefault();
        try {
            const url = "https://localhost:7047/api/patient/EditPatient";
            const response = await axios.post(url, editedUserData, {
            })
            setDataEditResponseStatus(response.data);

            // if (response.status === 200) {
            //     localStorage.setItem('first_name', editedUserData.first_name);
            //     localStorage.setItem('last_name', editedUserData.last_name);
            //     localStorage.setItem('PESEL', editedUserData.PESEL);
            //     localStorage.setItem('street', editedUserData.street);
            //     localStorage.setItem('city', editedUserData.city);
            //     localStorage.setItem('zip_code', editedUserData.zip_code);
            setIsEditing(false);
                 patient.first_name = editedUserData.first_name;
                 patient.last_name = editedUserData.last_name;
                 patient.PESEL = editedUserData.PESEL;
                 patient.address.street = editedUserData.street;
                 patient.address.city = editedUserData.city;
                 patient.address.zip_code = editedUserData.zip_code;
                 //refreshNavigation();
            // }

        }
        catch (error) {
        }
    }


    return (
        <>
        <div className="edit-patient-container">
            <Header string={"Edit Patient"} />
            <div className="edit-cont">
            <div className="input-group">
                <div>
                        <input
                            type="search"
                            placeholder="Search patient by Last Name"
                            aria-describedby="button-addon1"
                            className=" serc"
                            value={patient && patient.last_name}
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
                                    {patients.filter(patient =>
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
                {patient && (
            <div>
                <div className="userDataContainer">
                        <span className="break"></span>
                        <h3>Personal Data</h3>
                        <div className="userDataInfo">
                            <div className="dataRow gap">
                                <div className="dataName">
                                    First Name
                                </div>
                                <div className="data">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="first_name"
                                            maxLength={50}
                                            value={editedUserData.first_name}
                                            onChange={handleDataInputChange}
                                        />
                                    ) : (
                                        patient.first_name
                                    )}
                                </div>
                            </div>
                            <div className="dataRow gap">
                                <div className="dataName">
                                    last_name
                                </div>
                                <div className="data">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="last_name"
                                            maxLength={50}
                                            value={editedUserData.last_name}
                                            onChange={handleDataInputChange}
                                        />
                                    ) : (
                                        patient.last_name
                                    )}
                                </div>
                            </div>
                            <div className="dataRow gap">
                                <div className="dataName">
                                    PESEL
                                </div>
                                <div className="data">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="pesel"
                                            maxLength={50}
                                            value={editedUserData.pesel}
                                            onChange={handleDataInputChange}
                                        />
                                    ) : (
                                        patient.pesel
                                    )}
                                </div>
                            </div>
                            <div className="dataRow gap">
                                <div className="dataName">
                                    Street
                                </div>
                                <div className="data">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="street"
                                            maxLength={50}
                                            value={editedUserData.street}
                                            onChange={handleDataInputChange}
                                        />
                                    ) : (
                                        patient.address.street
                                    )}
                                </div>
                            </div>
                            <div className="dataRow gap">
                                <div className="dataName">
                                    City
                                </div>
                                <div className="data">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="city"
                                            maxLength={9}
                                            minLength={9}
                                            value={editedUserData.city}
                                            onChange={handleDataInputChange}
                                        />
                                    ) : (
                                        patient.address.city
                                    )}
                                </div>
                            </div>
                            <div className="dataRow gap">
                                <div className="dataName">
                                    zip-code
                                </div>
                                <div className="data">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="zip_code"
                                            maxLength={50}
                                            value={editedUserData.zip_code}
                                            onChange={handleDataInputChange}
                                        />
                                    ) : (
                                        patient.address.zip_code
                                    )}
                                </div>
                            </div>
                        </div>
                        {isEditing ? (
                            <>
                                <div className="openedButtons">
                                    <button className="deleteButtons" onClick={editPersonalData}>Save</button>
                                    <button className="deleteButtons" onClick={() => { setIsEditing(false) }}>Back</button>
                                </div>
                                
                            </>
                        ) : (
                            <button className="deleteButtons" onClick={handleEditClick}>Edit</button>
                        )}
                        {dataEditResponseStatus && <span>{dataEditResponseStatus}</span>}
                    </div>
                </div>
                )}
                            </div>
                <Footer/>
            </div>
        </>
    )
}
export default EditPatient;