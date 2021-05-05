import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native'

const { width, height } = Dimensions.get('screen');
 
function rpx(px) {
    return (width / 750) * px;
}

export default class LoginScreen extends Component {
    state = { uname: '', upwd: '' };

    componentDidMount() {
         // 标题栏的题目 默认与 在App.js中的 name 一致: 但是可以自定义
​         //setOptions: 用于设置个性化配置
        this.props.navigation.setOptions({ title: '管理员登录' });
    }

    goLogin = () => {
        console.log(this.state.uname, this.state.upwd);
        //后台读取到数据后，解包
        let { uname, upwd } = this.state;


        let url = 'http://101.96.128.94:9999/data/user/login.php';
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `uname=${uname}&upwd=${upwd}`
        }

          // 正确的账号密码: doudou 123456
        fetch(url, options).then(res => res.json()).then(res => {
            console.log(res);
            
            let { code, msg } = res;
            if (code == '200') {
                //登录成功: 跳转到 主页面:   MainScreen.js 自己制作 并添加路由
                this.props.navigation.push('Main');
            } else {
                //登录失败: 弹出提示 登录失败
                //提示组件的官方文档 https://reactnative.cn/docs/alert
                //尝试读官方文档, 实现弹出框的显示:
                Alert.alert('提示','很抱歉，登录失败！')
            }

        })
    }

    render() {
        return (
            <View style={{backgroundColor:'white',flex:1}}>
                <View style={{ marginHorizontal: rpx(120), marginTop: rpx(120) }}>
                    <Text style={ss.logo}>学子商城后台</Text>
                    <TextInput placeholder="请输入管理员用户名"
                        style={ss.input}
                        value={this.state.uname}
                        onChange={uname => this.setState({ uname })}
                    />
                    <TextInput placeholder="请输入管理员密码"
                        style={[ss.input, { marginTop: rpx(30) }]}
                        secureTextEntry
                        value={this.state.upwd}
                        onChange={upwd=>this.setState({upwd})}
                    />
                    
                    <TouchableOpacity style={ss.loginBtn} activeOpacity={0.7} onPress={this.goLogin}>
                        <Text style={{fontSize:rpx(33),color:'white'}}>登录</Text>
                    </TouchableOpacity>

                    <View style={ss.footer}>
                        <Image source={require('../assets/logo.png')} />
                        <Text style={{fontSize:rpx(35),color:'#2196f3'}}> 后台管理系统</Text>
                    </View>

                    <Text style={ss.copy}>&copy;2017版权所有, CODEBOY.COM</Text>
                </View>
            </View>
        )
    }
}

const ss = StyleSheet.create({
    logo: {
        fontSize: rpx(60),
        color: '#2196f3',
        marginBottom: rpx(80),
        alignSelf:'center'
    },
    input: {
        borderBottomWidth: rpx(2),
        color: 'black',
        fontSize:rpx(35),
    },
    loginBtn: {
        marginTop: rpx(40),
        alignItems: 'center',
        backgroundColor: '#2196f3',
        borderRadius: rpx(10),
        paddingVertical:rxp(12),
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:rpx(80),
    },
    copy: {
        fontSize: rpx(21),
        color: '#2196f3',
        marginTop: rpx(120),
        alignSelf:'center',
    }

})
