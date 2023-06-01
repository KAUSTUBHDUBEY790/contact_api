const express = require("express")
const { registeruser, loginuser, currentuser } = require("../controller/usercontroller")
const validtoken = require("../middleware/validatetokenhandler")
const router = express.Router()

router.post("/register",registeruser)
router.post("/login",loginuser)
router.get("/current",validtoken, currentuser)

module.exports = router;