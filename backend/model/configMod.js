const { config } = require('process');
const Database = require('../utils/database.js');
const banco = new Database();

class configMod{

    #idConfig;
    #ativo;
    #modo;
    #idCorretor;
    #idDispo;

    get idConfig(){return this.#idConfig;} set idConfig(idConfig){this.#idConfig = idConfig;}
    get ativo(){return this.#ativo;} set ativo(ativo){this.#ativo = ativo;}
    get modo(){return this.#modo;} set modo(modo){this.#modo = modo;}
    get idCorretor(){return this.#idCorretor;} set idCorretor(idCorretor){this.#idCorretor = idCorretor;}
    get idDispo(){return this.#idDispo;} set idDispo(idDispo){this.#idDispo = idDispo;}

    constructor(idConfig, ativo, modo, idCorretor, idDispo) {
        this.#idConfig = idConfig;
        this.#ativo = ativo;
        this.#modo = modo;    
        this.#idCorretor = idCorretor;
        this.#idDispo = idDispo;
    }   

    toJSON(){
        return{
            'idConfig': this.#idConfig,
            'ativo': this.#ativo,
            'modo': this.#modo,
            'idCorretor': this.#idCorretor,
            'idDispo': this.#idDispo
        }
    }

    async obter(idCorretor){
        let sql = "select * from configuracao where id_corretor = ?";
        let valores = [idCorretor];
        let rows = await banco.ExecutaComando(sql, valores);
        if(rows.length > 0){
            let config = new configMod(rows[0]['id_configuracao'], rows[0]['ativo'], rows[0]['modo'], rows[0]['id_corretor'], rows[0]['id_disponibilidade']);
            return config;
        }
        return null;
    }

    async gravar(){
        if(this.#idConfig == 0){
            let sql = "insert into configuracao (ativo, modo, id_corretor, id_disponibilidade) values (?,?,?,?)";
            let valores = [this.#ativo, this.#modo, this.#idCorretor, this.#idDispo];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }else{
            let sql = "update configuracao set ativo = ?, modo = ?, id_corretor = ?, id_disponibilidade = ? where id_configuracao = ?";
            let valores = [this.#ativo, this.#modo, this.#idCorretor, this.#idDispo, this.#idConfig];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }
    }

}

module.exports = configMod;