const router = require('express').Router();


const {{ ressourceName }}Controller = require('../controllers/{{ ressourceName }}Controller.js');
const { checkToken } = require('../middleware/auth-token');
const { parsePagination, parseFilter, parsePopulate } = require('../middleware/pagination');


// All {{ ressourceName }}s
router.get('/', parsePagination, parseFilter, parsePopulate, {{ ressourceName }}Controller.get{{ ressourceNameWithMaj }});
router.post('/search', parsePagination, parseFilter, parsePopulate, {{ ressourceName }}Controller.search{{ ressourceNameWithMaj }});


router.post('/', checkToken, {{ ressourceName }}Controller.create{{ ressourceNameWithMaj }});
router.get('/:id', {{ ressourceName }}Controller.get{{ ressourceNameWithMaj }}ById);
router.delete('/:id', checkToken, {{ ressourceName }}Controller.delete{{ ressourceNameWithMaj }});
router.put('/:id', checkToken, {{ ressourceName }}Controller.update{{ ressourceNameWithMaj }});

module.exports = router;
