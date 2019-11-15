$(document).ready(function () {
    new  Details().init();
});

 class  Details{
    constructor(){
        this.l_imgx=$('.l_imgx');
    }

    init(){
        this.addData();
        // this.imgxAdd();
        // this.textAdd();
        // this. imgdAdd();
    }

    //动态添加数据
    addData(){
        var _this=this;
        //先获取url的id
        var lid=decodeURIComponent(location.search.substr(1)).split("&")[0].split("=")[1];
        //通过lid去获取数据
        console.log(lid)
       
        $.getJSON("sj.json",function (res) {
                //在这里对拿到的数据进行操作
            //在小照片区添加照片
            // console.log(res);
            _this.imgxAdd(res,lid);
            _this.textAdd(res,lid);
            _this.imgdAdd(res,lid);
            _this.goodsclick();
            });
        
    }
    //小照片添加照片
    imgxAdd(data,lid){
        var  str='';
        
        $.each(data,function(index,ele){
            if(lid==ele.lid){
                //ele.ltpx获取到小照片的数组
               
                $('.l_imgd img').attr('src',ele.ltpx[0]);
                $.each(ele.ltpx,function(i,elex){
                    str +=`<li><img src="${ele.ltpx[i]}" alt=""></li>`;

                })
            }
        });

        $('.l_imgx ul').html(str);
       

        $('.l_imgx ul li img').hover(function () {
                // over
                //获取当前li的url
              
                $('.l_imgd img').attr('src',$(this).attr('src') );
                $(this).parent().siblings().css('border','none');
                $(this).parent().css('border','1px solid #666666');
            }, function () {
                // out
            }
        );
    }

    //文字区添加
    textAdd(data,lid){
        var  strt='';
        var  strt2='';
        var  _this=this;
        $.getJSON("size.json",function (arr){
            $.each(arr,function(i,elei){
                
                if(lid==elei.lid){
                    // console.log(elei.size)
                    $.each(elei.size,function(j,elej){
                       
                        strt2 +=` <li class="l_cc_li" index="${elei.Price[j]}">${elei.size[j]}</li>`;
                    });
                    strt2 +=`<span class="size" cc="${elei.size[0]}"></span>`
                }
            });
            $('.l_cc').html(strt2);
        });
        $.each(data,function(index,ele){
            if(lid==ele.lid){
                    strt +=`<div class="clearfix l_wz1_1">
                    <h4>${ele.name}<i class="l_icon_sx"></i></h4>
                    <span bid="${ele.lid}" class="bid"></span>
                    <span class="l_jq">${ele.Price[0]}</span>
                     </div>
                    <span class="l_sp2">${ele.kind}</span>
                    <p class="l_p1">${ele.category}</p>
                    <p class="l_p2">——  Living a better life  ——</p>`;
                
               
               

            }
        });
      
        $('.l_wz1').html(strt);
        $('.l_cc').on('click','li',function(){

            
            $('.l_jq').html( $(this).attr('index'))
            $(this).siblings().css('border','none');
            $(this).css('border','1px solid #666666');
            $('.size').attr('cc',$(this).html());
            // _this.goodsclick();
        });
    }
    //大图添加
    imgdAdd(data,lid){
        var  str3='';
        
        $.each(data,function(index,ele){
            if(lid==ele.lid){
                //ele.ltpx获取到小照片的数组
                
                $.each(ele.ltpd,function(i,elex){
                    str3 +=`<li><img src="${ele.ltpd[i]}" alt=""></li>`;

                })
            }
        });
        $('.l_box2_1').html(str3);
    }

    //点击购物车按钮
    goodsclick(){
        if(!!decodeURIComponent(location.search.substr(1)).split("&")[1].split("=")[1]){
            var name=decodeURIComponent(location.search.substr(1)).split("&")[1].split("=")[1];

        }else{
            var name='';
  
        }
        // console.log(name)
        var  goodsbid=$('.bid').attr('bid');
            // console.log(goodsbid);
           
        var goods='Goods'+'='+name;
        //点击弹出提示层
        $('.l_add1').click(function(){
            $('.l_tk').show();
            setTimeout(function(){
                $('.l_tk').hide();
            },1000);
        });
      var  size='';
        //点击保存数据
        $('.l_add1').click(function () {
             size = $('.size').attr('cc');
            var atk = [{ 'GoodsId': goodsbid, 'count': 1,'size':size}];
            console.log(size);
            //需要保存的数据有bid $('.bid').attr('bid')
            //数量 count  在点击的时候去加减
            //尺寸 size    $('.size').attr('cc');
            //用户名 name  var name=decodeURIComponent(location.search.substr(1)).split("&")[1].split("=")[1];
            //在本地保存中保存数据
            if (!!localStorage.getItem('Goods'+'='+name)){//有数据执行这里
                var hqGoods = JSON.parse(localStorage.getItem('Goods'+'='+name));
                // console.log(hqGoods);
                var flag = false;
                for (var i = 0; i < hqGoods.length; i++){
                   
                    if(hqGoods[i].GoodsId==goodsbid){
                       if(hqGoods[i].size===size){
                        console.log(1)
                        hqGoods[i].count++;
                        flag = true;//表示bid已经存在
                        break;
                         
                       }

                      
                    
                }
            }
            if(!flag){
                hqGoods.push({ 'GoodsId': goodsbid, 'count': 1,'size':size});
            }
            localStorage.setItem(goods,JSON.stringify(hqGoods))
            }else{//没数据执行这里
                localStorage.setItem(goods, JSON.stringify(atk));
            }
          
         });

    }

}