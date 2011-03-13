(function() {
	$.fn.featureFade = function(){
		return this.each(function(){
			var $feature = $(this),
				$panels = $feature.find('.article').attr({'aria-hidden':'true'}),
				$nav = $('#feature-nav'),
				$navLinks = $nav.find('a'),
			
				items = $panels.length,
				fadeTime = 300,
				clickCount = 0,
				currentPanel = 0;
			
			// Paging function
			function gotoPanel(panel){
				if (panel >= items){
					panel = 0
				}
				
				$panels.stop(false,true).eq(currentPanel).attr({'aria-hidden':'true'}).fadeOut(fadeTime,function(){					
					$panels.eq(panel).attr({'aria-hidden':'false'}).fadeIn(fadeTime);
				});
				
				currentPanel = panel;
				
				$navLinks.removeClass('current').attr({'aria-selected':'false','tabindex':'-1'}).eq(panel, this).addClass('current').attr({'aria-selected':'true','tabindex':'0'});
			}
			
			// Direct Links
			$navLinks.click(function(){
				var index = $navLinks.index(this);
				gotoPanel(index);

				if (clickCount != 0){
					clearInterval(rotator);
					$(this).focus();
				}

				clickCount++;
				return false;
			}).filter(':first').click();

			// Keyboard access
			$nav.delegate('a','keydown',
				function(e){
					switch(e.which){
						case 37: case 38: //left & up
							if ($(this).parent().prev().length!=0) {
								$(this).parent().prev().find('>a').click();
							} else {
								$nav.find('li:last>a').click();
							}
							return false;
							break;
						case 39: case 40: //right & down
							if ($(this).parent().next().length!=0) {
								$(this).parent().next().find('>a').click();
							} else {
								$nav.find('li:first>a').click();
							}
							return false;
							break;
					}		
				}
			);
			
			// Next panel for automatic fading
			$(this).bind('next',function(){
				gotoPanel(currentPanel + 1)
			});
		});
	};
})(jQuery);