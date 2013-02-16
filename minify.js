var compressor = require('node-minify');

// Using Google Closure
new compressor.minify({
    type: 'gcc',
    fileIn: ['spinningwheel.js', 'scrollwheel.wrapper.js'],
    fileOut: 'scrollwheel-wrapper.min.js',
    callback: function(result){
		if (result != null) {
			console.log('***done but there was a problem***');
			console.log(result);
		}
		else {
			console.log('***done***');
		}
    }
});