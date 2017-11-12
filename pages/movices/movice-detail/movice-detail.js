// pages/movices/movice-detail/movice-detail.js
var util = require("../../../utils/util.js");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		detailData: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// console.log(options);
		util.getMoviceData(options.id, this);
	},
	/**
	 * 预览图片
	 */
	previewImage: function (event) {
		var url = event.currentTarget.dataset.url;

		wx: wx.previewImage({
			current: url,
			urls: [url]
		})
	}
})