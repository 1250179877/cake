//根据name获取value
function getCookieByName(cName){
	var ck = document.cookie;
	var ckArr;
	//判断cookie是否存在 "; "
	if(!!ck){
		ckArr = ck.split("; ");
		//console.log(ckArr);
		for (var i = 0; i < ckArr.length; i++) {
			if(ckArr[i].split("=")[0] === cName){
				return ckArr[i].split("=")[1];
			}
		}
	}
	return "";
}
//设置cookie
function setCookie(key,val,date,path){
	//如果date没有传，只传了path
	if(!(date instanceof Date)){//不是date
		//date不是Date类型的情况有可能 是undefined,也有可能是path
		if(date){//表示存在 存在表示date是一个路径
			path = date;//将路径赋值给path
			date = "";
		}
	}
	document.cookie = key+"="+val+";expires="+date+";path="+path;
}
//删除cookie
function removeCookie(cName){
	document.cookie = cName + "=;expires="+new Date(0);
}