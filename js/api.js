var url = 'http://api.themoviedb.org/3/',
    mode = 'search/tv?query=',
    input,
tvName,
base = "https://image.tmdb.org/t/p/",
    key = '&api_key=9edae3f3bd24b43b3e62eb501107ba27';

function getShow(show,noSeasons){
    console.log("GETTING SHOW");
    tvName = encodeURI(show);
    $.ajax({
        type: 'GET',
        url: url + mode + show + key,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            console.dir(json);
            getUrl(json,noSeasons);
        },
        error: function(e) {
            console.log(e.message);
        }
    });
}
var foo;
function getUrl(stuff,noSeasons){
    foo = stuff.results[0];
    bg = base+"original"+foo.backdrop_path;
    console.log(bg);
    $('body').css('background-image', "url("+bg+")");
    $('.slug').text(foo.overview);
    $('.set-bg').text(foo.name);
        getSeasons(foo.id,noSeasons);
}

var seasons = [];
function getSeasons(id,season){
    if(season)
        var se = season;
    else
        var se = seasons.length+1;
    mode2 = 'tv/'+id+'/season/'+se+'?query=',
        $.ajax({
        type: 'GET',
        url: url + mode2 + key,
        async: false,
        jsonpCallback: 'testing',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json) {
            console.log("GOT SEASONS");
            console.dir(json);
            if(!season){
                seasons.push(json);
                addSeasons(seasons[seasons.length-1]);
                getSeasons(id)
            }else{
                addSeason(json);
            }
        },
        error: function(e) {
            //console.log(e.message);
            console.log(seasons)
        }
    });
}

function addSeasons(season){
    console.log(season.name);
    var hash = window.location.hash+"/"+season.season_number
    $('.seasons').append("<div class='season'><a href='"+hash+"'>"+season.name+"</a></div>")
}

function addSeason(season){
    var list = JSON.parse(checkList);
    //console.log(list);
    //console.log(season.name);
    $('.more').append("<div class='seasonInfo'><h3>"+season.name+"</h3><div class='episodes'></div></div>")
    var arr = [];
    var va = [];
    $.each(list, function(key,value){
        arr.push(parseInt(value.num));
        va.push(key);
        //return arr;
    });
    //console.log(arr);
    $.each(season.episodes, function(key,value){
        //console.log(key+1,arr);
        //console.log($.inArray(key+1,arr));
        if($.inArray(key+1,arr)!=-1){
            //console.log(key+1);
            console.log(va[$.inArray(key+1,arr)]);
            var date = list[va[$.inArray(key+1,arr)]].eDate;
            //console.log(date);
            var check = "checked";
        }else{
            var check = "";
            var date = "";
        }
        $('.episodes').append("<span number='"+(key+1)+"'><label><input type='checkbox' class='epList' name='"+((key+1))+"' "+check+">"+value.name+"</label><span class='date'>"+date+"</span><br/>")
    })
}

function cleanUp(){
    console.log("CLEANUP");
    if(clean==1){
        $('body').css('background-image', "url()");
        seasons.length = 0;
    }else{
        clean = 1;
    }
}
