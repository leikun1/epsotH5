
// 8080 环境
var SURL = "http://www.epsot.cn/epsotServerV2.0/";
//var CRMSURL:"http://120.24.41.89:8080/epsotCRMServer/";

// 9690 环境
//var SURL:"http://120.25.226.96:8090/epsotServerV2.0/";
var CRMSURL = "http://120.25.226.96:8090/epsotCRMServer/";

// 笑笑生本地环境
//var SURL = "http://192.168.2.12:8080/epsotServerV2.0/";
//var CRMSURL:"http://192.168.2.12:8080/epsotCRMServer/";

let GLOBALURL = {

  ADS_QUERYADSLIST_URL:SURL + "adsFilterModel/doQueryAdsList",// 主页 广告
  MERCHANTS_ALLMERCHANTSLIST_URL:CRMSURL + "merchantFilerModel/doQueryAllMerchants",  // 合作商家信息
  MAP_MERCHANTSLIST_URL:SURL + "merchantFilterModel/doQueryMerchantInfo",// 加油、修车\修车、洗车）商家信息
  DO_QUERY_EXPERT_LIST_NO_DETAIL:SURL + "pServiceFilterModel/doQueryExpertListNoDetail",// 专家列表
  SERVICE_CALL:SURL + "serviceFilterModel/doRequestCallService",// 一键呼叫
  FIND_CAR_ADDRESS:SURL + "trafficModel/doQueryCarAddress",// 最后一次停车地点
  TRAFFIC_LOCUSHISTORY_URL: SURL + "trafficModel/doQueryLocusHistory", // 历史轨迹
  TRAFFIC_ULOCATIONINMAP_URL:SURL + "trafficFilterModel/doQueryUserLocationInMap", // 所有车主位置信息

  // 合作商家--优惠券
  MERCHANTS_ALLMERCHANTSLIST_URL:CRMSURL+"merchantFilerModel/doQueryAllMerchants",
  MERCHANTS_MERCHANTSDETAIL_URL:CRMSURL + "merchantFilerModel/doQueryMerchantInfo",
  MERCHANTS_COUPONLIST_URL:SURL + "couponFilterModel/doQueryCouponList",
  MERCHANTS_COUPONDETAIL_URL:SURL + "couponFilterModel/doQueryCouponDetail",
  MERCHANTS_CREATECOUPONORDER_URL:SURL + "couponModel/doCreateCouponOrder",

  MERCHANTS_COUPONORDERLIST_URL:SURL + "couponModel/doQueryCouponOrderList",
  MERCHANTS_DOPREPAY_URL:SURL + "payCenterModel/doPrePay",
  MERCHANTS_DOAFTERPAY_URL:SURL + "payCenterModel/doAfterPay",
  MERCHANTS_DOCOUPONORDERCOMMENT_URL:SURL + "couponModel/doAddCouponOrderComment",
  MERCHANTS_COUPONORDERCOMMENTLIST_URL:SURL + "couponFilterModel/doQueryCouponOrderCommentList",
  MERCHANTS_USERCOUPONLIST_URL:SURL + "couponModel/doQueryUserCouponList",

  // 群组
  GET_GROUP_LIST:SURL + "groupFilterModel/doQueryUserGroupList",// 个人群列表
  JOIN_GROUP:SURL + "groupFilterModel/doJoinGroup",// 申请入群
  GET_ALL_GROUP_LIST:SURL + "groupFilterModel/doQueryAllGroupList",// 所有群列表
  CREATE_GROUP:SURL + "groupFilterModel/doCreateGroup",// 创建群组
  GET_GROUP_USER_STATUS:SURL + "groupFilterModel/doQueryGroupUserStatus",// 根据群组ID获得群组信息
  DISMISS_GROUP:SURL + "groupFilterModel/doDismissGroup",// 群主解散群
  QUIT_GROUP:SURL + "groupFilterModel/doQuitGroup",// 非群主成员退出群
  INVITE_JOIN_GROUP:SURL + "groupFilterModel/doInviteJoinGroup",// 邀请入群
  AGREE_JOIN_GROUP:SURL + "groupFilterModel/doAgreeJoinGroup",// 同意入群
  QUERY_GROUP_USER:SURL + "groupFilterModel/doQueryGroupUserInfo",// 模糊查询数据
  PSERVICE_IMTOKEN_URL:SURL + "pServiceModel/doQueryIMToken", // 获取融云token
  QUERY_WXCONFIG_URL:SURL + "groupFilterModel/doQueryWXConfigInfo", // 获取微信配置信息
  GET_WXMEDIAFILE_URL:SURL + "groupFilterModel/doGetWXMediaFile", // 获取微信录音文件

   // 分享
   SHARE_OPENSHARECAMERA_URL:SURL + "shareFilterModel/doOpenShareCameraImage",
   SHARE_ADDSHAREIMAGE_URL:SURL + "shareFilterModel/doAddShareCameraImage",
   SHARE_QUERYSHARESET_URL:SURL + "shareFilterModel/doQueryShareSet",
   SHARE_PICSHARESET_URL:SURL + "shareFilterModel/doQueryPicShareInterface",
   SHARE_SHAREACTION_URL:SURL + "shareFilterModel/doShareAction",
   SHARE_JOURNEYSHARE_URL:SURL + "shareFilterModel/doQueryJourneyShare",
   SHARE_SHAREDETAIL_URL:SURL + "shareFilterModel/doQueryShareDetail",
   SHARE_THUMBNAIL_URL:SURL + "shareFilterModel/doQueryThumbnail",
   SHARE_QSHAREBYADDRESS_URL:SURL + "shareFilterModel/doQueryShareByAddress",
   SHARE_VIEWSHARE_URL:SURL + "shareFilterModel/doViewShare",
   SHARE_SHARECOLLECTLIST_URL:SURL + "shareModel/doQueryShareCollectionList",
   SHARE_ISSHARELIKED_URL:SURL + "shareModel/isShareLiked",
   SHARE_DELETESHARESET_URL:SURL + "shareModel/doDeleteShareSet",
   SHARE_COMMENTSHARESET_URL:SURL + "shareModel/doCommentShareSet",
   SHARE_CLICKLIKESHARESET_URL:SURL + "shareModel/doClickLikeShareSet",
   SHARE_COLLECTSHARESET_URL:SURL + "shareModel/doCollectShareSet",
   SHARE_CANCELCOLLECTSHARESET_URL:SURL + "shareModel/doCancelCollectShareSet",

  // 节目
  DO_QUERY_XMLAPROGRAM_INFO:SURL + "programFilterModel/doQueryXMLAProgramInfo",// 喜马拉雅节目信息
  PROGRAM_COMMISSION:SURL + "programModel/doCommissionProgram",// 节目推送
  XMLAPROGRAM_ORDERS:SURL + "programModel/doOrdersProByPhone",// 喜马拉雅节目定制

  ORDER_SERIAL_PRO:SURL + "programModel/doOrderSerialThirdPro",// 定制小说，新闻
  CAR_BREAK_RULE:SURL + "userDataModel/doQueryUDataVioInfoByCarLisence",// 违章查询
  DO_QUERY_PROGRAM_BY_CODE:SURL + "programFilterModel/doQueryProgramByCode", // 查询节目 获取所有歌单
  DO_QUERY_PROGRAM_LIST:SURL + "programModel/doQueryUserProgramList", // 私人歌单(查询含歌曲的歌单,没有歌曲的歌单查询不到)
  DO_QUERY_USER_PROGRAM_LIST:SURL + "programModel/doQueryUserProgramListList",// 私人歌单(仅查询歌单名称)
  DO_QUERY_UGC_TYPE:SURL + "programFilterModel/doQueryUGCType",// 查询UGC类型接口
  DO_QUERY_MAIN_ALBUM:SURL + "programFilterModel/doQueryMainAlbum",// 查询专辑
  DO_CREATE_PROGRAM_LIST:SURL + "programModel/doCreateProgramList", // 创建歌单
  DO_ORDER_PROGRAM_TO_LIST:SURL + "programModel/doOrderProToProList", // 添加节目至歌单
  DO_DELETE_PROGRAM_LIST:SURL + "programModel/doDeleteProgramList",// 删除歌单

  DO_POST_LOCAL_PROGRAM_IN_SD:SURL + "programFilterModel/doQueryUserLocalProgram",// 手机端从服务器获取车机SD卡音乐节目
  DO_PLAY_LOCAL_PROGRAM_IN_SD:SURL + "programFilterModel/doPlayLocalProgram",// 手机端从服务器播放车机SD卡音乐节目

  // 个人中心
  GET_VIO_INFO_BY_CAR_LISENCE:SURL + "violationModel/getVioInfoByCarLisence",// 按车牌号查询违章记录（目前不允许查询其他人的违章记录）
  GET_PERSONAL_VIO_INFO:SURL + "userDataModel/doQueryUDataVioInfoByTime",// 查询当前用户的违章记录
  GET_VIO_INFO_IMAGE:SURL + "userDataModel/doQueryUDataVioInfoImage",// 查询违章图片地址
  DO_QUERY_COUPON_ORDER_LIST:SURL + "couponModel/doQueryCouponOrderList",// 查询优惠券订单列表
  GLOBAL_ORDER:SURL + "operateFilterModel/doOrderGlobal",// 命令控制车机端-全局
  DO_QUERY_OBDREALDATA:SURL + "userDataModel/doQueryUserRealTimeOBDData",// 查询个人实时OBD数据
  DO_QUERY_OBDDETAILDATA:SURL + "userDataFilterModel/doQueryUserOBDDataDetail",// 查询个人详细OBD数据
  DO_QUERY_OBDTROUBLELIST:SURL + "serviceFilterModel/doQueryTroubleCodeTypeList",// 查询OBD故障列表
  DO_QUERY_OBDNEWTROUBLE:SURL + "serviceFilterModel/doQueryUserNewestTrouble",// 查询个人最新故障

  GET_DRIVER_INFO:SURL + "userDataModel/doQueryUDataDriverInfo",// 查看个人资料
  UPDATE_USER_INFO:SURL + "userDataModel/doUpdateUDataUserinfo",// 修改个人资料
  DO_UPLOAD_JUNENGTHING:SURL + "commonModel/doUploadJuNengThing",// 头像图片上传接口
  DO_UPLOAD_USER_IMAGE:SURL + "userDataModel/doUpdateUDataUImage",// 头像图片上传回调接口
  GET_CAR_CHECK_INFO:SURL + "userDataModel/doQueryUDataUserCarCheckInfo",// 获取年检日期
  CHANGE_PASSWORD:SURL + "loginModel/updateUserPassword",// 修改密码
  TRAFFIC_CARMILEAGE_URL: SURL + "trafficModel/doQueryCarsMileage",

  UDATA_UPDATEUSERINFO_URL: SURL + "userDataModel/doUpdateUDataUserinfo",
  UDATA_UPDATEDRIVINGLISENCE_URL: SURL + "userDataModel/doUpdateUDataDrivingLisence",
  UDATA_UPDATEDRIVERLISENCE_URL: SURL + "userDataModel/doUpdateUDataDriverLisence",
  GET_WXIMAGEFILE_URL:SURL + "userDataModel/doChangeUserImage", // 获取微信图片文件


  //登录
  COMMON_QUERYEKEY_URL: SURL +  "commonModel/doQueryEncryptKey",
  COMMON_SENDVMSG_URL: SURL +  "commonModel/doSendMsg",
  COMMON_CHECKVMSG_URL: SURL +  "commonModel/doCheckMsgCode",
  LOGIN_ULOGIN_URL: SURL +  "loginFilterModel/doUserLogin",
  LOGIN_DLOGIN_URL: SURL +  "loginFilterModel/doDeviceUserLogin",
  LOGIN_ISUEXSIT_URL: SURL +  "loginFilterModel/isUserExsit",
  LOGIN_UREGIS_URL: SURL +  "loginFilterModel/doUserRegister",
  LOGIN_UACTIVE_URL: SURL +  "loginFilterModel/doDriverUserActive",
  LOGIN_ELOGIN_URL: SURL +  "loginFilterModel/doEmpLogin",
  LOGIN_ISEEXSIT_URL: SURL +  "loginFilterModel/isEmpExist",
  LOGIN_ASSISTREGIS_URL: SURL +  "loginFilterModel/doRegisterAssistantEmp",
  LOGIN_MLOGIN_URL: SURL +  "loginFilterModel/doMerchantsLogin",
  LOGIN_UCHECK_URL: SURL +  "loginFilterModel/doCheckUserMsgCode",  //用户验证码校验
  LOGIN_FILTERUPUPASS: SURL +  "loginFilterModel/updateUserPassword",  //修改
  LOGIN_UPDATEUPASS_URL: SURL +  "loginModel/updateUserPassword", //修改,

  RONGYUN_CHAT_ACCOUNT_APPKEY:"",
  RONGYUN_CHAT_ACCOUNT_TOKEN:"",
  _MEMBERS:[]

};

export default GLOBALURL;
