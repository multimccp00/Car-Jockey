import axios from 'axios'; //HTTP client para fazer pedidos de APIS

const Fetchdata = (searchTerm) => { //recebe como prop o searchterm(string)
    const performSearch = async (term) => {  //recebe o searchterm quando é chamada a funçao  
        try {
            const res = await axios.get(`http://localhost:8800/cars/search?model=${term}`); //localhost:8800 é o server da minha API
            return res.data; //retorna uma PROMISE que é uma array de dados de carros the estejam relacionados com o modelo em procura
        } catch (err) {
            console.error(err);
            return [];
        } 
    };

    return performSearch(searchTerm); //chamada a funçao
}

export default Fetchdata