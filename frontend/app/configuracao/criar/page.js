'use client'
import httpClient from '@/app/utils/httpClient';
import { useState } from 'react';

export default function SetConfiguracao() {

  const [statusAtivo, setStatusAtivo] = useState(null);
  const [modo, setModo] = useState(null);

  // Estado para controlar a disponibilidade
  const [disponibilidade, setDisponibilidade] = useState({
    segunda: { selecionado: false, horarios: Array(18).fill(false) },
    terca: { selecionado: false, horarios: Array(18).fill(false) },
    quarta: { selecionado: false, horarios: Array(18).fill(false) },
    quinta: { selecionado: false, horarios: Array(18).fill(false) },
    sexta: { selecionado: false, horarios: Array(18).fill(false) },
    sabado: { selecionado: false, horarios: Array(18).fill(false) },
    domingo: { selecionado: false, horarios: Array(18).fill(false) },
  });

  // Função para atualizar a disponibilidade de hora
  const handleDisponibilidadeChange = (dia, index) => {
    const newDisponibilidade = { ...disponibilidade };
    newDisponibilidade[dia].horarios[index] = !newDisponibilidade[dia].horarios[index];
    setDisponibilidade(newDisponibilidade);
  };

  // Função para alternar a seleção do dia
  const handleDiaSelecionado = (dia) => {
    const newDisponibilidade = { ...disponibilidade };
    newDisponibilidade[dia].selecionado = !newDisponibilidade[dia].selecionado;
    if (!newDisponibilidade[dia].selecionado) {
      // Se o dia for desmarcado, desmarque todos os horários
      newDisponibilidade[dia].horarios = Array(18).fill(false);
    }
    setDisponibilidade(newDisponibilidade);
  };

  // Função para gerar os botões de hora para cada dia
  const renderHorarioButtons = (dia) => {
    const horas = Array.from({ length: 18 }, (_, i) => 6 + i); // Gera as horas de 6h a 23h
    return horas.map((hora, index) => (
      <button
        key={hora}
        type="button"
        className={`btn ${disponibilidade[dia].horarios[index] ? 'btn-primary' : 'btn-outline-primary'} me-2 btn-sm mb-2`}
        onClick={() => handleDisponibilidadeChange(dia, index)} // Alterna a seleção de hora
      >
        {hora}:00
      </button>
    ));
  };

  // Função para cadastrar a disponibilidade
  const cadastrarDisponibilidade = () => {
    const diaTotal = [];

    if (statusAtivo === '0') {
      Object.keys(disponibilidade).forEach((dia) => {
        const horasSelecionadas = [];

        // Adiciona as horas selecionadas (valor true) ao array de horas do dia
        disponibilidade[dia].horarios.forEach((selected, index) => {
          if (selected) {
            horasSelecionadas.push(6 + index);  // Adiciona as horas de 6h às 23h
          }
        });

        if (horasSelecionadas.length > 0) {
          diaTotal.push({
            dia,
            horas: horasSelecionadas,
          });
        }
      });

      if (diaTotal.length > 0) {
        console.log("Dados para enviar ao backend:", diaTotal); // Verifique os dados antes de enviar
        httpClient.post('/disponibilidade/gravar', {
          dias: diaTotal,
          idCorretor: 13, // ID do corretor
        })
          .then((response) => {
            alert('Disponibilidade cadastrada com sucesso!');
          })
          .catch((error) => {
            console.error('Erro ao salvar a disponibilidade:', error);
            alert('Erro ao salvar a disponibilidade');
          });
      } else {
        alert('Nenhuma disponibilidade selecionada.');
      }
    } else {
      alert('Status desativado. Ative o status para cadastrar.');
    }
  };

  function cadastrarConfig() {
    let status = 0;
    httpClient.post("/configMod/gravar", {
      statusAtivo: statusAtivo,
      modo: modo,
      idCorretor: 13
    })
      .then(r => {
        status = r.status;
        if (status === 200) {
          alert("Configuracao criada com sucesso!");
        } else {
          alert("Erro ao criar a configuracao.");
        }
      })
      .catch(error => {
        console.error('Erro ao criar configuracao:', error);
        alert("Ocorreu um erro ao tentar criar a configuracao.");
      });
  }

  return (
    <div className="container py-5 d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-100 form-control" style={{ maxWidth: '600px', margin: '0 auto', padding: 20 }}>
        <h2 className="text-center mb-4">Corretor responsável: Juanzito</h2>
        <h2 className="text-center mb-4">Formulário de Configurações</h2>
        <form>
          {/* Status Ativo */}
          <div className="mb-3">
            <label htmlFor="statusAtivo" className="form-label">Status Ativo:</label>
            <div>
              <button
                type="button"
                className={`btn ${statusAtivo === '0' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                onClick={() => setStatusAtivo('0')}
              >
                Sim
              </button>
              <button
                type="button"
                className={`btn ${statusAtivo === '1' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => setStatusAtivo('1')}
              >
                Não
              </button>
            </div>
          </div>

          {/* Modo */}
          <div className="mb-3">
            <label htmlFor="modo" className="form-label">Modo:</label>
            <div>
              <button
                type="button"
                className={`btn ${modo === '1' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                onClick={() => setModo('1')}
              >
                Automático
              </button>
              <button
                type="button"
                className={`btn ${modo === '0' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                onClick={() => setModo('0')}
              >
                Manual
              </button>
            </div>
          </div>

          {/* Disponibilidade */}
          <div className="mb-3">
            <label className="form-label">Disponibilidade:</label>
            {['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'].map((dia) => (
              <div key={dia} className="mb-4">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={dia}
                    checked={disponibilidade[dia].selecionado}
                    onChange={() => handleDiaSelecionado(dia)} // Marca/desmarca todos os horários do dia
                  />
                  <label className="form-check-label" htmlFor={dia}>
                    {dia.charAt(0).toUpperCase() + dia.slice(1)}:
                  </label>
                </div>
                {/* Renderiza os botões de horário apenas se o dia estiver selecionado */}
                {disponibilidade[dia].selecionado && (
                  <div className="d-flex flex-wrap gap-3">
                    {renderHorarioButtons(dia)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            style={{ width: '70%', display: 'flex', justifyContent: 'center', margin: '0 auto' }}
            type="button"
            className="btn btn-success"
            onClick={() => {
              cadastrarConfig();
              setTimeout(() => {
                cadastrarDisponibilidade();
              }, 2000); // 2000ms = 2 segundos de delay
            }}

          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
