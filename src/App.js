import React, {useEffect, useState} from 'react';
import './App.css';
import './Button.css';

import PokemonCard from "./components/pokemonCard/PokemonCard";

import axios from "axios";
function App() {
    const [pokemonArray, setPokemonArray] = useState([]);
    const [arrayMetaData, setArrayMetaData] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    // function goToPreviousPage() {
    //     setUrl(arrayMetaData.previous);
    // }
    //
    // function goToNextPage() {
    //     setUrl(arrayMetaData.next);
    // }
    useEffect(()=> {
        toggleLoading(true);
        setError(false);

        async function fetchEmAll() {
            try {
                const result = await axios.get(url);
                console.log(result);
                setArrayMetaData(result.data);
                setPokemonArray(result.data.results);
                console.log(arrayMetaData);
                console.log(url);
            } catch (e) {
                console.error(e);
                setError(true);
            }
            toggleLoading(false);
        }
        fetchEmAll();
    }, [url]);

    return (
        <>
            <>
                <button type="button" className="nav-button" disabled={!arrayMetaData.previous} onClick={() => setUrl(arrayMetaData.previous)}>Vorige</button>
                <button type="button" className="nav-button" disabled={!arrayMetaData.next} onClick={() => setUrl(arrayMetaData.next)}>Volgende</button>
                <div className="poke-deck">
                <ul>
                    {pokemonArray && pokemonArray.map((pokemon) => {
                    {console.log(pokemon.name)}
                    return<PokemonCard key={pokemon.name} name={pokemon.name}/>  })
        }
        </ul>
                    {loading && <p>Loading...</p>}
                    {error && <p>Er ging iets mis bij het ophalen van de data...</p>}
                </div></></>)
}
export default App;