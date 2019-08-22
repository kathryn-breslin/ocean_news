function showArticles() {
  $("#articles").empty();

  $.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
      var cardDiv = $("<div class='card'>");
      cardDiv.addClass("new-article-div");

      var cardHeader = $("<h5>");
      cardHeader.addClass("card-header");

      var cardBody = $("<div>");
      cardBody.addClass("card-body");

      var cardTitle = $("<h5>");
      cardTitle.addClass("card-title");
      cardTitle.attr("data-id=", data[i._id]);
      cardTitle.append("<h5>" + data[i].title + "</h5>");

      var cardImage = $('<img src="' + data[i].image + '">');
      cardImage.addClass("linkImage", "card-img-top");

      var buttonsDiv = $('<div id="buttonsDiv">');

      var link = $(
        '<a href="https://www.oceannews.com' +
          data[i].link +
          '">Go to Article</a>'
      );
      link.addClass("btn btn-primary");
      link.addClass("articleButton");
      link.addClass("float-right");
      link.attr("target", "_blank");

      var button = $(
        '<input data-id="' +
          data[i]._id +
          '" type="button" data-toggle="modal" data-target="#exampleModal" value="Add Comment"/>'
      );
      button.addClass("btn btn-primary");
      button.addClass("commentButton");
      //   button.addClass("float-right");
      var commentContainer = $('<div id="commentContainer"></div>');
      var commentsButton = $(
        '<input data-id="' +
          data[i]._id +
          '" type="button" class="commentsButton" data-toggle="modal" data-target="#commentsModal" value="View Comments"/>'
      );
      commentsButton.addClass("btn btn-primary");
      commentContainer.append(commentsButton);

      buttonsDiv.append(link, button);
      buttonsDiv.append(commentContainer);
      cardBody.append(cardImage);
      cardBody.append(cardTitle);
      cardBody.append(buttonsDiv);
      //   cardBody.append(link);
      //   cardBody.append(button);
      cardDiv.append(cardHeader);
      cardDiv.append(cardBody);

      $("#articles").append(cardDiv);
    }
  });
}
showArticles();

$(document).on("click", ".commentsButton", function() {
  var commentId = $(this).attr("data-id");
  console.log(commentId);
  $.ajax({
    method: "GET",
    url: "/articles/" + commentId
  }).then(function(data) {
    console.log(data);

    if (data.comment) {

      for (var i = 0; i < data.comment.length; i++) {
        console.log("Old Commenter's Name: " + data.comment[i].name);
        console.log("Old Commenter's Comment: " + data.comment[i].body);
        $('.allCommentsBody').append('<p>' + data.comment[i].name + '</p>');
      }
    }
  });
});

$(document).on("click", ".commentButton", function() {
  var commentId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + commentId
  }).then(function(data) {
    console.log(data);

    // if (data.comment) {
    //   console.log("Old Commenter's Name: " + data.comment.name);
    //   console.log("Old Commenter's Comment: " + data.comment.body);
    //   var commentShow = $("<p>" + data.comment.name + "</p>");
    //   $("#commentContainer").append(commentShow);
    // }
  });

  $(document).on("click", "#saveComment", function() {
    var name = $("#commentName").val();
    var comment = $("#commentComment").val();

    $.ajax({
      method: "POST",
      url: "/articles/" + commentId,
      data: {
        name: name,
        body: comment
      }
    }).then(function(data) {
      console.log(data);
    });
    $("#commentName").empty();
    $("#commentComment").empty();
  });
});
