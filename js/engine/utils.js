$.utils = {
    
    getId: function(id) {
        return document.getElementById(id);
    },


    rndArray: function(a) {
        return a[~~(Math.random() * a.length)]; 
    },

	resize: function(img, scale, col) {
	
    scale = scale || 1;
    col = col || false;

    if (img.width === 0) {
        return false;
    }

    var widthScaled = img.width * scale;
    var heightScaled = img.height * scale;
    
    var orig = document.createElement('canvas');
    orig.width = img.width;
    orig.height = img.height;
    var origCtx = orig.getContext('2d');

    try {
        origCtx.drawImage(img, 0, 0);
    } catch(e) {
        // console.log(e);
        return;
    }

    var origPixels = origCtx.getImageData(0, 0, img.width, img.height);
    
    var scaled = document.createElement('canvas');
    scaled.width = widthScaled;
    scaled.height = heightScaled;
    var scaledCtx = scaled.getContext('2d');
    var scaledPixels = scaledCtx.getImageData( 0, 0, widthScaled, heightScaled );
    var y, x;
    
    for( y = 0; y < heightScaled; y++ ) {
        for( x = 0; x < widthScaled; x++ ) {
            var index = (Math.floor(y / scale) * img.width + Math.floor(x / scale)) * 4;
            var indexScaled = (y * widthScaled + x) * 4;
            scaledPixels.data[ indexScaled ] = origPixels.data[ index ];
            scaledPixels.data[ indexScaled+1 ] = origPixels.data[ index+1 ];
            scaledPixels.data[ indexScaled+2 ] = origPixels.data[ index+2 ];
            scaledPixels.data[ indexScaled+3 ] = origPixels.data[ index+3 ];
            if (origPixels.data[index+3] === 0) {
                scaledPixels.data[ indexScaled ] = 0;
                scaledPixels.data[ indexScaled+1 ] = 0;
                scaledPixels.data[ indexScaled+2 ] = 0;
                scaledPixels.data[ indexScaled+3 ] = 0;
            } else if (col) {
                scaledPixels.data[ indexScaled ] = col[0];
                scaledPixels.data[ indexScaled+1 ] = col[1];
                scaledPixels.data[ indexScaled+2 ] = col[2];
                scaledPixels.data[ indexScaled+3 ] = 255;
            }
        }
    }

        scaledCtx.putImageData( scaledPixels, 0, 0 );
        // return scaled;
        var image = new Image();
        image.src = scaled.toDataURL('image/png');
        return image;

	}


};

