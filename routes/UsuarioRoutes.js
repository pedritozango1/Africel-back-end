const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const SimController = require("../controllers/SimController")
const VerificacaoController = require("../controllers/VerificacaoController")
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const pastaDocumento = path.join(__dirname, '..', 'uploads', 'BI');
if (!fs.existsSync(pastaDocumento)) fs.mkdirSync(pastaDocumento, { recursive: true });
const storage = multer.diskStorage({
     destination: (req, file, cb) => cb(null, pastaDocumento),
     filename: (req, file, cb) => {
          const nome = 'documento_bi_' + Date.now() + '_' + file.fieldname + path.extname(file.originalname);
          cb(null, nome);
     }
});
const upload = multer({ storage });
async function compararRostos(caminhoImagem1, caminhoImagem2) {
     const form = new FormData();
     form.append('image1', fs.createReadStream(caminhoImagem1));
     form.append('image2', fs.createReadStream(caminhoImagem2));

     try {
          const resposta = await axios.post('http://127.0.0.1:5000/compare', form, {
               headers: form.getHeaders()
          });
          return resposta.data; // JSON com resultado da comparação
     } catch (error) {
          console.error("Erro ao chamar API Python:", error.message);
          throw error;
     }
}
async function criarDocumento(req, res) {
     try {
          const frente = req.files?.frente?.[0];
          const selfie = req.files?.selfie?.[0];
          const verso = req.files?.verso?.[0];

          if (!frente || !selfie || !verso) {
               return res.status(400).json({ erro: "Faltam imagens frente, selfie ou verso" });
          }

          const caminhoFrente = path.resolve(frente.path);
          const caminhoSelfie = path.resolve(selfie.path);

          await UsuarioController.criarUsuario(req);
          const ultimoUsuario = await UsuarioController.listarUsuarioUltimo();
          req.body.id_usuario = ultimoUsuario.id_usuario;
          await SimController.criarSim(req);
          const smsverif = await VerificacaoController.criarVerificacao(req);
          return res.status(200).json({
               mensagem: "Documento recebido com sucesso!",
               smsverif
          });

     } catch (err) {
          console.error("Erro em criarDocumento:", err);
          return res.status(500).json({ erro: "Erro interno no servidor", detalhe: err.message });
     }
}

// 📌 Rotas
router.post(
     '/registarNovo',
     upload.fields([
          { name: 'frente', maxCount: 1 },
          { name: 'selfie', maxCount: 1 },
          { name: 'verso', maxCount: 1 },
     ]),
     (req, res) => {
          criarDocumento(req, res);
     }
);
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
