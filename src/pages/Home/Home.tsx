import './Home.css';
import SearchFilter from "../../components/SearchFilter/SearchFilter"
import MainList from "../../components/MainList/MainList"
function Home() {


    return (
        <main className="main-content-wrapper">
            <SearchFilter></SearchFilter>
            <MainList></MainList>
        </main>
    );

}

export default Home;