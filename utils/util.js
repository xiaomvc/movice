var app = getApp();

/**
 * 获取电影的请求
 */
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
			if (msg.data.total == 0) {
				wx.showToast({
					title: '没有该数据',
				})

				return false;
			}
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
			title: msg.data.subjects[index].title.substring(0, 7),
			image: msg.data.subjects[index].images.large,
			average: msg.data.subjects[index].rating.average,
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
	console.log(readyData),
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

/**
 * 跳转到详细子页面
 */
function toDetail(url) {
	wx.navigateTo({
		url: url,
	})
}
/**
 * 获取电影详细信息
 */
function getMoviceData(id, obj) {
	wx.request({
		url: app.globalData.douBanUrl + "/v2/movie/subject/" + id,
		dataType: 'json',
		header: {
			"Content-Type": 'json'
		},
		success: function (msg) {
			// console.log(msg);

			var casts = '';//影人名称信息
			for (var ind in msg.data.casts) {
				casts += msg.data.casts[ind].name + "/";
			}
			var genres = '';//类型信息
			for (var ind in msg.data.genres) {
				genres += msg.data.genres[ind] + " 、"
			}

			var data = {
				title: msg.data.title,//标题
				countrices: msg.data.countries + "." + msg.data.year,//地区和年份
				ratings_count: msg.data.ratings_count,//喜欢人数
				reviews_count: msg.data.reviews_count,//评论人数
				image: msg.data.images.large,//海报
				average: msg.data.rating.average,//得分
				starArr: toStarArray(msg.data.rating.stars),//评分
				nameArr: msg.data.directors,//导演
				castsName: casts.substring(0, casts.length - 1),//影人名称信息
				castsArr: msg.data.casts,//影人图片信息
				genresArr: genres.substring(0, genres.length - 1),//电影类型
				summary: msg.data.summary,//简介
			};

			obj.setData({
				detailData: data
			})
		}
	})
}
function getMusicHttp(url, obj) {
	wx.request({
		url: app.globalData.douBanUrl + url,
		dataType: 'json',
		header: {
			"Content-Type": "json"
		},
		success: function (msg) {
			console.log(msg);
		}
	})
}

/**
 * 传递出去
 */
module.exports = {
	http: http,
	toStarArray: toStarArray,
	toDetail: toDetail,
	getMoviceData: getMoviceData,
	getMusicHttp: getMusicHttp
}
