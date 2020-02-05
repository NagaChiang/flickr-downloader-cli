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

    let regex = /photos\/(.+)\/albums\/(.+)($|\/)/g;
    for (const url of args._) {
      regex.lastIndex = 0;
      const match = regex.exec(url);
      if (match) {
        const urlName = match[1];
        const setId = match[2];

        try {
          await photoService.downloadSet(urlName, setId);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Invalid photoset url: ' + url);
      }
    }
  }
}

export default new Cli();