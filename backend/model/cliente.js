const Database = require('../utils/database;js');
const banco = Database();

class clienteModel{
    #idCliente;
    #nomeCLiente;
    #telCliente;
    #emailCliente;
    #obsCliente;

    get idCliente(){ return this.#idCliente;} set idCliente(idCliente){this.#idCliente = idCliente};
    get nomeCliente(){return this.#nomeCLiente;} set nomeCliente(nomeCliente){this.#nomeCLiente = nomeCliente};
    get telCliente(){return this.#telCliente;} set telCliente(telCliente){this.#telCliente = telCliente};
    get emailCliente(){return this.#emailCliente;} set emailCliente(emailCliente){this.#emailCliente = emailCliente};
    get obsCliente(){return this.#obsCliente;} set obsCliente(obsCliente){this.#obsCliente = obsCliente};

    constructor(idCliente, nomeCliente, telCliente, emailCliente, obsCliente){
        this.#idCliente = idCliente;
        this.#nomeCLiente = nomeCliente;
        this.#telCliente = telCliente;
        this.#emailCliente = emailCliente;
        this.#obsCliente = obsCliente;
    }

    toJSON(){
        return{
            'idCliente': this.#idCliente,
            'nomeCliente': this.#nomeCLiente,
            'telCliente': this.#telCliente,
            'emailCliente': this.#emailCliente,
            'obsCliente': this.#obsCliente
        }
    }


    async listar(){
        let sql = "select * from cliente";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i = this.#obsCliente; i<rows.length; i++){
            
        }
    }

}

module.exports = clienteModel;