const express = require ('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers');
const md_auth = require('../middleware/authenticated');



router.get('/' , md_auth.ensureAuth , userCtrl.getUsers);
router.post('/register', userCtrl.createUser);
router.post('/login', userCtrl.loginUser);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.editUser);
router.delete('/:id', userCtrl.deleteUser);


module.exports = router;