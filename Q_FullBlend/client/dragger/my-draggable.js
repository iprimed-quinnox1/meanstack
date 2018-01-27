angular.module('myDraggable', [])
.directive('myDraggable', [ '$document', function($document) {
	var dir = {};

	dir.restrict = 'A';
	dir.link = function(scope, element, attr) {
		var startX = 0, startY = 0, x = 0, y = 0;
		var dragItem = element;
		// find the section with header class.
		for(var i=0; i<element.children().length; i++){
			var item = element.children().eq(i);
			if(item.hasClass("header")){
				dragItem = item;
				break;
			}
		}
		dragItem.on('mousedown', function(event) {
			// Prevent default dragging of selected content
			//event.preventDefault();
			startX = event.pageX - x;
			startY = event.pageY - y;
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		});

		function mousemove(event) {
			y = event.pageY - startY;
			x = event.pageX - startX;
			element.css({
				top : y + 'px',
				left : x + 'px'
			});
		}

		function mouseup() {
			$document.off('mousemove', mousemove);
			$document.off('mouseup', mouseup);
		}
	}
	return dir;
} ]);