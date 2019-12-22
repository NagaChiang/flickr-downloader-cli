import minimist from 'minimist';
import photoService from '../services/PhotoService'

class Cli {
    constructor() {

    }

    async command(inputArgs) {
        const args = minimist(inputArgs.slice(2));
        if (args._.length < 1) {
            console.log('Please enter the url of the Flickr photoset.');
        }

        const url = args._[0];
        const regex = /photos\/(.+)\/albums\/(.+)($|\/)/g;
        const match = regex.exec(url);
        if (match) {
            const urlName = match[1];
            const setId = match[2];

            console.log(`Downloading ${urlName}'s photoset ${setId}...`);

            try {
                await photoService.downloadSet(urlName, setId);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('Invalid photoset url.');
        }
    }
}

export default new Cli();