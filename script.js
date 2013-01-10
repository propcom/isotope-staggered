/* Author:
	Anthony Armstrong
*/

$(function(){
      
  var $container = $('#container');
  
  $container.isotope({
    itemSelector: '.element',
    layoutMode: 'staggeredMode',
    staggeredMode: {
        gutter : 145
    }
  });
 
});