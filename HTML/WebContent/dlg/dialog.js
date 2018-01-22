
function Dialog(title, width, height, content, parent){
	// dialog properties.
	this.title = title;
	this.width = width;
	this.height = height;
	this.content = content;
	this.parent = document.getElementsByTagName("BODY")[0];
	if(parent){
		this.parent = parent;
	}
	
	// create dialog window.
	var dlgDiv = document.createElement("div");
	dlgDiv.className = "dlg";
	this.parent.appendChild(dlgDiv);
	if(this.width){
		dlgDiv.style.width = this.width;
	}
	if(this.height){
		dlgDiv.style.height = this.height;
	}
	//alert(dlgDiv.outerHTML);
	
	// title bar
	var titleDiv = document.createElement("div");
	titleDiv.className = "dlgHeader";
	dlgDiv.appendChild(titleDiv);
	//alert(dlgDiv.outerHTML);
	
	var titleTag = document.createTextNode(this.title);
	titleDiv.appendChild(titleTag);
	//alert(dlgDiv.outerHTML);
	
	// content.
	var contentDiv = document.createElement("div");
	contentDiv.className = "dlgContent";
	dlgDiv.appendChild(contentDiv);
	//alert(dlgDiv.outerHTML);

	if(this.content){
		if(this.content.tagName){ // an html element
			contentDiv.appendChild(this.content);
		} else { // text
			contentDiv.innerHTML = this.content;
		}
	}
	//alert(dlgDiv.outerHTML);
	
	// make it draggable
	dragElement(dlgDiv, titleDiv);
}

function dragElement(dlgDiv, titleDiv) {
	  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	  if (titleDiv) {
	    /* if present, the header is where you move the DIV from:*/
		  titleDiv.onmousedown = dragMouseDown;
	  } else {
	    /* otherwise, move the DIV from anywhere inside the DIV:*/
		  dlgDiv.onmousedown = dragMouseDown;
	  }

	  function dragMouseDown(e) {
	    e = e || window.event;
	    // get the mouse cursor position at startup:
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    document.onmouseup = closeDragElement;
	    // call a function whenever the cursor moves:
	    document.onmousemove = elementDrag;
	  }

	  function elementDrag(e) {
	    e = e || window.event;
	    // calculate the new cursor position:
	    pos1 = pos3 - e.clientX;
	    pos2 = pos4 - e.clientY;
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    // set the element's new position:
	    dlgDiv.style.top = (dlgDiv.offsetTop - pos2) + "px";
	    dlgDiv.style.left = (dlgDiv.offsetLeft - pos1) + "px";
	  }

	  function closeDragElement() {
	    /* stop moving when mouse button is released:*/
	    document.onmouseup = null;
	    document.onmousemove = null;
	  }
	}
