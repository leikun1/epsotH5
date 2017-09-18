/**
 * Created by fireBoss on 2017/03/21.
 */
import "whatwg-fetch"

const SURL='http://www.epsot.cn/epsotServerV2.0/'
//const SURL='http://192.168.2.12:8080/epsotServerV2.0/'
const CRMSURL='http://120.25.226.96:8090/epsotCRMServer/'

/*...................... 首页模块相关接口..........................*/
/*
 *获取广告轮播图列表
 */
export let getAdsList = async () => {
  let response = await fetch(SURL + `adsFilterModel/doQueryAdsList?adsPosition=1001&adsEndTime=`, {
    method: 'POST',
    mode: 'cors'
  }).catch((error) => {
    console.log(error)
  })
  return await response.json().catch((error) => {
    console.log(error)
  })
}
/*
 *获取合作商家列表
 */
export let getAllMerchants = async (page) => {
  let response = await fetch(CRMSURL + `merchantFilerModel/doQueryAllMerchants?merchantsPK=&queryNum=6&beginNum=${page}`, {
    method: 'POST',
    mode: 'cors'
  }).catch((error) => {
    console.log(error)
  })
  return await response.json().catch((error) => {
    console.log(error)
  })
}
/*
 *获取地图商家列表
 */
export let getMapMerchants = async (keywords,areanum,page) => {
  let response = await fetch(SURL + `merchantFilterModel/doQueryMerchantInfo?keywords=${keywords}&pagesize=10&pagenum=${page}&areanum=${areanum}`, {
    method: 'POST',
    mode: 'cors'
  }).catch((error) => {
    console.log(error)
  })
  return await response.json().catch((error) => {
    console.log(error)
  })
}

/*...................... 群组模块相关接口..........................*/
/*
 *获取个人群组列表
 */
export let getPersonalGroupList = async (driverId) => {
  let response = await fetch(SURL + `groupFilterModel/doQueryUserGroupList?driverId=${driverId}`, {
    method: 'POST',
    mode: 'cors'
  }).catch((error) => {
    console.log(error)
  })
  return await response.json().catch((error) => {
    console.log(error)
  })
}

/*...................... 节目模块相关接口..........................*/
/*
 *获取推荐轮播图列表
 */
export let getBannerList = async (page) => {
  let response = await fetch(SURL + `programFilterModel/doQueryXMLAProgramInfo?categoryCode=1001&dataPage=1&dataCount=6`, {
    method: 'POST',
    mode: 'cors'
  }).catch((error) => {
    console.log(error)
  })
  return await response.json().catch((error) => {
    console.log(error)
  })
}

/*
 *获取热点节目列表
 */
export let getHotAlbumList = async (page, tag) => {
  let response = await fetch(SURL + `programFilterModel/doQueryXMLAProgramInfo?categoryCode=1006&dataPage=${page}&dataCount=6&categoryId=${tag}`, {
    method: 'POST',
    mode: 'cors'
  }).catch((error) => {
    console.log(error)
  })
  return await response.json().catch((error) => {
    console.log(error)
  })
}

/*
 *获取UGC节目列表
 */
export let getUGCProgramList = async (page) => {
  let response = await fetch(SURL + `programFilterModel/doQueryMainAlbum?categoryCode=1006&currentPage=${page}&queryNum=6&orderByViewTimes=1`, {
    method: 'POST',
    mode: 'cors'
  }).catch((error) => {
    console.log(error)
  })
  return await response.json().catch((error) => {
    console.log(error)
  })
}

/*
 *获取本地节目列表
 */
export let getLocalProgramList = async (page) => {
  let response = await fetch(SURL + `programFilterModel/doQueryUserLocalProgram?userPK=${page}`, {
    method: 'POST',
    mode: 'cors'
  }).catch((error) => {
    console.log(error)
  })
  return await response.json().catch((error) => {
      console.log(error)
  })
}

/*
 *获取节目定制列表
 */
export let getOrderProgramList = async (page) => {
  let response = await fetch(SURL + `programFilterModel/doQueryProgramByCode?userPK=${page}&code=1002&currentPage=1`, {
    method: 'POST',
    mode: 'cors'
  }).catch((error) => {
    console.log(error)
  })
  return await response.json().catch((error) => {
    console.log(error)
  })
}

/*
 *获取节目类型列表
 */
export let getProgramTypeList = async (categoryCode,categoryId) => {
  let response = await fetch(SURL + `programFilterModel/doQueryXMLAProgramInfo?categoryCode=${categoryCode}&categoryId=${categoryId}`, {
    method: 'POST',
    mode: 'cors'
  }).catch((error) => {
    console.log(error)
  })
  return await response.json().catch((error) => {
    console.log(error)
  })
}
