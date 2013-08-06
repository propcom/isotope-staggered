
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
	      	props = this.staggeredMode,
	      	gutter = this.options.staggeredMode.gutter,
	      	orientation = this.options.staggeredMode.orientation;
	  
	  	$elems.each( function(index) {
	    	var $this = $(this),
	        	atomW = $this.outerWidth(true),
	        	atomH = $this.outerHeight(true),
	        	category = $.data( this, 'isotope-sort-data' )[ sortBy ],
	        	totalAtomW = alternateRow ? atomW * 2 : atomW,
	        	x, y;

	        if (!orientation) {
	        	$.error('Missing argument: \'orientation\' not supplied');
	        }

	        if (orientation == 'horizontal') {

		        // Can this element fit in this row?
		        if (remainingWidth >= totalAtomW) {

		        	// Where does 'y' need to go?
	        		props.y = props.y > 0 ? props.y : 0;
		        	
		        } else {

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

		    }

		    if (orientation == 'vertical') {

		    	// odd number of elements?
	    		var elements_odd = Boolean(parseInt(remainingWidth / atomW) & 1);

		    	// if this element cannot fit in the current row
		    	if ( props.x !== 0 && atomW + props.x > containerWidth ) {
			      	
			      	props.x = 0;

			      	// update remaining width
			      	remainingWidth = containerWidth;

			      	// update alternating row...
	        		alternateRow = alternateRow ? false : true;

	        		// if odd amount of elements, minus off the gutter
	        		props.y += atomH - (elements_odd ? gutter : 0);

			    } 

			   	// odd number of elements in row and alternate row...
			   	if (elements_odd && alternateRow) {

			   		// every even number in the row...
			   		if (index % 2 == 0) {

			   			// push up
			   			props.y -= gutter;

			   		} else {

			   			// push down
			   			props.y += gutter;

			   		}

			   	} else { // even number of elements in row and not alternate

			   		// every even number in the row...
			   		if (index % 2 == 0) {

			   			// push down
			   			props.y += gutter;

			   		} else  {

			   			// push up
			   			props.y -= gutter;

			   		}

			   	}
			    
			    // position the atom
			    instance._pushPosition( $this, props.x, props.y );

			    props.height = Math.max( props.y + atomH, props.height );
			    props.x += atomW;

		    }

	  	});

	},

	_staggeredModeGetContainerSize : function () {
	  return { height : this.staggeredMode.height };
	},

	_staggeredModeResizeChanged : function() {
	  return true;
	}

});