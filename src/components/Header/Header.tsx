import './Header.css';
import logo from '../../assets/logo.svg';
import heartDefault from '../../assets/heart-icon-default.svg';
function Header() {
    return (
        <header>
            <img src={logo} alt="Marvel logo" />
            <div className='fav-container'>
                <img src={heartDefault} className="fav-icon" alt="Heart favorite icon" />
                <span>3</span>
            </div>

        </header>
    );
}

export default Header;