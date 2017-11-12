var util = require("../../utils/util.js");
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
	data: {
		theaters: {},
		comingMV: {},
		top250: {}
	},


    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {

		util.http("/v2/movie/in_theaters?count=3", this, "theaters", "正在热映");
		util.http("/v2/movie/coming_soon?count=3", this, "comingMV", "即将上映");
		util.http("/v2/movie/top250?count=3", this, "top250", "口碑榜");
	},
    /**
     * 对获取的数据进行处理
     */
	callback: function (msg, str, moviceTitle) {
		var movices = [];
		//筛选数据
		for (var index in msg.data.subjects) {
			var temp = {
				id: msg.data.subjects[index].id,
				title: msg.data.subjects[index].title,
				image: msg.data.subjects[index].images.large,
				rating: msg.data.subjects[index].rating.average,
				star: msg.data.subjects[index].rating.stars,
				starArr: util.toStarArray(msg.data.subjects[index].rating.stars)
			}
			movices.push(temp);
		}
		//绑定数据
		var readyData = {};
		readyData[str] = {
			moviceTitle: moviceTitle,
			movices: movices
		}
		this.setData(readyData);
	},
	onReady: function () {
		wx.setNavigationBarTitle({
			title: '点映',
		})
	},
	moreMovice: function (event) {
		// console.log(event);
		var category = event.currentTarget.dataset.category;
		wx.navigateTo({
			url: "movice-more/movice-more?category=" + category

		})
	}
	/**
	 * 跳转到详细页面
	 */
	, getDetail: function (event) {

		// console.log(event);
		var id=event.currentTarget.dataset.id;
		util.toDetail("movice-detail/movice-detail?id="+id);
	}
})