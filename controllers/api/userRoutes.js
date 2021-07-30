const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      //username saved as logged_name
      req.session.logged_name = userData.name;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });
    // console.log(userData);
    // console.log(req.body.name);
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect name or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    // console.log(validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect name or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // with login logged_name saved to the sess so that handlebars can be used
      req.session.logged_name = userData.name;
      res.json({ user: userData, message: "You are now logged in" });
    });
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;