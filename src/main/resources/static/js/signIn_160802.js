try{
    document.domain='dangdang.com';
} catch(err){}

var DDLoginGlobalVar = {
		email: '',
		request_from: 1
};
var DDLoginHandle = {
		getLoginPan: function(email){
			var url = 'login_core.php?'
//			+'request_from=1' 
//			+ '&email=' + email 
			+ '&t=' + new Date().getTime()
			+ "&jsoncallback=?";
			jQuery.getScript(url);
		},
		getCheatProof: function(){//��ȡ��թƭ�İ�
	    	jQuery.ajax({
	            type: 'POST',
	            url: 'p/mix_cheat_proof.php?source=loginTop',
	            async: true,
	            dataType: 'json',
	            success: function (res) {
	            	if (res) {
	            		var $cheatProofDiv = jQuery('#J_cheatProofTop');
	            		if(res.cheatProof_display==='block' && res.cheatProof){
	            			//��ȡ����թ�ӿ�������ʾ�ӿ�����,������ʾĬ������
	            			if(res.cheatProof.errorCode==='0'){
	            				$cheatProofDiv.html(res.cheatProof.res);
	            			}
	            			$cheatProofDiv.css({'display':'block'});
	            		}
	            		return true;
	            	}else{
	            		return false;
	            	}
	            }
	        });
		},
		//������ж��Ƿ�ΪIE
    	myBrowser: function (){
    	    var userAgent = navigator.userAgent; //ȡ���������userAgent�ַ���
    	    //alert(userAgent);
    	    //�ж��Ƿ�IE�����
    	    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && userAgent.indexOf("Trident/4.0") > -1) {
    	        var IE5 = IE55 = IE6 = IE7 = IE8 = false;
    	        //MSIE 8.0; Windows NT 5.1; Trident/4.0
    	        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    	        reIE.test(userAgent);
    	        var fIEVersion = parseFloat(RegExp["$1"]);
    	        IE55 = fIEVersion == 5.5;
    	        IE6 = fIEVersion == 6.0;
    	        IE7 = fIEVersion == 7.0;
    	        IE8 = fIEVersion == 8.0;
    	        if (IE55) {
    	            return "IE55";
    	        }
    	        if (IE6) {
    	            return "IE6";
    	        }
    	        if (IE7) {
    	            return "IE7";
    	        }
    	        if (IE8) {
    	            return "IE8";
    	        }
    	    }//isIE end
    	    return 'no IE';
    	}//myBrowser() end
};
jQuery(document).ready(function(){
	//IE8�¹�治��ʾ����
//	var brwose = DDLoginHandle.myBrowser();
//	if (brwose == "IE8") {
//		jQuery('#J_loginTopAd').hide();
//		jQuery('#J_loginTopAdIE8').attr('src','p/get_login_ad.php');//��src���Ը���Ϊ'6.jpg';
//		jQuery('#J_loginTopAdIE8').show();
//	}else{
//		jQuery('#J_loginTopAdIE8').hide();
//		jQuery('#J_loginTopAd').show();
//	}
	
	//��ʾͷ������թ�İ�
	DDLoginHandle.getCheatProof();
	DDLoginGlobalVar.email = jQuery('#J_cookie_email').val();
	//��ʾ��¼���
	DDLoginHandle.getLoginPan();
    //��թƭ���ֲ�ر�
    jQuery('#J_loginMaskClose').click(function(){
    	jQuery('#J_loginMask').hide();
    });    
});