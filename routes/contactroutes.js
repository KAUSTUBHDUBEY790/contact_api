const express = require("express")
const {getcontact, postcontact, getacontact, deletecontact, editcontact} = require("../controller/controller");
const validtoken = require("../middleware/validatetokenhandler");
const router = express.Router()

// router.route('/').get(getcontact)
// router.route('/').post(postcontact);
// router.route('/:id').get(getacontact);
// router.route('/:id').put(editcontact);
// router.route('/:id').delete(deletecontact);
router.use(validtoken);
router.route('/').get(getcontact).post(postcontact);
router.route('/:id').get(getacontact).put(editcontact).delete(deletecontact);


module.exports = router;