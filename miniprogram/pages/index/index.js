var plugin = requirePlugin("myPlugin")
Page({
  data: {
    isShowPop: false, // 控制组件是否显示
    sitem: '', // 已经选择的属性
    selectList: [{ // 供选择的list
      id: 1,
      name: '余票不足'
    }, {
      id: 2,
      name: '陪同领导或客户'
    }, {
      id: 3,
      name: '起飞或到达时间不合适'
    }, {
      id: 4,
      name: '改签或退票因素'
    }]
  },
  onLoad: function() {
    plugin.getData();
    // 初始化默认选择第一个
    let sitem = this.data.selectList[0];
    this.setData({
      sitem: sitem
    });
    this.sitem = sitem;
  },
  /**
   * 选择属性
   * @param {} event 
   */
  selectLi(event) {
    // 获取选择的属性
    let item = event.currentTarget.dataset.item;
    this.setData({
      sitem: item
    });
    // 选择完关闭pop，也可以通过`确定`按钮关闭，如没有needTitle就自动关闭
    // this.setData({
    //   isShowPop: false
    // });
    this.sitem = item;
  },
  pCancel() {
    console.log('取消pop回调');
    this.setData({
      isShowPop: false
    });
  },
  pConfirm() {
    console.log('确定pop回调');
    console.log(this.sitem);
    this.setData({
      isShowPop: false
    });
  },
  /**
   * 显示pop事件
   */
  showPop() {
    this.setData({
      isShowPop: true
    });
  }
})