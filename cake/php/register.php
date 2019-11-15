<?php
include("public.php");
	$uname = $_GET["uname"];
	$phoneNum = $_GET["phone"];
	$rePwd = $_GET["password"];
	$sql = "insert into user (uname,rePwd,phoneNum) value ('$uname','$rePwd','$phoneNum')";
	$row = getConnect($sql);
	if($row){
		echo "<script>alert('注册成功，请登录！');location.href='../denglu.html'</script>";
	}else{
		echo "<script>alert('注册失败！')</script>";
	}
?>