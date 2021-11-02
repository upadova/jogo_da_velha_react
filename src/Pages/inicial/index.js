import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../../Components/header.js";
import React from 'react';
import api from '../../Services/api.js';
import './inicial.css';


export default function Inicial() {
    const [jogador, setJogador] = useState('X');
    const [jogadas, setJogadas] = useState();
    const [loading, setLoading] = useState(true);
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    useEffect(() => {
        getJogada();
    }, [])

    async function enviarJogada(position) {
        await api.post("/tabuleiro/", {
            'jogador': jogador,
            "coordenada": position
        })
            .then((res) => {
                getJogada();
                toast.success(res.data);
                if (jogador === 'X') {
                    setJogador('O');
                } else {
                    setJogador('X');
                }
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.msg);
                    // console.log(error.response.data.msg);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                }
            });
    }


    async function getJogada() {
        await api
            .get("/tabuleiro/")
            .then((response) => {
                setJogadas(response.data)
                console.log(response.data);
                setLoading(false);
            })
            .catch((err) => { console.log(`Opss aconteceu o erro: ${err}`) })
    }

    function handleClick(position) {
        enviarJogada(position);
    }

    if (loading) {
        return (
            <div className="align-items-center center">
                <div className="spinner-border" role="status" aria-hidden="true"></div>
                <strong>Carregando...</strong>
            </div>
        )
    } else if (jogadas.ganhador) {
        return (
            <div>
                <Header titulo="Jogo da Velha" />
                <div className="h1 centralizar">O grande vencedor é o jogador: {jogadas.jogador}</div>
            </div>
        )
    }
    else {
        return (
            <div>
                <Header titulo="Jogo da Velha" />
                <div className="h2 centralizar">É a vez do jogador: {jogador}</div>
                <div className="container col-sm-4 jogo_da_velha">
                    <div className="row row-cols-3 box_size">
                        {numbers.map((number) => (
                            <div className="d-flex justify-content-center" key={number}>
                                <button type="submit" className="shadow mb-2 bg-body rounded" onClick={() => handleClick(number)}>
                                    {jogadas.jogadas.map((valor) => (
                                        valor.coordenada === number ? valor.jogador : ' '
                                    ))}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}