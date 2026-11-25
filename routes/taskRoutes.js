const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Cada ruta associa un mètode i un camí amb la seva funció del controlador.
router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
