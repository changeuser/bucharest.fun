var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1tI-4ympZD6trqJI2dYyqaeoLXFGlG7MduUR_k97-JW8/pubhtml';

function init() {
   Tabletop.init({
      key: public_spreadsheet_url,
      callback: showInfo,
      simpleSheet: true,
      orderby: 'name',
      reverse: false,
   })
}
init();

function showInfo(data, tabletop) {
   console.log(data);
   for (i = 0; i < data.length; i++) {
      var url = data[i].URL;
      var star = data[i].Starred;
      var name = '<td><a href="' + url + '" target="_blank">' + data[i].Name + '</a></td>';
      var type = '<td>' + data[i].Type + '</td>';
      var type_class = data[i].Type.toLowerCase().split(' ').join('_');
      var uses = '<td>' + data[i].Uses + '</td>';
      $('.resource-grid').prepend('<tr class="item ' + type_class + '">' + name + type + uses + url + '</tr>');
   }
}

$(".resource-grid").sieve({
   itemSelector: "tr"
});
$('#resources > div').addClass('search-box');

$('.buttons button').on('click', function() {
   var delay = 150;
   var filter = '.' + $(this).attr('id');
   $('.buttons button').removeClass('selected');
   $(this).addClass('selected');

   if (filter == '.show_all') {
      $('.resource-grid tr').fadeOut(delay).delay(delay).fadeIn(delay);
   } else {
      $('.resource-grid tr').fadeOut(delay);
      $('tr' + filter).delay(delay).fadeIn(delay);
   }
})