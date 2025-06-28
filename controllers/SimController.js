const SimModel = require('../models/SimModel');

class SimController {
    constructor() {
        this.simModel = new SimModel();
    }

    criarSim(req, res) {
        const sim = {
            numero: req.body.numero,
            data_registo: req.body.data_registo,
            id_usuario: req.body.id_usuario
        };

        this.simModel.criar(sim, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'SIM criado com sucesso!', id: result.insertId });
        });
    }

    listarSim(req, res) {
        this.simModel.listar((err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    }


    encontrarSim(req, res) {
        const id = req.params.id;
        this.simModel.encontrarPorId(id, (err, result) => {
            if (err) return res.status(500).send(err);
            if (!result.length) return res.status(404).send({ message: "SIM não encontrado." });
            res.send(result[0]);
        });
    }

    listarSimPorUsuario(req, res) {
        const id_usuario = req.params.id_usuario;
        this.simModel.listarPorUsuario(id_usuario, (err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    }

    deletarSim(req, res) {
        const id = req.params.id;
        this.simModel.deletar(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'SIM deletado com sucesso.' });
        });
    }
}

module.exports = new SimController();
