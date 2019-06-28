$(function(){
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

	$(".middle-search").children().find("input").eq(0).on("blur",function(){
		$.post(" http://47.104.244.134:8080/goodstypelist.do",{"l":"1"},function(data){
			//console.log(data);
			var str='';
			data.map(function(i){
				console.log(i);
				str+=`<p>${i.name}</p>
				`;
			})	
			$(".suggest-box").html(str);
			
		})
	})
	
	 $(".line-right div").hover(function(){
	 	$(this).children().css("background","#cecece").stop().animate({left:"-79px"});
	 },function(){
	 	$(this).children().css("background","#cecece").stop().animate({left:"79px"});
	 })
	
	
	
	
	$.post(" http://47.104.244.134:8080/goodstypelist.do",{"l":"1"},function(data){
		var str='';
		data.map(function(i){
			$(".classify-list").append("<a href='productList.html'><div class='list-one' goods-id="+i.id+"><span></span>"+i.name+"<span>></span><div class='classify-list-next'></div></div></a>");
			
		})
		
		for(let i=0;i<$(".classify-list").children().length;i++){
			$(".classify-list").children().eq(i).hover(function(){
				
			console.log($(".classify-list").children().find(".classify-list-next"));
				$.post(" http://47.104.244.134:8080/goodstypelist.do",{l:2},function(data){
					data.map(function(id){
						var classify=$(".classify-list").children().eq(i).find(".classify-list-next");
						
						console.log(id.parentid,$(".classify-list").children().children().eq(i).attr("goods-id"))
						if(id.parentid==$(".classify-list").children().eq(i).children().attr("goods-id")){
							
							//console.log(i);
							console.log(id.name);
							console.log(classify);
							classify.html(classify.html()+"<h2>"+id.name+"</h2>").show();
			
						}
						
					})
				})
			},function(){
				var classify=$(".classify-list").children().eq(i).find(".classify-list-next");
				classify.html("").hide();
			})
		}
		
		
		
		
		
	})
	
	/*$.post(" http://47.104.244.134:8080/goodstypelist.do",{"l":"1"},function(data){
		 var str='';
		 
			data.map(function(i){
				console.log(i);
				/*str=`<p goods-id="${i.id}"><span></span>${i.name}<span>></span></p>
				`;
				$(".classify-list").append("<p goods-id="+i.id+"><span></span>"+i.name+"<span>></span></p>");
			}) 
			var leng=$(".classify-list").children().length;
		for(let i=0;i<leng;i++){
			//console.log(i)
			$.post(" http://47.104.244.134:8080/goodstypelist.do",{"l":"2"},function(data){
					var st='';
					data.map((id)=>{
						console.log(id);
						if(id.parentid==$(".classify-list").children().eq(i).not("div").attr("goods-id")){
							console.log("true");
							st=`<h1>${id.name}</h1>`;
							console.log(st);
							$(".classify-list").children().not("p").find(".list-next").css("color","#000").html(st);
							st='';
							$(".classify-list").children().eq(i).hover(function(){
								$(".classify-list").children().eq(i).not("div").css({"background":"#fff","color":"rgb(229,0,74)"}).children().eq(0).css("background","url('../img/index.png') -30px -150px");
		
								$(".classify-list").children().not("p").css("display","block");
								console.log(st)
								//$(".classify-list").children().not("p").html(st);
							},function(){
								//console.log($(this));
								$(this).not("div").css({"background":"rgb(229,0,74)","color":"#fff"}).children().eq(0).css("background","url('../img/index.png') 6px -150px");
								$(".classify-list").children().not("p").css("display","none");
							})
						}
						
					})
					
					//console.log(data[i].parentid);
				})
			
			
			
		
	}*/
		
		
	/*倒计时*/
	function getDiffDays(date1,date2){
			var ms = Math.abs(date2-date1);
			var ss = ms/1000;
			var day = Math.floor(ss/24/60/60);
			var hour = Math.floor(ss/60/60%24);
			var minute = Math.floor(ss/60%60);
			var second = Math.floor(ss%60);	
			var arr=[hour,minute,second];
			return arr;	
	}
	function zhengdian(date,date2,i){
		//console.log(date,date2);
		var arr=getDiffDays(date,date2);
		$(".clock").children().eq(0).text(arr[0]);
			$(".clock").children().eq(1).text(arr[1]);
			$(".clock").children().eq(2).text(arr[2]);
			$(".clock").next().children().find(".state").css("display","none");
			$(".clock").next().children().eq(i).find(".state").css("display","block").next().css("background","rgb(229,0,72)");
	}
	setInterval(function(){
		var date= new Date();
		var date2;
		var date1 =date.getHours();
		console.log(date1);
		if(10<=date1&&date1<14){
			date2= new Date(date.getFullYear(),date.getMonth(),date.getDate(),14,0,0);
			
			zhengdian(date,date2,0);
			
			//console.log("10点秒杀");
		}else if(14<=date1&&date1<20){
			date2= new Date(date.getFullYear(),date.getMonth(),date.getDate(),20,0,0);
			zhengdian(date,date2,1);
			//console.log("14点秒杀");
		}else{
			
				date2= new Date(date.getFullYear(),date.getMonth(),date.getDate()+1,10,0,0);
				console.log(date2);
				zhengdian(date,date2,2);
		}

	},1000)
	
	
	

	/*抢购商品，可以加入购物车*/
	$.get("http://47.104.244.134:8080/goodsbytid.do",{tid:13,page
						:2,limit:5},data=>{
							var str='';
							console.log(data);
							data.data.map((i)=>{
								console.log(i);
								str+=`
									<li>
									<a href="detail.html?id=${i.id}">
									<img src="${i.picurl}" width="90%" height="70%"/></a>
									
									<p>${i.name}</p>
									<p>${i.price}元</p>
									<p><del>${i.price}</del></p>
									<div class="shadow">	
									</div>
									<div class="buygoods" data-id="${i.id}">立即抢购</div>
									</li>`;
							})
							$(".list").html(str);
							
							var leg= $(".shop-main-content .list li").length;
								for(let i=0;i<leg;i++){
								 	
								 	$(".shop-main-content .list li").eq(i).hover(function(){
								 		console.log(i);
										$(".shadow").eq(i).css("display","block").next().css("display","block").animate({"left":"58px"});
										 },function(){
										 $(".shadow").eq(i).css("display","none").next().css({"display":"none","left":"-30px"});	
										 
										 
									})
								 	
								 	$.get("http://47.104.244.134:8080/cartlist.do",{token:token},(data)=>{
								 		$(".middle-cart .cart_no").text(data.length);
								 				console.log(data.length)
								 	})
								 	$(".buygoods").eq(i).click(function(){
								 		
								 		var id=$(this).attr("data-id")
								 		$.post("http://47.104.244.134:8080/cartsave.do",{gid:id,token:token},function(data){
								 			console.log(data);
								 			$.get("http://47.104.244.134:8080/cartlist.do",{token:token},(data)=>{
								 				$(".middle-cart .cart_no").text(data.length);
								 				
								 			})
								 		})
								 		
								 	})
								 	
								 }
							
						})
	
	
	/*楼梯轮播*/
				console.log($(".flex-view li"));
				var count = 0;
				move();
				setInterval(function(){
					count++;
					if(count==$(".flex-view li").length){
						count = 0;
					}
					move();
					
				},2000)
				function move(){
						$(".flex-view li").eq(count).fadeIn()
						.siblings().fadeOut()
						
						
					}
				
			
	
	
	
	
	/*楼梯动态图片*/
	
	$(".tc-mid").hover(function(e){
		var evt=e||event;
		evt.stopPropagation();
		$(this).children().children().eq(0).css({"display":"none"}).next().css({"display":"block"});
	},function(){
		$(this).children().children().css({"display":"block"}).next().css({"display":"none"});
	})
	
	
	var move_img=$(".tc-right li").length;
	for(let i=0;i<move_img;i++){
		$(".tc-right li").children("img").eq(i).hover(function(){
			$(this).stop().animate({"left":"0px"})
		},function(){
			$(this).stop().animate({"left":"8px"})
		})
	}
	
	
})
