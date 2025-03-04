'use client'
import { useEffect, useState, useRef } from 'react';
import httpClient from '../utils/httpClient';

export default function Formulario() {

    const [listaAgendamentos, setListaAgendamentos] = useState([]);

    const idAgendamento = useRef('');
    const idCli = useRef('');
    const idCorretor = useRef('');
    const idImovel = useRef('');
    const DtHr = useRef('');
    const aceito = useRef('');

    // function confirmarAgendamento() {

    //     let status = 0;
    //         httpClient.post('/agendamento/alterar', {
    //             idAgendamento: idAgendamento,
    //             idCli: idCli.current.value,
    //             idCorretor: idCorretor.curent.value,
    //             idImovel: idImovel.current.value,
    //             DtHr: DtHr.current.value,
    //             aceito: aceito.current.value
    //         })
    //             .then(r => {
    //                 status = r.status;
    //                 return r.json();
    //             })
    //             .then(r => {
    //                 alert(r.msg);
    //                 if (status == 200) {
    //                     window.location.link('https://youtube.com');
    //                 }
    //             })
    //     }

    function listarAgendamentos() {
        httpClient.get("/agendamento/listar")
            .then(r => r.json())
            .then(r => {
                setListaAgendamentos(r);
            })
            .catch(error => console.error('Erro ao listar agendamentos:', error));
    }

    useEffect(() => {
        listarAgendamentos();
    }, []);

    return (
        <div>
            <h1>Lista dos agendamentos</h1>

            <div className='form-group'>
                <div className='table-responsive'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>ID Agendamento</th>
                                <th>Nome do cliente</th>
                                <th>Corretor responsável</th>
                                <th>Imóvel</th>
                                <th>Data do agendamento</th>
                                <th>Horário</th>
                                <th>Aceito</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                listaAgendamentos.map((value, index) => {
                                    // Supondo que DtHr seja uma string no formato ISO, ou similar
                                    const dtHr = new Date(value.DtHr); // Cria um objeto Date
                                    const data = dtHr.toLocaleDateString('pt-BR'); // Formata a data
                                    const hora = dtHr.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Formata a hora

                                    return (
                                        <tr key={index}>
                                            <td>{value.idAgendamento}</td>
                                            <td>{value.idCli}</td>
                                            <td>{value.idCorretor}</td>
                                            <td>{value.idImovel}</td>
                                            <td>{data}</td> {/* Exibe a data formatada */}
                                            <td>{hora}</td> {/* Exibe a hora formatada */}
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => {
                                                        if (confirm('Tem certeza que deseja confirmar este agendamento como aceito?')) {
                                                            httpClient.put(`/agendamento/alterar`, { aceito: 'S', idAgendamento: value.idAgendamento })
                                                                .then(r => {
                                                                    listarAgendamentos(); // Atualiza a lista de agendamentos
                                                                })
                                                                .catch(error => console.error('Erro ao alterar agendamento:', error));
                                                        }
                                                    }}
                                                >
                                                    Sim
                                                </button>
                                                <button
                                                    style={{ marginLeft: 10 }}
                                                    className="btn btn-danger"
                                                    onClick={() => {
                                                        if (confirm('Tem certeza que deseja rejeitar este agendamento?')) {
                                                            httpClient.put(`/agendamento/alterar`, { aceito: 'N', idAgendamento: value.idAgendamento })
                                                                .then(r => {
                                                                    alert(r.msg);
                                                                    listarAgendamentos(); // Atualiza a lista de agendamentos
                                                                })
                                                                .catch(error => console.error('Erro ao alterar agendamento:', error));
                                                        }
                                                    }}
                                                >
                                                    Não
                                                </button>
                                            </td>


                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
