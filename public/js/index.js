window.onload = function() {
  refreshEvents();
};

// Get references to page elements

// grab event title from form
var $eventTitle = $("#event-title");

// grab event description from form
var $eventDescription = $("#event-description");

// grab event date from form
var $eventDate = $("#event-date");

// grab event time from form
var $eventTime = $("#event-time");

// grab event contact-info from form
var $contactInfo = $("#contact-info");

// need to figure out user id

var $userId = "1";

var $submitBtn = $("#submit");
var $eventList = $("#events-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveEvent: function(event) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/events",
      data: JSON.stringify(event)
    });
  },
  getEvents: function() {
    return $.ajax({
      type: "GET",
      url: "api/events"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshEvents gets new events from the db and repopulates the list
var refreshEvents = function() {
  API.getEvents().then(function(data) {
    var $events = data.map(function(event) {
      var $a = $("<a>")
        .text(event.title)
        .attr("href", "/event/" + event.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": event.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $eventList.empty();
    $eventList.append($events);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var event = {
    title: $eventTitle.val().trim(),
    description: $eventDescription.val().trim(),
    date: $eventDate.val().trim(),
    time: $eventTime.val().trim(),
    contactInfo: $contactInfo.val().trim(),
    UserId: $userId

    // need to figure out user id
  };
  console.log(event);

  if (
    !(
      event.title &&
      event.description &&
      event.date &&
      event.time &&
      event.contactInfo
    )
  ) {
    alert("You must complete all fields before submitting an event!");
    return;
  }

  API.saveEvent(event).then(function() {
    refreshEvents();
  });

  $eventTitle.val("");
  $eventDescription.val("");
  $eventDate.val("");
  $eventTime.val("");
  $contactInfo.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshEvents();
//   });
// };

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
