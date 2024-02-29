import './Header.css';
import logo from '../../assets/logo.svg';
import HeartIcon from '../HeartIcon/HeartIcon';
import { useCharacterContext } from '../../context/characterContext';

function Header() {
    const { characters } = useCharacterContext();
    const favCharacters: number = characters.filter((character: any) => character.isFavorite).length;
    return (
        <header>
            <img src={logo} alt="Marvel logo" />
            <div className='fav-container'>
                <HeartIcon isDefault={true} />
                <span>{favCharacters.toString()}</span>
            </div>

        </header>
    );
}

export default Header;