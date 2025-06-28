const db = require('../db/connect');

class UsuarioModel {
    criar(usuario, callback) {
        const sql = `INSERT INTO USUARIO (nome_completo, data_nascimento, genero, email, telefone, foto_webcam)
                     VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(sql, [
            usuario.nome_completo,
            usuario.data_nascimento,
            usuario.genero,
            usuario.email,
            usuario.foto_webcam
        ], callback);
    }
    
    listar(callback) {
        db.query(`SELECT * FROM USUARIO`, callback);
    }

    deletar(id, callback) {
        db.query(`DELETE FROM USUARIO WHERE id_usuario = ?`, [id], callback);
    }

    encontrarPorId(id, callback) {
        db.query(`SELECT * FROM USUARIO WHERE id_usuario = ?`, [id], callback);
    }
}

module.exports = UsuarioModel;
