/**
 * Created by zhousg on 2016/3/17.
 */
window.onload = function(){
    /*左侧滑动*/
    leftSwipe();
    /*右侧滑动*/
    swipeRight();
};
/*左侧滑动*/
function leftSwipe(event){
    /*
     * 1.要求垂直方向的滑动
     * 2.当滑动到一定的距离滑动不了
     * 3.当滑动的位子超过了 最小和最大允许的定位范围的时候  吸附回去
     * 4.点击li的时候改变当前的元素的样式
     * 5.并且需要滑动到屏幕的顶部位子
     * 6.当底部触底的时候滑动不了
     * */

    /*获取父盒子*/
    var parentDom = document.querySelector('.jd_category_left');
    /*获取子盒子*/
    var childDom = parentDom.querySelector('ul');

    /*父盒子的高度*/
    var parentH = parentDom.offsetHeight;
    /*字盒子的高度*/
    var childH = childDom.offsetHeight;


    /*获取定位的区间*/
    var minPosition = parentH-childH;
    var maxPosition = 0;

    /*吸附的距离*/
    var distance = 100;
    /*获取滑动的时候定位区间*/
    var minSwipe = minPosition - distance;
    var maxSwipe = maxPosition + distance;

    /*贯穿程序的  当前定位*/
    var currY = 0;

    var startY = 0;/*开始Y坐标*/
    var moveY = 0;/*滑动Y的坐标*/
    var distanceY = 0;/*改变的距离*/

    /*加过渡*/
    var addTransition = function(){
        childDom.style.webkitTransition = 'all 0.2s';/*兼容*/
        childDom.style.transition = 'all 0.2s';
    };
    /*删除过渡*/
    var removeTransition = function(){
        childDom.style.webkitTransition = 'none';/*兼容*/
        childDom.style.transition = 'none';
    };
    /*定位*/
    /*当前的定位*/
    var setTranslateY = function(y){
        childDom.style.webkitTransform = 'translateY('+y+'px)';/*兼容*/
        childDom.style.transform = 'translateY('+y+'px)';
    };

    childDom.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
        e.preventDefault();

    });
    childDom.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;/*改变的距离*/

        removeTransition();

        /*
         * 我们使用将要定位的位子来做判断
         * 当现在要定位的位子在  最大和最小滑动区间内  才允许滑动
         * */
        if((currY+distanceY) > minSwipe && (currY+distanceY) < maxSwipe){
            setTranslateY(currY+distanceY);
        }

    });
    window.addEventListener('touchend',function(e){
        /*最终定位*/
        /*大于最大定位的时候*/
        if((currY+distanceY) > maxPosition){
            currY = maxPosition;
            addTransition();
            setTranslateY(currY);
        }

        /*小于最小定位的时候*/
        else if((currY+distanceY) < minPosition){
            currY = minPosition;
            addTransition();
            setTranslateY(currY);
        }else{
            /*记录当前的定位*/
            currY = currY +distanceY;
        }

        /*重置参数*/
        startY = 0;
        moveY = 0;
        distanceY = 0;
    });

    /*取到所有的里*/
    var lis = childDom.querySelectorAll('li');
    /*点击*/
    itcast.tap(childDom,function(e){
        /*这个时候的事件源 a*/
        /*当前点击的li  通过事件源的父元素*/
        var li = e.target.parentNode;
        /*遍历*/
        for(var i = 0 ; i < lis.length ; i ++){
            lis[i].className = " ";
            lis[i].index = i;
        }
        li.className = "now";
        /*索引*/
        //console.log(li.index);
        /*计算将要定位的位置*/
        var translateY = -li.index*50;

        /*当我们的定位在定位区间内  才允许滑动*/
        if(translateY > minPosition){
            /*设置当前的位置*/
            currY = translateY;
            /*加过渡*/
            addTransition();
            /*改变位置*/
            setTranslateY(currY);
        }else{
            /*保持最小的定位*/
            /*设置当前的位置*/
            currY = minPosition;
            /*改变位置*/
            setTranslateY(currY);
        }



    });

}

/*右侧滑动*/
function swipeRight(){
    /*调用滑动方法*/
    itcast.iScroll({
        swipeDom:document.querySelector('.jd_category_right'),
        swipeType:'y',
        swipeDistance:50
    });
}

$(function(){
    touch.on($(document),'drag',function(event){
        if(event.direction == 'up'){
            $('.entry').stop().animate({
                'bottom':'-44px'
            })
        }
        if(event.direction == 'down'){
            $('.entry').stop().animate({
                'bottom':'0'
            })
        }
    });

    //处理特殊图片
    var aWidth = $('.shoping > ul > li > a').width(),
        aImgs = $('.shoping > ul > li > a > img');
    aImgs.each(function(i,v){
        v.style.height = aWidth + 'px';
    })
})