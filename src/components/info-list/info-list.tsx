import Taro, {
  Component
} from '@tarojs/taro'

import {
  View,
  Image,
  Text
} from '@tarojs/components'

import './info-list.scss'

export default class InfoList extends Component {
  render () {
    return (
      <View className="list-item">
        <View className={this.props.image ? 'is-img' : 'no-img'}>
          <Text className="item-title">{this.props.title}</Text>
          <Text className="item-time">{this.props.publishTime}</Text>
        </View>
        <Image src={this.props.image} className="item-img" ></Image>
      </View>
    )
  }
}
