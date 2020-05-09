var db = require("../models");

//bcrypt variables
var bcrypt = require("bcrypt");
var saltRounds = 10;

module.exports = function(app) {
  // Get all events
  app.get("/api/events", function(req, res) {
    db.Event.findAll({}).then(function(dbEvents) {
      console.log("FIND ALL EVENTS SQL QUERY in apiRoutes /api/events get.");
      res.json(dbEvents);
    });
  });

  // Create a new event
  app.post("/api/events", function(req, res) {
    db.Event.create(req.body).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // Create a new user
  app.post("/api/userCreate", function(req, res) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      db.User.create({
        userName: req.body.userName,
        password: hash,
        email: req.body.email
      }).then(function(data) {
        if (data) {
          console.log("TEST FOR HITTING userCreate api route worked!");
          res.redirect("..");
        }
      });
    });
  });

  // Check for the correctness of password at Login 
  app.post("/api/userLogin", function(req, res) {
    db.User.findOne({
      where: {
        userName: req.body.userName
      }
    }).then(function(user) {
      if (!user) {
        console.log("Incorrect user");
        res.json({});
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (result === true) {
            console.log("Login is good!");
            res.json({});
          } else {
            console.log("Incorrect Password!");
            res.json({});
          }
        });
      }
    });
  });

  // Delete an event by id, not tested on front end!
  app.delete("/api/events/:id", function(req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // Delete a user by id, not tested on front end!
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Delete an example by id (default from template)
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
