<?php
$link = @mysqli_connect("localhost","root","root","rongyaoqinxuan");
    $username=$_REQUEST['user'];
    $password=$_REQUEST['pw'];
    $sql="INSERT  user (`username`,`password`) VALUES ('".$username."','".$password."')";
    $res=mysqli_query($link,$sql);
    if($res){
        $data=array("code"=>1,"errMsg"=>"","sucMsg"=>"suc");
        echo json_encode($data);
    }
    else{
        $data=array("code"=>0,"errMsg"=>"注册失败","sucMsg"=>"");
        echo json_encode($data);
    }
?>