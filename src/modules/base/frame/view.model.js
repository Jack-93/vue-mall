import UserModel from '@/models/model.xxx.js';

export default {
	xxxAjax: async function (optionRaw) {
		let option = {};
		option.params = optionRaw;

		let result = await UserModel.sendVerifyCode.connect(option);
		return result;
	}
};
