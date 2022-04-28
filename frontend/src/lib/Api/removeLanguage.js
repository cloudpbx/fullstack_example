import axios from 'axios';
import { baseUrl } from '../config';

/**
 * Remove language item with @param id in DynamoDB.
 *
 * @param {Object} language
 * @return {Promise<any>}
 */
const removeLanguage = (id) => {
  return new Promise((resolve, reject) => {
		const reqBody = {
			headers: { 'Content-Type': 'application/json' }
		};
		axios
			.delete(`${baseUrl}/languages/${id}`, reqBody)
			.then(res => resolve(res.data))
			.catch(err => reject(JSON.stringify(err)));
	})
};

export default removeLanguage;
