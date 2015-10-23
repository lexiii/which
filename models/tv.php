<?php
class TV{
    public static function getShowById($id){
        $db     = db::getinstance();
        $req    = $db->query("select * from shows WHERE  id = '".$id."' LIMIT 1");
        $result = $req->fetch();
        if($result){
            return $result['title'];
        }
        return 0;
    }
    public static function showExists($title){
        $db     = db::getinstance();
        $req    = $db->query("select * from shows WHERE  title = '".$title."' LIMIT 1");
        $result = $req->fetch();
        if($result){
            return 1;
        }
        return 0;
    }

    public static function addShow($title){
        $db   = db::getinstance();
        $req  = $db->query("insert into shows (title) values ('".$title."')");
        $id = $db->lastInsertId();
        return $id;
    }

    public static function getShows($id=-1){
        if($id==-1){
            $idd="";
        }else{
            $idd="WHERE id=".$id;
        }
        $list = [];
        $db   = db::getinstance();
        $req  = $db->query("select * from shows ".$idd);
        foreach ($req->fetchall() as $show){
            $list[]=[
                "id" => $show['id'],
                "title" => $show['title']
            ];
        }
        return $list;
    }

    public static function createSeason($id,$season){
        $db   = db::getinstance();
        $req  = $db->query("insert into seasons (showId, sNumber) values ('".$id."', '".$season."')");
        return self::seasonExists($id,$season);
        //$id = $db->lastInsertId();
        //return $id;
    }
    public static function seasonExists($id,$season){
        $db     = db::getinstance();
        $req    = $db->query("select * from seasons WHERE  showId = '".$id."' AND sNumber = '".$season."' LIMIT 1");
        $result = $req->fetch();
        if($result){
            return $result;
        }
        return 0;
    }

    public static function getEpisodes($seasonId,$watched=0){
        if($watched){
            $wa = " AND seen = '1'";
        }else{
            $wa = "";
        }
        $list = [];
        $db   = db::getinstance();
        $req  = $db->query("select * from episodes WHERE seasonId = '".$seasonId."'".$wa);
        foreach ($req->fetchall() as $ep){
            $list[]=[
                "id" => $ep['eId'],
                "num" => $ep['eNumber'],
                "seen" => $ep['seen'],
                "eDate" => $ep['date']
            ];
        }
        return $list;
    }

    public static function episodeExists($seasonId, $episodeNumber){
        $db     = db::getinstance();
        $req    = $db->query("select * from episodes WHERE  seasonId = '".$seasonId."' AND eNumber = '".$episodeNumber."' LIMIT 1");
        $result = $req->fetch();
        if($result){
            return $result;
        }
        return 0;
    }

    public static function addEpisode($seasonId, $episodeNumber, $watched){
        $db   = db::getinstance();
        $req  = $db->query("insert into episodes (seasonId, eNumber, seen) values ('$seasonId', '$episodeNumber', '$watched' )");
        $id = $db->lastInsertId();
        return $id;
    }


    public static function watchEpisode($seasonId, $episodeNumber, $watched){
//echo $seasonId." ".$episodeNumber;//." ".$watched;
        $db   = db::getinstance();
        $req  = $db->query("UPDATE episodes SET seen = '".$watched."' WHERE seasonId = '".$seasonId."' AND eNumber = '".$episodeNumber."'");
        //$req  = $db->query("UPDATE episodes SET seen = '2' WHERE seasonId = '2' AND eNumber = '5'");
        return $result;
    }
}
?>
