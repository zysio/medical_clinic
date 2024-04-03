import "./AddPatient.css";
import { useEffect, useState } from "react";
import axios from "axios";



const AddPatient = () => {



    const [errors, setErrors] = useState({})
    const [res, setRes] = useState({});
    




      const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        PESEL: '',
        street: '',
        city: '',
        zip_code: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Data validation AddPatient
        if (
            formData.first_name.trim() === '' ||
            formData.last_name.trim() === '' ||
            formData.PESEL.trim() === '' ||
            formData.street.trim() === '' ||
            formData.city.trim() === '' ||
            formData.zip_code.trim() === ''
        ) {
            alert('Not all fields are filled in');
            return;
        }


        const zipCode = /^\d{2}-\d{3}$/;
        if (!zipCode.test(formData.zip_code.trim())) {
            alert('wrong zip-code. syntax: XX-XXX');
            return;
        }

        //Adding patient
        console.log(formData)
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("https://localhost:7047/api/patient/AddPatient", formData);
                setRes(response.data);
            }
            catch (error) {
                console.error('Error while sending data: ', error);
            }
        }
        else {
            console.log('Form has errors, cannot submit.');
        }

        alert('patient has been added');
        setFormData({
            first_name: '',
            last_name: '',
            PESEL: '',
            street: '',
            city: '',
            zip_code: ''
        });
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
                        <div className="formWrapper">
                            <div className="formInputs">
                                <label>
                                    <p>First Name</p>
                                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                                </label>
                                <label>
                                    <p>Last Name</p>
                                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                                </label>
                                <label>
                                    <p>PESEL</p>
                                    <input type="text" name="PESEL" value={formData.PESEL} onChange={handleChange} />
                                </label>
                                <label>
                                    <p>Street</p>
                                    <input type="text" name="street" value={formData.street} onChange={handleChange} />
                                </label>
                                <label>
                                    <p>City</p>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                                </label>
                                <label>
                                    <p>Zip-code</p>
                                    <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} />
                                </label>
                            </div>
                            <div className="formButton">
                                <button type="submit">Add Patient</button>
                            </div>
                        </div>
                    </form>
        </>
    )
}
export default AddPatient;
