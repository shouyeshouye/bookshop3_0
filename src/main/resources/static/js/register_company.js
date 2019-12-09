//(function () {
	var usernameIsOk = false;
	var passwordIsOk = false;
	var rePasswordIsOk = false;
	var companyNameIsOk = false;
	var emailIsOk = false;
	var areaCodeIsOk = false;
	var telephoneIsOk = false;
	var telExtensionIsOk = true; //����Ϊ��
	var companyAddrIsOk = false;
	var linkmanIsOk = false;
	var mobileIsOk = false;
	var vcodeIsOk = false;
	var mobileCodeIsOk = false;
	var agreementIsOk = true;
	var isUpdatePhone = false; //��֤�ֻ���绰�����Ƿ���£������û����������������
	var oldMobile = '';//��¼��һ����֤�绰�������жϵ绰�Ƿ�仯
	var getMoblieCodeInterval = 120; //�����»�ȡ�ֻ���֤��ʱ���� ��λ��
	var miao = getMoblieCodeInterval;
	var timeoutrun = 0; //����ʱ������
	var vcodeGenerateTiem ;//����ͼ����֤�����ɵ�ʱ��
	var vcodeOvertimeInterval = 10 * 60 * 1000;//ͼ����֤����Ч��Ϊ10����
	var checkReg = {
	    emailNameReg: /^(([a-zA-Z0-9]+\w*((\.\w+)|(-\w+))*[\.-]?[a-zA-Z0-9]+)|([a-zA-Z0-9]))$/, //ƥ����������
	    emailReg: /^(([a-zA-Z0-9]+\w*((\.\w+)|(-\w+))*[\.-]?[a-zA-Z0-9]+)|([a-zA-Z0-9]))\@[a-zA-Z0-9]+((\.|-)[a-zA-Z0-9]+)*\.[a-zA-Z0-9]+$/, //ƥ������
	    mobileReg: /^1[3,4,5,6,7,8,9][0-9]{9}$/,//ƥ��绰����
	    passwordReg: /^\S{1,20}$/,//ƥ������ ƥ�����зǿհ�
	    numberReg: /^[0-9]*$/,//ƥ������
	    vcodeReg: /^[a-zA-Z0-9]*$/,//ƥ��ͼ����֤��
	    linkmanReg: /^(\w|[\u4E00-\u9FA5]|\s)*$/,//ƥ����ϵ����Ϣ
		upperCaseReg: /[A-Z]/g,
	    companNameReg: /^(\w|[\u4E00-\u9FA5])*$/,//ƥ�� ���� ���� ��ĸ �»���
	    lang_zh: {
	        //�˻���Ϣ
	        '3101' : '4-20���ַ�������Сд��ĸ�����ġ��������',
	        '3102' : '�û�������Ϊ��',
	        '3103' : '���û����ѱ�ʹ�ã�����������û���������ʹ�ø�&nbsp;<a href=\"signin.php?username={#username#}\" name=\"email_login_link\" class=\"more\">�û�����¼</a>',
	        '3104' : '����4���ַ��������������û���',
	        '3105' : '���ֻ��Ϊ20���ַ���10�����֣�',
	        '3106' : '�û�������ȫ��������ɣ�',
	        '3107' : '�û��������д�д��ĸ��',
			'3108' : '�û���ֻ�������֣�Сд��ĸ�ͺ���',
	        '3111' : '����Ϊ6-20���ַ�������Ӣ�ġ����ּ��������',
	        '3112' : '��¼���벻��Ϊ��',
	        '3113' : '���볤��6-20���ַ�������������',
	        '3115' : '���벻�ܰ������ո񡱣�����������',
	        '3116' : '����Ϊ6-20λ�ַ�,ֻ����Ӣ�ġ����ּ��������',
	        '3121' : '���ٴ���������',
	        '3122' : '���벻��Ϊ��',
	        '3123' : '������������벻һ�£�����������',
	        //��ҵ����ϵ����Ϣ
	        '3131' : '����д��λִ���ϵ����ƣ��Ϊ30�����֣�60���ַ���',
	        '3132' : '��˾���Ʋ���Ϊ��',
	        '3133' : '��˾�����ֻ��Ϊ30�����֣�60���ַ���',
	        '3134' : '�ù�˾�����ѱ�ʹ��',
	        '3141' : '��ѡ����д��˾��ַ',
	        '3142' : '��˾��ַ����Ϊ��',
	        '3143' : '��ѡ�������Ĺ�˾��ַ',
	        '3144' : '��˾��ַ�ֻ��Ϊ64�����֣�128���ַ���',
	        '3151' : '���������䣬������д��ҵ����',
	        '3152' : '���䲻��Ϊ��',
	        '3153' : '�����ʽ����ȷ������������',
	        '3154' : '�������ѱ�ע�ᣬ������������䣬��ʹ�ø�&nbsp;<a href=\"signin.php?Email={#Email#}\" name=\"email_login_link\" class=\"more\">�����¼</a>',
	        '3161' : '����������',
	        '3162' : '���Ų���Ϊ��',
	        '3163' : 'ֻ��3-4λ������',
	        '3171' : '������������',
	        '3172' : '�����Ų���Ϊ��',
	        '3173' : 'ֻ��7-8λ������',
	        '3181' : '������ֻ���',
	        '3183' : 'ֻ��������',
	        '3191' : '2-32���ַ����������Ļ�Ӣ�����',
	        '3192' : '��ϵ����������Ϊ��',
	        '3193' : '��ϵ������ֻ��Ϊ2-32���ַ����������������',
	        '3201' : '�������ֻ�����',
	        '3202' : '�ֻ��Ų���Ϊ��',
	        '3203' : '�ֻ��Ÿ�ʽ����ȷ������������',
	        '3204' : '���ֻ�����ע�ᣬ����������ֻ��ţ���ʹ�ø�&nbsp;<a href=\"signin.php?Email={#Email#}\" name=\"mobile_login _link\" class=\"more\">�ֻ��ŵ�¼</a>',
	        '3211' : '����дͼƬ�е��ַ��������ִ�Сд',
	        '3212' : '������ͼ����֤��',
	        '3213' : 'ͼ����֤�������������������',
	        '3214' : 'ͼ����֤����ʧЧ������������',
	        '3221' : '�����������֤��',
	        '3222' : '��֤���ѷ��ͣ���ע�����',
	        '3223' : '�����ֻ������ȡ��֤�����Ƶ��������24Сʱ������',
	        '3224' : '����û���յ����ţ�����24Сʱ�����ԣ��������֤�ֻ�����',
	        '3225' : '���緱æ�����Ժ�����',
	        '3226' : '���»�ȡ��֤��',
	        '3227' : '�����֤���������ø��ֻ���¼���һ�����',
	        '3228' : '��֤�����',
	        '3229' : '�����ֻ������ȡ��֤�����Ƶ������2���Ӻ�����',
	        '3231' : '������ͬ�⵱����������󣬲����ύע�ᡣ',
	        '3241' : 'ע��ʧ�ܣ����Ժ����ԡ�' 
	    },
	    userName: {
	        checkFocus: function(){
	            checkReg.tool.switchInputStyle('normal','J_userName', 'J_tipImgUserName','J_tipInfoUserName');
	            $('#J_tipInfoUserName').html(checkReg.lang_zh['3101']);
	        },
	        checkKeypress: function(){
	        	var username = $.trim($('#J_userName').val());
	            if (username == '') {
	                return false;
	            }
	        	//��ʽ��ȷ����֤
	            var verifyObj = checkReg.tool.VerifyCharLength(username, 20);
	            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
	                checkReg.tool.switchInputStyle('error','J_userName', 'J_tipImgUserName','J_tipInfoUserName');
	                $('#J_tipInfoUserName').text(checkReg.lang_zh['3105']);
	                $('#J_userName').val(username.substr(0,verifyObj.charLen));
	                return false;
	            }else{
	            	checkReg.tool.switchInputStyle('normal','J_userName', 'J_tipImgUserName','J_tipInfoUserName');
	            }
	        },	    
	        checkUsername: function(){
	            usernameIsOk = false;
	            var usernameExist = false;
	            checkReg.tool.switchInputStyle('normal','J_userName', 'J_tipImgUserName','J_tipInfoUserName');
	            
	            var username = $.trim($('#J_userName').val());
	            if (username == '') {
	                return false;
	            }
	            
	            //��ʽ��ȷ����֤
	            var verifyObj = checkReg.userName.VerifyFormatUserName(username);
	            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
	                checkReg.tool.switchInputStyle('error','J_userName', 'J_tipImgUserName','J_tipInfoUserName');
	                $('#J_tipInfoUserName').text(verifyObj.errorInfo);
	                return false;
	            }
	            //Ψһ����֤
	            $.ajax({
	                type: 'POST',
	                url: 'p/nickname_checker.php',
	                data: 'nickname=' + username,
	                async: false,
	                cache: false,
	                success: function (flg) {
	                    if (flg == "true") {
	                        checkReg.tool.switchInputStyle('error','J_userName', 'J_tipImgUserName','J_tipInfoUserName');
	                        $('#J_tipInfoUserName').html(checkReg.lang_zh['3103'].replace('{#username#}', username));
	                        usernameExist = true;
	                        return false;
	                    }
	                },
	                error: function(){
	                	return false;
	                }
	            });
	            if (usernameExist == true) {
	                return false;
	            }
	            checkReg.tool.switchInputStyle('ok','J_userName', 'J_tipImgUserName','J_tipInfoUserName');
	            usernameIsOk = true;
	            return true;
	        },	            
	        VerifyFormatUserName: function(str){
	            var errorInfo = ''; 
	            var textFlag = false;
	            var verifyObj = {"flag": textFlag, "errorInfo":""};
	
	            if (str && str!=''){
	                if (GetCharLength(str)<4){
	                    errorInfo = checkReg.lang_zh['3104'];
	                    textFlag = false;
	                }else if(GetCharLength(str)>20){
	                    errorInfo = checkReg.lang_zh['3105'];
	                    textFlag = false;
	                }
	                else if(checkReg.numberReg.test(str)){
	                    errorInfo = checkReg.lang_zh['3106'];
	                    textFlag = false;
	                }else if(checkReg.upperCaseReg.test(str)){
	                    errorInfo = checkReg.lang_zh['3107'];
	                    textFlag = false;
	                }else{
	                    if(str.match(checkReg.companNameReg)){
	                        textFlag = true;
	                    } else {
	                        errorInfo = checkReg.lang_zh['3108'];
	                        textFlag = false;
	                    }
	                }
	                verifyObj = {"flag": textFlag, "errorInfo": errorInfo};                
	            }
	            return verifyObj;
	        }//end VerifyFormatUserName
	    },
	    password: {
	        checkPasswordFocus: function() {
	            checkReg.tool.switchInputStyle('normal','J_password', 'J_tipImgPassword', 'J_tipInfoPassword');
	            $('#J_tipInfoPassword').html(checkReg.lang_zh['3111']);
	            $('#J_tipUpperCaseBox').hide();//��д��������
	            $('#spnPwdStrongTips').hide(); //����ǿ������
	        },
	        checkPasswordInput: function() {
	            if($('#J_tipUpperCaseBox').is(':hidden')){
	                checkReg.tool.switchInputStyle('normal','J_password', 'J_tipImgPassword', 'J_tipInfoPassword');
	                $('#J_tipInfoPassword').hide();
	                $('#spnPwdStrongTips').hide();
	                
	                var passwordVal = $('#J_password').val();
	                var passwordLen = passwordVal.length;
	                if ( passwordLen==0 ) {
	                    $('#J_tipInfoPassword').show().html(checkReg.lang_zh['3111']);                
	                    return false;
	                }
	                //���볤��С��6�ǣ�����ǿ����ʾΪ���
	                if ( passwordLen<6 ) {
	                    $('#spnPwdStrongTips').show();
	                    $('.j_pwdStrong').hide();
	                    $('#spnPwdStrong1').show();   
	                    return false;
	                }
	                
	                if ( passwordLen>20 ){
	                    checkReg.tool.switchInputStyle('error','J_password', 'J_tipImgPassword', 'J_tipInfoPassword');                    
	                    $('#J_tipInfoPassword').html(checkReg.lang_zh['3113']);
	                    return false;
	                }
	                //����ǿ�ȴ���
	                var chenum = checkReg.password.checkStrong(passwordVal);
	                if (chenum == 0) {
	                    return false;
	                } else if (chenum == 1) {
	                    $('.j_pwdStrong').hide();
	                    $('#spnPwdStrong1').show();
	                } else if (chenum == 2) {
	                    $('.j_pwdStrong').hide();
	                    $('#spnPwdStrong2').show();
	                } else if (chenum >= 3) {                   
	                    $('.j_pwdStrong').hide();
	                    $('#spnPwdStrong3').show();
	                }
	                $('#spnPwdStrongTips').show();
	                checkReg.tool.switchInputStyle('ok','J_password', 'J_tipImgPassword', 'J_tipInfoPassword');
	                return true;
	            }
	        },
	        checkPassword: function() {
	            checkReg.tool.switchInputStyle('normal','J_password', 'J_tipImgPassword', 'J_tipInfoPassword');
	            $('#spnPwdStrongTips').hide();
	            $("#J_tipUpperCaseBox").hide();
	            $("#J_tipInfoPassword").show();
	            
	            passwordIsOk = false;            
	            var passwordVal = $('#J_password').val();
	            var passwordLen = passwordVal.length;
	            if (passwordLen == 0) {
	                return false;
	            }
	            if (passwordLen < 6 || passwordLen > 20) {
	                checkReg.tool.switchInputStyle('error','J_password', 'J_tipImgPassword', 'J_tipInfoPassword');
	                $('#J_tipInfoPassword').html(checkReg.lang_zh['3113']);
	                return false;
	            }
	            if (!checkReg.passwordReg.test(passwordVal)) {
	                checkReg.tool.switchInputStyle('error','J_password', 'J_tipImgPassword', 'J_tipInfoPassword');
	                $('#J_tipInfoPassword').html(checkReg.lang_zh['3115']);       
	                return false;
	            }
	            
	            for(var i=0;i<passwordLen;i++){
	                if(passwordVal.charCodeAt(i)>127){
	                    checkReg.tool.switchInputStyle('error','J_password', 'J_tipImgPassword', 'J_tipInfoPassword');
	                    $('#J_tipInfoPassword').html(checkReg.lang_zh['3116']);
	                    return false; 
	                }
	            }
	            if(!checkReg.password.checkPasswordInput()){
	                return false;
	            }
	            passwordIsOk = true;
	            //��ȷ�����벻Ϊ��ʱ�������޸ĺ���һ����֤ȷ������������Ƿ����
	            checkReg.rePassword.checkRePassword();
	            return true; 
	        },
	        checkCapslockOpen: function(e) {//��д��ĸ��֤
	            var  e= window.event || e;
	            var  n= e.keyCode || e.which;
	            var  m= e.shiftKey || (n==16) || false;
	            if (((n >= 65 && n <= 90) && !m) || ((n >= 97 && n <= 122 )&& m)) {
	                $('#spnPwdStrongTips').hide();
	                $('#J_tipInfoPassword').hide();
	                $("#J_tipUpperCaseBox").show();
	            } else if(n >= 97 && n <= 122 && !m){
	                $("#J_tipUpperCaseBox").hide();
	            } else if(n==27){
	                $("#J_tipUpperCaseBox").hide();
	            } else{
	                $("#J_tipUpperCaseBox").hide();
	            }
	        },
	        checkStrong: function(sPW){
	            if (sPW.length < 1){
	                return 0;
	            }
	            var Modes = 0;
	            for (var i = 0; i < sPW.length; i++) {
	                Modes |= Evaluate(sPW.charCodeAt(i));
	            }
	            var num = bitTotal(Modes);
	            return num;
	        }
	    },
	    rePassword: {
	        checkRePasswordFocus: function() {
	            checkReg.tool.switchInputStyle('normal', 'J_repassword', 'J_tipImgRepassword', 'J_tipInfoRepassword');
	            $('#J_tipInfoRepassword').html(checkReg.lang_zh['3121']);
	        },
	        checkRePassword: function() {
	            checkReg.tool.switchInputStyle('normal', 'J_repassword', 'J_tipImgRepassword', 'J_tipInfoRepassword');
	            rePasswordIsOk = false;
	            var passsword = $('#J_password').val();
	            var rep_password = $('#J_repassword').val();
	            if (rep_password == '') {
	                return false;
	            }
	            if (rep_password != passsword) {
	                checkReg.tool.switchInputStyle('error', 'J_repassword', 'J_tipImgRepassword', 'J_tipInfoRepassword');           
	                $('#J_tipInfoRepassword').html(checkReg.lang_zh['3123']);
	                return false;
	            }
	            checkReg.tool.switchInputStyle('ok', 'J_repassword', 'J_tipImgRepassword', 'J_tipInfoRepassword');       
	            rePasswordIsOk = true;
	            return true;
	        }
	    },
	    companyName: {
	        checkCompanyNameFocus: function() {
	            checkReg.tool.switchInputStyle('normal', 'J_companyName', 'J_tipImgCompanyName', 'J_tipInfoCompanyName');
	            $('#J_tipInfoCompanyName').html(checkReg.lang_zh['3131']);
	        },
	        checkKeypress: function(){
	        	var companyName = $.trim($('#J_companyName').val());
	            if (companyName == '') {
	                return false;
	            }
	        	//��ʽ��ȷ����֤
	            var verifyObj = checkReg.tool.VerifyCharLength(companyName, 60);
	            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
	            	checkReg.tool.switchInputStyle('error', 'J_companyName', 'J_tipImgCompanyName', 'J_tipInfoCompanyName');
	                $('#J_tipInfoCompanyName').text(checkReg.lang_zh['3133']);
	                $('#J_companyName').val(companyName.substr(0,verifyObj.charLen));
	                return false;
	            }else{
	            	checkReg.tool.switchInputStyle('normal', 'J_companyName', 'J_tipImgCompanyName', 'J_tipInfoCompanyName');
	            }
	        },
	        checkCompanyName: function(){
	            companyNameIsOk = false;
	            var companyNameExist = false;
	            checkReg.tool.switchInputStyle('normal', 'J_companyName', 'J_tipImgCompanyName', 'J_tipInfoCompanyName');
	            
	            var companyName = $.trim($('#J_companyName').val());            
	            if (companyName == '') {
	                return false;
	            }
	            
	            //��ʽ��ȷ����֤
	            var verifyObj = checkReg.companyName.VerifyFormatCompanyName(companyName);
	            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
	                checkReg.tool.switchInputStyle('error', 'J_companyName', 'J_tipImgCompanyName', 'J_tipInfoCompanyName');
	                $('#J_tipInfoCompanyName').text(verifyObj.errorInfo);
	                return false;
	            }
	            
	            //Ψһ����֤
	            $.ajax({
	                type: 'POST',
	                url: 'p/enterprise_checker.php?',
	                data: 'enterprise_name=' + companyName,
	                async: false,
	                cache: false,
	                success: function (flg) {
	                    if (flg == "true") {
	                    	checkReg.tool.switchInputStyle('error', 'J_companyName', 'J_tipImgCompanyName', 'J_tipInfoCompanyName');
	                        $('#J_tipInfoCompanyName').html(checkReg.lang_zh['3134']);
	                        companyNameExist = true;
	                        return false;
	                    }
	                }
	            });            
	            
	            if (companyNameExist == true) {
	                return false;
	            }
	            checkReg.tool.switchInputStyle('ok', 'J_companyName', 'J_tipImgCompanyName', 'J_tipInfoCompanyName');
	            companyNameIsOk = true;
	            return true;
	        },
	        VerifyFormatCompanyName: function(str){
	            var errorInfo = ''; 
	            var textFlag = false;
	            var verifyObj = {"flag": textFlag, "errorInfo":""};
	
	            if (str && str!=''){
	                if (GetCharLength(str)>60){
	                    errorInfo = checkReg.lang_zh['3133'];
	                    textFlag = false;
	                }else{
	                    textFlag = true;
	                }
	                verifyObj = {"flag": textFlag, "errorInfo": errorInfo};                
	            }
	            return verifyObj;
	        }//end VerifyFormatCompanyName
	    },
	    companyAddress: {
	        checkAddSelFocus: function(){
	            checkReg.tool.switchInputStyle('normal', '', 'J_tipImgAddr', 'J_tipInfoAddr');
	        },
	        checkAddrDetailFocus: function(){
	            checkReg.tool.switchInputStyle('normal', 'addr_detail', 'J_tipImgAddr', 'J_tipInfoAddr');
	            $('#J_tipInfoAddr').html(checkReg.lang_zh['3141']);           
	        },
	        checkKeypress: function(){
	        	var addrDetail = $.trim($('#addr_detail').val());
	            if (addrDetail == '') {
	                return false;
	            }
	        	//��ʽ��ȷ����֤
	            var verifyObj = checkReg.tool.VerifyCharLength(addrDetail, 128);
	            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
	            	checkReg.tool.switchInputStyle('error', 'addr_detail', 'J_tipImgAddr', 'J_tipInfoAddr');
	                $('#J_tipInfoAddr').text(checkReg.lang_zh['3144']);
	                $('#addr_detail').val(addrDetail.substr(0,verifyObj.charLen));
	                return false;
	            }else{
	            	checkReg.tool.switchInputStyle('normal', 'addr_detail', 'J_tipImgAddr', 'J_tipInfoAddr');
	            }
	        },
	        check_country_province_city: function(){
	        	companyAddrIsOk = false;
	            checkReg.tool.switchInputStyle('normal', '', 'J_tipImgAddr', 'J_tipInfoAddr');
	            var $tipInfoAddr = $('#J_tipInfoAddr');            
	            if ($('#quarter_id').is(':visible') && $('#quarter_id').val() == '0'){                
	                //$tipInfoAddr.html(checkReg.lang_zh['3143']);
	                return false;
	            }
	            if ($('#town_id').is(':visible') && $('#town_id').val() == '0'){
	                //$tipInfoAddr.html(checkReg.lang_zh['3143']);
	                return false;
	            }
	            if ($('#city_id').is(':visible') && $('#city_id').val() == '0'){
	                //$tipInfoAddr.html(checkReg.lang_zh['3143']);
	                return false;
	            }
	            if ($('#province_id').is(':visible') && $('#province_id').val() == '0'){
	                //$tipInfoAddr.html(checkReg.lang_zh['3143']);
	                return false;
	            }
	            if ($('#addr_detail').val() == ''){
	                //$tipInfoAddr.html(checkReg.lang_zh['3143']);
	                return false;
	            }
	            companyAddrIsOk = true;
	            checkReg.tool.switchInputStyle('ok', '', 'J_tipImgAddr', 'J_tipInfoAddr');
	            return true;
	        },
	        setSelList: {
	            set_city: function(province){
	                if (province == 0){//��ѡֵʱ�������ʼ��
	                	clearSelect('city_id', 'show', '��ѡ��');
	                	clearSelect('town_id', 'show', '��ѡ��');
	                	clearSelect('quarter_id', 'hide', '��ѡ��'); 
	                    return;
	                }
	            
	                var region = get_region(province);
	                if (region[0].statusCode != 0){//��ʾ���б���������
	                	clearSelect('quarter_id', 'hide', '��ѡ��');
	                    clearSelect('town_id', 'hide', '��ѡ��');
	                    clearSelect('city_id', 'hide', '��ѡ��');
	                } else {
	                	clearSelect('town_id', 'show', '��ѡ��');
	                	clearSelect('quarter_id', 'hide', '��ѡ��');
	                    set_options('city_id', region, '��ѡ��');
	                }
	            },
	            set_town: function(city){
	                if (city == 0){//��ѡֵʱ�������ʼ��
	                	clearSelect('town_id', 'show', '��ѡ��');
	                	clearSelect('quarter_id', 'hide', '��ѡ��'); 
	                    return;
	                }
	            
	                var region = get_region(city);   
	                if (region[0].statusCode != 0) {//��ʾ���б���������
	                	clearSelect('quarter_id', 'hide', '��ѡ��');
	                    clearSelect('town_id', 'hide', '��ѡ��');
	                } else {
	                	clearSelect('quarter_id', 'hide', '��ѡ��'); 
	                    set_options('town_id', region, '��ѡ��');
	                }
	            },
	            set_quarter: function(town){
	                if (town == 0){//��ѡֵʱ�������ʼ��
	                	clearSelect('quarter_id', 'hide', '��ѡ��'); 
	                    return;
	                }            
	                var region = get_region(town);                
	                if (region[0].statusCode != 0) {//��ʾ���б���������
	                	clearSelect('quarter_id', 'hide', '��ѡ��');
	                } else {
	                	jQuery('#quarter_id').show();
	                	set_options('quarter_id', region, '��ѡ��');
	                }
	            }
	        }
	    },
	    companyEmail: {
	        checkEmailFocus: function(){
	            checkReg.tool.switchInputStyle('normal','J_email', 'J_tipImgEmail','J_tipInfoEmail');            
	            $('#J_tipInfoEmail').html(checkReg.lang_zh['3151']);
	        },
	        checkEmail: function(){
	            emailIsOk = false;
	            var emailExist = false;
	            checkReg.tool.switchInputStyle('normal','J_email', 'J_tipImgEmail','J_tipInfoEmail');
	            
	            var email = $.trim($('#J_email').val());            
	            if (email == '') {
	                return false;
	            }
	                         
	            if (email.length > 40 || !checkReg.emailReg.test(email)) {
	                checkReg.tool.switchInputStyle('error','J_email', 'J_tipImgEmail','J_tipInfoEmail');
	                $('#J_tipInfoEmail').html(checkReg.lang_zh['3153']);
	                return false;
	            }
	            if (/[ ]/.test(email)) {
	                checkReg.tool.switchInputStyle('error','J_email', 'J_tipImgEmail','J_tipInfoEmail');
	                $('#J_tipInfoEmail').html(checkReg.lang_zh['3153']);
	                return false;
	            }
	            $.ajax({
	                type: 'POST',
	                url: 'p/email_checker.php',
	                data: 'email=' + email,
	                async: false,
	                cache: false,
	                success: function (flg) {
	                    if (flg == "true") {
	                        checkReg.tool.switchInputStyle('error','J_email', 'J_tipImgEmail','J_tipInfoEmail');
	                        $('#J_tipInfoEmail').html(checkReg.lang_zh['3154'].replace('{#Email#}', email));
	                        emailExist = true;
	                        return ;
	                    }
	                }
	            });
	            if (emailExist == true) {
	                return false;
	            }
	            checkReg.tool.switchInputStyle('ok','J_email', 'J_tipImgEmail','J_tipInfoEmail');
	            emailIsOk = true;
	            return true;
	        }
	    },
	    companyTel: {
	        areaCode: {
	            checkAreaCodeFocus: function(){
	                checkReg.tool.switchInputStyle('normal','J_areaCode', 'J_tipImgCompanyTel','J_tipInfoAreaCode');            
	                $('#J_tipInfoAreaCode').html(checkReg.lang_zh['3161']);
	            },
	            checkAreaCode: function(){
	                areaCodeIsOk = false;
	                checkReg.tool.switchInputStyle('normal','J_areaCode', 'J_tipImgCompanyTel','J_tipInfoAreaCode');  
	                
	                var areaCode = $.trim($('#J_areaCode').val());            
	                if (areaCode == '') {
	                    return false;
	                }
	                 
	                var len = areaCode.length;            
	                if (!checkReg.numberReg.test(areaCode) ||(len!=3 && len!=4)) {
	                    checkReg.tool.switchInputStyle('error','J_areaCode', 'J_tipImgCompanyTel','J_tipInfoAreaCode');
	                    $('#J_tipInfoAreaCode').html(checkReg.lang_zh['3163']);
	                    return false;
	                }
	                areaCodeIsOk = true;
	                if(areaCodeIsOk && telephoneIsOk && telExtensionIsOk){
	                    checkReg.tool.switchInputStyle('ok','J_areaCode', 'J_tipImgCompanyTel','J_tipInfoAreaCode');
	                }
	                return true;
	            }
	        },
	        telephone: {
	            checkTelephoneFocus: function(){
	                checkReg.tool.switchInputStyle('normal','J_telphone', 'J_tipImgCompanyTel','J_tipInfoTelphone');            
	                $('#J_tipInfoTelphone').html(checkReg.lang_zh['3171']);
	            },
	            checkTelephone: function(){
	                telephoneIsOk = false;
	                checkReg.tool.switchInputStyle('normal','J_telphone', 'J_tipImgCompanyTel','J_tipInfoTelphone');  
	                
	                var telephone = $.trim($('#J_telphone').val());            
	                if (telephone == '') {
	                    return false;
	                }
	                var len = telephone.length;
	                if (!checkReg.numberReg.test(telephone) || (len!=7 && len!=8)) {
	                    checkReg.tool.switchInputStyle('error','J_telphone', 'J_tipImgCompanyTel','J_tipInfoTelphone');
	                    $('#J_tipInfoTelphone').html(checkReg.lang_zh['3173']);
	                    return false;
	                }
	                telephoneIsOk = true;
	                if(areaCodeIsOk && telephoneIsOk && telExtensionIsOk){
	                    checkReg.tool.switchInputStyle('ok','J_telphone', 'J_tipImgCompanyTel','J_tipInfoTelphone');
	                }
	                return true;
	            }
	        },
	        telExtension: {
	            checkTelExtensionFocus: function(){
	                checkReg.tool.switchInputStyle('normal','J_telExtension', 'J_tipImgCompanyTel','J_tipInfoTelExtension');            
	                $('#J_tipInfoTelExtension').html(checkReg.lang_zh['3181']);
	            },
	            checkTelExtension: function(){
	                telExtensionIsOk = true;
	                checkReg.tool.switchInputStyle('normal','J_telExtension', 'J_tipImgCompanyTel','J_tipInfoTelExtension');  
	                
	                var telExtension = $.trim($('#J_telExtension').val());            
	                if (telExtension == '') {
	                    telExtensionIsOk = true;
	                }else if(!checkReg.numberReg.test(telExtension)) {
	                    checkReg.tool.switchInputStyle('error','J_telExtension', 'J_tipImgCompanyTel','J_tipInfoTelExtension');
	                    $('#J_tipInfoTelExtension').html(checkReg.lang_zh['3183']);
	                    telExtensionIsOk = false;
	                    return false;
	                }
	                if(areaCodeIsOk && telephoneIsOk && telExtensionIsOk){
	                    checkReg.tool.switchInputStyle('ok','J_telphone', 'J_tipImgCompanyTel','J_tipInfoTelphone');
	                }
	                return true;
	            }
	        }
	    },
	    companyLinkman: {
	        checkLinkmanFocus: function(){
	            checkReg.tool.switchInputStyle('normal','J_linkman', 'J_tipImgLinkman','J_tipInfoLinkman');            
	            $('#J_tipInfoLinkman').html(checkReg.lang_zh['3191']);
	        },
	        checkKeypress: function(){
	        	var linkman = $.trim($('#J_linkman').val());
	            if (linkman == '') {
	                return false;
	            }
	        	//��ʽ��ȷ����֤
	            var verifyObj = checkReg.tool.VerifyCharLength(linkman, 32);
	            if(verifyObj && ('flag' in verifyObj) && verifyObj.flag===false){
	            	checkReg.tool.switchInputStyle('error','J_linkman', 'J_tipImgLinkman','J_tipInfoLinkman');  
	                $('#J_tipInfoLinkman').text(checkReg.lang_zh['3193']);
	                $('#J_linkman').val(linkman.substr(0,verifyObj.charLen));
	                return false;
	            }else{
	            	checkReg.tool.switchInputStyle('normal','J_linkman', 'J_tipImgLinkman','J_tipInfoLinkman');
	            }
	        },
	        checkLinkman: function(){            
	            linkmanIsOk = false;
	            checkReg.tool.switchInputStyle('normal','J_linkman', 'J_tipImgLinkman','J_tipInfoLinkman');  
	            
	            var linkman = $.trim($('#J_linkman').val());            
	            if (linkman == '') {
	                return false;
	            }
	            
	            //��ʽ��ȷ����֤
	            var len = GetCharLength(linkman);
	            if (len<2 || len>32){
	                checkReg.tool.switchInputStyle('error','J_linkman', 'J_tipImgLinkman','J_tipInfoLinkman');
	                $('#J_tipInfoLinkman').html(checkReg.lang_zh['3193']);
	                return false;
	            }
	            if (!checkReg.linkmanReg.test(linkman)) {
	                checkReg.tool.switchInputStyle('error','J_linkman', 'J_tipImgLinkman','J_tipInfoLinkman');
	                $('#J_tipInfoLinkman').html(checkReg.lang_zh['3193']);
	                return false;
	            }
	            checkReg.tool.switchInputStyle('ok','J_linkman', 'J_tipImgLinkman','J_tipInfoLinkman');
	            linkmanIsOk = true;
	            return true;
	        }
	    },
	    companyMobile: {
	        checkMobileFocus: function(){
	            checkReg.tool.switchInputStyle('normal','J_mobile', 'J_tipImgMobile','J_tipInfoMobile');
	            $('#J_tipInfoMobile').html(checkReg.lang_zh['3201']);
	        },
	        checkMobile: function(){
	            checkReg.tool.switchInputStyle('normal','J_mobile', 'J_tipImgMobile','J_tipInfoMobile');
	            mobileIsOk = false;
	            var mobileExist = false;
	            
	            var mobile = $.trim($('#J_mobile').val());
	            if( oldMobile != mobile){
	                isUpdatePhone = true;
	                oldMobile = mobile;
	            }
	            if (mobile == '') {
	                return false;
	            }
	            
	            if (!checkReg.mobileReg.test(mobile)) {
	                checkReg.tool.switchInputStyle('error','J_mobile', 'J_tipImgMobile','J_tipInfoMobile');         
	                $('#J_tipInfoMobile').html(checkReg.lang_zh['3203']);
	                return false;
	            }
	            
	            $.ajax({
	                type: 'POST',
	                url: 'p/mobile_checker.php',
	                data: 'mobile=' + mobile,
	                async: false,
	                cache: false,
	                success: function (flg) {
	                    if (flg == "true") {
	                        checkReg.tool.switchInputStyle('error','J_mobile', 'J_tipImgMobile','J_tipInfoMobile');
	                        $('#J_tipInfoMobile').html(checkReg.lang_zh['3204'].replace('{#Email#}', mobile));
	                        mobileExist = true;
	                        return false;
	                    }
	                }
	            });
	            if (mobileExist == true) {
	                return false;
	            }
	            checkReg.tool.switchInputStyle('ok','J_mobile', 'J_tipImgMobile','J_tipInfoMobile');
	            mobileIsOk = true;
	            
	            //����ֻ��ű���Ļ������»����ȡ��֤��
	            var vcode = $.trim($('#txt_vcode').val());
	            if(isUpdatePhone && (vcode!= '' || !checkReg.vcode.checkVcodeOvertime()) ){//��֤�ֻ��������ݱ���ң�ͼ����֤��ǿջ���ʧЧ��
	                checkReg.tool.switchVcodeArea('vcode');
	            }
	            isUpdatePhone = false;
	            return true;
	        }
	    },
	    vcode: {
	        checkVcodeFocus: function(){
	            checkReg.tool.switchInputStyle('normal','txt_vcode', 'J_tipImgVcode','J_tipInfoVcode');
	            $('#J_tipInfoVcode').html(checkReg.lang_zh['3211']);
	        },
	        checkVcode: function(){
	            if($('.j-vcode').is(':visible')){
	                vcodeIsOk = false;
	                checkReg.tool.switchInputStyle('normal','txt_vcode','J_tipImgVcode','J_tipInfoVcode');
	                
	                var txtVcode = $.trim($("#txt_vcode").val());
	                var txtVcodeLen = txtVcode.length;
	                if(checkReg.vcodeReg.test(txtVcode)){
	                    if(txtVcodeLen==4){
	                        if(!checkReg.vcode.checkVcodeOvertime()){
	                            checkReg.tool.switchInputStyle('normal','txt_vcode', 'J_tipImgVcode','J_tipInfoVcode');
	                            $('#J_tipInfoVcode').removeClass('info_normal').html(checkReg.lang_zh['3214']);
	                            return false;
	                        }
	                        //��֤ͼ����֤���Ƿ���ȷ
	                        checkReg.vcode.checkVcodeIsOk(txtVcode);
	                    }
	                }else {
	                    checkReg.tool.switchInputStyle('error','txt_vcode', 'J_tipImgVcode','J_tipInfoVcode');
	                    $('#J_tipInfoVcode').html(checkReg.lang_zh['3213']);
	                    return false;
	                }
	            }
	        },
	        checkVcodeIsOk: function(vcode){	        	
	            var type=0;
	            $.ajax({
	                type: 'POST',
	                url: 'p/vcode_check_new.php',
	                data: 'vcode=' + vcode + '&type=' + type,
	                async: false,
	                cache: false,
	                success: function (flg) {
	                    if (flg == 'false') {
	                        checkReg.tool.switchInputStyle('error','txt_vcode', 'J_tipImgVcode','J_tipInfoVcode');   
	                        $('#J_tipInfoVcode').html(checkReg.lang_zh['3213']);
	                        return false;
	                    }else{
	                        checkReg.tool.switchInputStyle('ok','txt_vcode', 'J_tipImgVcode','J_tipInfoVcode');
	                        vcodeIsOk = true;                        
	                        if(!mobileIsOk){
	                            return false;
	                        }              
	                        checkReg.mobileCodeBtn.sendMobileCodeFun();
	                        return true;
	                    }
	                }
	            });
	          
	        },
	        checkVcodeOvertime: function(){
	            var nowTime = new Date().getTime();
	            if( (nowTime - vcodeGenerateTiem)> vcodeOvertimeInterval ){
	                show_vcode('imgVcode');
	                return false;
	            }else{
	                return true;
	            }
	        }
	    },
	    mobileCodeBtn: {       
	        sendMobileCodeFun: function(){//�����ȡ�ֻ���֤��
	            var txtVcode = $('#txt_vcode').val();
	            var mobile_phone = $.trim($('#J_mobile').val());
	          //ͼ����֤���Ƿ�ʧЧ 
	            if(txtVcode!= '' && !checkReg.vcode.checkVcodeOvertime()){	            	
	                checkReg.tool.switchVcodeArea('vcode');
	                checkReg.tool.switchInputStyle('normal','txt_vcode', 'J_tipImgVcode','J_tipInfoVcode');
                    $('#J_tipInfoVcode').removeClass('info_normal').html(checkReg.lang_zh['3214']);
	                return false;	                
	            }	            
	            // �ֻ���ע�ᣬ������֤�����
	            var send_flg = false;
	            $.ajax({
	                type: 'POST',
	                url: 'p/send_mobile_vcode_new.php',
	                data: 'custid=0&verify_type=5&vcode=' + txtVcode + '&type=0&mobile_phone=' + mobile_phone,
	                async: false,
	                cache: false,
	                success: function (flg) {
	                    if(flg == '-10' || flg == '-11' || flg == '-12'){
	                    	checkReg.tool.switchVcodeArea('vcode');
	                        // ��յ�����Ķ�����֤������� �� ��ʾ��Ϣ��������궨λ��������֤�������
	                    	checkReg.tool.switchInputStyle('error','txt_vcode', 'J_tipImgVcode','J_tipInfoVcode');                 
	                        $('#J_tipInfoVcode').html(checkReg.lang_zh['3214']);
	                        return false;
	                    } else{
	                    	checkReg.tool.switchVcodeArea('phoneVcode');
	                        if (flg == "0") {                          
	                            // ��ʱ����ʼ��
	                            miao = getMoblieCodeInterval;
	                            changejishi();    
	                            // ��յ�����Ķ�����֤������� �� ��ʾ��Ϣ��������궨λ��������֤�������
	                            checkReg.tool.switchInputStyle('normal','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode'); 
	                            $('#J_mobileCode').val('');
	                            $('#J_mobileCode').focus();
	                            $('#J_tipInfoMobileCode').html(checkReg.lang_zh['3222']);                            
	                            // ������֤����ųɹ�                
	                            return true;
	                        }else if (flg == "-2") {
	                            // ���췢�Ͷ��ŵĴ��������˹涨��������
	                            checkReg.tool.switchInputStyle('normal','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode'); 
	                            $('#J_tipInfoMobileCode').removeClass('info_normal').html(checkReg.lang_zh['3223']);
	                            $('#sendMobileCode').hide();
	                            $('#J_countDownTip').show().find('.send_tel_check').html(checkReg.lang_zh['3226']);
	                            return false;
	                        }else if (flg == "-4" || flg == "-5" || flg == "-8") {
	                            // �ֻ���֤��������ݿ�ʧ�� ���� ������֤�뵽�û��ֻ�ʧ�� ���� ���η��ͼ������2����
	                            checkReg.tool.switchInputStyle('normal','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode'); 
	                            $('#J_tipInfoMobileCode').removeClass('info_normal').html(checkReg.lang_zh['3223']);
	                            return false;
	                        } else if ( flg == "-7" ) {
	                            // ���η��ͼ������2����
	                            checkReg.tool.switchInputStyle('normal','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode'); 
	                            $('#J_tipInfoMobileCode').removeClass('info_normal').html(checkReg.lang_zh['3229']);
	                            return false;
	                        } else {
	                            //�������·��ͻ�ȡ��֤������
	                            checkReg.tool.switchInputStyle('normal','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode');
	                            $('#J_tipInfoMobileCode').removeClass('info_normal').html(checkReg.lang_zh['3224']);
	                            return false;
	                        }
	                    } 
	                }
	            });
	        }
	    },
	    mobileCode: {
	        checkMobileCodeFocus: function() {
	            checkReg.tool.switchInputStyle('normal','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode');
	            $('#J_tipInfoMobileCode').html(checkReg.lang_zh['3221']);
	        },
	        checkMobileCode: function(){
	            checkReg.tool.switchInputStyle('normal','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode');
	            mobileCodeIsOk = false;
	            var mobilePhone = $.trim($('#J_mobile').val());
	            var pop_sms_vcode = $.trim($('#J_mobileCode').val());           
	            if (pop_sms_vcode == '') {
	                return false;
	            }
	            if (pop_sms_vcode.length != 6) {
	                checkReg.tool.switchInputStyle('error','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode');
	                $('#J_tipInfoMobileCode').html(checkReg.lang_zh['3228']);
	                return false;
	            }
	            
	            $.ajax({
	                type: 'POST',
	                url: 'p/check_mobilephone_vcode.php',
	                data: '&type=0&verify_type=5&mobile_phone=' + mobilePhone  +"&sms_vcode=" + pop_sms_vcode ,
	                async: false,
	                cache: false,
	                success: function (flg) {
	                    if (flg == 'false') {
	                    	checkReg.tool.switchInputStyle('error','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode');
	                        $('#J_tipInfoMobileCode').html(checkReg.lang_zh['3228']);                      
	                        return false;
	                    }else {
	                    	checkReg.tool.switchInputStyle('ok','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode');
	                        mobileCodeIsOk = true; 
	                    }
	                }
	            });
	                    
	            return true;
	        }
	    },
	    agreement: {
	        checkAgreement: function() {
	            if ('checked' == $('#J_agreement').attr('checked')) {
	                $('#J_tipInfoAgreement').html('');
	                agreementIsOk = true;
	                return true;
	            } else {
	                $('#J_tipInfoAgreement').html(checkReg.lang_zh['3231']);
	                agreementIsOk = false;
	                return false;
	            }
	        }
	    },
	    tool:{
            //����Ԫ��ָ��������ʽ
            switchInputStyle: function(showType, inputId, tipImgId, tipInfoId){
                if(showType == 'normal') {
                    $('#' + inputId).removeClass('wl_select_change');
                    $('#' + tipImgId).hide();
                    $('#' + tipInfoId).addClass('info_normal').html('').css({'display':'block'});
                }else if(showType == 'ok') {
                    $('#' + inputId).removeClass('wl_select_change');
                    $('#' + tipImgId).removeClass('wl_select_icon22').css({'display':'inline-block'});
                    $('#' + tipInfoId).addClass('info_normal').css({'display':'block'});
                } else if(showType == 'error') {
                    $('#' + inputId).addClass('wl_select_change');
                    $('#' + tipImgId).addClass('wl_select_icon22').css({'display':'inline-block'});
                    $('#' + tipInfoId).removeClass('info_normal').css({'display':'block'});
                }
            },
            switchVcodeArea: function(showType){//�л�ͼ����֤�� �Ͷ�����֤����ʽ
                if(showType === 'vcode') {
                    if($('.j-phoneVcode').is(':visible')){
                        $('.j-phoneVcode').hide();
                        show_vcode('imgVcode');
                        $('.j-vcode').fadeIn(800);
                        $('#J_mobileCode').val('');
                        mobileCodeIsOk = false;
                        checkReg.tool.switchInputStyle('normal','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode');
                        //�����ǰ���ڵ���ʱ״̬����յ���ʱ״̬
                        clearTimeout(timeoutrun);
                        $('#sendMobileCode').show();
                        $('#J_countDownTip').hide();
                    }else {
                        show_vcode('imgVcode');
                    }               
                }else if(showType === 'phoneVcode') {
                    if ($('.j-vcode').is(':visible')){
                        $('.j-vcode').hide();
                        $('.j-phoneVcode').fadeIn(800);
                        checkReg.tool.switchInputStyle('normal','txt_vcode', 'J_tipImgVcode','J_tipInfoVcode');
                    }
                }
            },           
            isFunc: function(funcName){
                return typeof funcName == 'function';
            },
            VerifyCharLength: function(str, maxLen){
	            var newCharLen = maxLen;
	            var textFlag = true;
	            var verifyObj = {"flag": textFlag, "charLen": newCharLen};
	
	            if (str && str!=''){
	                if(GetCharLength(str)>maxLen){
	                	var charLen = str.length;
	                    textFlag = false;
	                    var l = 0;
	                    for(var i=0;i<charLen; i++){
	                    	l += GetCharLength(str[i]);
	                    	if( l==maxLen ){
	                    		newCharLen = (i+1);
	                    		break;
	                    	}else if(l>maxLen){
	                    		newCharLen = i;
	                    		break;
	                    	}	                    	
	                    }
	                }
	                verifyObj = {"flag": textFlag, "charLen":newCharLen};                
	            }
	            return verifyObj;
	        },//end VerifyCharLength
	        getCheatProof: function(){//��ȡ��թƭ�İ�
		    	jQuery.ajax({
		            type: 'POST',
		            url: 'p/mix_cheat_proof.php?source=enterRegisterTop',
		            async: true,
		            dataType: 'json',
		            success: function (res) {
		            	if (res) {
		            		$cheatProofDiv = jQuery('#J_cheatProofTop');
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
	    	}
	    }
	};
	//�ַ������ȣ�һ�����ļ�Ϊ2������
	function GetCharLength(str) {
	    var iLength = 0;
	    for(var i = 0;i<str.length;i++){
	        if(str.charCodeAt(i) >255){
	            iLength += 2;
	        } else {
	            iLength += 1;
	        }
	    }
	    return iLength;
	}
	//����ǿ����֤
	function Evaluate(character){
	    if (character >= 48 && character <= 57){
	        return 1;
	    } else if (character >= 65 && character <= 90) {
	        return 2;
	    } else if (character >= 97 && character <= 122) {
	        return 4;
	    } else {
	        return 8;
	    }
	}
	//����ǿ����֤
	function bitTotal(num){
	    var modes = 0;
	    for (var i = 0; i < 4; i++) {
	        if (num & 1) modes++;
	        num >>>= 1;
	    }
	    return modes;
	}
	//���»�ȡ��֤��ǰ�ĵ���ʱ
	function changejishi(){    
	    miao--;
	    var fen, smiao;
	    fen = parseInt( miao/60 );
	    smiao = miao - ( fen * 60 );
	    var fenstr = '';
	    if(fen > 0){
	        fenstr = fen + '��';
	    }
	    if(miao > 0){
	        $('#J_countDownTip').show().find('.send_tel_check').html( fenstr + smiao + '������»�ȡ' );
	        $('#sendMobileCode').hide();
	        clearTimeout(timeoutrun);
	        timeoutrun = setTimeout(changejishi, 1000);
	    }else{
	        $('#sendMobileCode').show();
	        $('#J_countDownTip').hide();
	        $('#J_tipInfoMobileCode').html('');
	    }
	}
	//�����б�ʱ��ʼ������ֹ���ύ
	function clearSelect(target_id, isShow, default_option)
	{
		if(isShow=="show"){
			$('#' + target_id).show();
		}else{
			$('#' + target_id).hide();
		}    
	    if (default_option){
	    	$('#' + target_id).html('<option value="0">' + default_option + '</option>');
	    }        
	}
	
	//��ȡ
	function get_region(countryId){
	    var data;
	    jQuery.ajax({
	        type: 'get',
	        url: 'p/region.php',
	        data: 'parent_id=' + countryId,
	        async: false,
	        cache: false,
	        success: function(flg) {
	            data = eval(flg);
	            return;
	        }
	    });
	    return data;
	}
	/*
	 * ˵�������ô����ѡ��ֵ��ָ���������б���
	 *
	 * @param {String || Object]} selectObj Ŀ������ѡ������ƻ���󣬱���
	 * @param {Array} optionList ѡ��ֵ���� ��ʽ��[{txt:'����', val:'010'}, {txt:'�Ϻ�', val:'020'}] ������
	 * @param {String} firstOption ��һ��ѡ��ֵ���磺����ѡ�񡱣���ѡ��ֵΪ��
	 */
	function set_options(selectObj, optionList, firstOption)
	{    
		if (typeof selectObj != 'object')
	    {
	        selectObj = document.getElementById(selectObj);
	    }
		selectObj.setAttribute("style","display:;"); 
	    // ���ѡ��
	    remove_options(selectObj);
	    // ѡ�����
	    var start = 0;
	    // �����Ҫ��ӵ�һ��ѡ��
	    if (firstOption) {
	        selectObj.options[0] = new Option(firstOption, 0);
	        start++;
	    }
	
	    if(optionList && optionList !='' && optionList.length>0){
	    	var len = optionList.length;
		    for (var i = 1; i < len; i++) {//i=0ʱ��״̬��
		        // ���� option
		        selectObj.options[start] = new Option(unescape(optionList[i].name), optionList[i].id);
		        start++;
		    }
	    }
	}
	/*
	 * ˵������ָ�������б��ѡ��ֵ���
	 *
	 * @param {String || Object]} selectObj Ŀ������ѡ������ƻ���󣬱���
	 */
	function remove_options(selectObj)
	{
	    if (typeof selectObj != 'object') {
	        selectObj = document.getElementById(selectObj);
	    }
	
	    // ԭ��ѡ�����
	    var len = selectObj.options.length;
	    for (var i = 0; i < len; i++) {
	        // �Ƴ���ǰѡ��
	        // ������options[0]ɾ���󣬺����ѡ��ͻᲹ�ϣ���ˣ�ֻ��ҪselectObj.options[0]=null
	        selectObj.options[0] = null;
	    }
	}
	//��ȡͼ����֤��
	function show_vcode(img_id) {    
	    vcodeIsOk = false;
	    vcodeGenerateTiem = new Date().getTime();
	    $('#' + img_id).attr('src', 'p/tmp_proxy.php?t=' + new Date().getTime());
	    $('#txt_vcode').val('');
	    checkReg.tool.switchInputStyle('normal','txt_vcode', 'J_tipImgVcode','J_tipInfoVcode'); 
	}
	//�ύע��
	function check_register() {	
		
	    //�˻���Ϣ
	    var usernameTrim = $.trim($('#J_userName').val());
	    var passwordVal = $('#J_password').val();
	    var repasswordVal = $('#J_repassword').val();
	    //��ҵ��Ϣ
	    var companyNameTrim = $.trim($('#J_companyName').val());
	    var $province = $('#province_id');
	    var $cityId = $('#city_id');
	    var $townId = $('#town_id');
	    var $quarterId = $('#quarter_id');
	    var provinceId = $province.val();
	    var cityId = $cityId.val();
	    var townId = $townId.val();
	    var quarterId = $quarterId.val();
	    var addrDetail = $.trim($('#addr_detail').val());
	    
	    var emailTrim = $.trim($('#J_email').val());
	    var areaCodeTrim = $.trim($('#J_areaCode').val());
	    var telephoneTrim = $.trim($('#J_telphone').val());
	    var linkmanTrim = $.trim($('#J_linkman').val());
	    var mobileTrim = $.trim($('#J_mobile').val());
	    var vcodeTrim = $.trim($('#txt_vcode').val());
	    var mobileCodeTrim = $.trim($('#J_mobileCode').val());
	    //Ϊ���ж�
	    if (usernameTrim == '' || passwordVal == '' || repasswordVal == '' 
	            || companyNameTrim == '' || emailTrim == '' || areaCodeTrim == ''
	            || telephoneTrim == '' || linkmanTrim == ''
	            || mobileTrim == ''
	            || vcodeTrim == '' 
	            || ($('.j-phoneVcode').is(':visible') && mobileCodeTrim == "")) {
	        
	        if (usernameTrim == "") {
	            checkReg.tool.switchInputStyle('error','J_userName', 'J_tipImgUserName','J_tipInfoUserName');
	            $('#J_tipInfoUserName').html(checkReg.lang_zh['3102']);
	        }
	        if (passwordVal == "") {
	            checkReg.tool.switchInputStyle('error','J_password', 'J_tipImgPassword', 'J_tipInfoPassword');
	            $('#J_tipInfoPassword').html(checkReg.lang_zh['3112']);
	            $('#J_tipUpperCaseBox').hide();            
	            $('#spnPwdStrongTips').hide();            
	        }
	        if (repasswordVal == "") {
	            checkReg.tool.switchInputStyle('error', 'J_repassword', 'J_tipImgRepassword', 'J_tipInfoRepassword');
	            $('#J_tipInfoRepassword').html(checkReg.lang_zh['3122']);            
	        }
	        
	        if (companyNameTrim == "") {
	            checkReg.tool.switchInputStyle('error', 'J_companyName', 'J_tipImgCompanyName', 'J_tipInfoCompanyName');
	            $('#J_tipInfoCompanyName').html(checkReg.lang_zh['3132']);            
	        }	        
	        if (($province.is(':visible') && provinceId==0) || ($cityId.is(':visible') && cityId==0) 
	        		|| ($townId.is(':visible') && townId==0) || ($quarterId.is(':visible') && quarterId==0)) {
	            checkReg.tool.switchInputStyle('error', '', 'J_tipImgAddr', 'J_tipInfoAddr');
	            $('#J_tipInfoAddr').html(checkReg.lang_zh['3143']);            
	        }
	        if (addrDetail=='') {
	            checkReg.tool.switchInputStyle('error', 'addr_detail', 'J_tipImgAddr', 'J_tipInfoAddr');
	            $('#J_tipInfoAddr').html(checkReg.lang_zh['3143']);            
	        }
	        if (emailTrim == "") {
	            checkReg.tool.switchInputStyle('error','J_email', 'J_tipImgEmail','J_tipInfoEmail');
	            $('#J_tipInfoEmail').html(checkReg.lang_zh['3152']);            
	        }
	        if (areaCodeTrim == "") {
	            checkReg.tool.switchInputStyle('error','J_areaCode', 'J_tipImgCompanyTel','J_tipInfoAreaCode');
	            $('#J_tipInfoAreaCode').html(checkReg.lang_zh['3162']);            
	        }
	        if (telephoneTrim == "") {
	            checkReg.tool.switchInputStyle('error','J_telphone', 'J_tipImgCompanyTel','J_tipInfoTelphone');
	            $('#J_tipInfoTelphone').html(checkReg.lang_zh['3172']);            
	        }
	        if (linkmanTrim == "") {
	            checkReg.tool.switchInputStyle('error','J_linkman', 'J_tipImgLinkman','J_tipInfoLinkman');
	            $('#J_tipInfoLinkman').html(checkReg.lang_zh['3192']);            
	        }
	        if (mobileTrim == "") {
	            checkReg.tool.switchInputStyle('error','J_mobile', 'J_tipImgMobile','J_tipInfoMobile'); 
	            $('#J_tipInfoMobile').html(checkReg.lang_zh['3202']);            
	        }
	        
	        if( vcodeTrim =='' ) {
	            checkReg.tool.switchInputStyle('error','txt_vcode', 'J_tipImgVcode','J_tipInfoVcode');
	            $('#J_tipInfoVcode').html(checkReg.lang_zh['3212']);
	        }
	        if (mobileCodeTrim == "") {
	            checkReg.tool.switchInputStyle('error','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode');
	            $('#J_tipInfoMobileCode').html(checkReg.lang_zh['3221']);
	        }
	        //��ֹ�ظ��ύ
	        submitBtnAvailability('enable');
	        return false;
	    }
	    
	    //������Ϣ�Ƿ���ȷ�ж�
	    if(usernameIsOk && passwordIsOk && rePasswordIsOk && companyNameIsOk && emailIsOk && areaCodeIsOk 
	            && telephoneIsOk && telExtensionIsOk && companyAddrIsOk && linkmanIsOk && mobileIsOk
	            && vcodeIsOk && mobileCodeIsOk && agreementIsOk ){  
	    	jQuery.ajax({
	            type: 'POST',
	            url: 'register_enterprise_handle.php',
	            data: jQuery('#registerForm').serialize(),
	            async: false,
	            cache: false,
	            success: function(errorCode) {
	            	if(errorCode == '0'){
	            		var returnUrl = $('#returnUrl').val();
	            		window.location.href = "regmobileok.php?mobile_phone=" + mobileTrim         			
	            			+ "&email=" + emailTrim
	            			+ "&username=" + usernameTrim
	            			+ "&returnurl=" + returnUrl;
	            	}else{
	            		handlerError(errorCode);
	            	}
	            },
	            complete: function(){
	            	//��ֹ�ظ��ύ
	            	submitBtnAvailability('enable');
	            }
	        });
	    }else{
	    	submitBtnAvailability('enable');
	    }
	}
	//ͨ����������˰�ť���ظ�ҳ��ʱ���������֮ǰ����д�����ݣ���Ҫ�ڼ���ҳ��ʱ��֤һ������д������ 
	function verifyRollback(){
		checkReg.userName.checkUsername();
		checkReg.password.checkPassword();
		checkReg.rePassword.checkRePassword();
		checkReg.companyName.checkCompanyName();
		checkReg.companyAddress.check_country_province_city();
		checkReg.companyEmail.checkEmail();
		checkReg.companyTel.areaCode.checkAreaCode();
		checkReg.companyTel.telephone.checkTelephone();
		checkReg.companyTel.telExtension.checkTelExtension();
		checkReg.companyLinkman.checkLinkman();
		checkReg.companyMobile.checkMobile();
		checkReg.vcode.checkVcode();
		checkReg.mobileCode.checkMobileCode();
	}
	//��ֹ�ظ��ύע��
	function submitBtnAvailability( type ){
	    if( type == 'disable' ) {
	        $('#J_submitSaveUnclick').show();
	        $('#J_submitSave').hide();
	    } else {
	        $('#J_submitSaveUnclick').hide();
	        $('#J_submitSave').show();
	    }
	}
	//��̨��֤���ִ��󲢷�����ʾ��Ϣ�����ڴ������
	function handlerError(errorCode) {
	    switch (errorCode) {
	        case "0":
	            break;
	        case "-1": //�Ƿ�����
	        	$('#J_tipInfoAgreement').html(checkReg.lang_zh['3241']);
	            break;
	        case "1": //�û����Ѵ���
	        	var username = $('#J_userName').val();
	        	checkReg.tool.switchInputStyle('error','J_userName', 'J_tipImgUserName','J_tipInfoUserName');
	            $('#J_tipInfoUserName').html(checkReg.lang_zh['3103'].replace('{#username#}', username));
	            break;
	        case "2": //��˾�����Ѵ���
	        	checkReg.tool.switchInputStyle('error', 'J_companyName', 'J_tipImgCompanyName', 'J_tipInfoCompanyName');
	            $('#J_tipInfoCompanyName').html(checkReg.lang_zh['3134']);
	        	break;
	        case "3": //�����Ѵ���
	        	var email = $('#J_email').val();
	        	checkReg.tool.switchInputStyle('error','J_email', 'J_tipImgEmail','J_tipInfoEmail');
	            $('#J_tipInfoEmail').html(checkReg.lang_zh['3154'].replace('{#Email#}', email));
	            break;
	        case "4": //�ֻ����Ѵ���
	        	var mobile = $('#J_mobile').val();
	        	checkReg.tool.switchInputStyle('error','J_mobile', 'J_tipImgMobile','J_tipInfoMobile');
	            $('#J_tipInfoMobile').html(checkReg.lang_zh['3204'].replace('{#Email#}', mobile));
	            break;
	        case "5": //�ֻ���Ϊ��
	        	checkReg.tool.switchInputStyle('error','J_mobile', 'J_tipImgMobile','J_tipInfoMobile'); 
	            $('#J_tipInfoMobile').html(checkReg.lang_zh['3202']);
	            break;
	        case "6": //��˾��Ϊ��
				checkReg.tool.switchInputStyle('error', 'J_companyName', 'J_tipImgCompanyName', 'J_tipInfoCompanyName');
	            $('#J_tipInfoCompanyName').html(checkReg.lang_zh['3132']);       
	            break;
	        case "7":// ���췢�Ͷ��ŵĴ��������˹涨��������
	        	checkReg.tool.switchInputStyle('normal','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode'); 
	            $('#J_tipInfoMobileCode').removeClass('info_normal').html(checkReg.lang_zh['3223']);
	            $('#sendMobileCode').hide();
	            $('#J_countDownTip').show().find('.send_tel_check').html(checkReg.lang_zh['3226']);
	            break;
	        case "8": //���ʧ��
	        	$('#J_tipInfoAgreement').html(checkReg.lang_zh['3241']);
	            break;
	        case "10": //�ֻ���֤�����
	        	checkReg.tool.switchInputStyle('error','J_mobileCode', 'J_tipImgMobileCode','J_tipInfoMobileCode');
	            $('#J_tipInfoMobileCode').html(checkReg.lang_zh['3228']);
	        	break;
	        default:
	            break;
	    }
	}
	
	$(function() {
		show_vcode('imgVcode');
		verifyRollback();	
		
		//��ʾͷ������թ�İ�
		checkReg.tool.getCheatProof();
		
	    //������꽹�����������ʱ��ʾ��Ϣ
	    $('#J_userName').bind("focus",function(){ 
	        checkReg.userName.checkFocus();
	    });
	    //���ֻ��������10������
	    $('#J_userName').on('keyup',function(){
	    	checkReg.userName.checkKeypress();
	    });
	    //�˺������ʧȥ����ʱ�������˺źϷ�����֤
	    $("#J_userName").blur(function(){
	        checkReg.userName.checkUsername();
	    });
	    
	    //��������� 
	    $('#J_password').bind("focus",function(){ 
	        checkReg.password.checkPasswordFocus();
	    });
	    $("#J_password").keyup(function(){ 
	        checkReg.password.checkPasswordInput();
	    });
	    $("#J_password").blur(function(){
	        checkReg.password.checkPassword();
	    });
	    $("#J_password").keypress(function(e) {
	        checkReg.password.checkCapslockOpen(e);
	    });
	    
	    //ȷ����������� 
	    $('#J_repassword').bind("focus",function(){ 
	        checkReg.rePassword.checkRePasswordFocus();
	    });
	    $("#J_repassword").blur(function(){
	        checkReg.rePassword.checkRePassword();
	    }); 
	    //��˾����
	    $('#J_companyName').bind("focus",function(){ 
	        checkReg.companyName.checkCompanyNameFocus();
	    });
	    $("#J_companyName").blur(function(){
	        checkReg.companyName.checkCompanyName();
	    });
	    //���ֻ��������30������ 60���ַ�
	    $('#J_companyName').on('keyup',function(){
	    	checkReg.companyName.checkKeypress();
	    });
	    /******* companyAddr start *******/
	    //��ʼ��ʡ����Ϣ
	    var optionList = get_region('9000');
	    set_options('province_id', optionList, '��ѡ��'); 
	        //ʡ��	    
	    $('#province_id, #city_id, #town_id, #quarter_id').on("focus",function(){
	        checkReg.companyAddress.checkAddSelFocus();
	    });
	    $('#province_id').on("change",function(){
	    	checkReg.companyAddress.setSelList.set_city($(this).val());
	    });
	        //��  
	    $('#city_id').on("change",function(){
	    	checkReg.companyAddress.setSelList.set_town($(this).val());
	    });
	        //��
	    $('#town_id').on("change",function(){
	    	checkReg.companyAddress.setSelList.set_quarter($(this).val());
	    });
	        //��
	        //��ϸ��ַ
	    $('#addr_detail').on("focus",function(){
	        checkReg.companyAddress.checkAddrDetailFocus();
	    });	    
	    //���ֻ��������64������
	    $('#addr_detail').on("keyup",function(){
	        checkReg.companyAddress.checkKeypress();
	    });
	    $("#province_id, #city_id, #town_id, #quarter_id,#addr_detail").on('blur', function(){
	        checkReg.companyAddress.check_country_province_city();
	    });
	    
	    /******* companyAddr end *******/	    
	    //��˾����
	    $('#J_email').bind("focus",function(){ 
	        checkReg.companyEmail.checkEmailFocus();
	    });
	    $("#J_email").blur(function(){
	        checkReg.companyEmail.checkEmail();
	    });
	    
	    //�̶��绰 ����
	    $('#J_areaCode').bind("focus",function(){ 
	        checkReg.companyTel.areaCode.checkAreaCodeFocus();
	    });
	    $("#J_areaCode").blur(function(){
	        checkReg.companyTel.areaCode.checkAreaCode();
	    });
	    //�̶��绰 ������
	    $('#J_telphone').bind("focus",function(){ 
	        checkReg.companyTel.telephone.checkTelephoneFocus();
	    });
	    $("#J_telphone").blur(function(){
	        checkReg.companyTel.telephone.checkTelephone();
	    });
	    //�̶��绰 �ֻ���
	    $('#J_telExtension').bind("focus",function(){ 
	        checkReg.companyTel.telExtension.checkTelExtensionFocus();
	    });
	    $("#J_telExtension").blur(function(){
	        checkReg.companyTel.telExtension.checkTelExtension();
	    });
	    
	    //��ϵ������
	    $('#J_linkman').bind("focus",function(){ 
	        checkReg.companyLinkman.checkLinkmanFocus();
	    });
	    //���ֻ��������32������
	    $('#J_linkman').on('keyup',function(){
	    	checkReg.companyLinkman.checkKeypress();
	    });	    
	    $("#J_linkman").blur(function(){
	        checkReg.companyLinkman.checkLinkman();
	    });
	   
	    //�ֻ�����
	    $('#J_mobile').bind("focus",function(){ 
	        checkReg.companyMobile.checkMobileFocus();
	    });
	    $("#J_mobile").blur(function(){
	        checkReg.companyMobile.checkMobile();
	    });
	    
	    //ͼ����֤��
	    jQuery('#vcodeImgWrap, #vcodeImgBtn').click(function(){
	        show_vcode('imgVcode');
	    });
	    $('#txt_vcode').bind("focus",function(e){
	        checkReg.vcode.checkVcodeFocus(e);
	    });
	    $('#txt_vcode').blur(function(){
	        checkReg.vcode.checkVcode();
	    });
	    $("#txt_vcode").keyup(function(){
	        checkReg.vcode.checkVcode();
	    });
	    
	    //������֤��
	    $('#J_mobileCode').bind("focus",function(){
	        checkReg.mobileCode.checkMobileCodeFocus();
	    });
	    $("#J_mobileCode").blur(function(){
	        checkReg.mobileCode.checkMobileCode();
	    });
	    //��ȡ�ֻ���֤��
	    $('#sendMobileCode').bind("click",function(){
	        checkReg.mobileCodeBtn.sendMobileCodeFun();    
	    });
	    
	    //�������ѡ
	    $('#J_agreement').bind("click",function(){
	        checkReg.agreement.checkAgreement();
	    });
	    //�ύע��ʧ�ܺ󣬵���κ���������ע����ʾ������Ϣ
	    $('#J_userName, #J_password, #J_repassword, #J_companyName,#province_id,'+
	    		'#city_id, #town_id, #quarter_id, #addr_detail,#J_email, ' + 
	    		'#J_areaCode, #J_telphone, #J_telExtension, #J_linkman, #J_mobile,'+
	    		' #txt_vcode, #J_mobileCode').bind("focus",function(){
			var tipInfoAgreement = $('#J_tipInfoAgreement').html();
			if(tipInfoAgreement == checkReg.lang_zh['3241']){
				$('#J_tipInfoAgreement').html('');
			}
		});
	    //�ύע��
	    $('#J_submitSave').bind("click",function(){
	        //��ֹ�ظ��ύ
	        submitBtnAvailability('disable');
	        //������ie8���µ�������汾����ֹ�ظ��ύ��ť�����ԣ�������ʱ0.1sִ��ע�����
	        setTimeout(check_register, 50);
	        //check_register();        
	    });
	});
//}());
