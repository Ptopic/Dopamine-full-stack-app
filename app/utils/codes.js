import client from '../api/client';

const catchError = (error) => {
	if (error?.response?.data) {
		return error.response.data;
	} else {
		return { success: false, error: error.message };
	}
};

export const getCode = async (codeVal) => {
	try {
		const { data } = await client.get('/code/phone-code', {
			params: { code: codeVal },
		});
		return data;
	} catch (error) {
		return catchError(error);
	}
};
