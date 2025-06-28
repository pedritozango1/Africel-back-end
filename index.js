const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/UsuarioRoutes');
const DocumentosRouter=require("./routes/DocumentoRoutes")
const SimRoutes=require("./routes/SimRoutes")
const VerificacaoRouter=require("./routes/VerificacaoRouter")
app.use(express.json());
app.use('/api', usuarioRoutes);
app.use("/sim",SimRoutes);
app.use("/documento",DocumentosRouter);
package.use("/verificacao",VerificacaoRouter);
app.listen(3000, () => {
    console.log('🚀 Servidor rodando em http://localhost:3000');
});
