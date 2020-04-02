<?php
$link = @mysqli_connect("localhost", "root", "root", "rongyaoqinxuan");
$user = $_REQUEST['user'];

$sql = "DELETE  FROM cart WHERE user='".$user."'";
$res1 = mysqli_query($link, $sql);
mysqli_close($link);



