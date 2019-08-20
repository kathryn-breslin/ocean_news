function showArticles () {
    $('#articles').empty();

    $.getJSON('/articles', function(data) {
        for (var i = 0; i < data.length; i++) {
            $('#articles').append("<p class='data-entry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" + data[i]._id + ">" + data[i].title + "</span><span class=delete>X</span></p>");
        }
    });
}

showArticles();