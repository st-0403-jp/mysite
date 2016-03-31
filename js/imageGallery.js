/*****
イメージギャラリー
common.imageGallery.js
*****/

common.imageGalleryFade = (function (className, stopFlg) {

	var method = {};

	method.start = function (className, stopFlg) {
		var targetP = $(className);

		var target = targetP.find("li");

		var foreach = function (target, switchFlg) {
			//swithFlgで機能がかわる
			var flg = switchFlg || false;
			Array.prototype.forEach.call(target, function(ele, index, array){
				if (flg === "block1") {
					if (index !== 0) {
						$(ele).hide();
					}
				}else if (flg === "allHide") {
					$(ele).hide();
				}else{
					//なにもしない
					console.count("false");
				}
			});
		}
		//初期状態
		foreach(target, "block1");

		var count = 0;
		var galleryStart = setInterval(function(){
			foreach(target, "allHide");
			count++;
			console.log(count);
			$(target[count]).fadeIn(2000);
			if (target.length === count) {
				count = 0;
				$(target[count]).fadeIn(2000);
				console.count("roop");
				//1roop or infinity
				if (stopFlg === true) {
					clearInterval(galleryStart);
				}
			}
		}, 5000);
	}
	
	return method;
})();

/*メモ
最初の要素が表示
↓
次の要素がblockする && 今の要素がnoneする（全部noneにすれば良い）
↓
繰り返し
*/
