import React, { useState, useEffect } from 'react';
import axios from 'axios'; //HTTP client para fazer pedidos de APIS

const Images = ({Modelo,Marca}) => {
    const API_URL = "https://api.unsplash.com/search/photos"; // base endpoint
    // keep the key out of source code; place in environment file
    const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
    const [searchResults, setSearchResults] = useState([]); //array de imgs onde vao ficar guardadas usado o usestate para o componente ser atualizado assim que faz o pedido ha API
    const fullSearch = Marca + " " + Modelo; //somente para ser mais facil de alterar o api request foi criada uma variavel para a search

    useEffect(() => {
        const getImages = async () => {            
            try {
                const res = await axios.get(`${API_URL}?query=${fullSearch}&page=1&client_id=${API_KEY}`);  //pedido ha API
                setSearchResults(res.data.results) //guardar as imgs com o uso do set
            } catch(err) {
                console.log(err)
            }            
        }
        getImages()
    });

    return(
        <div className="image-gallery">
        {searchResults.map(image => (
            <img key={image.id} src={image.urls.small} alt={image.alt_description} />
        ))}
    </div>   
    )
}

export default Images;