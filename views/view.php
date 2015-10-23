<br/>
<?php
//var_dump($_GET);


require_once('../connection.php');
require_once('../models/tv.php');

if(isset($_GET['id'])){
    $id=$_GET['id'];
}else{
    $id=-1;
}
$shows = TV::getShows($id);

if($id==-1){
    foreach($shows as $show){
        echo "<a href='/#/view/".$show['id']."'>".$show['title']."</a><br/>";
    }
}else{
    foreach($shows as $show){
        echo "<p class='set-bg'>".$show['title']."</p>";
    }
?>
<p class='slug'></p>
<p class='seasons'></p>
<p class='more'> </p>
<br/>
<a href='#/view/' class='btn btn-default' id='back_btn'>Back</a>
<?
}
?>
