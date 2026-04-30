const router = require('express').Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const c = require('../controllers/taskController');

router.use(auth);

router.get('/stats', c.getDashboardStats);
router.post('/', roleCheck('Admin'), c.createTask);
router.get('/', c.getTasks);
router.put('/:id', c.updateTask);          // Members can update status
router.delete('/:id', roleCheck('Admin'), c.deleteTask);

module.exports = router;