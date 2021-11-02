import { useContext } from 'react';
import { UserContext } from '../Context/content.js'
import api from '../Services/api.js';

export default function Header({ titulo }) {

    const { getJogada } = useContext(UserContext);

    async function handleDelete() {
        await api.delete('/tabuleiro/reset')
            .then((res) => {
                console.log(res.data);
                getJogada();
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <b className="navbar-brand">{titulo}</b>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="nav-link btn" type="submit" onClick={() => handleDelete()} aria-current="page">
                                Resetar jogo
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}