var app = getApp();

function http(url, obj, str, moviceTitle, isRefresh) {
	wx.request({
		url: app.globalData.douBanUrl + url,
		method: 'GET',
		dataType: 'json',
		header: {
			"Content-Type": "json"
		},
		success: function (msg) {
			// console.log(msg);
			getMovices(msg, str, moviceTitle, obj, isRefresh);
		}, fail: function () {
			console.log("无法获取数据");
		}
	})
}


/**
 * 对获取的数据进行处理
 */
function getMovices(msg, str, moviceTitle, obj, isRefresh) {
	var movices = [];
	//筛选数据
	for (var index in msg.data.subjects) {
		var temp = {
			id: msg.data.subjects[index].id,
			title: msg.data.subjects[index].title.substring(0, 8),
			image: msg.data.subjects[index].images.large,
			rating: msg.data.subjects[index].rating.average,
			star: msg.data.subjects[index].rating.stars,
			starArr: toStarArray(msg.data.subjects[index].rating.stars)
		}
		movices.push(temp);
	}
	//绑定数据
	var readyData = {};
	readyData[str] = {
		moviceTitle: moviceTitle,
		movices: movices
	}
	//前数据和后数据进行合并
	if (isRefresh) {
		var moreMovice = obj.data.moreMovice.movices;
		readyData[str].movices = moreMovice.concat(readyData[str].movices);

	}
	//为其绑定数据
	obj.setData(readyData);
}
/**
 * 判断评分
 */
function toStarArray(star) {
	var star = parseInt(star / 10);
	var arr = [];
	for (var i = 1; i <= 5; i++) {
		if (i <= star) {
			arr.push(1);
		} else {
			arr.push(0)
		}
	}
	return arr;
}

module.exports = {
	http: http,
	toStarArray: toStarArray
}
