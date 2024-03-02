import HeartIcon from '../../components/HeartIcon/HeartIcon';
import './Details.css'
import ComicCard from '../../components/ComicCard/ComicCard';
import { useEffect, useState } from 'react';
import { getComicsByCharacter } from '../../services/characterService';
import { useParams } from 'react-router-dom';
import { useCharacterContext } from '../../context/characterContext';
import { Character } from '../../types/character';
import { Comic } from '../../types/character';


function Details() {
    const { id } = useParams();
    const { characters, getCharacter } = useCharacterContext();
    const [character, setCharacter] = useState<Character | undefined>(undefined);
    const [comics, setComics] = useState([] as Comic[]);


    useEffect(() => {
        if (id !== undefined) {
            const characterDetail: Character = getCharacter(parseInt(id));
            if (characterDetail !== undefined) {
                getComicsByCharacter(id).then((res) => {
                    const comicsData: Comic[] = res.data.results.map((comic) => ({
                        id: comic.id,
                        title: comic.title,
                        imageUrl: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
                        year: getYearOfOnsaleDate(comic.dates[0].date)
                    }));
                    setComics(comicsData);
                })
                /*const comicsData: Comic[] = comicMock.map((comic) => ({
                    id: comic.id,
                    title: comic.title,
                    imageUrl: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
                    year: getYearOfOnsaleDate(comic.dates[0].date)
                }));*/


                setCharacter(characterDetail);
            } else {
                setCharacter(undefined);
            }
        }
    }, [id, characters, getCharacter])

    const getYearOfOnsaleDate = (date: string) => {
        const onsaleDate = new Date(date);
        return onsaleDate.getFullYear().toString();
    }

    if (!character) {
        return null
    } else {
        return (
            <>

                <div className='character-resume'>
                    <div className='character-resume-content'>
                        <img src={character.imageUrl} alt={character.name} className='character-resume-image' />
                        <div className='character-resume-info'>
                            <div className='character-resume-title'>
                                <h1>{character.name}</h1>
                                <HeartIcon isDefault={character.isFavorite} />
                            </div>
                            <p className='character-description'>
                                {character.description === '' ? 'No description available' : character.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='character-comics'>
                    <div className='comics-content'>
                        <h2>COMICS</h2>
                        <ul className='comics-list'>
                            {comics.map((comic: Comic) => (
                                <ComicCard
                                    key={comic.id}
                                    id={comic.id}
                                    title={comic.title}
                                    imageUrl={comic.imageUrl}
                                    year={comic.year}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        )

    }


}
export default Details;