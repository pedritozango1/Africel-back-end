const VerificacaoModel = require('../models/VerificacaoModel');

class VerificacaoController {
    verificacaoModel=null;
    constructor() {
        this.verificacaoModel = new VerificacaoModel();
    }

 
    criarVerificacao(req, res) {
        const verificacao = {
            codigo_enviado: req.body.codigo_enviado,
            timestamp_envio: req.body.timestamp_envio,
            validado: req.body.validado ?? false,
            id_sim: req.body.id_sim
        };

        this.verificacaoModel.criar(verificacao, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'Verificação criada com sucesso!', id: result.insertId });
        });
    }

 
    listarVerificacoes(req, res) {
        this.verificacaoModel.listar((err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    }

 
    encontrarVerificacao(req, res) {
        const id = req.params.id;
        this.verificacaoModel.encontrarPorId(id, (err, result) => {
            if (err) return res.status(500).send(err);
            if (!result.length) return res.status(404).send({ message: 'Verificação não encontrada.' });
            res.send(result[0]);
        });
    }


    listarPorSim(req, res) {
        const id_sim = req.params.id_sim;
        this.verificacaoModel.listarPorSim(id_sim, (err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    }

    validar(req, res) {
        const id = req.params.id;
        this.verificacaoModel.validarCodigo(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Código validado com sucesso.' });
        });
    }

    deletarVerificacao(req, res) {
        const id = req.params.id;
        this.verificacaoModel.deletar(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Verificação deletada com sucesso.' });
        });
    }
}

module.exports = new VerificacaoController();
