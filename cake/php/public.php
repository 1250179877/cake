<?php
	//设置字符编码
	header("Content-Type:text/html;charset=utf-8");
	function getConnect($sql){
		//1连接数据源
		$conn = mysqli_connect("localhost","root","");
		//print_r($conn);
		//2连接数据库
		mysqli_select_db($conn,"cake");
		//3设置字符编码
		mysqli_query($conn,"set names utf8");
		//4定义sql语句
		//$sql = "INSERT INTO `user`(`uname`, `rePwd`) VALUES ([value-2],[value-3])"
		//$sql = "select * from user where uname = '$uname'";
		//echo $sql;
		//5执行sql语句
		$result = mysqli_query($conn,$sql);//查询语句返回的是一个结果集
		
		return $result;
	}
?>