$(function(){
    imgNum_source = $('.item-sm').length;
//    console.log(imgNum_source);
    var appendContent = $('.pic-box-sm').html();
//    console.log(appendContent);
    $('.pic-box-sm').append(appendContent).append(appendContent);
//    console.log($('.pic-box-sm').html());
    imgNum = $('.item-sm').length;//复制当前所有图片并在页面前后全部插入
//    console.log(imgNum_source*imgWid);
    $('.pic-box-sm').css('left',-imgNum_source*imgWid);
//    console.log(imgNum);
    
    img_container_width = Math.floor(imgWid*imgNum);//包裹所有图片的容器宽度
    windowWidth = $('.carousel-container-sm').width();//获取轮播图可视区域宽度
//    console.log(windowWidth);
    $('.pic-box-sm').css('width',img_container_width);//设置包裹所有图片的容器宽度  
    imgContainerNum = Math.floor(imgWid*imgNum/windowWidth);//计算当前轮播图总共有几屏画面
//    console.log(imgContainerNum);
    
    $('.dot-box').css({'position':'absolute','bottom':'10px'});//设置位置提示小圆点的位置
    
    var dotContent = '';
    var n = Math.ceil(windowWidth/imgWid)-1;
    for(var i=0;i<(imgNum/3);i++){
       dotContent += '<span class="point"></span>';
    }
//    console.log(dotContent);
    $('.dot-box').append(dotContent);//根据需要插入所需数量的小圆点
    $('.dot-box .point:eq(0)').addClass('active');//圆点样式初始化
    
    carousel.slide();
    carousel.play();
})

var imgWid = $('.item-sm').width();//轮播图图片宽度
//console.log(imgWid);
var imgNum_source;//轮播图html页面图片数量
var imgNum;//轮播图js处理后所有图片数量
//console.log(imgNum);
var img_container_width;
var imgContainerNum;
var windowWidth;

var carousel = new Object();
var touchStart;//开始滑动时手指位置
var touchEnd;//结束滑动时手指位置
var moveX;//滑动的X方向位移
var offsetLeft;//当前放置所有图片的盒子左边距包裹层距离
var Num;//当前显示图片或小圆点的序列
var timer;


carousel.slide = function(){
    $(document).on('touchstart','.pic-box-sm',function(e){
//        console.log('movestart!');
        clearInterval(timer);
        touchStart = e.originalEvent.changedTouches[0].pageX;
    })
    
    $(document).on('touchend','.pic-box-sm',function(e){
//        console.log('moveend!');
        touchEnd = e.originalEvent.changedTouches[0].pageX;
        moveX = touchEnd -touchStart ;
        offsetLeft = parseInt($(this).css('left'));
        
        if(!$(this).is(':animated')){
            if(moveX < 0){
//            alert('向左滑动！');
//            alert($(this).css('left'));
                carousel.move(1);
            }else if(moveX > 0){
                carousel.move(2);
            }
        }
        carousel.play();
    })
}

//1--向左滑动
//2--向右滑动
carousel.move = function(direc){
    if(direc==1){
        Num = -Math.floor(offsetLeft/imgWid)+1-imgNum_source;
//        console.log(img_container_width/2-imgWid);
        var Left = offsetLeft-imgWid+'px';
        if( -offsetLeft < Math.floor((imgNum_source*2-1)*imgWid)-2){
//            console.log(-offsetLeft)            
            $('.pic-box-sm').stop().animate({left:Left});
        }else{
            $('.pic-box-sm').stop().animate({left:Left},function(){
                $('.pic-box-sm').css('left',0);
            });
            Num = 0;
        }  
    }else if(direc==2){
        Num = -Math.floor(offsetLeft/imgWid)-1-imgNum_source;
//        console.log(Num);
        var Left1 = offsetLeft+imgWid+'px';
        var Left2 = -(Math.floor((imgNum_source*2-1)*imgWid)-2);
        if(offsetLeft >=0 ){
            $('.pic-box-sm').stop().animate({left:Left1},function(){
                $('.pic-box-sm').css('left',Left2);
            });
            Num = $('.point').length-1;
        }else{
            $('.pic-box-sm').stop().animate({left:Left1});
        }
    }
    $('.point').removeClass('active');
    $('.point').eq(Num).addClass('active');
}

carousel.play = function(){
    timer = setInterval(function(){
        offsetLeft = parseInt($('.pic-box-sm').css('left'));
        carousel.move(1);
    },2000);
}