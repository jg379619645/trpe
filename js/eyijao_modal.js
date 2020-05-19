var _scriptFolder =''; //目录地址url
var e = new Dmodal();
//自动加载样式和sdk文件
(function () {
	var script = document.getElementsByTagName('script');
    url = script[script.length - 1].src.split('?')[0];
	_scriptFolder = url.substring(0, url.lastIndexOf("/") + 1);
	$("<link>").attr({ rel: "stylesheet", type: "text/css", href: _scriptFolder + "eyijiaoModal.css" }).appendTo("head")
})();
function Dmodal(){
	var _this = this;
	// 全屏遮罩背景
	var q_modal = $('<div class="eyijiao_modal eyijiao_modal--visible"></div>');
	_this.HalfDialog = function(obj){
		obj.time = obj.time!=undefined&&obj.time!=null&&obj.time!=''?obj.time:'200';
		q_modal.html('')
		var cancelTexts = obj.cancelText!=null&&obj.cancelText!=''?obj.cancelText:'取消';
		var confirmTexts = obj.confirmText!=null&&obj.confirmText!=''?obj.confirmText:'确定';
		var dialogBak = $('<div class="eyijiao_modal_mack"></div>');
		var dialogBox = $('<div class="eyijiao_modal_con"></div>');
		var dialogTitle = $('<div class="eyijiao_modal_title"></div>');
		var dialogTitle1 = $('<label class="eyijiao_modal_title_label">'+obj.title+'</label>');
		var dialogTitleClose = $('<a href="javascript:;" class="eyijiao_modal_icon_btn eyijiao_modal_close"></a>').on('click',function(){
			setTimeout(function(){
				obj.cancel()
			},100)
			mateSlide(q_modal,obj.time)
		});
		var dialogBoxCon = $('<div class="eyijiao_modal_con_bd"><div>');
		var dialogBtn = $('<div class="eyijiao_modal_con_bot eyiijao_between"><div>');
		if(obj.cancelHide==undefined || !obj.cancelHide){
			var dialogBtnCon1 = $('<a href="javascript:;" class="eyijiao_modal_btn eyijiao_default">'+cancelTexts+'</a>').on('click',function(){
				setTimeout(function(){
					obj.cancel()
				},100)
				mateSlide(q_modal,obj.time)
			});
		}
		if(obj.confirmHide==undefined || !obj.confirmHide){
			var dialogBtnCon2 = $('<a href="javascript:;" class="eyijiao_modal_btn">'+confirmTexts+'</a>').on('click',function(){
				setTimeout(function(){
					obj.confirm()
				},100)
				mateSlide(q_modal,obj.time)
			});
		}
		dialogBtn.append(dialogBtnCon1)
		dialogBtn.append(dialogBtnCon2)
		dialogTitle.append(dialogTitle1);
		dialogTitle.append(dialogTitleClose);
		dialogBoxCon.append(obj.content);
		dialogBox.append(dialogTitle);
		dialogBox.append(dialogBoxCon);
		dialogBox.append(dialogBtn);
		q_modal.append(dialogBak);
		q_modal.append(dialogBox);
		$('body').append(q_modal);
		$(".eyijiao_modal_mack").on('click',function(){
			setTimeout(function(){
				obj.cancel()
			},100)
			mateSlide(q_modal,obj.time)
		});
		var modalHei = $(".eyijiao_modal_con").height();
		$(".eyijiao_modal_con").css('bottom',-modalHei);
		var titleHei = $(".eyijiao_modal_title_label").height();
		if(obj.cancelHide && obj.confirmHide){
			$(".eyijiao_modal_con_bd").css('max-height',modalHei-titleHei);
			dialogBtn.remove()
		}else{
			$(".eyijiao_modal_con_bd").css('max-height',modalHei-(titleHei+61));
		}
		$(".eyijiao_modal_con").animate({ 
		    bottom: "0", 
		}, obj.time);
	}
}
function mateSlide(inWin,time){
	var obJect = inWin.find(".eyijiao_modal_con");
	var obJectOne = inWin.find(".eyijiao_modal_mack");
	var obHei = obJect.height();
	obJect.animate({ 
	    bottom: -obHei, 
	}, time);
	obJectOne.animate({ 
	    opacity: 0, 
	}, time);
	setTimeout(function(){
		inWin.remove()
	},time)
}
