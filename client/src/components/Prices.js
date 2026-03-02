import React, { useState, useEffect } from 'react';

const Prices = ({ searchValue }) => { //prices é chamada na pagina search, e recebe como prop 
    const [averagePrice, setAveragePrice] = useState(null);

    useEffect(() => {
        if (searchValue.length > 0) {
            try {
                const total = searchValue.reduce((sum, car) => { //percorrer o array de forma a poder fazer a soma de todos os preços dos carros que tiverem no array
                    const price = parseFloat(car.price.replace(/[^\d.]/g, '')); //o preço na base de dados esta como string ent é necessario passar essa infomaçao para um float, assim como é necessario remover qualquer digito que nao seja um numero dai o regex dentro do replace
                    return sum = sum + price;
                }, 0);
                
                const avg = total / searchValue.length; //a funçao reduce nao altera o array, portanto o memo mantem o seu conteudo ento para calcular a media continuo a poder usar o searchvalue.length
                setAveragePrice(avg);// poder usar a avg fora desta scope
            } catch (error) {
                console.error(error);
                setAveragePrice(null);
            }
        }
    }, [searchValue]);

    return (
        <div className="search-results-page">
            {averagePrice !== null && ( //condiçao de render no react caso o averageprice seja diferente de null da render do que ta depois do && 
                <div className="average-price">                    
                    <h3>Average Price</h3>
                    <p>{averagePrice}</p>
                </div>
            )}
        </div>
    );
};

export default Prices;