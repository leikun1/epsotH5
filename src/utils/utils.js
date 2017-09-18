
import $ from 'jquery'
import GLOBALURL from './../utils/global'
import logoSrc from './../images/epsot_logo.jpg'

export function formatDate(now){
  var year = now.getFullYear();
	var month = now.getMonth()+1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
}

export function nuFormat(m){return m<10?'0'+m:m }
export function dateFormat(timestamp){
	//timestamp是整数，否则要parseInt转换
	var time = new Date(timestamp);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	return y+'-'+nuFormat(m)+'-'+nuFormat(d);
}

export function dateFormatMin(timestamp){
	//timestamp是整数，否则要parseInt转换
	var time = new Date(timestamp);
	var y = time.getFullYear();
	var m = time.getMonth()+1;
	var d = time.getDate();
	var h = time.getHours();
	var min = time.getMinutes();
	return nuFormat(m)+'/'+nuFormat(d)+" "+nuFormat(h)+":"+nuFormat(min);
}

export function formatSeconds(value) {
	var theTime = parseInt(value);// 秒
	var theTime1 = 0;// 分
	var theTime2 = 0;// 小时
	if(theTime > 60) {
		theTime1 = parseInt(theTime/60);
		theTime = parseInt(theTime%60);
		if(theTime1 > 60) {
			theTime2 = parseInt(theTime1/60);
			theTime1 = parseInt(theTime1%60);
		}
	}
	var result = ""+(parseInt(theTime)<10?("0"+parseInt(theTime)):parseInt(theTime));
	if(theTime1 > 0) {
		result = ""+(parseInt(theTime1)<10?("0"+parseInt(theTime1)):parseInt(theTime1))+":"+result;
	}
	if(theTime2 > 0) {
		result = ""+(parseInt(theTime2)<10?("0"+parseInt(theTime2)):parseInt(theTime2))+":"+result;
	}
	return result;
}

export function formatSeconds_(value) {
	var theTime = parseInt(value);// 秒
	var theTime1 = 0;// 分
	var theTime2 = 0;// 小时
	if(theTime > 60) {
		theTime1 = parseInt(theTime/60);
		theTime = parseInt(theTime%60);
		if(theTime1 > 60) {
			theTime2 = parseInt(theTime1/60);
			theTime1 = parseInt(theTime1%60);
		}
	}
	var result = ""+(parseInt(theTime)<10?("0"+parseInt(theTime)):parseInt(theTime))+"''";
	if(theTime1 > 0) {
		result = ""+(parseInt(theTime1)<10?("0"+parseInt(theTime1)):parseInt(theTime1))+"'"+result;
	}
	if(theTime2 > 0) {
		result = ""+(parseInt(theTime2)<10?("0"+parseInt(theTime2)):parseInt(theTime2))+""+result;
	}
	return result;
}

//执行正则表达式
export function executeExp(pattern, strValue)
{
    return pattern.test(strValue);
}

/**
 * 判断字符串是否为空
 * @param strValue 校验的值
 * @returns {boolean}
 */
export function isEmpty(strValue)
{
	strValue = $.trim(strValue);
	return strValue.length == 0;
}

/**
 * 判断是否为数字
 * @param strValue 校验的值
 * @returns {boolean}
 */
export function isNumeric(strValue)
{
	if (isEmpty(strValue))
		return false;
	var pattern = /^[0-9]*$/;
    return executeExp(pattern, strValue);
}

/**
 * 字符串转int
 * @param strValue
 * @returns
 */
export function strToInt(strValue)
{
	while (strValue.length > 1 && strValue.substring(0, 1) == "0") {
		strValue = strValue.substring(1, strValue.length);
	}
	return parseInt(strValue);
}

/*校验日期延时*/
export function validDate(strValue, obj, curform, regxp){
	var pattern = /((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/;  //日期格式校验
	if(isEmpty(strValue)){
		return false;
	}
	if(executeExp(pattern, strValue) === false){
		return false;
	}
	return true;
}


/**
 * 校验身份证的函数
 * @param gets
 * @param obj
 * @param curform
 * @param regxp
 * @returns {Boolean}
 */
export function validIDCard(strValue, obj, curform, regxp){
	console.log("执行---ID---校验");
	if(isEmpty(strValue)){
		return false;
	}
	strValue = strValue.toUpperCase();
	var vcity = { 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
			21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
			33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
			42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
			51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
			63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
	//校验长度，类型,身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	//(^\d{15}$)|不让十五位过
	var pattern = /(^\d{17}(\d|X)$)/;
	if(executeExp(pattern, strValue) === false){
		return false;
	}
	//检查省份
	var province = strValue.substr(0,2);
	if(vcity[province] == undefined){
	    return false;
	}
	//校验生日
	var len = strValue.length;
	//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
	if(len == 15){
		var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
		var arr_data = strValue.match(re_fifteen);
		var year = strToInt('19' + arr_data[2]);
		var month = strToInt(arr_data[3]);
		var day = strToInt(arr_data[4]);
		var birthday = new Date('19'+year+'/'+month+'/'+day);
		//var birthday = new Date();
		birthday.setFullYear(year);
		birthday.setMonth(month - 1);
		birthday.setDate(day);
		var now = new Date();
		var now_year = now.getFullYear();
		//年月日是否合理
		if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day){
			//判断年份的范围（3岁到100岁之间)
			var time = now_year - year;
			if(!(time >= 3 && time <= 100)){
				return false;
			}
		}else{
			return false;
		}
	}
	//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
	if(len == 18){
		var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
		var arr_data = strValue.match(re_eighteen);
		var year = strToInt(arr_data[2]);
		var month = strToInt(arr_data[3]);
		var day = strToInt(arr_data[4]);
		var birthday = new Date(year+'/'+month+'/'+day);
		//var birthday = new Date();
		birthday.setFullYear(year);
		birthday.setMonth(month - 1);
		birthday.setDate(day);
		var now = new Date();
		var now_year = now.getFullYear();
		//年月日是否合理
		if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day){
			//判断年份的范围（3岁到100岁之间)
			var time = now_year - year;
			if(!(time >= 3 && time <= 100)){
				return false;
			}
		}else{
			return false;
		}
	}
	//检验位的检测
	//15位转18位
	if(strValue.length == 15){
	   var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	   var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	   var cardTemp = 0, i;
	   strValue = strValue.substr(0, 6) + '19' + strValue.substr(6, strValue.length - 6);
	   for(i = 0; i < 17; i ++){
		   cardTemp += strValue.substr(i, 1) * arrInt[i];
	   }
	   strValue += arrCh[cardTemp % 11];
	}
	if(strValue.length == 18){
	    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	    var cardTemp = 0, i, valnum;
	    for(i = 0; i < 17; i ++){
	    	cardTemp += parseInt(strValue.substr(i, 1)) * arrInt[i];
	    }
	    valnum = arrCh[cardTemp % 11];
	    if (!(valnum == strValue.substr(17, 1))){
	       return false;
	    }
	}
	return true;
}

/**
 * 校验车牌号
 * @param gets
 * @param obj
 * @param curform
 * @param regxp
 * @returns {Boolean}
 */
export function validPlateNo(gets,obj,curform,regxp){
	var city = {
			 "辽":["A","B","C","D","E","F","G","H","J","K","L","M","N","P","V"],
			 "川":["A","B","C","D","E","F","H","J","K","L","M","Q","R","S","T","U","V","W","X","Y","Z"],
			 "陕":["A","B","C","D","E","F","G","H","J","K","U","V"],
			 "豫":["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","U"],
			 "皖":["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S"],
			 "贵":["A","B","C","D","E","F","G","H","J"],
			 "新":["A","C","D","E","F","G","H","J","K","L","M","N","P","Q","R"],
			 "京":["A","B","C","E","F","G","H"],
			 "鲁":["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","U","V"],
	         "冀":["A","B","C","D","E","F","G","H","J","R","T"],
	         "吉":["A","B","C","D","E","F","G","H","J"],
	         "桂":["A","B","C","D","E","F","G","H","J","K","L","M","N","P","R"],
	         "蒙":["A","B","C","D","E","F","G","H","J","K","L","M"],
	         "粤":["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"],
	         "苏":["A","B","C","D","E","F","G","H","J","K","L","M","N"],
	         "渝":["A","B","C","F","G","H"],
	         "湘":["A","B","C","D","E","F","G","H","J","K","L","M","N","U"],
	         "云":["A","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S"],
	         "晋":["A","B","C","D","E","F","H","J","K","L","M"],
	         "黑":["A","B","C","D","E","F","G","H","J","K","L","M","N","P","R"],
	         "鄂":["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S"],
	         "赣":["A","B","C","D","E","F","G","H","J","K","L","M"],
	         "闽":["A","B","C","D","E","F","G","H","J","K"],
	         "宁":["A","B","C","D"],
	         "浙":["A","B","C","D","E","F","G","H","J","K","L"],
	         "琼":["A","B","C","D","E"],
	         "甘":["A","B","C","D","E","F","G","H","J","K","L","M","N","P"],
	         "藏":["A","B","C","D","E","F","G","H","J"],
	         "沪":["A","B","C","D"],
	         "津":["A","B","C","E"],
	         "青":["A","B","C","D","E","F","G","H"]
	};
	var plateno = gets;
	if(plateno.length==7){
		var arr= city[plateno.substring(0,1)];
		var second=plateno.substring(1,2);
		var num = plateno.substring(2,7);
		if(arr!=undefined && arr!=null){
			var bool = false;
			for(var i=0;i<arr.length;i++){
				if(arr[i]==second){
					//查询到该城市
					bool= true;
					break;
				}
			}
			if(bool){
				//\u4e00-\u9fa5---不能为中文吧
				console.log("num:"+num);
				var platenoReg=(/^([0-9a-zA-Z]+)$/);
				if(platenoReg.test(num) && num.indexOf("O")=="-1" && num.indexOf("I")=="-1"){
					return true;
				}
			}
		}
	}
	return false;
}

/**
 * 校验识别码
 * @param gets
 * @param obj
 * @param curform
 * @param regxp
 */
export function validVin(gets, obj, curform, regxp){
	var Arr = new Array();
	var Brr = new Array();
	Arr['A'] = 1;
	Arr['B'] = 2;
	Arr['C'] = 3;
	Arr['D'] = 4;
	Arr['E'] = 5;
	Arr['F'] = 6;
	Arr['G'] = 7;
	Arr['H'] = 8;
	Arr['J'] = 1;
	Arr['K'] = 2;
	Arr['L'] = 3;
	Arr['M'] = 4;
	Arr['N'] = 5;
	Arr['P'] = 7;
	Arr['R'] = 9;
	Arr['S'] = 2;
	Arr['T'] = 3;
	Arr['U'] = 4;
	Arr['V'] = 5;
	Arr['W'] = 6;
	Arr['X'] = 7;
	Arr['Y'] = 8;
	Arr['Z'] = 9;
	Arr['1'] = 1;
	Arr['2'] = 2;
	Arr['3'] = 3;
	Arr['4'] = 4;
	Arr['5'] = 5;
	Arr['6'] = 6;
	Arr['7'] = 7;
	Arr['8'] = 8;
	Arr['9'] = 9;
	Arr['0'] = 0;
	Brr[1]=8;
	Brr[2]=7;
	Brr[3]=6;
	Brr[4]=5;
	Brr[5]=4;
	Brr[6]=3;
	Brr[7]=2;
	Brr[8]=10;
	Brr[9]=0;
	Brr[10]=9;
	Brr[11]=8;
	Brr[12]=7;
	Brr[13]=6;
	Brr[14]=5;
	Brr[15]=4;
	Brr[16]=3;
	Brr[17]=2;
	var sVIN= gets;
	var sKYZF="ABCDEFGHJKLMNPRSTUVWXYZ1234567890";
	var sJYW ='';
	var bl = false;
	var blKYZF = false;
	if (sVIN.length == 17)
	{
	var iJQS=0,intTemp=0;
	ht = Arr;
	htZM = Brr;
	try
	{
	for (var i = 0; i <sVIN.length; i++)
	{
	if (sKYZF.indexOf(sVIN.substr(i, 1)) != -1)
	{
	blKYZF = true;
	iJQS = iJQS + parseInt(ht[sVIN.substr(i, 1)]) * parseInt(htZM[(i + 1)]);
	}
	else
	{
	blKYZF = false;
	break;
	}
	}
	if (blKYZF)
	{
	intTemp = iJQS%11;
	if (intTemp == 10)
	{
	sJYW = "X";
	}
	else
	{
	sJYW = intTemp.toString();
	}
	if (sJYW == sVIN.substr(8, 1)) bl = true;
	}
	else
	{
	bl = false;
	}
	}
	catch(err)
	{
	bl = false;
	}
	}
	return bl;
}

/**
 * 校验银行卡号可为空
 * @param gets
 * @param obj
 * @param curform
 * @param regxp
 */
export function validBankCardCouldNull(strValue, obj, curform, regxp){
	if(strValue==""){
		return true;
	}else{
		strValue = $.trim(strValue);
		if(!isNumeric(strValue)){
			return false;
		}
		var length = strValue.length;
		if (length < 12) {
			return false;
		}else if (length > 19 || length == 18) {
			return true;
		}
		var flag = true;
		var iRet = 0,i = 0,mark = 0,temp = 0;
		while(i < (length - 1)){
			mark += parseInt(strValue.charAt(i));
		    i ++;
		    temp = parseInt(strValue.charAt(i)) * 2;
		    i ++;
		    mark = Math.floor(temp / 10) + temp % 10;
		}
		if(mark % 10 == 0){
			flag = true;
		}else{
			flag = parseInt(strValue.charAt(length - 1)) == (10 - mark % 10);
		}
		if(!flag){
			//开头6位
			var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,63,64,65,68,69,84,87,88,90,91,92,93,94,95,96,97,98,99";
			if (strBin.indexOf(strValue.substring(0, 2)) == -1) {
				return false;
			}
			var lastNum = strValue.substr(strValue.length - 1, 1);    //取出最后一位（与luhm进行比较）
			var first15Num = strValue.substr(0, strValue.length - 1); //前15或18位
			var newArr = [];
			for ( var i = first15Num.length - 1; i > -1; i --) { //前15或18位倒序存进数组
				newArr.push(first15Num.substr(i, 1));
			}
			var arrJiShu = []; //奇数位*2的积 <9
			var arrJiShu2 = []; //奇数位*2的积 >9
			var arrOuShu = []; //偶数位数组
			for ( var j = 0; j < newArr.length; j++) {
				if ((j + 1) % 2 == 1) {//奇数位
					if (parseInt(newArr[j]) * 2 < 9)
						arrJiShu.push(parseInt(newArr[j]) * 2);
					else
						arrJiShu2.push(parseInt(newArr[j]) * 2);
				} else
					//偶数位
					arrOuShu.push(newArr[j]);
			}
			var jishu_child1 = [];//奇数位*2 >9 的分割之后的数组个位数
			var jishu_child2 = [];//奇数位*2 >9 的分割之后的数组十位数
			for ( var h = 0; h < arrJiShu2.length; h++) {
				jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
				jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
			}
			var sumJiShu = 0; //奇数位*2 < 9 的数组之和
			var sumOuShu = 0; //偶数位数组之和
			var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
			var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
			var sumTotal = 0;
			for ( var m = 0; m < arrJiShu.length; m++) {
				sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
			}
			for ( var n = 0; n < arrOuShu.length; n++) {
				sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
			}
			for ( var p = 0; p < jishu_child1.length; p++) {
				sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
				sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
			}
			//计算总和
			sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu)
					+ parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
			//计算Luhm值
			var k = parseInt(sumTotal) % 10 == 0 ? 10
					: parseInt(sumTotal) % 10;
			var luhm = 10 - k;
			flag = (lastNum == luhm || luhm % lastNum == 0 || lastNum % luhm == 0 );
		}
		return flag;
	}
}

/**
 * 校验出现电话
 */
export function validCardPhone(gets,obj,curform,regxp){
	if(gets==""){
		return true;
	}else{
		var nReg= (/^[0-9]{5,11}$/);
		if(nReg.test(gets)){
			return true;
		}else{
			return false;
		}
	}
}

export function parseString(str){
	var index = str.length/3;
	var replaceStr = str.substring(index,index*2);
	var specialStr = "";
	for(var i=0;i<replaceStr.length;i++){
		specialStr +="*";
	}
	str = str.replace(replaceStr,specialStr);
	return str;
}

// 初始化登录状态
export function initLoginStatus(callBackFunc){
  if(callBackFunc){
  }
	var _userAccount = localStorage.getItem("_userAccount");
	var userInfo = sessionStorage.getItem("userInfo");
	if(!callBackFunc && userInfo){

	}else if(_userAccount){
		_userAccount = JSON.parse(_userAccount);
		var userName = _userAccount._userName;
		var passWord = _userAccount._passWord;
		$.post(GLOBALURL.COMMON_QUERYEKEY_URL,{"keyType":"rsa"},function(data){
				if(data.statusCode == 0){
					var result = data.value;
					var modulus = result.modulus;
					var publicExponent = result.publicExponent;
					var loginPassword = rsaEncrypt(publicExponent,modulus,$.trim(passWord));
					$.post(GLOBALURL.LOGIN_ULOGIN_URL,{"userPhonenumber":userName,"loginPassword":loginPassword,"platform":"3"},function(data){
							if(data.statusCode == 0){
							   var userInfo = data.userInfo;
                 var isDriver = data.isDriver;
                 sessionStorage.setItem("_isDriver",isDriver);
							   if(userInfo){
								   var userInfo_ = JSON.stringify(userInfo);
								   sessionStorage.setItem("userInfo",userInfo_);
								   var _userAccount = {
									   "_userName":userName,
									   "_passWord":passWord
								   };
								   localStorage.setItem("_userAccount",JSON.stringify(_userAccount));
								   if(callBackFunc){
									   callBackFunc();
								   }else{
									   $("#toggle .user-h-img img").attr('src',userInfo.userinfo.userinfoprofileimageurl?userInfo.userinfo.userinfoprofileimageurl:logoSrc);
								     $("#toggle .user-name").html(userInfo.userinfo.userinfoname);
								   }
							   }
							}else{
                sessionStorage.removeItem('userInfo');
                localStorage.removeItem('_userAccount');
							}
					},"json");
				}else{
          sessionStorage.removeItem('userInfo');
          localStorage.removeItem('_userAccount');
				}
		},"json");
	}
}
