<?php
    $link = @mysqli_connect("localhost", "root", "root", "rongyaoqinxuan");
    $user=$_REQUEST['user'];
    $goodid=$_REQUEST['goodid'];
    $type=$_REQUEST['type'];
    $num=$_REQUEST['num'];
    if($type==0){
        $sql="DELETE FROM cart WHERE `user`='".$user."' AND `goodsid`='".$goodid."'";
        mysqli_query($link,$sql);
    }
    if($type==1){
        $sql="UPDATE cart SET `num`='".$num."' WHERE `user`='".$user."' AND `goodsid`='".$goodid."'";
        mysqli_query($link,$sql);
    }
?>