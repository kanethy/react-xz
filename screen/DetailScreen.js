import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Dimensions, Image,ScrollView, } from 'react-native'

// 引入第三方模块
import AutoHeightWebView from 'react-native-autoheight-webview';
​

const { width, height } = Dimensions.get('screen');
function rpx(px) {
    return (width / 750) * px;
}

export default class DetailScreen extends Component {

    state = { details: null };
    //当前页
    curP = 0;

    // 变量关联 FlatList
    banner = React.createRef();
   

    componentDidMount() {
        this.props.navigation.setOptions({ title: '产品详情' });
        
        console.log(this.props.route);
        // route: 存放路由传参
        //let lid=this.props.route.params.lid
        let { lid } = this.props.route.params;
        let  url = 'http://101.96.128.94:9999/data/product/details.php?lid='+lid;

        fetch(url).then(res => res.json()).then(res => {
            this.setState({ details: res.details });

            // 定时滚动: debug模式会让滚动加快; 关闭即可
            //banner自动滚动
           this.timer = setInterval(() => {
                let index = this.curP + 1;
                //判断一下，页数不能大于总页数
                if (index >= this.state.details.picList.length) index = 0;
                this.banner.current.scrollToIndex({ index });
            },2500)
        })
    }

     // 销毁时: 释放
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        if (!this.state.details) return <View></View>
        
        //每次都写很长，很麻烦
         let {details} = this.state;
        // let details = this.state.details;
        return (
            <ScrollView style={{backgroundColor:'white',padding:rpx(25)}}>
                <Text style={{fontSize:rpx(30),color:'gray',borderBottomWidth:rpx(2),paddingBottom:rpx(8)}}>产品型号：{details.lname}</Text>
                <FlatList
                    ref={this.banner}
                    data={details.picList}
                    keyExtractor={item => item.pid + ''}
                    renderItem={this._renderItem}
                    //横向滑动
                    horizontal
                    pagingEnabled
                    //banner自动滚动
                    onScroll={this._ononScroll}
                />
                <Text style={{fontSize:rpx(30)}}>{details.title }</Text>
                <Text style={{fontSize:rpx(23),color:'gray',marginVertical:rpx(6)}} >{details.subtitle}</Text>
                <Text style={{ fontSize: rpx(35), marginBottom: rpx(10), borderBottomWidth: rpx(2) }}>￥{details.price}</Text>
                
                {/*网页组件:  WebView: 用来做根组件   autoheight-webview: 做子组件*/}
                <AutoHeightWebView source={this.transHtml(details.details)} style={{marginBottom:rpx(35)}} />
            </ScrollView>
        )
    }

    // 把文本中 所有符合条件的字符串 都改
    transHtml(html) {
        //原始: src="img/product/detail/59003d49Nd9aa8623.jpg"
        //改成: src="http://101.96.128.94:9999/img/product/detail/59003d49Nd9aa8623.jpg"
        //width="100%"是设置图片的宽度为100%
        return html.replace(
      /src="img/g,
      'width="100%" src="http://101.96.128.94:9999/img',
    );
    }

    //banner自动滚动
    _ononScroll = (event) => {
        event.persist();
        console.log(event);
        let x = event.nativeEvent.contentOffset.x;
        //图片自身宽度
        let width = rpx(750 - 25 * 2);
        this.curP = Math.round(x / width);
    }

    _renderItem = ({ item }) => {
        let uri = "http://101.96.128.94:9999/" + item.lg;

        //前面ScrollView的padding给的25，所以需要减去左右的25
        // 750 - 20 * 2: 表达式 -- 表达一定含义的式子;  可以告知阅读者值是怎么来的

        let width = rpx(750 - 25 * 2);
        return <Image source={{uri}} style={{width,height:width}} />
    }
}

const ss = StyleSheet.create({})


/**
 * "<div class="content_tpl"><div class="formwork"><div class="formwork_img"><img class="" src="img/product/detail/59003d3fNd4e6c74e.jpg"></div></div><div class="formwork"><div class="formwork_img"><img class="" src="img/product/detail/59003d49Nd9aa8623.jpg"></div></div><div class="formwork"><div class="formwork_img"><img class="" src="img/product/detail/59003d53N79717f17.jpg"></div></div><div class="formwork"><div class="formwork_img"><img class="" src="img/product/detail/59003db4N5441df2e.jpg"></div></div><div class="formwork"><div class="formwork_img"><img class="" src="img/product/detail/59003afdN7d9208b8.jpg"></div></div></div>"
 */
