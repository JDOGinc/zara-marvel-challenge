import './Main.css';
import SearchFilter from "../../components/SearchFilter/SearchFilter"
import MainList from "../../components/MainList/MainList"
//import { getCharacters } from '../../services/characterService';


function Main() {


    return (
        <main className="main-content-wrapper">
            <SearchFilter></SearchFilter>
            <MainList></MainList>
        </main>
    );

}

export default Main;