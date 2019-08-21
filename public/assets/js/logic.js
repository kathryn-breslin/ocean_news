function showArticles() {
  $("#articles").empty();

  $.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
      var cardDiv = $("<div class='card' style='width: 20rem;'>");
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

      buttonsDiv.append(link, button);
      cardBody.append(cardImage);
      cardBody.append(cardTitle);
      cardBody.append(buttonsDiv);
      //   cardBody.append(link);
      //   cardBody.append(button);
      cardDiv.append(cardHeader);
      cardDiv.append(cardBody);

      $("#articles").append(cardDiv);

      // var modalButtonExit= $('<button type="button" class="btn btn-seconday" data-dismiss="modal">');
      // var modalButtonSubmit = $('<button id="saveComment" type="button" class="btn btn-primary" data-id="' + data[i]._id + '">Submit</button>');

      // $('#modalFooter').append(modalButtonExit, modalButtonSubmit);

    //   var modalDiv = $(
    //     '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">');
    //   var modalFirstInside = $('<div class="modal-dialog" role="document">');
    //   var modalSecond = $('<div class="modal-content>');
    //   var modalThird = $('<div class="modal-header">');
    //   var modalFourth = $(
    //     '<h5 class="modal-title" id="exampleModalLabel">Add Comment</h5>'
    //   );
    //   var modalFifth = $(
    //     '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    //   );

    //   modalThird.append(modalFourth);
    //   modalThird.append(modalFifth);
    //   modalSecond.append(modalThird);
    //   modalFirstInside.append(modalSecond);
    //   modalDiv.append(modalFirstInside);

    //   var modalMainBody = $('<div class="modal-body">');
    //   var modalForm = $("<form>");
    //   var formGroupOne = $('<div class="form-group">');
    //   var labelFormGroupOne = $('<label for="commentName">Name</label>');
    //   var inputFormGroupOne = $(
    //     '<input id="commentName" class="form-control" type="text" placeholder="Thomas Jefferson">'
    //   );

    //   formGroupOne.append(labelFormGroupOne);
    //   formGroupOne.append(inputFormGroupOne);
    //   modalForm.append(formGroupOne);

    //   var formGroupTwo = $('<div class="form-group">');
    //   var labelFormGroupTwo = $(
    //     '<label for="exampleFormControlTextarea1">Comment</label>'
    //   );
    //   var inputFormGroupTwo = $(
    //     '<textarea id="commentComment" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write comments here.."></textarea>'
    //   );

    //   formGroupTwo.append(labelFormGroupTwo);
    //   formGroupTwo.append(inputFormGroupTwo);
    //   modalForm.append(formGroupTwo);

    //   modalMainBody.append(modalForm);
    //   modalSecond.append(modalMainBody);

    //   var modalFooter = $('<div class="modal-footer">');
    //   var modalButtonExit = $(
    //     '<button type="button" class="btn btn-primary" data-dismiss="modal">Exit</button>'
    //   );
    //   var modalButtonSubmit = $(
    //     '<button data-id="' +
    //       data[i]._id +
    //       ' id="saveComment" type="button" class="btn btn-primary">Submit</button>'
    //   );

    //   modalFooter.append(modalButtonExit);
    //   modalFooter.append(modalButtonSubmit);
    //   modalSecond.append(modalFooter);

    //   $('#exampleModal').append(modalDiv);
    }
  });
}
showArticles();

$(document).on("click", ".commentButton", function() {
  var commentId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + commentId
  }).then(function(data) {
    console.log(data);

    if (data.comment) {
      console.log("Old Commenter's Name: " + data.comment.name);
      console.log("Old Commenter's Comment: " + data.comment.comment);
    }
  });

  $(document).on("click", "#saveComment", function() {

    var name = $('#commentName').val();
    var comment = $('#commentComment').val()

      $.ajax({
        method: "POST",
        url: "/articles/" + commentId,
        data: {
            name: name,
            body: comment
        }
    })
    .then(function(data) {
        console.log(data);
    });
    $('#commentName').empty()
    $('#commentComment').empty();
  });
});

// $(document).on('click', ".commentButton", function(){

//     var commentId = $(this).attr('data-id');
//     var commentName = $('#commentName').empty()
//     var commentComment = $('#commentComment').empty();

//     console.log("A comment has been made with ID: " + commentId);

//     $('#saveComment').on('click', function() {
//         commentName = $('#commentName').val();
//         commentComment = $('#commentComment').val();

//         console.log("Name: " + commentName);
//         console.log("Comment: " + commentComment);

//         $.ajax({
//             method: "POST",
//             url: "/articles/" + commentId,
//             data: {
//                 name: commentName,
//                 body: commentComment
//             }
//         })
//         .then(function(data) {
//             console.log(data);
//             $('#commentName').empty()
//             $('#commentComment').empty();
//         })
//     })
// });
