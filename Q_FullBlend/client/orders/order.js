function Order(oid, cid){
	this.custid = cid;
	this.orderid = oid;
	this.ws = appBase.storage;
	
	this.items = [];
	
	this.addItem = function(item){
		if(item instanceof OrderItem){
			this.items.push(item);
		}
	};
	
	this.remove = function(pid){
		var i, it;
		for(i=0; i< this.items.length; i++){
			it = this.items[i];
			//alert(pid == it.productid);
			if(pid == it.productid){
				this.items.splice(i,1);
				return;
			}
		}
	};
	
	this.fillDummyItems = function(){
		//alert("beginning with dummy items");
		this.addItem(new OrderItem("Mango", 3, "Bangalore"));
		this.addItem(new OrderItem("Potato", 10, "Bihar"));
		this.addItem(new OrderItem("Rusk", 1, "Kannur"));
	};
}

function OrderItem(cid, pid, qty, addr){
	this.customerid = cid;
	this.productid = pid;
	this.quantity = qty;
	this.delAddress = addr;
	this.img = "empty.png";
}