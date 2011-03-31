// plugin 1
// minifyjs.com/javascript-compressor

// plugin 2


var COMPANYNAMESPACE = COMPANYNAMESPACE || {
	common : {
		init : function(){
			COMPANYNAMESPACE.autopopulate();
		}
	},
	
	home : {
		init : function(){
			COMPANYNAMESPACE.initFeature();
		}
	},
	
	about : {
		init : function(){
			console.log('only on the body#about pages');
		}
	},
	
// Initialize Feature Plugin	
	initFeature : function(){
		var autoscrolling = true;

		$('#feature').featureCarousel().mouseover(function () {
			autoscrolling = false;
		}).mouseout(function () {
			autoscrolling = true;
		});

		rotator = setInterval(function () {
			if (autoscrolling) {
				$('#feature').trigger('next');
			}
		}, 8000);
	},

// Autopopulate forms fields
	autopopulate : function(){
		var i = document.createElement('input'),
			isPlaceholder = ("placeholder" in i);

		if (!isPlaceholder) {
			$('input[placeholder]').each(function(){
				var $this = $(this),
					fieldLabel = $this.attr('placeholder');

				$this.val(fieldLabel).focus(function(){
					if (this.value == fieldLabel){
						$this.val('');
					}
				}).blur(function(){
					if (this.value == ''){
						$this.val(fieldLabel);
					}
				});
			});
			$('form').submit(function(){
				$('input[placeholder]').each(function(){
					var $this = $(this);

					if ($this.attr('placeholder') == $this.val()){
						$this.val('');
					}
				});
			});
		}
	}
}

UTIL = {
	fire : function(func,funcname,args){
		var namespace = COMPANYNAMESPACE;

		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
			namespace[func][funcname](args);
		}
	}, 
 
	init : function(){
		var bodyId = document.body.id;

		UTIL.fire('common');

		$.each(document.body.className.split(/\s+/),function(i,classnm){
			UTIL.fire(bodyId);
			UTIL.fire(classnm,bodyId);
		});
	}
}; 
 
$(document).ready(UTIL.init);