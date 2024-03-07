import './Header.css'
import logo from '../../assets/logo.svg'
import HeartIcon from '../HeartIcon/HeartIcon'
import { useCharacterContext } from '../../context/characterContext'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
  const {
    favoriteList,
    setFavoriteMode,
    setFilterQuery,
    filterFavorites,
    filterCharacters,
  } = useCharacterContext()
  const navigate = useNavigate()
  const favCharacters: number = favoriteList?.length || 0

  const toggleFavoriteMode = (isFavorite: boolean) => {
    setFavoriteMode(isFavorite)
    setFilterQuery('')
    if (isFavorite) {
      filterFavorites('')
    } else {
      filterCharacters('')
    }
    if (window.location.pathname !== '/') {
      navigate('/')
    }
  }
  return (
    <>
      <header>
        <img
          src={logo}
          alt="Marvel logo"
          onClick={() => toggleFavoriteMode(false)}
        />
        <div
          data-testid="fav-container"
          className="fav-container"
          onClick={() => toggleFavoriteMode(true)}
        >
          <HeartIcon isDefault={true} />
          <span>{favCharacters.toString()}</span>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Header
