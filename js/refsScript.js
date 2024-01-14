
$(document).ready(function(){

  /* extracts last name from html; later it will be used to bold the name in each reference */
  var owner = $("#owner").text();
  var owner = owner.split(" ");
  var owner = owner[owner.length -1];

  /* for testing */
  console.log(owner);

$.get('xml/My_Collection_With_Google_Citations.xml', function(d){


$(d).find('record').each(function(){


  var $paper = $(this);

  var authors = '';

  $paper.find('authors author').each(function(index, value){
  

var author = $(value).text();
var authorLastName = author.split(", ")[0];
var authorNames = author.split(", ");

authorNames.shift();

var authorNames = authorNames.toString().split(" ");
var authorNames =  authorNames.map(x => x.charAt(0)).join('.').substr(0, authorNames.length*2).toUpperCase()+".";


if (authorLastName=== owner) {

      var author = "<b>" + authorLastName+" "+authorNames+"</b>, ";

} else {
      var author = authorLastName+" "+authorNames+", ";
}


       authors += author;
      });

  var year = $paper.find('year').text();
  // var title = $title.attr("title");
  var title = $paper.find('title').text();
  console.log(title);

  var journal = $paper.find('secondary-title').text();
  var volume = $paper.find('volume').text();

  var issue = $paper.find('issue').text();

  if(issue.length===0){
    var issue = "";
  }else{
    var issue = "(" + issue + ")";
  }


  var pages = $paper.find('pages').text();

  var googleCites = $paper.find('google_cites').text();
  var googleCitesId = $paper.find('cid').text();
  console.log(googleCitesId=="NA");

  if(googleCitesId==='NA'){

    var googleCitesURL = '<a href="#" class="btn btn-outline-primary disabled" role="button" aria-disabled="true" target="_blank">Google citations: <b>0</b></a>'

  }else{

    var googleCitesURL = '<a href=\"https://scholar.google.com/scholar?cites=' + googleCitesId +  '\" class="btn btn-outline-primary" target="_blank">Google citations: <b>' + googleCites + '</b></a>'
  }


  var url = $paper.find('web-urls url').text();
  var url = '<a href="'+ url +'" class="btn btn-outline-primary" target="_blank">View article <i class="far fa-eye"></i></a>'
  // var url = urls.find('url').text;




  var html = '<li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"><div class="col-10"><p>'+ authors + year + ", " +  title + '. <span class="journal">' + journal + '</span> '+ volume +issue+ ": " +pages+'</p></div><div class="col-2">' + googleCitesURL + url +'</div></li>';
  // html += '<dd> <span class="loadingPic" alt="Loading" />';
  // html += '<p class="title">' + title + '</p>';
  // html += '<p> ' + description + '</p>' ;
  // html += '</dd>';

  $('#ulPublications').append($(html));


});
});
});
