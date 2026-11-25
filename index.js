// Carreguem les variables definides al fitxer .env.
require('dotenv').config({ quiet: true });

const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// El servidor només s'inicia quan MongoDB accepta la connexió.
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connexió a MongoDB establerta');

    app.listen(PORT, () => {
      console.log(`Servidor en funcionament a http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connectant a MongoDB:', err.message);
  });
