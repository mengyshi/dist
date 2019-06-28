$(function(){
var token;
	if(localStorage.getItem("loginmessage")){
		var user=JSON.parse(localStorage.getItem("loginmessage"));
		console.log("aa");
		console.log(user.username);
		$(".nav-left em").text(user.username).css("color","rgb(229,0,75)");
		token=user.token;
	}else{
		alert("您当前处于未登录状态！无法查看购物车中的内容！")
	}

	$.get("http://47.104.244.134:8080/cartlist.do",{token:token},(data)=>{
		console.log(data);
		var str='';
		data.map(function(i){
			str+=`<tr data-id=${i.id} data-gid=${i.gid} style="border-bottom:2px solid #cecece">
					<td><input type="checkbox" class="chk"/></td>
					<td><img src="${i.goods.picurl}"/></td>
					<td>${i.goods.name}</td>
					<td class="price"><span>${i.goods.price}</span>元</td>
					
					<td><input type="button" class="minus" style="width:14px" value="-"> <input type="text" class="num" value="${i.count}" style="width:30px;"/><input type="button" class="plus" style="width:14px" value="+"></td>
					<td class="perPrice"><span>${i.goods.price*i.count}</span>元</td>
					<td><input type="button" class="delBtn" value="删除"/></td>
					</tr>
					`;
		})
		$("#tb").html(str);
		$(".cart_no").eq(0).html($("tbody tr").length);
		selectAll();
		
		
		for(let i=0;i<$(".plus").length;i++){
				var num=1;
				var id=$(".minus").eq(i).parent().parent().attr("data-id");
				var gid=$(".minus").eq(i).parent().parent().attr("data-gid");
				$(".plus").eq(i).click(()=>{
					$(".plus").eq(i).prev().val(Number($(".plus").eq(i).prev().val())+1);
						upData(id,gid,num);
						
				})
		}
		for(let i=0;i<$(".minus").length;i++){
			var num=1;
			$(".minus").eq(i).click(()=>{
				//console.log($(".minus").eq(i).next().val());
				var id=$(".minus").eq(i).parent().parent().attr("data-id");
				
				var gid=$(".minus").eq(i).parent().parent().attr("data-gid");
				if($(".minus").eq(i).next().val()<=1){
					upData(id, gid,0);
					$(".minus").eq(i).parent().parent().remove();
					$(".cart_no").eq(0).html($("tbody tr").length);
					
				}else{
					$(".minus").eq(i).next().val($(".minus").eq(i).next().val()-1);
					upData(id, gid,-num);
				}
				//$("#total span:nth-child(2)").html(totalPrice());
				
				console.log(id,gid,-num);
				 
			})
			
			
		}
		var arr=[];
		for(var j=0;j<=$(".num").length;j++){
			var num1=$(".num").eq(j).val();
			arr.push(num1);
		}
		for(let i=0;i<$(".num").length;i++){
			
			$(".num").eq(i).change(()=>{
				console.log(i);
				var num2
			var id=$(".num").eq(i).parent().parent().attr("data-id");
			var gid=$(".num").eq(i).parent().parent().attr("data-gid");
				$(".num").eq(i).val($(".num").eq(i).val());
				num2=$(".num").eq(i).val();
				console.log(arr[i],num2);
				upData(id,gid,num2-arr[i]);
				arr[i]=num2;
				
			})	
			
		}
		
		for(let i=0;i<$(".delBtn").length;i++){
				$(".delBtn").eq(i).click(function(){
					console.log(this);
				var id=$(".delBtn").eq(i).parent().parent().attr("data-id");
				var gid=$(".delBtn").eq(i).parent().parent().attr("data-gid");
				upData(id,gid,0);
				$(this).parent().parent().remove();
				
				})
			
		}
		
		$("#clearAll").click(function(){
			
			for (var i=0;i<=$("tbody tr").length;i++){
				var id=$("tbody tr").eq(i).attr("data-id");
				var gid=$("tbody tr").eq(i).attr("data-gid");
				//console.log(id,gid);
				
				upData(id,gid,0);
		}
			$("tbody tr").remove();
		
		})
		
	})
	
	/*function totalPrice(){
			
		
		return total;
	}
	*/
	
	function upData(id, gid,num){
		$.get("http://47.104.244.134:8080/cartupdate.do",{id:id,gid:gid,num:num},function(data){
			console.log(data.msg);
		})
		
		var total=0;
		for(let i=0;i<$(".perPrice").length;i++){
				console.log($(".perPrice").children().eq(i));
				$(".perPrice").children().eq(i).html($(".perPrice").prev().find(".num").eq(i).val()*$(".price").eq(i).children().text());
		}
		
		for(let i=0;i<$(".chk").length;i++){
			if($(".chk").eq(i).prop("checked")){
				total+=Number($(".num").eq(i).val()*$(".price").eq(i).children().eq(0).text());
				//total+=number($(".chk").siblings().find(".p"))
			}
		}
		$("#total span:nth-child(2)").html(total);
		
	}
	
	
	
	
	function selectAll(){
		$("#selectAll").click(()=>{
			$(".chk").prop("checked",$("#selectAll").prop("checked"));
			upData();
			$("#count").html($(".chk:checked").length);
			
			 
		})
		$(".chk").click(()=>{
			
			if($(".chk:checked").length!=$(".chk").length){
				$("#selectAll").prop("checked",false);
			}else{
				$("#selectAll").prop("checked",true);
			}
			$("#count").html($(".chk:checked").length);
			
			upData();
		})
		
		
	}
	

})














/*function Cart(){
	if(getCookie("cart")!=undefined){
		this.cartData=JSON.parse(getCookie("cart"));
		
	}else{
		this.cartData={};
	}
	
}
Cart.prototype.addData=function(id,num,flag){
	
	if(this.cartData[id]===undefined){
		this.cartData[id] = num;
	}else if(flag){
		this.cartData[id]+=num;
	}else{
		this.cartData[id]=num;
	}
	setCookie("cart",JSON.stringify(this.cartData),7);
}
Cart.prototype.showData=function(domobj){	
			var goodsdata=JSON.parse(getCookie("cart"));
			console.log(goodsdata);
			$.get("data.json",data=>{
				console.log(this);			
				var str='';
			for(var id in goodsdata){
				str+=`
					<tr data-id=${id}>
					<td><input type="checkbox" class="chk"/></td>
					<td><img src="${data[id].imgsrc}"/></td>
					<td>${data[id].title}</td>
					<td class="price">${data[id].price}</td>
					<td><span class="minus"> - </span><input type="text" class="num" value="${goodsdata[id]}"/><span class="plus">+</span></td>
					<td class="perPrice">${data[id].price*goodsdata[id]}</td>
					<td><input type="button" class="delBtn" value="删除"/></td>
					</tr>
					`;
			}
			domobj.append(str);
			this.selectAll();
			for(let i=0;i<$(".plus").length;i++){
				$(".plus").eq(i).click(()=>{
					$(".plus").eq(i).prev().val(Number($(".plus").eq(i).prev().val())+1);
					var id=$(".plus").eq(i).parent().parent().attr("data-id");
					//console.log(this);
					this.addData(id,Number($(".plus").eq(i).prev().val()),false);
					this.totalPrice($("#total"));
				})
			}
			for(let i=0;i<$(".minus").length;i++){
				$(".minus").eq(i).click(()=>{
					//console.log($(".minus").eq(i).next().val());
					if($(".minus").eq(i).next().val()<=1){
						$(".minus").eq(i).next().val(1);
					}else{
						$(".minus").eq(i).next().val($(".minus").eq(i).next().val()-1);
					}
					var id=$(".minus").eq(i).parent().parent().attr("data-id");
					this.addData(id,$(".minus").eq(i).next().val(),false);
					this.totalPrice($("#total"));
				})
			}
			for(let i=0;i<$(".num").length;i++){
				$(".num").eq(i).change(()=>{
					console.log($(".num").eq(i).val())
					$(".num").eq(i).val($(".num").eq(i).val());
					var id=$(".num").eq(i).parent().parent().attr("data-id");
					this.addData(id,$(".num").eq(i).val(),false);
					this.totalPrice($("#total"));
				})
			
			}
			for(let i=0;i<$(".delBtn").length;i++){
				$(".delBtn").eq(i).click(()=>{
					//console.log($(".delBtn").eq(i).parent().parent())
					var id=$(".delBtn").eq(i).parent().parent().attr("data-id");
					
					this.removeData(id,$(".delBtn").eq(i).parent().parent());
					this.totalPrice($("#total"));
					
				})
			
			}
			
	})
	
}
Cart.prototype.totalPrice=function(dom){
		var total=0;
		$(".perPrice").each(function(i){
				$(this).html($(this).prev().find(".num").val()*$(".price").eq(i).text());
		})
			
		for(let i=0;i<$(".chk").length;i++){
			if($(".chk").eq(i).prop("checked")){
				console.log(i);
				total+=Number($(".num").eq(i).val()*$(".price").eq(i).text());
			}
		}
		dom.text(total);
}
Cart.prototype.selectAll=function(){
	$("#selectAll").click(()=>{
		$(".chk").prop("checked",$("#selectAll").prop("checked"));
		this.totalPrice($("#total"))
	})
	$(".chk").click(()=>{
		//console.log(1)
		if($(".chk:checked").length!=$(".chk").length){
			$("#selectAll").prop("checked",false);
		}else{
			$("#selectAll").prop("checked",true);
		}
		this.totalPrice($("#total"));
	})
	
}
Cart.prototype.removeData = function(id,domobj){
   	domobj.remove();
   	delete this.cartData[id]
	setCookie("cart",JSON.stringify(this.cartData),7);
}

*/

