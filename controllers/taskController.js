const Task = require('../models/Task');

// Crear una tasca nova i assignar-ne la data de finalització si ja està completada.
exports.createTask = (req, res) => {
  const body = req.body ?? {};
  const task = new Task(body);
  task.finished_at = task.completed ? new Date() : null;

  task.save()
    .then((savedTask) => {
      res.status(201).json(savedTask);
    })
    .catch((err) => {
      res.status(400).json({
        error: 'No s’ha pogut crear la tasca',
        details: err.message
      });
    });
};

// Obtenir totes les tasques desades a MongoDB.
exports.getTasks = (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error obtenint les tasques',
        details: err.message
      });
    });
};

// Buscar una tasca concreta amb l'identificador de la URL.
exports.getTaskById = (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      if (!task) {
        return res.status(404).json({ message: 'Tasca no trobada' });
      }

      res.status(200).json(task);
    })
    .catch((err) => {
      const status = err.name === 'CastError' ? 400 : 500;
      res.status(status).json({
        error: 'Error obtenint la tasca',
        details: err.message
      });
    });
};

// Actualitzar només els camps que arriben al cos de la petició.
exports.updateTask = (req, res) => {
  const body = req.body ?? {};

  if (body.completed === true) {
    body.finished_at = new Date();
  } else if (body.completed === false) {
    body.finished_at = null;
  } else {
    // La data només canvia quan també es modifica l'estat de la tasca.
    delete body.finished_at;
  }

  Task.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true
  })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json({ message: 'Tasca no trobada' });
      }

      res.status(200).json(updatedTask);
    })
    .catch((err) => {
      res.status(400).json({
        error: 'Error actualitzant la tasca',
        details: err.message
      });
    });
};

// Eliminar una tasca i retornar el document que s'ha eliminat.
exports.deleteTask = (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(404).json({ message: 'Tasca no trobada' });
      }

      res.status(200).json({
        message: 'Tasca eliminada amb èxit',
        task: deletedTask
      });
    })
    .catch((err) => {
      const status = err.name === 'CastError' ? 400 : 500;
      res.status(status).json({
        error: 'Error eliminant la tasca',
        details: err.message
      });
    });
};
