const UsuarioModel = require('../models/UsuarioModel');
class UsuarioController {
    usuarioModel = null;
    constructor() {
        this.usuarioModel = new UsuarioModel();
    }
    criarUsuario(req, res) {
        const usuario = {
            nome_completo: req.body.nome_completo,
            data_nascimento: req.body.data_nascimento,
            genero: req.body.genero,
            email: req.body.email,
            telefone: req.body.telefone,
            foto_webcam: imagem
        };
        this.usuarioModel.criar(usuario, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'Usuário criado com sucesso!', id: result.insertId });
        });
    }

    listarUsuarios(req, res) {
        this.usuarioModel.listar((err, results) => {
            if (err) return res.status(500).send(err);
            res.send(results);
        });
    }

    deletarUsuario(req, res) {
        const id = req.params.id;
        this.usuarioModel.deletar(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: 'Usuário deletado com sucesso.' });
        });
    }

    encontrarUsuario(req, res) {
        const id = req.params.id;
        this.usuarioModel.encontrarPorId(id, (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result[0]);
        });
    }
}

module.exports = new UsuarioController();
