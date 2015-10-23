<?php
if(!isset($_POST['title'])){
    die('0');
}
require_once('connection.php');
require_once('models/tv.php');
$title = $_POST['title'];
if(TV::showExists($title)){
    die(0);
}
$id = TV::addShow($title);
// ADD TITLE
//var_dump($_GET['title']);
print "#/view/".$id;

?>
