var express = require('express');
var router = express.Router();
var user = require('../controller/usercontroller');
var auth = require('../middleware/auth');



router.post('/',user.insert);
router.get('/',user.get_data);
router.post('/update/:id',user.update_data);
router.get('/delete/:id',user.delete_data);

router.post('/login',user.login);

router.post('/product',user.insert_p);
router.get('/product',auth.check_token,user.select_p);




module.exports = router;
