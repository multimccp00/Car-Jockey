import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fetchdatamodel from './model_data';

const NavSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingModels, setMatchingModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatchingModels = async () => {
      const models = await Fetchdatamodel(searchTerm);
      setMatchingModels(models.map((car) => car.model).slice(0, 10));//aparecem so 10 sugestoes para nao encher a pagina assim que começamos a escrever
    };

    if (searchTerm.trim() !== '') {
      fetchMatchingModels(); //caso esteja vaziu o campo nao aparecer nadae caso esteja aparecer os modelos parecidos
    } else {
      setMatchingModels([]);
    }
  }, [searchTerm]);

  const handleSearch = () => { //faz a search e muda a pagina para pagina de search
    navigate('/search', { state: { searchTerm } });
  };

  const handleModelSelect = (model) => {
    setSearchTerm(model);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="nav-search">
      <input
        type="text"
        placeholder="Enter car model..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
      {matchingModels.length > 0 && (
        <ul className="matching-models">
          {matchingModels.map((model, index) => (
            <li key={index} onClick={() => handleModelSelect(model)}>
              <button>{model}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavSearch;