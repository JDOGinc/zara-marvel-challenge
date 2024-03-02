import './Home.css';
import SearchFilter from "../../components/SearchFilter/SearchFilter"
import MainList from "../../components/MainList/MainList"
import { useCharacterContext } from '../../context/characterContext';
function Home() {

    const { favoriteMode } = useCharacterContext();
    return (
        <main className="main-content-wrapper">
            {favoriteMode && <div className='page-title'><h2>FAVORITES</h2></div>}
            <SearchFilter></SearchFilter>
            <MainList></MainList>
        </main>
    );

}

export default Home;