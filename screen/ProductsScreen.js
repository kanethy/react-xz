import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'

const { width, height } = Dimensions.get('screen');

function rpx(px) {
    return (width / 750) * px;
}

export default class ProductsScreen extends Component {
    state = { res:null,refreshing:false };
    

   
    url = "http://101.96.128.94:9999/data/product/list.php?pno=";

    componentDidMount() {
        this.props.navigation.setOptions({ title: '产品列表' });

        fetch(this.url + 1).then(res => res.json()).then(res => {
            console.log(res);

            this.setState({  res });

        })
    }

    render() {
        if(!this.state.data)return <View></View>
        return (
            <FlatList
                data={this.state.res.data}
                keyExtractor={(item) => item.lid + ''}
                renderItem={this._renderItem}
                ItemSeparatorComponent={() => (
                    <View style={{height:rpx(2),backgroundColor:'black'}}></View>
                )}
                onEndReached={this._onEndReached}
                onEndReachedThreshold={0.2}
                ListFooterComponent={this._ListFooterComponent}
                onRefresh={this._onRefresh}
                refreshing={this.state.refreshing}
            />
        )
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });

        fetch(this.url + 1).then(res => res.json).then(res => {
            this.setState({ res, refreshing: false });
            
        })

    }

    _ListFooterComponent = () => {
        if (this.state.res.pno >= this.state.res.pageCount) {
            return (
                <View style={{alignItems:'center',paddingVertical:rpx(10)}}>
                    <Text style={{fontSize:rpx(30)}}> 没有更多数据</Text>
                </View>
            )
        } else {
            return (
                <View style={{alignItems:'center',paddingVertical:rpx(10)}}>
                    <ActivityIndicator color="green" size="large" />
                    <Text style={{fontSize:rpx(30)}}> 加载中, 请稍后...</Text>
                </View>
            )
        }
    }

    _onEndReached = () => {
        fetch(this.url + (this.res.pno + 1)).then(res => res.json()).then(res => {
            
            res.data = this.state.res.data.concat(res.data);

            this.setState({ res });
        })
    }

    showDetail(index) {
        //index: 点击栏目的序号
        // alert(index);
        
        let { lid } = this.state.res.data[index];
        // alert(lid);
        this.props.navigation.push('Detail', { lid });
    }

    _renderItem = ({ item,index }) => {
        let uri = "http://101.96.128.94:9999"+item.pic;
        return (
            <TouchableOpacity style={{ flexDirection='row', backgroundColor: 'white' }} activeOpacity={0.5} onPress={()=>this.showDetail(index)}>
                 <Image source={{ uri}} style={{width:rpx(200),height:rpx(200),marginHorizontal:rpx(20)}} />
                <View style={{justifyContent:'space-around',flex:1,height:rpx(200)}}>
                    <Text style={{fontSize:rpx(30)}}>{item.title}</Text>
                    <Text style={{fontSize:rpx(30),color:'red'}}>￥{ item.price}</Text>
                </View>
            </TouchableOpacity>
        )
        
    }
}

const ss = StyleSheet.create({})
