$(function(){
    img_container_width = Math.floor(imgWid*imgNum);//包裹所有图片的容器宽度    
    $('.pic-box').css("width",img_container_width);//设置包裹所有图片的容器宽度  
    
    $('.dot-box').css({'position':'absolute','bottom':'10px'});//设置位置提示小圆点的位置
    
    var dotContent = '';
    for(var i=0;i<imgNum;i++){
       dotContent += '<span class="point"></span>';
    }
//    console.log(dotContent);
    $('.dot-box').append(dotContent);//根据需要插入所需数量的小圆点
    $('.dot-box .point:eq(0)').addClass('active');//圆点样式初始化
    
    carousel.slide();
    carousel.play();
})

var imgWid = $('.item').width();//获取每一张图片的宽度
//console.log(imgWid);
var imgNum = $('.item').length;//获取图片的数量
//console.log(imgNum);
var img_container_width;

var carousel = new Object();
var touchStart;//开始滑动时手指位置
var touchEnd;//结束滑动时手指位置
var moveX;//滑动的X方向位移
var offsetLeft;//当前放置所有图片的盒子左边距包裹层距离
var Num;//当前显示图片或小圆点的序列
var timer;


carousel.slide = function(){
    $(document).on('touchstart','.pic-box',function(e){
//        console.log('movestart!');
        clearInterval(timer);
        touchStart = e.originalEvent.changedTouches[0].pageX;
    })
    
    $(document).on('touchend','.pic-box',function(e){
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
        if(-offsetLeft < Math.floor((imgNum-1)*imgWid) ){
            var Left = offsetLeft-imgWid+'px';
            $('.pic-box').stop().animate({left:Left})
        }else{
            $('.pic-box').stop().animate({left:0})
            Num = 0;
        }  
    }else if(direc==2){
        Num = -Math.floor(offsetLeft/imgWid)-1;
        if(offsetLeft >= 0 ){
            var Left = -Math.floor((imgNum-1)*imgWid);
            $('.pic-box').stop().animate({left:Left});
            Num = $('.point').length-1;
        }else{
            var Left = offsetLeft+imgWid+'px';
            $('.pic-box').stop().animate({left:Left})
        }
    }
    $('.point').removeClass('active');
    $('.point').eq(Num).addClass('active');
}

carousel.play = function(){
    timer = setInterval(function(){
        offsetLeft = parseInt($('.pic-box').css('left'));
        carousel.move(1);
    },2000);
}




