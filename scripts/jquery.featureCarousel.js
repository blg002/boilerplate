(function() {
	$.fn.featureCarousel = function(){
		return this.each(function(){
			var $container = $('> div', this).css('overflow','hidden'),
				$wrap = $container.find('> div').css('overflow','hidden'),
				$panels = $wrap.find('> div'),
				
				singleWidth = $container.outerWidth(),
				panels = $panels.length;
				animateSpeed = 500,
				currentPanel = 1,
				clickCount = 0;
				
			$wrap.css('width',(panels+2)*singleWidth);
			
			$panels.filter(':first').before($panels.filter(':last').clone().attr('id','panel-'+panels+'dupe').addClass('clone'));
			$panels.filter(':last').after($panels.filter(':first').clone().attr('id','panel-1dupe').addClass('clone'));
			
			$container.scrollLeft(singleWidth);
			
			function gotoPanel(panel){
				var dir = panel < currentPanel ? -1 : 1,
                    n = Math.abs(currentPanel - panel),
					left = singleWidth * dir * n;
					
				$container.filter(':not(:animated)').animate({
					scrollLeft : '+=' + left
				}, animateSpeed, function(){
					if (panel > panels) {
						$container.scrollLeft(singleWidth);
						panel = 1
					} else if (panel == 0) {
						$container.scrollLeft(singleWidth * panels);
						panel = panels
					}
					currentPanel = panel
				});
			}
			
			$container.prepend('<ol id="feature-nav" class="nav"><li id="feature-prev"><a href="#" title="View the previous panel">Previous</a></li><li id="feature-next"><a href="#" title="View the next panel">Next</a></li></ol>');
			
			$('#feature-prev').click(function(){
				gotoPanel(currentPanel - 1);
				clearInterval(rotator);
				return false
			});
			
			$('#feature-next').click(,function(){
				gotoPanel(currentPanel + 1);
				clearInterval(rotator);
				return false
			});
			
			$(window).keydown(function(event){
				switch (event.keyCode) {
					case 37: //left arrow
						$('#feature-prev').click();
						break;
					case 39: //right arrow
						$('#feature-next').click();
						break;
				}
			});
			
            $(this).bind('next',function () {
                gotoPanel(currentPanel + 1);
            });
		});
	};
})(jQuery);