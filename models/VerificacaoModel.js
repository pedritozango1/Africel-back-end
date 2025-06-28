const db = require('../db/connect');

class VerificacaoModel {
    criar(verificacao, callback) {
        const sql = `
            INSERT INTO VERIFICACAO (codigo_enviado, timestamp_envio, validado, id_sim)
            VALUES (?, ?, ?, ?)
        `;
        db.query(sql, [
            verificacao.codigo_enviado,
            verificacao.timestamp_envio,
            verificacao.validado,
            verificacao.id_sim
        ], callback);
    }
    listar(callback) {
        const sql = 'SELECT * FROM VERIFICACAO';
        db.query(sql, callback);
    }
    encontrarPorId(id, callback) {
        const sql = 'SELECT * FROM VERIFICACAO WHERE id_verificacao = ?';
        db.query(sql, [id], callback);
    }
    listarPorSim(id_sim, callback) {
        const sql = 'SELECT * FROM VERIFICACAO WHERE id_sim = ?';
        db.query(sql, [id_sim], callback);
    }
    validarCodigo(id_verificacao, callback) {
        const sql = 'UPDATE VERIFICACAO SET validado = TRUE WHERE id_verificacao = ?';
        db.query(sql, [id_verificacao], callback);
    }

    deletar(id_verificacao, callback) {
        const sql = 'DELETE FROM VERIFICACAO WHERE id_verificacao = ?';
        db.query(sql, [id_verificacao], callback);
    }
}

module.exports = VerificacaoModel;
