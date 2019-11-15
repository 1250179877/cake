//页面加载是获取所有数据---datajson
var datas;
$(document).ready(() => {
	$.ajax({
		url: 'data/dataJson.json',
		type: 'get',
		success: (res) => {
			datas = res
			$.each(datas, function (index, ele) {
				// console.log(index);
				render(ele)
			});
			//取消前五个数据的懒加载
			cancleImgLoad(5)
		}
	})
	lodData();
	go();
})


function go() {
	function offset(obj) {
		var l = 0;
		var t = 0;
		var bdl = obj.clientLeft;//目标元素的左边框宽度
		var bdt = obj.clientTop;//目标元素的上边框宽度
		while (obj) {//循环累加目标元素到定位父级的距离
			l = l + obj.offsetLeft + obj.clientLeft;
			t = t + obj.offsetTop + obj.clientTop;
			obj = obj.offsetParent;//每次循环之后指向离他最近的定位父级
		}
		return { left: l - bdl, top: t - bdt };
	}

	var imgs = document.querySelectorAll('.goods_pic img');
	//console.log(imgs);

	function load() {
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		var windowH = document.documentElement.clientHeight || document.body.clientHeight;
		let imgs = $('.goods_pic img');
		for (let i = 0, len = imgs.length; i < len; i++) {
			if (offset(imgs[i]).top <= (scrollT + windowH)) {
				imgs[i].src = imgs[i].getAttribute('data-src');
			}
		}
	}
	load();

	window.onscroll = function () {
		load();
	}

};


//渲染函数
var render = (ele) => {
	let str;
	console.log(ele);
	
	if (ele.aid == "ad") {
		str = `<li id="ad"></li>`;
	} else {
		str = `
		<li>
			<div class="goods_pic">
				<a href="details.html?lid=${ele.aid}&name=${name}" id=${ele.aid}>
					<img data-src='./${ele.asrc}' id='listImg'>
				</a>
			</div>
			<div class="goods_name">
				<em>${ele.atitle}</em>
				<i class="icon_sx"></i>
				<br>
				<span class="text-tag">${ele.afeature}</span>
			</div>
			<div class="goods_price">
				<div class="price"><em>${ele.aprice}</em>/个</div>
				<a href="details.html?lid=${ele.aid}&name=${name}" class="buy-cart">加入购物车 ></a>
			</div>
		</li>
		`;
	}
	$(".lists_div ul").append(str);
}

let cancleImgLoad = (index) => {
	//取消前五个数据的懒加载
	let imgs = $('.goods_pic img');
	for (let i = 0; i < index; i++) {
		$($(imgs[i])[0]).attr('src', $($(imgs[i])[0]).attr('data-src'));
	}
}

function lodData() {

	var oFis = document.querySelectorAll(".filter");
	//console.log(oFis);
	var oLis = document.querySelectorAll(".lists_div ul li");
	//console.log(oLis);
	// var oText = $(".filter").text();// 获取文本

	var oText = '';

	$(oFis).on("click", function () {
		oText = $(this).text();// 获取点击的值
		$(".lists_div ul li").remove();
		console.log(oText);
		
		//从所有数据中筛选有用的值
		let data = [];//获取有用数据

		for (let x in datas) {
			//if (datas[x].afeature && datas[x].afeature.indexOf(oText) >= 0) {
			if (datas[x].afeature === oText) {
				data.push(datas[x]);
			}
		}
		//ele.afeature === oText
		console.log(data);
		
		if (data.length === 0) {
			$(".lists_div ul").append('<li><p>暂无该产品</p></li>');
			// .text('暂无该产品 ').css({ "text-align": "center" });

		} else {
			for (let x in data) {
				//把有用的值进行渲染
				render(data[x]);
			}
			//取消前五个数据的懒加载
			cancleImgLoad(5);
		}

	});
	$('.filter1').click(() => {
		$(".lists_div ul li").remove();
		for(let x in datas){
			console.log(datas[x]);
			render(datas[x])
		}
		// 取消前五个数据的懒加载
		cancleImgLoad(5)
	})
}






