import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Prices from '../components/Prices';
import Images from '../components/Images';
import Fetchdata from '../components/car_data';
import NavSearch from '../components/Search';
import Videos from '../components/video';
import "../css/search.css"


const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); //para poder voltar a homepage
    const [searchTerm, setSearchTerm] = useState(''); //para definir o que vai ser usado nas APIS como a informaçao pedida
    const [searchResults, setSearchResults] = useState([]); //faço o pedido aqui para poder controlar se aparecem resultados ou nao
    const [brand, setBrand] = useState(null); //somente para boa pratica

    
    useEffect(() => {
        const searchTerm = location.state?.searchTerm; //poder ir buscar a search feita na homepage       
        if (searchTerm) {
            const fetchSearchResults = async () => {
                const results = await Fetchdata(searchTerm); //faço o pedido aqui para poder controlar se aparecem resultados ou nao
                setSearchResults(results); //poder usar os dados fora desta scope
                setSearchTerm(searchTerm) //o searchter de momento so existe dentro deste scope, entao dou set para poder ser usado fora dele
                if(results.length > 0) //nao dar erro caso nao exista o modelo
                    setBrand(results[0].brand); //boa pratica
                
            };
            fetchSearchResults();//chaamda a funçao  
        }     
    }, [location.state]);

    const handleHomenavigation = () => { //funçao para voltar ha homepage
        navigate('/');
      };
    
    if(searchResults.length > 0){//condiçao so aparecem os resultados caso existam resultados 
        return (
            <div>
                <div>
                    <nav className="navbar">
                        <div className="nav-content">
                            <button onClick={handleHomenavigation}>Home</button>
                            <div className="search-section">
                                <NavSearch/>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="search-container">
                    <div>
                        <h1>{brand}</h1>                    
                        <h2>{searchTerm}</h2>
                        <Prices searchValue={searchResults} />
                        <Images Modelo={searchTerm} Marca={brand} />
                        <Videos Modelo={searchTerm} Marca={brand} />
                    </div>
                </div>
            </div>       
        );
    }else{//caso nao existam
        return(
            <div>
                <div>
                    <nav className="navbar">
                        <div className="nav-content">
                            <button onClick={handleHomenavigation}>Home</button>
                            <div className="search-section">
                                <NavSearch/>
                            </div>
                        </div>
                    </nav>
                </div>

                <p className="no-results">No results found</p>
            </div>       
            
        );
    }   
};

export default SearchPage;

