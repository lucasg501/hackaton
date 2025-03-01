const Database = require('../utils/database.js');
const banco = new Database();

class disponibilidadeModel{

    #idDispo;
    #diaSemana;
    #hora;
    #idCorretor;
    #ocupado;

    get idDispo(){return this.#idDispo;} set idDispo(idDispo){this.#idDispo = idDispo;};
    get diaSemana(){return this.#diaSemana;} set diaSemana(diaSemana){this.#diaSemana = diaSemana;};
    get hora(){return this.#hora;} set hora(hora){this.#hora = hora;};
    get idCorretor(){return this.#idCorretor;} set idCorretor(idCorretor){this.#idCorretor = idCorretor;};
    get ocupado(){return this.#ocupado;} set ocupado(ocupado){this.#ocupado = ocupado;};

    constructor(idDispo, diaSemana, hora, idCorretor, ocupado) {
        this.#idDispo = idDispo;
        this.#diaSemana = diaSemana;
        this.#hora = hora;
        this.#idCorretor = idCorretor;
        this.#ocupado = ocupado;
    }

    toJSON(){
        return{
            'idDispo': this.#idDispo,
            'diaSemana': this.#diaSemana,
            'hora': this.#hora,
            'idCorretor': this.#idCorretor,
            'ocupado': this.#ocupado
        }
    }

    async listar(){
        let sql = "select * from disponibilidade";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i<rows.length; i++){
            lista.push(new disponibilidadeModel(rows[i]['id_disponibilidade'], rows[i]['dia_semana'], rows[i]['hora'], rows[i]['id_corretor'], rows[i]['ocupado']));    
        }
        return lista;
    }

    async gravar(){
        if(this.#idDispo == 0){
            let sql = "insert into disponibilidade (dia_semana, hora, id_corretor, ocupado) values (?,?,?,?)";
            let valores = [this.#diaSemana, this.#hora, this.#idCorretor, this.#ocupado];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }else{
            let sql = "update disponibilidade set dia_semana = ?, hora = ?, id_corretor = ?, ocupado = ? where id_disponibilidade = ?";    
            let valores = [this.#diaSemana, this.#hora, this.#idCorretor, this.#ocupado, this.#idDispo];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }
    }

    async obter(idCorretor){
        let sql = "select * from disponibilidade where id_corretor = ?";
        let valores = [idCorretor];
        let lista = [];
        let rows = await banco.ExecutaComando(sql, valores);
        if(rows.length > 0){
            for(let i = 0; i<rows.length; i++){
                 lista.push( new disponibilidadeModel(rows[i]['id_disponibilidade'], rows[i]['dia_semana'], rows[i]['hora'], rows[i]['id_corretor'], rows[i]['ocupado'])); 
            }
            return lista;
        }
        return null;
    }

    async excluir(idDispo){
        let sql = "delete from disponibilidade where id_disponibilidade = ?";
        let valores = [idDispo];
        let ok = await banco.ExecutaComando(sql, valores);
        return ok;
    }

}

module.exports = disponibilidadeModel;