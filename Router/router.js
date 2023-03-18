const router = require("express").Router();

const middleware = require("../Middleware/middle")

const { getData, postData, login } = require("../Controller/mycontroller")

router.get("/", getData)

router.post("/signup", postData)

router.post("/login", middleware,login)

module.exports = router;