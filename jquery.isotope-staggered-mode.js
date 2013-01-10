/* Author - Anthony Armstrong */

// staggeredMode custom layout mode
$.extend( $.Isotope.prototype, {

	_staggeredModeReset : function() {
	  this.staggeredMode = {
	    x : 0,
	    y : 0,
	    height : 0,
	    currentCategory : null
	  };
	},

	_staggeredModeLayout : function( $elems ) {

		var instance = this,
	      	containerWidth = this.element.width(),
	      	sortBy = this.options.sortBy,
	      	alternateRow = false,
	      	remainingWidth = containerWidth,
	      	props = this.staggeredMode;
	  
	  	$elems.each( function(index) {
	    	var $this = $(this),
	        	atomW = $this.outerWidth(true),
	        	atomH = $this.outerHeight(true),
	        	category = $.data( this, 'isotope-sort-data' )[ sortBy ],
	        	totalAtomW = alternateRow ? atomW * 2 : atomW,
	        	x, y;

	        // Can this element fit in this row?
	        if (remainingWidth >= totalAtomW) {

	        	// Where does 'y' need to go?
        		props.y = props.y > 0 ? props.y : 0;
	        	
	        } else {

	        	console.log('new row');

	        	// Reset remaining width...
	        	remainingWidth = containerWidth;

	        	// Update 'y' position for new row
	        	props.y += atomH;

	        	// Update alternating row...
	        	alternateRow = alternateRow ? false : true;

	        }

	        // Where does 'x' need to go?
	        x = alternateRow ? (containerWidth - remainingWidth) + instance.options.staggeredMode.gutter : (containerWidth - remainingWidth);
        	props.x = x;

	        // Shave some pixels off remaing width...
	        remainingWidth -= atomW;
	        
	        // position the atom
		    instance._pushPosition( $this, props.x, props.y );
	        props.height = Math.max( props.y + atomH, props.height );

	  	});

	},

	_staggeredModeGetContainerSize : function () {
	  return { height : this.staggeredMode.height };
	},

	_staggeredModeResizeChanged : function() {
	  return true;
	}

});