const DispoModel = require('../model/disponibilidadeModel.js');

class dispoController{

    async gravar(req,res){
        if(Object.keys(req.body).length > 0){
            let dispoModel = new DispoModel();

            dispoModel.idDispo = 0;
            dispoModel.diaSemana = req.body.diaSemana;
            dispoModel.hora = req.body.hora;
            dispoModel.idCorretor = req.body.idCorretor;
            dispoModel.ocupado = req.body.ocupado;
            let ok = await dispoModel.gravar();
            if(ok){
                res.status(200).json({msg:"Disponibilidade gravada com sucesso"});
            }else{
                res.status(500).json({msg:"Erro ao gravar disponibilidade"});
            }
        }else{
            res.status(400).json({msg:"Erro Interno do servidor"});
        }
    }

    async alterar(req,res){
        if(Object.keys(req.body).length > 0){
            let dispoModel = new DispoModel();

            dispoModel.idDispo = req.body.idDispo;
            dispoModel.diaSemana = req.body.diaSemana;
            dispoModel.hora = req.body.hora;
            dispoModel.idCorretor = req.body.idCorretor;
            dispoModel.ocupado = req.body.ocupado;
            let ok = await dispoModel.gravar();
            if(ok){
                res.status(200).json({msg:"Disponibilidade alterada com sucesso"});
            }else{
                res.status(500).json({msg:"Erro ao alterar disponibilidade"});
            }
        }else{
            res.status(400).json({msg:"Erro Interno do servidor"});
        }
    }

    async obter(req,res){
        try{
            if(req.params.idCorretor != undefined){
                let dispoModel = new DispoModel();
                let lista = await dispoModel.obter(req.params.idCorretor);
                let listaRetorno = [];
                for(let i = 0; i<lista.length; i++){
                    listaRetorno.push(lista[i].toJSON());
                }res.status(200).json(listaRetorno);
            }else{
                res.status(400).json({msg:"Erro Interno do servidor"});
            }
        }catch(ex){
            res.status(500).json({msg:"Erro ao obter disponibilidade"});
        }
    }

    async listar(req,res){
        try{
            let dispoModel = new DispoModel();
            let lista = await dispoModel.listar();
            let listaRetorno = [];
            for(let i = 0; i<lista.length; i++){
                listaRetorno.push(lista[i].toJSON());
            }
            res.status(200).json(listaRetorno);
        }catch(ex){
            res.status(500).json({msg:"Erro ao listar disponibilidade"});
        }
    }

    async excluir(req,res){
        try{
            if(req.params.idDispo != undefined){
                let dispoModel = new DispoModel();
                let ok = await dispoModel.excluir(req.params.idDispo);
                if(ok){
                    res.status(200).json({msg:"Disponibilidade excluída com sucesso"});
                }else{
                    res.status(500).json({msg:"Erro ao excluir disponibilidade"});
                }
            }else{
                res.status(400).json({msg:"Erro Interno do servidor"});
            }
        }catch(ex){
            res.staatus(500).json({msg:ex.message});
        }
    }

}

module.exports = dispoController;