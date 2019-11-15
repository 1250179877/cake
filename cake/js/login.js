$(function(){
			new Login().init();
		})
		class Login{
			constructor() {
				this.loginBtn = $("#helloBtn");
				this.mask_layer = $("#mask_layer");
				this.loginWarp = $("#loginWarp");
				this.close = $("#close");
				this.li = $("#btn1 li");
			}
			init(){
				this.loginShow();
				this.winResize();
				this.closeClick();
			}
			loginShow(){
				var _this = this;
				this.loginBtn.click(function(){
					_this.mask_layer.show();
					_this.loginWarp.show();
					_this.mask_layerShow();
					_this.liShow();
				})
			}
			mask_layerShow(){
				this.mask_layer.width($(window).width()).height($(window).height());
				this.loginWarp.css({
					left:function(){
						return ($(window).width()-$(this).width())/2;
					},
					top:function(){
						return ($(window).height()-$(this).height())/2;
					}
				})
			}
			liShow(){
				var _this = this;
				this.li.click(function(){
					$(this).addClass("active"+$(this).index()).siblings().removeClass();
					$("#show li").eq($(this).index()).show().siblings().hide();
				})
			}
			winResize(){
				var _this = this;
				$(window).resize(function(){
					_this.mask_layerShow();
				});
			}
			loginWarpHide(){
				this.mask_layer.hide();
				this.loginWarp.hide();
			}
			closeClick(){
				var _this = this;
				this.close.click(function(){
					_this.loginWarpHide();
				});
			}
		}