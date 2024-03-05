
import './Details.css';
import { useParams } from 'react-router-dom';
import ComicSlider from '../../components/ComicSlider/ComicSlider';
import { useCharacterContext } from '../../context/characterContext';
import { useEffect, useState } from 'react';
import { Character } from '../../types/character';
import useFavorite from '../../hooks/useFavorite';
import DetailsInfoCard from '../../components/DetailsInfoCard/DetailsInfoCard';
import useFetchCharacters from '../../hooks/useFetchCharacters';

function Details() {
    const { id } = useParams();
    const [character, setCharacter] = useState<Character | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const { charactersList, favoriteList } = useCharacterContext();
    const { fetchCharacterById } = useFetchCharacters();

    const { toggleFavorite } = useFavorite();

    useEffect(() => {
        if (id === undefined) return;
        const characterData = charactersList.find(char => char.id === Number(id));
        if (characterData === undefined && charactersList.length > 0) {
            const fetchData = async () => {
                const characterData = await fetchCharacterById(Number(id));
                if (characterData && favoriteList.some(fav => fav.id === characterData.id)) {
                    characterData.isFavorite = true;
                }
                setCharacter(characterData);
            };
            fetchData();
        } else {
            setCharacter(characterData);
        }

    }, [id, charactersList, fetchCharacterById, favoriteList]);


    if (id === undefined || character === undefined) {
        return null
    } else {
        return (
            <>
                {!isLoading && <DetailsInfoCard character={character} toggleFavorite={toggleFavorite} />}
                <section className='character-comics'>
                    <div className='comics-content'>
                        <ComicSlider id={id} setIsLoading={setIsLoading}></ComicSlider>
                    </div>
                </section>
            </>
        )

    }


}
export default Details;