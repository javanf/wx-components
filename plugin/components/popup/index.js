Component({
  properties: {
    title: { // 属性名（组件title）
      type: String,// 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 'pop选择', // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    needTitle: { // 组件另外一种title样式
      type: Boolean,
      value: false
    },
    isShowPop: { // 是否显示组件
      type: Boolean,
      value: false
    }
  },
  data: {
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  methods: {
    /**
     * 取消事件（调用父组件方法）
     */
    cancel() {
      this.triggerEvent('cancel')
    },
    /**
     * 确定事件（调用父组件方法）
     */
    confirm() {
      this.triggerEvent('confirm')
    }
  }
})