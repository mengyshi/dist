$(function(){
	/*$(".list-data")*/
	
	var token;
	if(localStorage.getItem("loginmessage")){
		var user=JSON.parse(localStorage.getItem("loginmessage"));
		console.log("aa");
		console.log(user.username);
		$(".nav-left em").text(user.username).css("color","rgb(229,0,75)");
		token=user.token;
	}else{
		alert("您当前处于未登录状态，请先登录！否则将您看中的物品将无法加入购物车！")
	}

	
	$.get("http://47.104.244.134:8080/goodsbytid.do",{tid:13,page:2,limit:6},data=>{
		var str='';
		data.data.map(function(i){
			console.log(i);
			str+=`
				<li>
				<a href="detail.html?id=${i.id}">
					<img src="${i.picurl}"/></a>
					<p>${i.name}</p>
					<p>${i.price}元</p>
					<p><del>${i.price}</del></p>
					<div class="op">
					<input class="num" type="text" value="1"/>
					<span>
					<button class="plus">+</button>
					<button class="minus">-</button>
					</span>
					</div>
					<input type="button" class="buygoods" data-id="${i.id}" value="加入购物车"/>
					<input class="sc" type="button" value="收藏"/>
					</li>
			`;
		})
		$(".list-data").html(str);
		
		var l=$(".list-data li").length;
		for(let i=0;i<l;i++){
		
$.get("http://47.104.244.134:8080/cartlist.do", {
	token: token
}, (data) => {
	$(".middle-cart .cart_no").text(data.length);
	console.log(data.length)
})


	




	/*	for(let i=0;i<$(".minus").length;i++){
			
			$(".minus").eq(i).click(()=>{
				//console.log($(".minus").eq(i).next().val());
				var id=$(".minus").eq(i).parent().parent().attr("data-id");
				
				var gid=$(".minus").eq(i).parent().parent().attr("data-gid");
				if($(".minus").eq(i).next().val()<=1){
						
				}else{
					$(".minus").eq(i).next().val($(".minus").eq(i).next().val()-1);
					
				}
				
				 
			})
			
			
		}
*/


$(".buygoods").eq(i).click(function() {

	var id = $(this).attr("data-id")
	$.post("http://47.104.244.134:8080/cartsave.do", {
		gid: id,
		token: token
	}, function(data) {
		console.log(data);
		$.get("http://47.104.244.134:8080/cartlist.do", {
			token: token
		}, (data) => {
			$(".middle-cart .cart_no").text(data.length);

		})
	})

})
}
		
		for(let i=0;i<$(".plus").length;i++){
		$(".plus").eq(i).click(()=>{
			var num1=Number($(".plus").eq(i).parent().prev().val());
			console.log(i,num1);
			$(".plus").eq(i).parent().prev().val(num1+1);		
		})
	}
		
		for(let i=0;i<$(".minus").length;i++){
		$(".minus").eq(i).click(()=>{
			var num2=Number($(".minus").eq(i).parent().prev().val());
			console.log(i,num2);
			if(num2<=1){
				$(".minus").eq(i).parent().prev().val("1");	
			}else{
				$(".minus").eq(i).parent().prev().val(num2-1);	
			}
				
		})
	}
	})
	
	
    
})
