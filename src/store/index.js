import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})


let state= {
    menuItems: [
        {
            name: 'home', // 要跳转的路由名称 不是路径
            size: 18, // icon大小
            type: 'md-home', // icon类型
            text: '主页', // 文本内容
        },
        {
            text: '二级菜单',
            type: 'ios-paper',
            children: [
                {
                    type: 'ios-grid',
                    name: 't1',
                    text: '表格',
                    hidden: true, // 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
                },
                {
                   text: '三级菜单',
                    type: 'ios-paper',
                    children: [
                        {
                            type: 'ios-notifications-outline',
                            name: 'msg',
                            text: '查看消息'
                        },
                        {
                            type: 'md-lock',
                            name: 'password',
                            text: '修改密码'
                        },
                        {
                            type: 'md-person',
                            name: 'userinfo',
                            text: '基本资料',
                        }
                    ]
                }
            ]
        }
    ]
}
const store = new Vuex.Store({
  modules,
  getters,
  state
})

export default store
