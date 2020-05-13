var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Event.findAll({}).then(function(dbEvents) {
      // console.log(dbEvents[0]);
      var e = dbEvents.map(function(event) {
        return { id: event.id, title: event.title };
      });
      console.log("hit htmlRoutes / get route.");
      res.render("index", {
        msg: "Community Events!",
        events: e
      });
    });
  });

  // Load event creation page
  app.get("/event-create", function(req, res) {
    res.render("event-create");
  });

  // Load event page (once made) and pass in an event by id
  app.get("/event/:id", function(req, res) {
    db.Event.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbEvent) {
      // db.Users.findOne({
      //   where: {
      //     id: dbEvent.dataValues.UserId
      //   }
      // }).then(function(dbUser) {
      console.log(dbEvent);
      var x = {
        title: dbEvent.dataValues.title,
        description: dbEvent.dataValues.description,
        date: dbEvent.dataValues.date,
        time: dbEvent.dataValues.time,
        contactInfo: dbEvent.dataValues.contactInfo
      };
      res.render("event", {
        event: x
      });
      // });
    });
  });

  // Load any??? page and pass in a user by id
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.render("any", {
        user: dbUser
      });
    });
  });

  // Load user login and create page
  app.get("/users", function(req, res) {
    res.render("users");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
