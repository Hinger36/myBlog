(function () {
	'use strict'
	/*事件绑定*/
	function addEvent(ele, event, handle) {
		if (ele.addEventListener) {
			ele.addEventListener(event, handle, false);
		} else if (ele.attachEvent) {
			ele.attachEvent('on' + event, function () {
				handle.call(this);
			})	
		} else {
			ele['on' + event] = handle;
		}
	}
	/*原生ajax封装*/
	var my = {
		createXHR: function () {
			if (window.XMLHttpRequest) {
				//IE7+、Firefox、Opera、Chrome 和Safari  
				return new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				//IE6 及以下
				return new ActiveXObject('Microsoft.XMLHTTP');
			} else {
				throw new Error('浏览器不支持XHR对象！');
			}
		},

		ajax: function (obj) {
			if (obj.dataType === 'json') {
				var xhr = this.createXHR();
				//通过使用JS随机字符串解决IE浏览器第二次默认获取缓存的问题 
				obj.url = obj.url + '?rand=' + Math.random();
				//通过params()将名值对转换成字符串
				obj.data = this.formatParams(obj.data);

				if (obj.type === 'get') {
					obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data: '&' + obj.data;
				}
				if(obj.async === true) {
					//使用异步调用的时候，需要触发readystatechange 事件  
					xhr.onreadystatechange = function () {
						/**
						 * 0: 请求未初始化
						 * 1: 服务器连接已建立
						 * 2: 请求已接收
						 * 3: 请求处理中
						 * 4: 请求已完成，且响应已就绪
						 */
						if (obj.readyState === 4) {
							callback();
						}
					};
				}
				//在使用XHR对象时，必须先调用open()方法，  
	            //它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
	            xhr.open(obj.type, obj.url, obj.async);
	            if (obj.type === 'post') {
	            	//post方式需要自己设置http的请求头，来模仿表单提交。  
	                //放在open方法之后，send方法之前。
	                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	                //post方式将数据放在send()方法里
	                xhr.send(obj.data);
	            } else {
	            	//get方式则填null  
	            	xhr.send(null);
	            }
	            if (obj.async === false) {
	            	callback();
	            }

	            var callback = function () {
	            	if(xhr.status === 200) {
	            		obj.success(xhr.responseText);
	            	} else {
	            		alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
	            	}
	            };
			} else if (obj.dataType === 'jsonp') {
				var Head = document.getElementsByTagName('head')[0];
				var Script = document.createElement('script');
				var callbackName = 'callback' + +new Date();
				var params = this.formatParams(obj.data) + '&callback=' + callbackName;     //按时间戳拼接字符串

				//拼接好src  
	            oScript.src = obj.url.split("?") + '?' + params;  
	            //插入script标签  
	            oHead.insertBefore(oScript, oHead.firstChild);  
	            //jsonp的回调函数  
	            window[callbackName] = function(json){  
	                var callback = obj.success;  
	                callback(json);  
	                oHead.removeChild(oScript); 
	            };   
			}
		},
		formatParams : function(data){  
	        var arr = [];  
	        for(var i in data){  
	            //特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理  
	            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));  
	        }  
	        return arr.join('&');  
	    }  
	};

	//登录注册切换
	function login () {
		var login = document.getElementsByClassName('login');
		var user = document.getElementsByClassName('user')
		var quit = document.getElementsByClassName('quit');
		var Register = document.getElementsByClassName('Register');
		for (let i = 0; i < quit.length; i++) {
			addEvent(quit[i], 'click', function () {
				login[i].style.display = 'none';
			}, false);
			addEvent(Register[i], 'click', function () {
				login[i].style.display = 'none'
				if (i === 0) {
					login[1].style.display = 'block';
				} else {
					login[0].style.display = 'block'
				}			
			}, false);
		}		
		addEvent(user[0], 'click', function () {
			login[0].style.display = 'block';
		}, false);
	}
	//ajax表单提交
	function userReq() {
		var login = document.getElementById('idlogin');
		var reglogin = document.getElementById('idreglogin');
		
		addEvent(reglogin.getElementsByTagName('button')[0], 'click', function () {
			//通过ajax提交请求
			my.ajax({
				type: 'post',
				url: 'api/user/register',
				data: {
					username: reglogin.getElementsByTagName('input')[0].value,
					password: reglogin.getElementsByTagName('input')[1].value,
					repassword: reglogin.getElementsByTagName('input')[2].value
				},
				async: true,
				dataType: 'json',
				success: function (result) {
					console.log('result');
				}
			});
			
		})
		


	}
	userReq()
	login ();
	
	




})();