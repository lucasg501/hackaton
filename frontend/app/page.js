'use client'
import { useEffect, useRef, useState } from "react";
import httpClient from '@/app/utils/httpClient';  // Supondo que você tenha um httpClient configurado

export default function Home({ children }) {

    const [listaDisponibilidade, setListaDisponibilidade] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [agendamentoEfetuado, setAgendamentoEfetuado] = useState(false); // Novo estado


    const nomeCliente = useRef('');
    const telCliente = useRef('');
    const emailCliente = useRef('');
    const obsCliente = useRef('');

    // Função para calcular as datas da semana com base na resposta da API
  // Função para calcular as datas da semana com base nas disponibilidades
function calcularDatasSemana(disponibilidades) {
    const hoje = new Date();  // Data atual
    const diaDaSemana = hoje.getDay();  // Dia da semana (0 a 6, sendo 0 = Domingo)

    // Determinar a quantidade de dias para voltar até a segunda-feira
    const diasParaSegunda = (diaDaSemana === 0 ? 6 : diaDaSemana - 1);  // Se for domingo (0), volta 6 dias, caso contrário, volta até o dia da segunda-feira

    // Calculando a data de segunda-feira da semana atual
    const segundaFeira = new Date(hoje);
    segundaFeira.setDate(hoje.getDate() - diasParaSegunda);

    // Mapear os dias da semana que vieram da API (em minúsculas)
    const diasSemanaApi = disponibilidades.map(dia => dia.diaSemana.toLowerCase());  // Exemplo: "segunda", "terça", "quarta", etc.

    // Mapeia os dias da API para suas datas corretas
    let datasCorrespondentes = diasSemanaApi.map(dia => {
        const dataDia = new Date(segundaFeira);  // Copiar a data da segunda-feira
        const diasDaSemana = { "segunda": 0, "terca": 1, "quarta": 2, "quinta": 3, "sexta": 4, "sabado": 5, "domingo": 6 }; // Mapeamento de dias da semana
        const offsetDia = diasDaSemana[dia];  // Obter o número do dia da semana (0 = segunda, 1 = terça, etc.)

        // Ajustar a data para o dia da semana correto
        dataDia.setDate(segundaFeira.getDate() + offsetDia);

        return {
            diaSemana: dia,
            data: dataDia.toLocaleDateString()  // Formato local da data
        };
    });

    return datasCorrespondentes;
}

// Função para listar as disponibilidades
function listarDisponibilidade() {
    httpClient.get("/disponibilidade/listar")
        .then(r => r.json())
        .then(r => {
            // Calcular as datas correspondentes aos dias da semana
            const disponibilidadesComDatas = calcularDatasSemana(r);

            // Agora, associamos as informações da API com as datas calculadas
            const disponibilidadesCompletas = r.map((dispo, index) => {
                return {
                    ...dispo, // Mantém todas as propriedades da API
                    data: disponibilidadesComDatas[index]?.data || 'Data não disponível', // Adiciona a data calculada
                };
            });

            setListaDisponibilidade(disponibilidadesCompletas); // Atualiza o estado com as disponibilidades e datas
            setShowModal(true);  // Abre o modal de disponibilidades
        })
        .catch(error => console.error('Erro ao listar disponibilidade:', error));
}

// Função para cadastrar o agendamento
function cadastrarAgendamento() {
    let status = 0;

    httpClient.post('/clientes/gravar', {
        nome: nomeCliente.current.value,
        tel: telCliente.current.value,
        email: emailCliente.current.value,
        obs: obsCliente.current.value
    })
        .then(r => {
            status = r.status;
            return r.json();
        })
        .then(r => {
            if (status === 200) {
                // Pegando o id_cliente retornado da criação do cliente
                const id_cliente = r.id_cliente;

                // Função para formatar o dia e hora para o formato DATETIME do banco (yyyy-mm-dd hh:mm:ss)
                function formatarDataHora(diaSemana, hora) {
                    const diasSemana = {
                        "segunda": 0,
                        "terca": 1,
                        "quarta": 2,
                        "quinta": 3,
                        "sexta": 4,
                        "sabado": 5,
                        "domingo": 6
                    };

                    // Cria a data base como sendo hoje
                    const hoje = new Date();
                    const diaDaSemana = hoje.getDay(); // Pega o dia atual (0=domingo, 1=segunda...)

                    // Calcula a quantidade de dias até o próximo dia da semana
                    const diasAteData = diasSemana[diaSemana.toLowerCase()] - diaDaSemana;

                    // Cria a data para o agendamento
                    const dataAgendamento = new Date(hoje);
                    dataAgendamento.setDate(hoje.getDate() + diasAteData + 1);

                    // Formatar a data no formato yyyy-mm-dd
                    const ano = dataAgendamento.getFullYear();
                    const mes = String(dataAgendamento.getMonth() + 1).padStart(2, '0');
                    const dia = String(dataAgendamento.getDate()).padStart(2, '0');

                    // Criar a data completa com a hora (hora passada como argumento)
                    const dataFormatada = `${ano}-${mes}-${dia} ${hora}:00`; // Hora no formato de 24 horas (ex: "08:00:00")

                    return dataFormatada;
                }

                // Formatar a data e hora do agendamento
                const dataHoraAgendada = formatarDataHora(selectedSchedule.dia, selectedSchedule.hora);

                // Realizando o cadastro do agendamento
                httpClient.post('/agendamento/gravar', {
                    idCli: id_cliente,  // Passa o id_cliente para o agendamento
                    idCorretor: 5,     // Exemplo de id do corretor
                    idImovel: 1,        // Exemplo de id do imóvel
                    DtHr: dataHoraAgendada,  // Data e hora do agendamento no formato DATETIME
                })
                    .then(agendamentoResponse => {
                        if (agendamentoResponse.status === 200) {
                            setAgendamentoEfetuado(true); // Marca que o agendamento foi efetuado
                            //alert("Agendamento cadastrado com sucesso!");
                            httpClient.get("/disponibilidade/agendada",{
                                agendado: 'S'
                                .then(r=>{
                                    alert("Agendamento cadastrado com sucesso!");
                                })
                            })
                        } else {
                            alert("Erro ao cadastrar o agendamento.");
                        }
                    })
                    .catch(error => {
                        alert("Erro ao cadastrar o agendamento. Detalhes: " + error);
                    });
            } else {
                alert("Erro ao cadastrar o cliente.");
            }
        })
        .catch(error => {
            alert("Erro ao cadastrar o cliente. Detalhes: " + error);
        });
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
                                            <th>Data</th>
                                            <th>Horário</th>
                                            <th>Agendar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaDisponibilidade.map((value, index) => (
                                            <tr key={index}>
                                                <td>{value.diaSemana}</td>
                                                <td>{value.data}</td>
                                                <td>{value.hora}</td>
                                                {listaDisponibilidade[index].agendado === 'S' ? (
                                                    <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={() => abrirFormModal(value.diaSemana, value.hora)}
                                                        disabled={agendamentoEfetuado} // Desabilita o botão caso o agendamento tenha sido efetuado
                                                    >
                                                        Agendar
                                                    </button>
                                                </td>
                                                ) : (
                                                    <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={() => abrirFormModal(value.diaSemana, value.hora)}
                                                        disabled={agendamentoEfetuado} // Desabilita o botão caso o agendamento tenha sido efetuado
                                                    >
                                                        Agendar
                                                    </button>
                                                </td>
                                                )}

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
                                    <button type="submit" className="btn btn-primary" onClick={cadastrarAgendamento}>Confirmar Agendamento</button>
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
