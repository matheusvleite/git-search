import { useState } from 'react'
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';

import apiprofile from '../../apis/api-profile'

function App() {
    const history = useNavigate();
    const [input, setInput] = useState('');
    const [user, setUser] = useState({});


    async function searchUser() {
        if (input === '') {
            alert("Preencha com algum Usuario!")
            return;
        }
        try {
            const response = await apiprofile.get(`${input}`)
            setUser(response.data);
        } catch {
            alert("Error ao buscar Usuario!")
            setInput("")
        }
    }

    async function handlePesquisa() {
        // consumir a api
        const reponse = await apiprofile.get(`${input}/repos`)
        setUser(reponse.data)
        // salvando no local storage
        const repositoriesName = reponse.data;
        localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName))
        history('/repositories')  
  }

    return (
        <div className="container">
            <h1> <svg xmlns="http://www.w3.org/2000/svg"
                width="30" height="25" fill="currentColor"
                class="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg> GITHUB BUSCA</h1>
            <div className="area-search">
                <input type="text" placeholder="Digite o usuario :)" value={input}
                    onChange={(e) => setInput(e.target.value)}></input>
                <button className="buttonsearch" onClick={searchUser}>Buscar</button>
            </div>

            {Object.keys(user).length > 0 && (
                <div className="main">
                    <img src={user.avatar_url} />
                    <div className="describe">
                        <p>{user.name} <strong>({user.login})</strong></p>
                        <p>{user.location}</p>
                        <p>Repositórios: {user.public_repos}</p>
                        <p className="repos"><a href onClick={handlePesquisa}>Ver Repositórios <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
                            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg></a></p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
