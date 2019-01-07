import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Input, Image, ScrollView, Swiper, SwiperItem } from "@tarojs/components";
import "./info.scss";
import search from "../../asset/images/search.png";
import InfoList from "../../components/info-list/info-list";

export default class Info extends Component {
  navigateTo(url) {
    Taro.navigateTo({ url: url });
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "资讯库"
  };

  constructor() {
    super(...arguments);
    this.state = {
      loading: true,
      hasMore: true,
      page: 1,
      informationBanner: [],
      information: [],
      scrollTop: 0,
      lowerThreshold: 20,
      upperThreshold: 20,
    };
  }

  componentWillMount() {
    // 获取远程数据
    Taro.showLoading({ title: '加载中' })
    Taro.request({
      url: 'https://hulk.cnicchina.com/api/information/index'
    }).then(res => {
      Taro.hideLoading()
      if (res.data) {
        this.setState({
          loading: false,
          informationBanner: res.data.informationBanner,
          information: res.data.information.items
        })
      }
    })
  }

  getInfoList = (flag) => {
    let param = {
      page: this.state.page
    };

    // 获取远程数据
    Taro.showLoading({ title: '正在加载中' })
    Taro.request({
      url: 'https://hulk.cnicchina.com/api/information/index',
      data: param
    }).then(res => {
      Taro.hideLoading()
      if (res.data) {
        if (flag) {
          if (parseInt(res.data.information.pager.lastPage) > this.state.page) {
            this.setState({
              hasMore: true,
              loading: false,
              information: this.state.information.concat(res.data.information.items)
            })
          } else {
            this.setState({
              hasMore: false,
              loading: false
            })
          }
        } else {
          this.setState({
            loading: false,
            page: 1,
            information: res.data.information.items
          })
        }
      }
    })
  };

  loadMore() {
    this.state.page += 1;
    this.getInfoList(true);
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='info'>
        <View className='search flex-wrap'>
          <View className='recruit-think-tank'>
            <Text>招采智库</Text>
          </View>
          <View className='content'>
            <Image src={search} className="search-image" />
            <Input
              type='text'
              name='keyword'
              value=''
              placeholder='请输入关键字'
              placeholder-style='color:#999;'
            />
          </View>
        </View>
        <Swiper
          className='swiper-container'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
          {
            this.state.informationBanner.map(item => {
              return (
                <SwiperItem key={item}>
                  <Image src={item.image} className="slide-image"></Image>
                </SwiperItem>
              )
            }
          }
        </Swiper>
        <ScrollView
          className='container'
          scrollY
          scrollWithAnimation
          scrollTop={this.state.scrollTop}
          lowerThreshold={this.state.lowerThreshold}
          upperThreshold={this.state.upperThreshold}
          style='height:300px'
          onScrolltoupper={this.getInfoList}
          onScrolltolower={this.loadMore}
        >
          {this.state.loading ? (
            <View className='txcenter'>加载中</View>
          ) : (
              this.state.information.map(item => {
                return (
                  <InfoList
                    key={item}
                    image={item.image}
                    title={item.title}
                    publishTime={item.publishTime}
                  ></InfoList>
                )
              })
            )}
        </ScrollView>

        <View className="no-more">
          <text>{this.state.hasMore == false ? '亲，已经到底了哦…' : ''}</text>
        </View>
      </View>
    );
  }
}
