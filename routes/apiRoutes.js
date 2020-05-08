var db = require("../models");
var bcrypt = require("bcrypt");

module.exports = function(app) {
  // Get all events
  app.get("/api/events", function(req, res) {
    db.Event.findAll({}).then(function(dbEvents) {
      res.json(dbEvents);
    });
  });

  // Get all users, not tested on front end! May not need this, unless we want generic contacts page
  app.get("/api/users", function(req, res) {
    db.User.findAll({
      include: [db.User]
    }).then(function(dbUser) {
      res.json(dbUser);
      console.log("DB Users: " + dbUser);
    });
  });

  // Create a new event
  app.post("/api/events", function(req, res) {
    db.Event.create(req.body).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  app.post("/api/users", function(req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      db.User.create({
        userName: req.body.userName,
        password: hash,
        email: req.body.email
      }).then(function(data) {
        if (data) {
          res.redirect("/users");
        }
      });
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
