const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');


const accountCtrl = require('../controllers/account');

router.get('/name/:id', auth, accountCtrl.getAccontName);
router.get('/:id', auth, accountCtrl.getAccontDetals); 
router.delete('/:id', auth, accountCtrl.deleteAccont);

//router.post('/', auth, accountCtrl.cheatAccont);

module.exports = router;


