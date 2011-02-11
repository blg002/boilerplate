(function(){
	$.fn.tabContainer = function(){
		return this.each(function(){
			var $container = $(this),	
				$panels = $container.find('> div.section'),
				$nav = $('.tabcon-nav'),
				$navLis = $nav.find('> li'),
				$navAnchors = $navLis.find('> a');

			// The Bacon
			$navAnchors.click(function(){
				$navAnchors.attr({'aria-selected':'false','tabindex':'-1'});
				$panels.hide().attr({'aria-hidden':'true'}).filter(this.hash).show().attr({'aria-hidden':'false'});

				$navLis.removeClass('current');
				$(this).attr({'aria-selected':'true','tabindex':'0'}).parent().addClass('current');

				return false;
			}).filter(':first').click();
			
			// Keyboard access
			$nav.delegate('a','keydown',
				function(e){
					switch(e.which){
						case 37: case 38: //left & up
							if ($(this).parent().prev().length!=0) {
								$(this).parent().prev().find('>a').click().focus();
							} else {
								$nav.find('li:last>a').click().focus();
							}
							return false;
							break;
						case 39: case 40: //right & down
							if ($(this).parent().next().length!=0) {
								$(this).parent().next().find('>a').click().focus();
							} else {
								$nav.find('li:first>a').click().focus();
							}
							return false;
							break;
					}		
				}
			);
		});
	};
})(jQuery);