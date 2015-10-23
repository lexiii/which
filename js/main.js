$(function(){
    hashList.push(window.location.hash.substring(1));
    //console.log(window.location.hash);
    if(!window.location.hash||window.location.hash=="#/"){
        window.location.hash="#/home";
    }
    crossroads.parse(window.location.hash.substring(1));
});

        //data: {
            //show    : '5',
            //season  : '1',
            //episode : '5',
            //action  : 'watch'
        //},
var season;
var show;
function watch(dat){
    $.ajax({
        type: 'POST',
        url: 'season.php',
        data: dat,
        success: function (data) {
            if(dat.action="list")
                checkList = data;
            console.log(data);
        }
    });

}
$('body').on('click','.epList', function(e){
    //console.log($(this).prop('checked'));
    var checked = ($(this).prop('checked')?"":"un")+"watch";
    watch({
        show    : show,
        season  : season,
        episode : $(this).attr('name'),
        action  : checked
    })
});
$('body').on('submit','form', function(e){
    frm = $(this);
    $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        success: function (data) {
            console.log(data);
            if(data!=0){
                window.location.hash=data;
            }
        }
    });
    return false;
})
var hashList = [];
var clean = 1;
$(window).on('hashchange', function(){
    crossroads.parse(window.location.hash.substring(1));
    hashList.push(window.location.hash.substring(1));
    cleanUp();
});

var route1 = crossroads.addRoute('/home', function(){
    $('#content').load('views/home.php').show();
});
var route2 = crossroads.addRoute('/new', function(){
    $('#content').load('views/new.php').show();
});

var route3 = crossroads.addRoute('/view/new', function(){
    $('#content').load('views/view.php?sort=new').show();
});

var route4 = crossroads.addRoute('/view/{id}', function(id){
    $('#content').load('views/view.php?id='+id,function(){
       getShow($(".set-bg").text());
    }).show();
});

var route5 = crossroads.addRoute('/view', function(){
    $('#content').load('views/view.php').show();
});

var route6 = crossroads.addRoute('/view/{id}/{id2}', function(id,id2){
    show = id;
    season = id2;
    prev = hashList[hashList.length-1]
    fromView =(hashList.length>1&&prev.slice(0,6)=="/view/"&&prev.length>6);
    console.log(fromView);
    if(!fromView){
        console.log("GETTING CONTENT ANYWAY");
        $('#content').load('views/view.php?id='+id,function(){
            getShow($(".set-bg").text(),id2);
            addSeasonData();
        }).show();
    }else{
        getShow($(".set-bg").text(),id2);
        $('.seasons').remove();
        addSeasonData();
    }
    function addSeasonData(){
        $('#back_btn').attr('href','#/view/'+id);
        console.log(id,id2);
        dat = watch({
            show    : id,
            season  : id2,
            action  : 'list'
        })
    }
});
