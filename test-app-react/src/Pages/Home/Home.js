import "./Home.css";
import { Link } from 'react-router-dom';
import Header from "../../Components/Header/Header"
import Footer from "../../Components/Footer/Footer"
const Home = () => {
    return (
        <>
        <div className="home-cont">
            <Header string={"Home Page"} />
            <div className="buttonWrapper">
                <div className="buttonsContainer">
                    <Link className="divButton" to={`/AddPatient`} ><h1>Add Patient</h1></Link>
                    <Link className="divButton" to={`/DeletePatient`} ><h1>Delete Patient</h1></Link>
                    <Link className="divButton" to={`/EditPatient`} ><h1>Edit Patient</h1></Link>
                    <Link className="divButton" to={`/ListPatient`} ><h1>List Patients</h1></Link>
                </div>
            </div>
            <Footer />
        </div>
  
        </>
    )
}
export default Home;