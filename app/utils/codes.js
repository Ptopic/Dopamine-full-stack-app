import client from '../api/client';

export const getCode = async (code) => {
	try {
		const { data } = await client.get('/code/phone-code', { code });
		return data;
	} catch (error) {
		console.log(error.toJSON());
	}
};
