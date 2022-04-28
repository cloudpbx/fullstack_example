import axios from 'axios';
import { baseUrl } from '../config';

/**
 * Update language with @param id in DynamoDB.
 *
 * @param {Object} language
 * @return {Promise<any>}
 */
const updateLanguages = (id, language) => {
	console.log('edit language', language);
  return new Promise((resolve, reject) => {
		const params = language;
		const reqBody = {
			headers: { 'Content-Type': 'application/json' }
		};
		axios
			.put(`${baseUrl}/languages/${id}`, params, reqBody)
			.then(res => resolve(res.data))
			.catch(err => reject(JSON.stringify(err)));
	})
};

export default updateLanguages;
