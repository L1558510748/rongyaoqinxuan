<?php
$link = @mysqli_connect("localhost", "root", "root", "rongyaoqinxuan");
$user = $_REQUEST['user'];
$goodsid = $_REQUEST['goodsid'];
$num = $_REQUEST["num"];
$sql = "SELECT * FROM cart WHERE user='".$user."'";
$res1 = mysqli_query($link, $sql);


while($row=mysqli_fetch_array($res1)){
  
    
    $str.=$row['user'];
    $str.=',';
    $str.=$row['goodsid'];
    $str.=',';
    $str.=$row['num'];
    $str.=',';
    $str.=$row['price'];
    $str.=',';
    $str.=$row['imgsrc'];
    $str.=',';
}
substr($str,0,strlen($str)-1);

echo $str;
// else{
//     if ($arr['goodsid']==$goodsid) {
    
//     $num1=$num+$arr['num'];
//     $sql2="UPDATE cart SET num='".$num1."' WHERE user='".$user."'";
    
//     mysqli_query($link,$sql2);
// } else {
//     $sql = "INSERT  cart (`user`,`goodsid`,`num`) VALUES ('" . $user . "','" . $goodsid . "','" . $num . "')";
//     $res = mysqli_query($link, $sql);
// }

// if ($res) {
//     $data = array("code" => 1, "errMsg" => "", "sucMsg" => "suc");
//     echo json_encode($data);
// } else {
//     $data = array("code" => 0, "errMsg" => "注册失败", "sucMsg" => "");
//     echo json_encode($data);
//     mysqli_close($link);
// }
// }

