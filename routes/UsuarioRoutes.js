const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Cria pasta se não existir
const pastaUsuario = path.join(__dirname, '..', 'uploads', 'Webcam');
if (!fs.existsSync(pastaUsuario)) fs.mkdirSync(pastaUsuario, { recursive: true });

// Configuração do multer
const storage = multer.diskStorage({
     destination: (req, file, cb) => cb(null, pastaUsuario),
     filename: (req, file, cb) => {
          const nome = 'usuario_' + Date.now() + path.extname(file.originalname);
          cb(null, nome);
     }
});

const upload = multer({ storage });

// Rota com upload + dados
router.post('/registar', upload.single('imagem'), (req, res) => {
     UsuarioController.criarUsuario(req, res);
});

router.get('/listar', (req, res) => {
     UsuarioController.listarUsuarios(req, res);
});
router.get('/EncontarID/:id', UsuarioController.encontrarUsuario);
router.delete('/DeletarID/:id', UsuarioController.deletarUsuario);

module.exports = router;
