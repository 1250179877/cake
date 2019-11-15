<?php
	//引入public.php文件 
	include("public.php");
	//设置字符编码
	//header("Content-Type:text/html;charset=utf-8");
	//接收请求 $_POST["uname"];
	$uname = $_POST["uname"];//获取用户名
	$pwd = $_POST["password"];//获取密码
	//根据用户名向数据库去查询该条数据
	//select * form user where uname = '';
	//1连接数据源
	/*$conn = mysqli_connect("localhost","root","");
	//print_r($conn);
	//2连接数据库
	mysqli_select_db($conn,"studentysy");
	//3设置字符编码
	mysqli_query($conn,"set names utf8");
	//4定义sql语句
	//$sql = "INSERT INTO `user`(`uname`, `upwd`) VALUES ([value-2],[value-3])"
	$sql = "select * from user where uname = '$uname'";
	//echo $sql;
	//5执行sql语句
	$result = mysqli_query($conn,$sql);//查询语句返回的是一个结果集*/
	//结果集不能直接操作
	//print_r($result);
	//定义sql语句
	$sql = "select * from user where uname = '$uname'";
	//调用连接方法
	$result = getConnect($sql);//结果集
	
	//解析结果集  如果没有查询到数据，解析出来 的是空
	$arr1 = mysqli_fetch_array($result);//执行一个解析一行
	
	if($arr1){//不为空，说明用户名存在
		//print_r($arr1["upwd"]);
		//判断断码是否正确 
		if($arr1["rePwd"] == $pwd){//密码也正确 表示登录成功
			//跳转到学生信息页
			echo "<script>alert('登录成功!');location.href='../first.html?uname=$uname';</script>";
		}else{
			//密码有误
			//跳转到登录 页
			echo "<script>alert('密码有误！请重新登录!');location.href='../denglu.html';</script>";
		}
		
	}else{//为空，说明 用户名不存在 
		//跳转到登录 页
		echo "<script>alert('不用户名不存在！');location.href='login.html';</script>";
	}
	
	/*$arr2 = mysqli_fetch_array($result);
	$arr3 = mysqli_fetch_array($result);
	$arr4 = mysqli_fetch_array($result);
	$arr5 = mysqli_fetch_array($result);
	$arr6 = mysqli_fetch_array($result);
	print_r($arr1);
	echo "1"."<br>";
		print_r($arr2);
	echo "2"."<br>";
		print_r($arr3);
	echo "3"."<br>";
		print_r($arr4);
	echo "4"."<br>";
		print_r($arr5);
	echo "5"."<br>";
		print_r($arr6);
	echo "6"."<br>";*/
	
	
?>