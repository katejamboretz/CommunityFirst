var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/events", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({
      force: true
    });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.User.bulkCreate([
      { id: "1", userName: "Aaron", email: "fake@gmail.com", password: "1234" },
      { id: "2", userName: "Hung", email: "fake2@gmail.com", password: "5678" }
    ]);
    db.Event.bulkCreate([
      {
        title: "First Title",
        description: "First Description",
        date: "05/09/2020",
        time: "08:30:00",
        contactInfo: "call me",
        UserId: 1
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/events").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(1);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({
            title: "First Title",
            description: "First Description",
            date: "2020-05-09T00:00:00.000Z",
            time: "08:30:00",
            contactInfo: "call me",
            UserId: 1
          });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
