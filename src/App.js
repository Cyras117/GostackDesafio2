import React from "react";
import {useEffect,useState} from "react";
import "./styles.css";
import api from './services/api'


function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      title:`Novo repositorio ${Date.now()}`,
      url:`www.${Date.now()}.com`,
      techs:[],
    });

    setRepositories([...repositories,response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r => (
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>            
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
