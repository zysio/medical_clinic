import "./Header.css";
import { Link } from 'react-router-dom';

const Header = ({string}) => {
    return (
        <div className="header-body">
            <Link className="home-button" to="/"><h1>Home</h1></Link>
            <div className="string-header"><h1>{string}</h1></div>
        </div>
    )
}
export default Header;