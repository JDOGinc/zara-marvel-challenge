import './Header.css';
import logo from '../../assets/logo.svg';
import HeartIcon from '../HeartIcon/HeartIcon';

function Header() {
    return (
        <header>
            <img src={logo} alt="Marvel logo" />
            <div className='fav-container'>
                <HeartIcon isDefault={true} />
                <span>3</span>
            </div>

        </header>
    );
}

export default Header;