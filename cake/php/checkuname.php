<?php
	include("public.php");
	$uname = $_GET["uname"];
	$sql = "select reginame from user where reginame = '$uname'";
	$resule = getConnect($sql);
	$arr = mysqli_fetch_array($resule);
	if($arr){
		echo 1;
	}else{
		echo 0;
	}
 
 
 
 ?>