import './ComicSlider.css';
import { Comic } from '../../types/character';
import ComicCard from '../ComicCard/ComicCard';
import { useEffect, useState } from 'react';
import useFetchCharacters from '../../hooks/useFetchCharacters';

interface ComicSliderProps {
    id: string;
    setIsLoading: (value: boolean) => void;
}

function ComicSlider({ id, setIsLoading }: ComicSliderProps) {
    const [comics, setComics] = useState<Comic[] | undefined>(undefined);
    const { fetchComicsByCharacter } = useFetchCharacters();

    useEffect(() => {
        const fetchComics = async () => {
            setIsLoading(true);
            const comicsData = await fetchComicsByCharacter(id);
            setIsLoading(false);
            setComics(comicsData);
        }
        fetchComics();

    }, [fetchComicsByCharacter, id]);

    if (comics === undefined) {
        return (
            <>
            </>
        )
    } else {
        return (
            <>
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
            </>
        )

    }
}
export default ComicSlider;