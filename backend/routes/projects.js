const router = require('express').Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const c = require('../controllers/projectController');

router.use(auth);

router.post('/', roleCheck('Admin'), c.createProject);
router.get('/', c.getProjects);
router.get('/:id', c.getProjectById);
router.put('/:id', roleCheck('Admin'), c.updateProject);
router.delete('/:id', roleCheck('Admin'), c.deleteProject);

module.exports = router;