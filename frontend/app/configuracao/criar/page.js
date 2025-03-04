'use client'
import { useState } from 'react';

export default function setConfiguracao() {
  // Estado para controlar o botão de Status Ativo
  const [statusAtivo, setStatusAtivo] = useState(null);

  // Estado para controlar o botão de Modo
  const [modo, setModo] = useState(null);

  // Estado para controlar a disponibilidade
  const [disponibilidade, setDisponibilidade] = useState({
    segunda: Array(18).fill(false), // 6h às 23h (18 botões)
    terca: Array(18).fill(false),
    quarta: Array(18).fill(false),
    quinta: Array(18).fill(false),
    sexta: Array(18).fill(false),
    sabado: Array(18).fill(false),
    domingo: Array(18).fill(false),
  });

  // Função para atualizar o estado da disponibilidade
  const handleDisponibilidadeChange = (dia, index) => {
    const newDisponibilidade = [...disponibilidade[dia]];
    newDisponibilidade[index] = !newDisponibilidade[index];
    setDisponibilidade((prev) => ({
      ...prev,
      [dia]: newDisponibilidade,
    }));
  };

  // Função para gerar os botões de hora para cada dia
  const renderHorarioButtons = (dia) => {
    const horas = Array.from({ length: 18 }, (_, i) => 6 + i); // Gera as horas de 6h a 23h
    return horas.map((hora, index) => (
      <button
        key={hora}
        type="button"
        className={`btn ${disponibilidade[dia][index] ? 'btn-outline-primary' : 'btn-primary'} me-2 btn-sm mb-2`}
        onClick={() => handleDisponibilidadeChange(dia, index)}
      >
        {hora}:00
      </button>
    ));
  };

  return (
     
    <div className="container py-5 d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-100 form-control" style={{ maxWidth: '600px', margin: '0 auto', padding: 20}}>
        <h2 className="text-center mb-4">Corretor responsável: Juanzito</h2>
        <h2 className="text-center mb-4">Formulário de Configurações</h2>
        <form>
          {/* Status Ativo */}
          <div className="mb-3">
            <label htmlFor="statusAtivo" className="form-label">Status Ativo:</label>
            <div>
              <button
                type="button"
                className={`btn ${statusAtivo === 'sim' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                onClick={() => setStatusAtivo('sim')}
              >
                Sim
              </button>
              <button
                type="button"
                className={`btn ${statusAtivo === 'nao' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => setStatusAtivo('nao')}
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
                className={`btn ${modo === 'automatico' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                onClick={() => setModo('automatico')}
              >
                Automático
              </button>
              <button
                type="button"
                className={`btn ${modo === 'manual' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                onClick={() => setModo('manual')}
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
                    checked={disponibilidade[dia].includes(true)}
                    onChange={() => {
                      // Toggle all hours if the checkbox is clicked
                      const allSelected = disponibilidade[dia].includes(true);
                      const newDisponibilidade = Array(18).fill(!allSelected);
                      setDisponibilidade((prev) => ({
                        ...prev,
                        [dia]: newDisponibilidade,
                      }));
                    }}
                  />
                  <label className="form-check-label" htmlFor={dia}>
                    {dia.charAt(0).toUpperCase() + dia.slice(1)}:
                  </label>
                </div>
                {/* Renderiza os botões de horário somente se o dia estiver ativo */}
                {disponibilidade[dia].includes(true) && (
                  <div className="d-flex flex-wrap gap-3"> {/* Apliquei gap-3 para aumentar o espaçamento entre os botões */}
                    {renderHorarioButtons(dia)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button style={{width: '70%', display:'flex', justifyContent:'center', margin:'0 auto'}} type="submit" className="btn btn-success">Salvar</button>
        </form>
      </div>
    </div>
  );
}
