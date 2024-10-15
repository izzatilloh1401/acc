const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const path = require("path");
router.get("/", async (req, res) => {
    try {
        const user = await User.find();

        res.render("index", { title: "Home", });
    } catch (error) {

    }
});

router.post("/user/add", async (req, res) => {
    const user = new User({
      username: req.body.username,
      parol: req.body.parol,
    });
  
    await user.save();
    res.redirect("/");
  });
module.exports = router;