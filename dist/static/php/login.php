<?php
$link = @mysqli_connect("localhost", "root", "root", "rongyaoqinxuan");
$user = $_REQUEST['user'];
$pw=$_REQUEST['pw'];
$sql = "SELECT * FROM user WHERE userNAME='" . $user . "' limit 0,1";
$res = mysqli_query($link, $sql);
$arr = mysqli_fetch_array($res);
if ($arr) {
      if($arr['password']==$pw){

            $data = array("code" => 1, "errMsg" => "", "sucMsg" => $user);
      }
      else{
            $data = array("code" =>2, "errMsg" => "密码错误", "sucMsg" => "");
      }
} else {
      $data = array("code" => 0, "errMsg" => "账号不存在", "sucMsg" => "");
}
echo json_encode($data);
?>