import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import $ from 'jquery'

import Home from './components/home'
import Index from './components/index'
import Group from './components/group'
import Program from './components/program'
import Share from './components/share'

import Merchants from './components/index/merchants'
import Pickup from './components/index/pickup'
import Videos from './components/index/videos'
import Professor from './components/index/professor'
import Rescue from './components/index/rescue'
import Companion from './components/index/companion'
import Locus from './components/index/locus'
import Findcar from './components/index/findcar'
import Traffic from './components/index/traffic'

import NearGroup from './components/group/nearGroup'
import OwnGroup from './components/group/ownGroup'
import GroupDetail from './components/group/groupDetail'
import CreateGroup from './components/group/createGroup'
import GroupChat from './components/group/groupChat'
import GroupMap from './components/group/groupMap'
import InviteGroup from './components/group/inviteGroup'

import ProgramList from './components/program/programList'
import StationList from './components/program/stationList'
import LocalList from './components/program/localList'
import PersonalList from './components/program/personalList'
import ProgramTypeList from './components/program/programTypeList'
import StationTypeList from './components/program/stationTypeList'
import ProgramSearch from './components/program/programSearch'

import NearShare from './components/share/nearShare'
import OwnShare from './components/share/ownShare'
import ShareDetail from './components/share/shareDetail'
import ShareMap from './components/share/shareMap'

import Login from './components/user/login'
import Forgetpwd from './components/user/forgetpwd'
import Register from './components/user/register'
import Orders from './components/user/orders'
import Aboutus from './components/user/aboutus'
import Violations from './components/user/violations'
import Controll from './components/user/controll'
import Usercenter from './components/user/usercenter'
import Carinfopic from './components/user/carinfopic'
import CarsMileage from './components/user/carsMileage'
import Changepwd from './components/user/changepwd'
import Userinfo from './components/user/userinfo'
import Carstatus from './components/user/carstatus'
import Carcheck from './components/user/carcheck'
import Cardetail from './components/user/cardetail'
import Carreport from './components/user/carreport'
import Carrecord from './components/user/carrecord'
import Carsystem from './components/user/carsystem'

import { WechatPlugin } from 'vux'
// import './styles/font-awesome.css'
import './styles/bass.css'
import './styles/index.css'
// import './styles/style.css'

Vue.use(VueRouter)
Vue.use(WechatPlugin)

const routes = [
  {path: '/',component: Home},
  {path: '/home',component: Home},
  {path: '/index',component: Index},
  {path: '/group',component: Group},
  {path: '/progrsam',component: Program},
  {path: '/share',component: Share},
  {path: '/user/login',component: Login},
  {path: '/user/forgetpwd',component: Forgetpwd},
  {path: '/user/register',component: Register},
  {path: '/index/merchants',component: Merchants},
  {path: '/index/pickup',component: Pickup},
  {path: '/index/videos',component: Videos},
  {path: '/index/professor',component: Professor},
  {path: '/index/rescue',component: Rescue},
  {path: '/index/companion',component: Companion},
  {path: '/index/locus',component: Locus},
  {path: '/index/findcar',component: Findcar},
  {path: '/index/traffic',component: Traffic},
  {path: '/group/nearGroup',component: NearGroup},
  {path: '/group/ownGroup',component: OwnGroup},
  {path: '/group/groupDetail',component: GroupDetail},
  {path: '/group/createGroup',component: CreateGroup},
  {path: '/group/groupChat',component: GroupChat},
  {path: '/group/groupMap',component: GroupMap},
  {path: '/group/inviteGroup',component: InviteGroup},
  {path: '/share/nearShare',component: NearShare},
  {path: '/share/ownShare',component: OwnShare},
  {path: '/share/shareDetail',component: ShareDetail},
  {path: '/share/shareMap',component: ShareMap},
  {path: '/program/programList',component: ProgramList},
  {path: '/program/stationList',component: StationList},
  {path: '/program/localList',component: LocalList},
  {path: '/program/personalList',component: PersonalList},
  {path: '/program/programTypeList',component: ProgramTypeList},
  {path: '/program/stationTypeList',component: StationTypeList},
  {path: '/program/programSearch',component: ProgramSearch},
  {path: '/user/orders',component: Orders},
  {path: '/user/aboutus',component: Aboutus},
  {path: '/user/violations',component: Violations},
  {path: '/user/controll',component: Controll},
  {path: '/user/usercenter',component: Usercenter},
  {path: '/user/carinfopic',component: Carinfopic},
  {path: '/user/carsMileage',component: CarsMileage},
  {path: '/user/changepwd',component: Changepwd},
  {path: '/user/userinfo',component: Userinfo},
  {path: '/user/carstatus',component: Carstatus},
  {path: '/user/carcheck',component: Carcheck},
  {path: '/user/cardetail',component: Cardetail},
  {path: '/user/carrecord',component: Carrecord},
  {path: '/user/carreport',component: Carreport},
  {path: '/user/carsystem',component: Carsystem},
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#index_app')
