$(document).ready(function () {
    

    function offset(obj){
        var l = 0;
        var t = 0;
        var bdl = obj.clientLeft;//目标元素的左边框宽度
        var bdt = obj.clientTop;//目标元素的上边框宽度
        while(obj){//循环累加目标元素到定位父级的距离
            l = l + obj.offsetLeft+obj.clientLeft;
            t = t + obj.offsetTop+obj.clientTop;
            obj = obj.offsetParent;//每次循环之后指向离他最近的定位父级
        }
        return {left:l-bdl,top:t-bdt};
    }
    var imgs = document.querySelectorAll('.con img');
    
    function loadImg(){
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        var windowH = document.documentElement.clientHeight || document.body.clientHeight;
    
        for (var i = 0, len = imgs.length; i < len; i++){
            if ( offset(imgs[i]).top <= (scrollT + windowH + 100) ) {//图片进入可视区
                imgs[i].src = imgs[i].getAttribute('data-src');//设置图片src
            }
        }
    }
    loadImg();
    
    window.onscroll = function (){
        loadImg();
    }





});