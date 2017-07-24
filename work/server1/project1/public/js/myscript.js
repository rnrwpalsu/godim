// myscript.js
$(document).on('pageshow', '#blog', function() {
    console.log('blog page');
    $.get('http://localhost:3000/list', function(data) {
        //console.log(data);
        listPost(data);
    });
});

function listPost(data) {
    //console.log(data);
    var items = data.items;
    var output = "";
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        output += '<li>';
        output += '<a href="#blogpost" onclick="showPost(' + item.postId + ')">';
        output += '<img src="images/vs_logo.png">';
        output += '<h2>' + item.title + '</h2>';
        output += '<p>' + item.date + '</p>';
        output += '</a>';
        output += '</li>';
    } //for
    console.log(output);
    $("#postlist").html(output);
    $("#postlist").listview('refresh');
} //listPost

function showPost(id) {
    var url = 'http://localhost:3000/read/' + id;
    $.get(url, function(data) {
        console.log(data);
        var output = '';
        output += '<h3>' + data.item.title + '</h3>';
        output += data.item.date;
        $("#mypost").html(output);
    });
} //showPost