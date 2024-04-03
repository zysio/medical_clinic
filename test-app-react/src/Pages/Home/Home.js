import "./Home.css";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
        <div className="buttonsContainer">
        <Link to={`/AddPatient`} ><div className="divButton">Add Patient</div></Link>
        <Link to={`/DeletePatient`} ><div className="divButton">Delete Patient</div></Link>
        <Link to={`/EditPatient`} ><div className="divButton">Edit Patient</div></Link>
        <Link to={`/ListPatient`} ><div className="divButton">List Patients</div></Link>
        </div>
        </>
    )
}
export default Home;