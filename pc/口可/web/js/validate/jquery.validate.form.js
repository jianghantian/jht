$(function () {

	// 输入框获取焦点
	$('.form-item .ipt').focus(function () {
		$(this).addClass('cur');
	}).blur(function () {
		$(this).removeClass('cur');
	});

	// 手机号码验证    
	$.validator.addMethod("isMobile", function (value, element) {
		var length = value.length;
		return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
	}, "请输入正确的手机号码");

	// validate方法
	$('.form-validata').validate({
		rules: {
			userName: {
				required: true
			},
			mobile: {
				required: true,
				isMobile: true
			},
			email: {
				required: true,
				email: true
			},
			user_email: {
				required: true
			},
			password: {
				required: true,
				minlength: 6
			},
			confirm_password: {
				required: true,
				minlength: 6,
				equalTo: '#password'
			},
			msg_code: {
				required: true,
				digits: true
			}
		},
		messages: {
			userName: {
				required: '请输入用户名'
			},
			mobile: {
				required: '请输入手机号码'
			},
			email: {
				required: '请输入邮箱',
				email: '请输入正确的邮箱'
			},
			user_email: {
				required: '请输入用户名或者邮箱'
			},
			password: {
				required: '请输入密码',
				minlength: '请输入至少6位字符的密码'
			},
			confirm_password: {
				required: '请再次输入密码',
				minlength: '请输入至少6位字符的密码',
				equalTo: '两次密码输入不一致'
			},
			msg_code: {
				required: '请输入验证码',
				digits: '请输入正确验证码'
			}
		},

		errorElement: 'p',

		errorPlacement: function (error, element) {
			error.appendTo(element.parents('li'))
		},

		submitHandler: function (form) {
			alert('提交事件');
			form.submit();
		}
	});
});