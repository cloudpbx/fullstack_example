/** Language Class */

export default class Language {
    constructor(langDbModel) {
        if (typeof langDbModel !== 'undefined') {
            // Construct new Language Object with langDbModel
            this.name = langDbModel.name;
            this.description = langDbModel.description;
            this.link = langDbModel.link;
        } else {
            // Construct new Language Object using default values
            this.name = '';
            this.description = '';
						this.link = '';
				}
    }
}
