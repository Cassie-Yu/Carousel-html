$(function(){
    img_container_width = Math.floor(imgWid*imgNum);//包裹所有图片的容器宽度
    windowWidth = $('.carousel-container-sm').width();//获取轮播图可视区域宽度
//    console.log(windowWidth);
    $('.pic-box-sm').css('width',img_container_width);//设置包裹所有图片的容器宽度  
    imgContainerNum = Math.floor(imgWid*imgNum/windowWidth);//计算当前轮播图总共有几屏画面
//    console.log(imgContainerNum);
    
    $('.dot-box').css({'position':'absolute','bottom':'10px'});//设置位置提示小圆点的位置
    
    var dotContent = '';
    var n = Math.ceil(windowWidth/imgWid)-1;
    for(var i=0;i<imgNum-n;i++){
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
var imgNum = $('.item-sm').length;//轮播图所有图片数量
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
        Num = -Math.floor(offsetLeft/imgWid)+1;
//        console.log((img_container_width-windowWidth));
        if( -offsetLeft < Math.floor(img_container_width-windowWidth)-2){
//            console.log(-offsetLeft)
            var Left = offsetLeft-imgWid+'px';
            $('.pic-box-sm').stop().animate({left:Left});
        }else{
            $('.pic-box-sm').stop().animate({left:0})
            Num = 0;
        }  
    }else if(direc==2){
        Num = -Math.floor(offsetLeft/imgWid)-1;
//        console.log(Num);
        if(offsetLeft >=0 ){
            var Left = -(Math.floor(img_container_width-windowWidth)-2);
            $('.pic-box-sm').stop().animate({left:Left});
            Num = $('.point').length-1;
        }else{
            var Left = offsetLeft+imgWid+'px';
            $('.pic-box-sm').stop().animate({left:Left})
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