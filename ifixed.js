window.addEventListener("load", function () {
	//現在の表示高さ
	var viewHeight = window.innerHeight;
	//コンテンツ全体の高さ
	var contentsHeight = Math.max.apply(
		null,
		[document.body.clientHeight,
		document.body.scrollHeight,
		document.documentElement.scrollHeight,
		document.documentElement.clientHeight]
	);
	//バナー
	var banner =  document.getElementById("fixed");
	var bannerHeight = banner.style.height.replace('px','');
	
	//初期位置を設定
	var bannerTop = defaultTop =  viewHeight - bannerHeight;
	banner.style.top = bannerTop.toString() + 'px';
	
	var scrollY = 0;
	
	// ページスクロール量を取得する
	window.onscroll = function () {
		scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		
		bannerTop = scrollY - bannerHeight + viewHeight + 120;
		// 取得した値を画面に表示する
		if(scrollY === 0){
			banner.style.top = defaultTop.toString() + 'px';
		}else if(bannerTop <= contentsHeight - bannerHeight){
			banner.style.top = bannerTop.toString() + 'px';
			console.log('contents = ' + contentsHeight + ' / scrollY = ' + scrollY + ' / top = ' + bannerTop);
		}
		//バナーを表示
		banner.style.display = 'block';
	}
	
	//Windowリサイズ時に再計算
	window.onresize = function (e) {
		viewHeight = window.innerHeight;
		bannerTop = scrollY - bannerHeight + viewHeight;
		banner.style.top = bannerTop.toString() + 'px';
	}
	
	document.addEventListener("touchstart", function(){
		//バナー自身以外をタッチした場合は非表示
		if(event.touches[0].pageY < bannerTop){
			banner.style.display = 'none';
		}
	});
});