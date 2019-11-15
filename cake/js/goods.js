$(document).ready(function () {
    new GoodsAdd().init();
});


class GoodsAdd{
    constructor(){
        this.l_box3_3=$('.l_box3_3');
        this.l_box4=$('.l_box4');
    }

    init(){
        this.sjAdd();
    }
    //添加数据
    sjAdd(){
            var _this=this;
            if (!!decodeURIComponent(location.search.substr(1)).split("=")[1]) {
                var name = decodeURIComponent(location.search.substr(1)).split("=")[1];
        
            } else {
                var name = '';
        
            }
        //获取本地数据
            if(!!localStorage.getItem('Goods'+'='+name)){
                var  hqGoods = JSON.parse(localStorage.getItem('Goods'+'='+name));
                $.getJSON("sj.json",function(res){
                    var cartStr1="";
                    var cartStr2="";
                    $.each(res,function(i,gEle){
                        $.each(hqGoods, function (index, hqEle) { 
                            
                            if(gEle.lid==hqEle.GoodsId){
                                $.each(gEle.size,function(j,gszEle){
                            if(hqEle.size===gszEle){
                                             // console.log(gEle.Varieties);
                                if(gEle.Varieties==1){
                                    cartStr2 +=`<div class="l_box3_1">
                                    <span class="tp"><img src="${gEle.ltpx[0]}" alt=""></span>
                                    <span class="l_sp1">
                                        <span>${gEle.name}</span>
                                        <span>类型：${gszEle}</span>
                                    </span>
                                    <span class="l_sp2">${gEle.Price[j]}</span>
                                    <span class="l_sp3"><a class="jianhao"><img src="images/jiang.png" alt=""></a><input class="xs" type="text" value="${hqEle.count}"><a  class="jiahao"><img src="images/jia.png" alt=""></a></span>
                                    <span class="l_sp4 l_sp4_1">${ (Number(gEle.Price[j] * hqEle.count)).toFixed(2)}</span>
                                    <span class="l_sp5"><a>x</a></span>
                                    <span class="goodslid" lid="${gEle.lid}"></span>

                                </div>`;
                                }else{
                                    cartStr1 +=`<div class="l_box3_1">
                                    <span class="tp"><img src="${gEle.ltpx[0]}" alt=""></span>
                                    <span class="l_sp1">
                                        <span>${gEle.name}</span>
                                        <span>类型：${gszEle}</span>
                                    </span>
                                    <span class="l_sp2">${gEle.Price[j]}</span>
                                    <span class="l_sp3"><a class="jianhao"><img src="images/jiang.png" alt=""></a><input class="xs" type="text" value="${hqEle.count}"><a class="jiahao"><img src="images/jia.png" alt=""></a></span>
                                    <span class="l_sp4 l_sp4_2">${ (Number(gEle.Price[j] * hqEle.count)).toFixed(2)}</span>
                                    <span class="l_sp5"><a>x</a></span>
                                    <span class="goodslid" lid="${gEle.lid}"></span>

                                </div>`;
                                }
                                        }
                                });
                               
                            }
                        });
                    });

                    _this.l_box3_3.append(cartStr1);
                    _this.l_box4.append(cartStr2);
                    new ComputeCart().init();
                });
        
            }
            

    }


    

}


class  ComputeCart{
        constructor(){
            this.l_sp5=$('.l_sp5');
            this.l_zongjia=$('.l_zongjia');
            this.zj=$('.zj');
            this.jianhao=$('.jianhao');
            this.jiahao=$('.jiahao');
            this.xs=$('.xs');
            this.l_sp4=$(".l_sp4");
            this.l_box5_1=$('.l_box5_1');
            this.l_box3_1=$('.l_box3_1');
        };
        init(){
            this.l_sp5click();
            this.l_zongjiaShow();
            this. jianhaoClick();
            this.jiahaoClick();
            this.l_box5_1Click();
        };

        //点击删除
        l_sp5click(){
            var _this=this;
            if (!!decodeURIComponent(location.search.substr(1)).split("=")[1]) {
                var name = decodeURIComponent(location.search.substr(1)).split("=")[1];
        
            } else {
                var name = '';
        
            }
            this.l_sp5.on("click",function(){
                var lid= $(this).parent().find('.goodslid').attr('lid');
              
                var  hqGoods = JSON.parse(localStorage.getItem('Goods'+'='+name));
              
                $.each(hqGoods, function (index, hqEle) { 
                    if(lid  == hqEle.GoodsId){
                       
                        hqGoods.splice(index,1);
                        return false;
                    }

                });
                // console.log( hqGoods);
                $(this).parent().remove();
                 localStorage.setItem('Goods'+'='+name, JSON.stringify(hqGoods));
                 _this. l_zongjiaShow();
            });
        }



        //显示总价
        l_zongjiaShow(){

            //获取所有的价格
          
          var arr=  $('.l_sp4');
          var zj=0;
        //   var zj2=0;

            

            $.each(arr,function(index,ele){
                zj+=Number($(ele).html());
            });
            // $.each(arr2,function(j,elej){
            //     zj2+=Number($(elej).html()).toFixed(2);
               

            // });
            // console.log(zj2)
            this.l_zongjia.html((zj).toFixed(2));
            this.zj.html((zj).toFixed(2));
        }

        //点击减号
        jianhaoClick() {
            var _this=this;
            if (!!decodeURIComponent(location.search.substr(1)).split("=")[1]) {
                var name = decodeURIComponent(location.search.substr(1)).split("=")[1];
        
            } else {
                var name = '';
        
            }
            this.jianhao.click(function () {
                console.log(1)
                var subth = Number($(this).parent().parent().find(".xs").val());
                if (subth > 0) {
                    subth--;
                } else {
                    subth = 0;
                    $(this).prop("disabled", true);
                }
    
                $(this).parent().parent().find(".xs").val(subth);
    
                var bid = $(this).parent().parent().find(".goodslid").attr('lid');
                var hqGoods = JSON.parse(localStorage.getItem('Goods'+"="+name));
                for (var i = 0; i < hqGoods.length; i++) {//遍历数组那到其中的id
                    // console.log(hqGoods[i].GoodsId)
                    if (hqGoods[i].GoodsId == bid) {//执行这里说明是已有的商品
                        //执行这里让count++
                        hqGoods[i].count = subth;
                        break;
                    }
                }
               
                $(this).parent().parent().find(".l_sp4").html((subth * Number($(this).parent().parent().find(".l_sp2").html())).toFixed(2));
              
                localStorage.setItem("Goods"+"="+name, JSON.stringify(hqGoods));
                _this.l_zongjiaShow();
            });
        }


         //加号点击
    jiahaoClick() {
        var _this=this;
        if (!!decodeURIComponent(location.search.substr(1)).split("=")[1]) {
            var name = decodeURIComponent(location.search.substr(1)).split("=")[1];
    
        } else {
            var name = '';
    
        }
        this.jiahao.click(function () {
            console.log(2)
            var subth = Number($(this).parent().parent().find(".xs").val());
            subth++;
            $(this).parent().parent().find(".xs").val(subth);

            var bid = $(this).parent().parent().find(".goodslid").attr('lid');
            var hqGoods = JSON.parse(localStorage.getItem('Goods'+"="+name));
            for (var i = 0; i < hqGoods.length; i++) {//遍历数组那到其中的id
                // console.log(hqGoods[i].GoodsId)
                if (hqGoods[i].GoodsId == bid) {//执行这里说明是已有的商品
                    //执行这里让count++
                    hqGoods[i].count = subth;
                    break;
                }
            }
            $(this).parent().parent().find(".l_sp4").html((subth * Number($(this).parent().parent().find(".l_sp2").html())).toFixed(2));
             localStorage.setItem("Goods"+"="+name, JSON.stringify(hqGoods));
             _this.l_zongjiaShow();
        });
    }
    //全部删除
    l_box5_1Click(){
        var _this=this;
        if (!!decodeURIComponent(location.search.substr(1)).split("=")[1]) {
            var name = decodeURIComponent(location.search.substr(1)).split("=")[1];
    
        } else {
            var name = '';
    
        }
        this.l_box5_1.click(function(){
            _this.l_box3_1.remove();
            _this.l_zongjia.html(0+".00");
            _this.zj.html(0+'.00');
            localStorage.clear("Goods"+"="+name);
        });

    }
}