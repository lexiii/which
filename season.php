<?php
require_once('connection.php');
require_once('models/tv.php');

$show = $_POST['show'];
$seasonNumber = $_POST['season'];
$episodeNumber = (isset($_POST['episode']))?$_POST['episode']:0;
$action = $_POST['action'];

//$show = 5;
//$seasonNumber = 1;
//$episodeNumber = 5;
//$action = 'watch';
$showTitle = TV::getShowById($show);

$season = TV::seasonExists($show,$seasonNumber);
//var_dump($season);
if($season==0){
    $season = TV::createSeason($show,$seasonNumber);
}
if($action == 'list'){
    $eps = TV::getEpisodes($season['sId'],1);
    echo JSON_encode($eps);
}else if($action == 'watch'||$action == 'unwatch'){
    $wat = ($action=='watch'?1:0);
    $ep = TV::episodeExists($season['sId'], $episodeNumber);
    if ($ep == 0){
        $ep = TV::addEpisode($season['sId'], $episodeNumber, $wat);
    }else{
        //echo 'watching';
        if($ep['seen']!=$wat){
            TV::watchEpisode($season['sId'],$episodeNumber,$wat);
        }
    }
}



?>
