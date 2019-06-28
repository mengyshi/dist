$(function(){
	$(".rms p:nth-of-type(4)").next().css({"background":colorRandom(),"color":"#fff","letter-spacing":"10px","font-size":"18px","line-height":"40px","margin-left":"5px"}).html(verify().join(''));
	$(".login-header a").click(function(){
	$(".login").css({"display":"none","left":"450px"}).next().css({"display":"block"}).animate({"left":"888px"}).parent().prev().find("span").text("欢迎注册");
})
$(".register-header a").click(function(){
	$(".register").css({"display":"none","left":"450px"}).prev().css({"display":"block"}).animate({"left":"888px"}).parent().prev().find("span").text("欢迎登录");
})


/*注册验证*/
function checkUserName(obj){
	var uname=obj.val();
	var errorMessage="";
	if($.trim(uname)==''){
		errorMessage="邮箱或手机号码不能为空";
	}else if(uname.indexOf("@")>=0){
		var reg= /^([a-zA-Z0-9]+[-|_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(!reg.test(uname))
        {
            errorMessage='您输入的邮箱地址格式不正确';
        }
	}else if(isNaN(uname))
    {
        errorMessage='您输入的手机号或邮箱不正确';
    }else
    {
        var reg=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
        if (!reg.test(uname))
        {
            errorMessage='您输入的手机号码格式不正确';
        }
    }
    if(errorMessage!='')
    {
       obj.parent().prev().css("color","#e5004b").text(errorMessage);
       
        return false;
    }else{
    	 obj.parent().prev().text("");
        return true;
    }
	
}

function checkPwd(obj){
	var password=obj.val();
    var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/; 
    if (!reg.test(password))
    {
       obj.parent().prev().prev().css("color","#e5004b").html("请输入6-16位字符,必须包含英文字母和数字");
        return false;
    }else{
    	obj.parent().prev().prev().html("");
    	 return true;
    }
    
   
	
}

$(".rms p:nth-of-type(2)").find("input").change(function(){
	if(!checkUserName($(this))){
		console.log($(this).parent().prev());
	}
})

$(".rms p:nth-of-type(3)").find("input").change(function(){
	if(!checkPwd($(this))){
		console.log($(this).parent().prev().prev());
	}
})

function colorRandom(){
	var num1=Math.floor(Math.random()*256);
	var num2=Math.floor(Math.random()*256);
	var num3=Math.floor(Math.random()*256);
	return "rgb("+num1+","+num2+","+num3+")";
}
function verify(){
	var num1=Math.floor(Math.random()*10);
	var num2=Math.floor(Math.random()*10);
	var num3=Math.floor(Math.random()*10);
	var num4=Math.floor(Math.random()*10);
	var arrNum=[num1,num2,num3,num4];
	return arrNum;
}
function checkVerify(obj){
	var ver=Number(obj.val());
	if(ver == Number(obj.parent().next().html())){
		return true;
	}else{
		return false;
	}
}
$(".rms p:nth-of-type(4)").find("input").change(function(){
	
	if(checkVerify($(this))){
		console.log("true");
	}
})

$(".register-btn").click(function(){
	//console.log($(this).siblings());
	var uname=$(this).siblings().find("p:nth-of-type(2)").find("input");
	var pwd=$(this).siblings().find("p:nth-of-type(3)").find("input");
	var code=$(this).siblings().find("p:nth-of-type(4)").find("input");
	var mail=verify().join('')+verify().join('')+"@163.com";
	if(checkPwd(pwd)&&checkUserName(uname)&&checkVerify(code)){
		console.log(mail);
		$.get("http://47.104.244.134:8080/username.do",{username:uname.val()},function(data){
			console.log(data);
			if(data.code==0){
				alert("该用户名已存在，请直接登录或换一个用户名注册")
			}else{
				alert("注册成功，请登录")
				$.post("http://47.104.244.134:8080/usersave.do",{username:uname.val(),password:pwd.val(),email:mail,sex:1},(data)=>{
			
						console.log(data);
						alert("注册成功")
				})
		
			}
		})
		
		
	
	}
	
})
var login_flag=true;
$(".slide").children().mousedown(function(){
	console.log($(this));
	var username=$(this).parent().siblings().find("p:nth-of-type(2)").find("input");
	var pwd=$(this).parent().siblings().find("p:nth-of-type(3)").find("input");
	if(checkUserName(username)&&checkPwd(pwd)){
		$(this).animate({"left":"240px"}).parent().css({"background":"green","text-align":"center","color":"#fff"}).text("验证通过");
	}else{
		login_flag=false;
		
	}
})
$(".log-btn").click(function(){
	var uname=$(this).siblings().find("p:nth-of-type(2)").find("input");
	var pwd=$(this).siblings().find("p:nth-of-type(3)").find("input");
	if(login_flag){
		//15225258989
		$.post("http://47.104.244.134:8080/userlogin.do",{name:uname.val(),password:pwd.val()},function(data){
			if(data.code==0){
				
				localStorage.setItem("loginmessage",JSON.stringify( {"token":data.data.token,"username":uname.val()}));
				location.href="index.html";
				
				
			}else{
				alert("用户名或密码错误，请重新输入")
			}
			//console.log(data.data.token);
			/*if(data.data)*/
		})
		/*var data=eval(localStorage.getItem("userData"));
			for(var i=0 ;i<data.length;i++){
				if(username.val()==data[i].username && pwd.val()==data[i].password){
					console.log(i);
					console.log("登录成功");
					location.href="http://localhost:8080/index.html";
				}else {
					username.parent().css("border","1px solid #e5004b").siblings().not("p:nth-of-type(1)").css("border","1px solid #e5004b");
					
					//username.parent().siblings().not("p:last-child").css("color","#e5004b").text("用户名或密码错误");
				}
				
			}
		
	}else{
		alert("验证未通过，请检查用户名或密码格式是否有误")
	}
	*/
	}else{
		//alert("验证未通过，请检查用户名或密码格式是否有误");
		location.reload();
	}
})

})



