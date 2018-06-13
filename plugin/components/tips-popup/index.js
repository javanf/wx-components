Component({
  properties: {
    title: { // 属性名（组件title）
      type: String,// 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    type: { // 组件另外一种title样式
      type: Number, // 1: tips   2: alert   3: confirm
      value: 1
    },
    isShowPop: { // 是否显示组件
      type: Boolean,
      value: false
    },
    showCancel: { // 是否显示按钮
      type: Boolean,
      value: true
    },
    showComfirm: { // 是否显示按钮
      type: Boolean,
      value: true
    },
    cancelText: { // 是否显示按钮
      type: String,
      value: '取消'
    },
    comfirmText: { // 是否显示按钮
      type: String,
      value: '确定'
    }
  },
  data: {
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  methods: {
    stopTap() {
      console.log('阻止事件冒泡');
    },
    /**
     * 取消事件（调用父组件方法）
     */
    cancel() {
      this.triggerEvent('cancel')
    },
    /**
     * 确定事件（调用父组件方法）
     */
    comfirm() {
      this.triggerEvent('confirm')
    }
  }
})