<?php
$link = @mysqli_connect("localhost", "root", "root", "rongyaoqinxuan");
$user = $_REQUEST['user'];
$goodsid = $_REQUEST['goodsid'];
$num = $_REQUEST["num"];
$price = $_REQUEST['price'];
$imgsrc = $_REQUEST["imgsrc"];
$sql = "SELECT * FROM cart WHERE user='" . $user . "'limit 0,1";
$res1 = mysqli_query($link, $sql);
$arr = mysqli_fetch_array($res1);
if ($arr['goodsid'] == $goodsid) {

    $num1 = $num + $arr['num'];
    $sql2 = "UPDATE cart SET num='" . $num1 . "' WHERE user='" . $user . "'";

    mysqli_query($link, $sql2);
} else {
    $sql = "INSERT  cart (`user`,`goodsid`,`num`,`price`,`imgsrc`) VALUES ('" . $user . "','" . $goodsid . "','" . $num . "','" . $price . "','" . $imgsrc . "')";
    $res = mysqli_query($link, $sql);
}

if ($res) {
    $data = array("code" => 1, "errMsg" => "", "sucMsg" => "suc");
    echo json_encode($data);
} else {
    $data = array("code" => 0, "errMsg" => "注册失败", "sucMsg" => "");
    echo json_encode($data);
    mysqli_close($link);
}
