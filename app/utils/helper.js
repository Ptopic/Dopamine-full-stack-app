export const updateNotification = (updater, text, type = 'error') => {
	updater({ text, type });
	setTimeout(() => {
		updater({ text: '', type: '' });
	}, 2500);
};

const config = {
	duration: 500,
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
