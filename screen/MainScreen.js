import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'

const { width, height } = Dimensions.get('screen');

function rpx(px) {
    return (width / 750) * px;
}


export default class MainScreen extends Component {
    data = [
        {
            title: '上架商品总数',
            num: '24,380',
            desc: '+128%较上月',
            numColor:'green'
            
        },
        {
            title: '注册用户总数',
            num: '19,650',
            desc: '-50%较上月',
            numColor:'red'
        },
        {
            title: '上架商品总数',
            num: '24,380',
            desc: '+128%较上月',
            numColor:'green'
        },
        {
            title: '当日PC端PV量',
            num: '14,281',
            desc: '-50%较上月',
            numColor:'red'
        },
         {
            title: 'APP总下载量',
            num: '7,422',
            desc: '+18%较上月',
            numColor:'green'
        },
          {
            title: '移动端PV量',
            num: '29,315',
            desc: '-34%较上月',
            numColor:'red'
        },
          // 本地图片 必须明确写 require  否则 webpack 工具不自动编译
        {title: '商品管理', icon: require('../assets/menu_product.jpg')},
        {title: '用户管理', icon: require('../assets/menu_user.jpg')},
        {title: '订单管理', icon: require('../assets/menu_order.jpg')},
        {title: '首页管理', icon: require('../assets/menu_heart.jpg')},
    ];

    componentDidMount() {
        this.props.navigation.setOptions({
            title: '主菜单',
            headerRight: () => (
                <TouchableOpacity style={{marginRight:rpx(20)}} activeOpacity={0.7}>
                    <Image source={require('../assets/user.png')} style={{width:rpx(60),height:rpx(60),borderRadius:rpx(30)}} />
                </TouchableOpacity>
            )
            });
    }

    render() {

        return (
            <FlatList
                data={this.data}
                keyExtractor={(item, index) => index + ''}
                renderItem={this._renderItem}
                numColumns={2}
                style={{backgroundColor:'black'}}
            />
        )
    }

     // index: 6商品管理 7用户管理 8订单管理 9首页管理
    showDetail(index) {
        if (index === 6) {
            this.props.navigation.push('Products');
        }
    }

    _renderItem = ({ item, index }) => {
        // 如果 序号>5 则是另一种UI
        //当序号（index）>5，大于5的UI就和前面的UI不一样了。
        if (index > 5) {
            return (
                <View style={{alignItems:'center',width:'50%',paddingVertical:rpx(30)}}>
                    <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        activeOpacity={0.7}
                        // 箭头函数——延迟传参
                        onPress={()=>showDetail(index)}
                    >
                        <Image source={item.icon} />
                        <Text style={{fontSize:rpx(30)}}>{ item.title}</Text>
                    </TouchableOpacity>
                </View>
            )
        }


        return (
            <View style={{
                alignItems: 'center',
                paddingVertical: rpx(30),
                width: '50%',
                borderBottomWidth: rpx(2),
                // 中间的竖线，下标为偶数的右边框为rpx(2),奇数没有
                borderRightWidth: index % 2 == 0 ? rpx(2) : 0,
            }}>
                <TouchableOpacity>
                    <Text style={{fontSize:rpx(30)}}>{item.title}</Text>
                    <Text style={{fontSize:rpx(35),color:item.numColor}}>{item.num}</Text>
                    <Text style={{fontSize:rpx(25)}}>{ item.desc}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
