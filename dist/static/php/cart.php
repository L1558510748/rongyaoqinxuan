<?php
$link = @mysqli_connect("localhost", "root", "root", "rongyaoqinxuan");
$user = $_REQUEST['user'];
$goodsid = $_REQUEST['goodsid'];
$num = $_REQUEST["num"];
$price = $_REQUEST['price'];
$imgsrc = $_REQUEST["imgsrc"];
$goodsname=$_REQUEST['goodsname'];
$status=0;
$sql = "SELECT * FROM cart WHERE user='" . $user . "'";
$res1 = mysqli_query($link, $sql);
// $arr = mysqli_fetch_array($res1);

while($row = mysqli_fetch_array($res1)){
    if($row['goodsid']==$goodsid){
        $status=$row['num'];
    }
}
if ($status) {

    $num1 = $num + $status;
    $sql2 = "UPDATE cart SET num='" . $num1 . "' WHERE user='" . $user . "'AND `goodsid`='".$goodsid."'";

    mysqli_query($link, $sql2);
} else {
    $sql = "INSERT  cart (`user`,`goodsid`,`num`,`price`,`imgsrc`,`goodsname`) VALUES ('" . $user . "','" . $goodsid . "','" . $num . "','" . $price . "','" . $imgsrc . "','".$goodsname."')";
    $res = mysqli_query($link, $sql);
}

if ($res) {
    $data = array("code" => 1, "errMsg" => "", "sucMsg" => "suc");
    echo json_encode($data);
} else {
    $data = array("code" => 0, "errMsg" => "", "sucMsg" => "");
    echo json_encode($data);
}
mysqli_close($link);
