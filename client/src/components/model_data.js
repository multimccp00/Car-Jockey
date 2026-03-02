import axios from 'axios';

const Fetchdatamodel = (searchTerm) => {
    const performSearch = async (term) => {    
        try {
            const res = await axios.get(`http://localhost:8800/cars/search/unique?model=${term}`); //pedido para somente me dar todos os modelos unicos, ou seja nao repetir modelos quando sugere
            return res.data; //devolve os modelos
        } catch (err) {
            console.error(err);
            return [];
        } 
    };

    return performSearch(searchTerm);//chamada da funçao
}

export default Fetchdatamodel