import { createContext } from "react";
import api from '../Services/api.js';

export const UserContext = createContext({});



function UserProvider({ children }) {

    async function getJogada() {
        await api
            .get("/tabuleiro/")
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => { console.log(`Opss aconteceu o erro: ${err}`) })
    }

    return (
        <UserContext.Provider value={{ getJogada }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

