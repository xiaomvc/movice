// pages/movices/movice-more/movice-more.js
var util = require("../../../utils/util.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		moreMovice: {},
		total: 0,
		url: {},
		nowUrl: {},//把当前的地址保存下来（搜索后返回的依据）
		isRefresh: true,//是否更新
		isSearchShow: false,//是否搜索
		searchTitle: "搜索类型",
		search: ""//搜索时要带的参数
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var category = options.category;
		if (category == "undefined" || category == "null") {
			wx.showToast({
				title: '无法查询数据',
			});
			return false;
		}
		this.data.category = category;
		switch (category) {
			case "正在热映":
				var url = "/v2/movie/in_theaters";
				break;
			case "即将上映":
				var url = "/v2/movie/coming_soon";
				break;
			case "口碑榜":
				var url = "/v2/movie/top250";

		}
		this.data.url = url;//获取当前访问的地址
		this.data.nowUrl = url;//获取当前访问的地址(搜索后可以返回当前的路径)
		util.http(url, this, "moreMovice", category);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		wx.setNavigationBarTitle({
			title: this.data.category,
		})
	},
	/**
	 * 下拉刷新
	 */
	onPullDownRefresh: function () {
		wx.startPullDownRefresh(
			console.log(1),
			//在导航栏中显示加载动画
			wx.showNavigationBarLoading(),
			//重新加载数据
			this.data.total = 0,
			// this.data.moreMovice = {},
			wx.stopPullDownRefresh(),
			util.http(this.data.url + "?" + this.data.search, this, "moreMovice"),
		)
		wx.hideNavigationBarLoading()
	},

	//上拉更新更多
	onReachBottom: function () {
		console.log(2),
			this.data.total += 20;//每次添加的数量
		//在导航栏中显示加载动画
		wx.showNavigationBarLoading(),
			util.http(this.data.url + "?start=" + this.data.total + "& count=20 &" + this.data.search, this, "moreMovice", '', this.data.isRefresh),
			wx.hideNavigationBarLoading()

	},
	/**
	 * 搜索
	 */
	starSearch: function (event) {
		var reg = /^\s*$/;
		if (reg.test(event.detail.value)) {
			wx.showToast({
				title: '搜索不能为空',
			})
			return false;
		}
		//因为这是新的，所以把总数量改为0,还有地址，和数据
		this.data.total = 0;
		this.data.url = "/v2/movie/search";//修改链接地址
		this.data.search = "tag= " + event.detail.value;
		util.http(this.data.url + "?" + this.data.search, this, "moreMovice");
	},
	/**
	 * 点击搜索框的*后，可以返回原来的链接数据
	 */
	clearSearch: function () {
		this.setData({
			isSearchShow: false
		});

		this.data.url = this.data.nowUrl;
		this.data.total = 0;
		this.data.search = "";
		//重新查询
		util.http(this.data.url, this, "moreMovice");
	},
	/**
	 * 搜索框获得焦点时
	 */
	onBindFocus: function () {
		this.setData({
			isSearchShow: true
		})
		// console.log(this.data.isSearchShow);
	}
	/**
	 * 跳转到详细页面
	 */
	, getDetail: function (event) {

		// console.log(event);
		var id = event.currentTarget.dataset.id;
		util.toDetail("../movice-detail/movice-detail?id=" + id);
	}
})