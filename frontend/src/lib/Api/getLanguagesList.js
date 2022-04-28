import axios from 'axios';
import { baseUrl } from '../config';

/**
 * Get a list of languages from DynamoDB
 *
 * @return {Promise<any>}
 */
const getLanguagesList = () => {
  return new Promise((resolve, reject) => {
		const reqBody = {
			headers: { 'Content-Type': 'application/json' }
		};
		axios
			.get(`${baseUrl}/languages`, reqBody)
			.then(res => resolve(res.data))
			.catch(err => reject(JSON.stringify(err)));
	})
};

export default getLanguagesList;
