import Taro, { Component, Config } from '@tarojs/taro'
import Info from './pages/info/info'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/info/info',
      'pages/personal/personal',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ed8c1f',
      navigationBarTitleText: '招采智库',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      "color": "#999",
      "selectedColor": "#ff8a00",
      "borderStyle": "white",
      "backgroundColor": "#fff",
      "list": [
        {
          "pagePath": "pages/info/info",
          "iconPath": "asset/images/tabBar/info2.png",
          "selectedIconPath": "asset/images/tabBar/info.png",
          "text": "资讯库"
        },
        {
          "pagePath": "pages/personal/personal",
          "iconPath": "asset/images/tabBar/personal2.png",
          "selectedIconPath": "asset/images/tabBar/personal.png",
          "text": "我的"
        }
      ]
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Info />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
