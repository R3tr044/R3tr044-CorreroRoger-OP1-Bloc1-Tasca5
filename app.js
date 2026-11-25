const express = require('express');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Aquests middleware preparen les peticions abans que arribin a les rutes.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta inicial per comprovar que l'API respon.
app.get('/', (req, res) => {
  res.json({ message: 'Gestor de tasques en funcionament!' });
});

// Totes les rutes del gestor de tasques comparteixen aquest prefix.
app.use('/api/tasks', taskRoutes);

// La ruta 404 va després de les rutes perquè només respongui a camins inexistents.
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    missatge: 'Ruta no trobada',
    ruta: req.path
  });
});

// Express envia aquí els errors que es produeixen en processar una petició.
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      status: 'error',
      missatge: 'El JSON enviat no és vàlid'
    });
  }

  console.error(err);
  res.status(500).json({
    status: 'error',
    missatge: 'Error intern del servidor'
  });
});

module.exports = app;
