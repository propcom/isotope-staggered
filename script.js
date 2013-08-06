/* Author:
	Anthony Armstrong
*/

$(function(){
      
  var $container = $('#container');
  
  $container.isotope({
    itemSelector: '.element',
    layoutMode: 'staggeredMode',
    staggeredMode: {
    	orientation : 'horizontal',
        gutter : 145
    }
  });
 
});