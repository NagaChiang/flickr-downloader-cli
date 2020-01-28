import axios from 'axios';
import config from 'config';
import mkdirp from 'mkdirp';
import fs from 'fs';
import sanitize from 'sanitize-filename';

import flickrModel from '../models/FlickrModel'
import Utils from '../utils'

class PhotoService {
    constructor() {
        this.downloadPath = config.get('download.path');
        this.downloadDelay = config.get('download.delay');
    }

    async downloadSet(urlName, setId) {
        const photosPageUrl = `https://www.flickr.com/photos/${urlName}`;
        try {
            const userId = await flickrModel.findUserIdByUrl(photosPageUrl);
            const setInfo = await flickrModel.getPhotoSetInfo(userId, setId);
            const photoInfos = await flickrModel.getPhotoInfos(userId, setId);

            let photoDownloadInfos = [];
            for (const info of photoInfos) {
                const downloadInfo = new PhotoDownloadInfo();
                downloadInfo.name = sanitize(info.title);
                downloadInfo.url = await flickrModel.getLargestPhotoUrl(info.id);
                if (downloadInfo.url) {
                    photoDownloadInfos.push(downloadInfo);
                }
            }
            
            const setName = setInfo ? setInfo.id + '_' + setInfo.title._content : 'untitled';
            const setPath = this.downloadPath + urlName + '/' + setName +'/';
            mkdirp.sync(setPath, (err) => {
                console.error(err);
            });

            console.log(`Downloading ${urlName}'s photoset "${setName}"`);

            let photoCount = 1;
            for (const info of photoDownloadInfos) {
                console.log(`(${photoCount}/${photoDownloadInfos.length}) Downloading photo "${info.name}"`);

                const countString = photoCount.toString().padStart(3, '0');
                await this.download(info.url, setPath + countString + '_' + info.name + '.jpg');
                await Utils.msleep(this.downloadDelay);
                photoCount++;
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    async download(url, path) {
        const writer = fs.createWriteStream(path);
        const response = await axios.get(url, {
            responseType: 'stream',
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }
}

class PhotoDownloadInfo {
    constructor() {
        this.name = '';
        this.url = '';
    }
}

export default new PhotoService();