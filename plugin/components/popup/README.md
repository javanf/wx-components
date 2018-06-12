# popup组件

> 注意:  `popup` 组件语法使用小程序，copy需做调整

<br/>

`popup主要用来显示了一个弹出式窗口，其中列出了可用的用户管理属性`

## 组件功能实现介绍

### wxml实现部分
* isShowPop用来控制组件的显示和隐藏
* needTitle和title分别是两种title的样式（后面看截图）
```HTML
<view class="popup-warpper" wx:if="{{isShowPop}}" bingdtap="">
  <view class="wrapper">
    <view class='title' wx:if="{{needTitle}}">
      <view class='cancel' catchtap="cancel">取消</view>
      <view class='confirm' catchtap="confirm">确定</view>
    </view>
    <view class='title pop-title' wx:if="{{title}}">{{title}}</view>
    <slot name="after"></slot>
  </view>
</view>
```

### js实现部分
* 详细请看下方注释
```JS
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
```

### css实现部分
* 只写了组件的公共样式部分，slot内容写到具体页面了
```CSS
.popup-warpper {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgba(0,0,0,0.1);
  z-index: 999;
}
.popup-warpper .wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  max-height: 818rpx;
  width: 100%;
  background: #fff;
  overflow-y: auto;
}
.popup-warpper .wrapper .title {
  height: 110rpx;
  line-height: 110rpx;
  background: rgba(59,79,98,0.1);
  display: flex;
  padding: 0 30rpx;
  color: #0cc071;
  font-size: 34rpx;
}
.popup-warpper .wrapper .title.pop-title {
  color: #9da4b5;
  font-size: 30rpx;
  text-align: center;
  display: block;
}
.popup-warpper .wrapper .title .cancel {
  flex: 1;
}
.popup-warpper .wrapper .title .confirm {
  flex: 1;
  text-align: right;
}

```
## 组件调用实现介绍

### wxml实现部分
* popup组件引入后调用
* isShowPop是传入子组件的属性，控制是否显示
* bindcancel、bindconfirm是传入子组件的方法，用this.triggerEvent('xxx')等方法调用，pCancel、pConfirm是this.triggerEvent('xxx')调用的执行的具体方法
* slot对应组件 slot name="after" 
```HTML
<view>
  <button bindtap="showPop">显示pop组件</button>
  <view class="sitem">已选择item: 
    <text>{{sitem.name}}</text>
  </view>
</view>
<popup isShowPop="{{isShowPop}}" bindcancel="pCancel" bindconfirm="pConfirm">
  <view slot="after">
    <view class='select-ul'>
      <view catchtap='selectLi' data-item="{{item}}" class='li {{item.id==sitem.id?"active":""}}' wx:for="{{selectList}}" item="item" wx:key="key">{{item.name}}
        <em wx:if="{{item.id==sitem.id}}" class='iconfont icon-success'></em>
      </view>
    </view>
  </view>
</popup>
```

### js实现部分
* 详细请看下方注释
```JS
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
    this.setData({
      isShowPop: false
    });
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
```

### css实现部分
* 这里引入了Iconfont-阿里巴巴矢量图标库（具体运用请待下回讲解）
```CSS

@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_703892_8rfxhupbfg5.eot?t=1528772125878'); /* IE9*/
  src: url('//at.alicdn.com/t/font_703892_8rfxhupbfg5.eot?t=1528772125878#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAVgAAsAAAAAB9AAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kibY21hcAAAAYAAAABeAAABhpv8Br5nbHlmAAAB4AAAAZEAAAG4kCKF0mhlYWQAAAN0AAAALwAAADYRqfI3aGhlYQAAA6QAAAAcAAAAJAfeA4RobXR4AAADwAAAAAwAAAAMC+kAAGxvY2EAAAPMAAAACAAAAAgAdgDcbWF4cAAAA9QAAAAfAAAAIAESAF1uYW1lAAAD9AAAAUUAAAJtPlT+fXBvc3QAAAU8AAAAJAAAADXZ/FBweJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sE4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDzbyNzwv4EhhrmBoQEozAiSAwAwfw0deJzFkMENgDAMAy9t6QMxCA8G4sUcXatLdY1iQnkwQS05VhxLiQIsQBQPMYFdGA9OueZ+ZHU/eSZLjUBptXf1nyqiWXYNKplpsHmr/9i87qPTVyiDOrHVl4QbF/UOUwAAeJw1j79u01AYxb9z3et73SZ2c31jJ07zxzHxBbVEYFxbFZBKqAuIoRJTRx4A1g5lyIIEEgPiESqkPgFbx0xMDExhqBDwFJUMl6FHZ/p9+o70I07096dz6fQopNt0n47omAjuLqY+GyI15Zztopvybqx9x2QmFdl07jxGPHV1VFRlHrvCDeBjhAdpUZk5M9gvF+whimgI9AfJCzXbUc5HbPbM6G3zjJ2jO852gsXd5uneoS4moTxtKdVX6oN0OZeMbQQ+XsWRx71Nt/nMg6R7Ob7Dxmj1TfL8pD0ZqJfvytfDWewByyXCwcS/OOwkHds3SRSqvthuy17Szm5pnP7e6oWtYf6LbJh1XW6Qs6QOHRDNoqKGNZgK1Cb3EcU8J+OSiCguqnqBOYSPzLKKasu0NR3h/wHfpBbYE4GWzffsi9QBJPvDm6v1urniHOn65PxIsraWi0/Hq+baIr5agfMs41yFbm5+CIl9qX3RfMWFgB3CGim/mTiohO4wca+8eeTN9erJWe3pLe49ek/0D+gZT9IAAAB4nGNgZGBgAOLyGe0n4/ltvjJwszCAwHXXcFkE/b+BhYG5AcjlYGACiQIAGM0JQAB4nGNgZGBgbvjfwBDDwgACQJKRARUwAwBHCQJsBAAAAAPpAAAEAAAAAAAAAAB2ANx4nGNgZGBgYGYIZGBlAAEmIOYCQgaG/2A+AwAQ9wFwAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nGNgYoAALgbsgJmRiZGZkYWBsYK9uDQ5ObW4mIEBABqiA5U=') format('woff'),
  url('//at.alicdn.com/t/font_703892_8rfxhupbfg5.ttf?t=1528772125878') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_703892_8rfxhupbfg5.svg?t=1528772125878#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-success:before { 
  content: "\e6b1"; 
}

.select-ul {
  padding: 0 30rpx;
}
.select-ul .li {
  line-height: 110rpx;
  border-bottom: 1rpx solid #edf0f5;
  font-size: 30rpx;
  color: #3b4f62;
}
.select-ul .li.active {
  color: #0cc071;
}
.select-ul .li.active em{
  float: right;
}
button{
  margin-top: 10rpx;
  width: 80%;
}
.sitem{
  text-align: center;
  margin-top: 15rpx;
}
.sitem text{
  color: red;
}

```

#### 上述就是一个微信小程序pop组件实现的全部代码，看起来是不是很简单了，赶紧自己动手试试吧，没有你想象的那么难！！！