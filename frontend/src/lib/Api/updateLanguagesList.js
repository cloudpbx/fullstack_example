import axios from 'axios';
import { baseUrl } from '../config';

/**
 * Add language to Language table in DynamoDB.
 *
 * @param {Object} language
 * @return {Promise<any>}
 */
const updateLanguagesList = (language) => {
	console.log('newLanguage', language);
  return new Promise((resolve, reject) => {
		const params = language;
		const reqBody = {
			headers: { 'Content-Type': 'application/json' }
		};
		axios
			.post(`${baseUrl}/languages`, params, reqBody)
			.then(res => resolve(res.data))
			.catch(err => reject(JSON.stringify(err)));
	})
};

export default updateLanguagesList;
