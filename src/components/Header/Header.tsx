import './Header.css';
import logo from '../../assets/logo.svg';
import HeartIcon from '../HeartIcon/HeartIcon';
import { useCharacterContext } from '../../context/characterContext';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Header() {
    const { favoriteCharacters, setFavoriteMode } = useCharacterContext();
    const navigate = useNavigate();
    const favCharacters: number = favoriteCharacters?.length || 0;

    const toggleFavoriteMode = (isFavorite: boolean) => {
        setFavoriteMode(isFavorite);
        if (window.location.pathname !== '/') {
            navigate('/');
        }
    };
    return (
        <>
            <header>
                <img src={logo} alt="Marvel logo" onClick={() => toggleFavoriteMode(false)} />
                <div className='fav-container' onClick={() => toggleFavoriteMode(true)}>
                    <HeartIcon isDefault={true} />
                    <span>{favCharacters.toString()}</span>
                </div>

            </header>
            <Outlet />
        </>

    );
}

export default Header;