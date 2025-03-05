'use client'
import { useEffect, useRef, useState } from "react";
import httpClient from '@/app/utils/httpClient';  // Supondo que você tenha um httpClient configurado

export default function Home({ children }) {

    const [listaDisponibilidade, setListaDisponibilidade] = useState([]);
    const [showModal, setShowModal] = useState(false);  // Estado para controlar o modal de disponibilidades
    const [showFormModal, setShowFormModal] = useState(false);  // Estado para controlar o modal do formulário
    const [selectedSchedule, setSelectedSchedule] = useState(null);  // Armazena o horário selecionado para agendamento

    const nomeCliente = useRef('');
    const telCliente = useRef('');
    const emailCliente = useRef('');
    const obsCliente = useRef('');
    const diaAgendamento = useRef('');
    const horaAgendamento = useRef('');


    function criarCliente(){
        let status = 0;
        httpClient.post("/clientes/gravar", {
            nome: nomeCliente.current.value,
            tel: telCliente.current.value,
            email: emailCliente.current.value,
            obs: obsCliente.current.value
        })
            .then(r => {
                status = r.status;
                if (status === 200) {
                    alert("Cliente criado com sucesso!");
                    agendarHorario();
                } else {
                    alert("Erro ao criar o cliente.");
                }
            })
            .catch(error => {
                console.error('Erro ao criar cliente:', error);
                alert("Ocorreu um erro ao tentar criar o cliente.");
            });
    }

    function agendarHorario(e) {
        e.preventDefault();  // Previne o comportamento padrão de envio do formulário
        let status = 0;
        // Chamada para a API de agendamento
        httpClient.post("/agendamento/gravar", {
            diaAgendamento: selectedSchedule.dia,  // Atribuindo o valor de dia do selectedSchedule
            horaAgendamento: selectedSchedule.hora, // Atribuindo o valor de hora do selectedSchedule
            nomeCliente: nomeCliente.current.value,
            telCliente: telCliente.current.value,
            emailCliente: emailCliente.current.value,
            obsCliente: obsCliente.current.value
        })
            .then(r => {
                status = r.status;
                if (status === 200) {
                    alert("Agendamento realizado com sucesso!");
                    fecharFormModal();  // Fecha o modal após o sucesso
                } else {
                    alert("Erro ao realizar o agendamento.");
                }
            })
            .catch(error => {
                console.error('Erro ao agendar horário:', error);
                alert("Ocorreu um erro ao tentar agendar.");
            });
    }


    // Função para listar as disponibilidades
    function listarDisponibilidade() {
        httpClient.get("/disponibilidade/listar")
            .then(r => r.json())
            .then(r => {
                setListaDisponibilidade(r);
                setShowModal(true);  // Abre o modal de disponibilidades ao receber a lista
            })
            .catch(error => console.error('Erro ao listar disponibilidade:', error));
    }

    // Função para fechar o modal de disponibilidades
    const fecharModal = () => {
        setShowModal(false);
    };

    // Função para abrir o modal do formulário de agendamento
    const abrirFormModal = (dia, hora) => {
        setSelectedSchedule({ dia, hora });
        setShowFormModal(true);
    };

    // Função para fechar o modal do formulário
    const fecharFormModal = () => {
        setShowFormModal(false);
        setSelectedSchedule(null);  // Limpa o horário selecionado
    };

    useEffect(() => {
        listarDisponibilidade();
    }, []);

    return (
        <div style={{ marginTop: 50 }}>
            <header className="bg-dark py-5">
                <div className="container px-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-xl-5 col-xxl-6 d-none d-xl-block">
                            <img className="img-fluid rounded-3 my-5"
                                src="https://www.geracaoimoveis.com.br/foto_/2022/11178/sao-jose-dos-campos-casa-condominio-condominio-residencial-alphaville-ii-23-05-2024_14-27-13-16.webp"
                                alt="Imagem da casa" />
                        </div>
                        <div className="col-lg-8 col-xl-7 col-xxl-6">
                            <div className="my-5 text-center text-xl-start">
                                <h1 className="display-5 fw-bolder text-white mb-2">Casa em Jacarépagua</h1>
                                <p className="lead fw-normal text-white-50 mb-4">Quer comprar a casinha dos seus sonhos?</p>
                                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <button
                                        className="btn btn-primary btn-lg px-4 me-sm-3"
                                        onClick={listarDisponibilidade}>
                                        Agende sua visita
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Modal para exibir as disponibilidades */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Disponibilidades</h5>
                                <button type="button" className="btn-close" onClick={fecharModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Dia</th>
                                            <th>Horário</th>
                                            <th>Agendar</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {listaDisponibilidade.map((value, index) => (
                                            <tr key={index}>
                                                <td>{value.diaSemana}</td>
                                                <td>{value.hora}</td>
                                                <td><button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => abrirFormModal(value.diaSemana, value.hora)}>
                                                    Agendar
                                                </button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={fecharModal}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para o formulário de agendamento */}
            {showFormModal && selectedSchedule && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="formModalLabel">Agende sua Visita</h5>
                                <button type="button" className="btn-close" onClick={fecharFormModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome</label>
                                        <input ref={nomeCliente} type="text" className="form-control" id="nome" placeholder="Seu nome" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telefone" className="form-label">Telefone</label>
                                        <input ref={telCliente} type="tel" className="form-control" id="telefone" placeholder="Seu telefone" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input ref={emailCliente} type="email" className="form-control" id="email" placeholder="Seu email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="observacao" className="form-label">Observação</label>
                                        <textarea ref={obsCliente} className="form-control" id="observacao" placeholder="Observações" />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={criarCliente}>Confirmar Agendamento</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={fecharFormModal}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
