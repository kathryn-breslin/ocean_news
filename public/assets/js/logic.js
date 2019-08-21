function showArticles() {
  $("#articles").empty();

  $.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        var cardDiv = $('<div>');
            cardDiv.addClass('card');
            cardDiv.addClass('new-article-div');

        var cardHeader = $('<h5>');
            cardHeader.addClass('card-header');
        
        var cardBody = $('<div>');
            cardBody.addClass('card-body');

        var cardTitle = $('<h5>');
            cardTitle.addClass('card-title');
            cardTitle.attr('data-id=', data[i._id]);
            cardTitle.append('<h5>' + data[i].title + '</h5>');
        
        var cardImage = $('<img src="' + data[i].image + '">');
            cardImage.addClass('linkImage', 'card-img-top');

        var link = $('<a href="https://www.oceannews.com' + data[i].link + '">Go to Article</a>');
            link.addClass('btn btn-primary');
            link.addClass('articleButton');
            link.addClass('float-right')
            link.attr('target', '_blank');
        
        var button = $('<input type="button" value="Add Comment"/>');
            button.addClass('btn btn-primary');
            button.addClass('commentButton');
            button.addClass('float-right')


        
        cardBody.append(cardImage);
        cardBody.append(cardTitle);
        cardBody.append(link);
        cardBody.append(button);
        cardDiv.append(cardHeader);
        cardDiv.append(cardBody);

        $('#articles').append(cardDiv);
    //   $("#articles").append(
    //     "<p class='data-entry' data-id=" +
    //       data[i]._id +
    //       "><span class='dataTitle' data-id=" +
    //       data[i]._id +
    //       ">" +
    //       data[i].title +
    //       "</span><span class=delete>X</span></p>"
    //   );
    }
  });
}

showArticles();

{/* <div class="card">
  <h5 class="card-header">Featured</h5>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}