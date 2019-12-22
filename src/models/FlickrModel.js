import Flickr from 'flickr-sdk';

class FlickrModel {
    constructor() {
        this.flickr = new Flickr(process.env.API_KEY);
    }

    async getPhotoInfos(userId, setId) {
        let ids = [];
        try {
            const response = await this.flickr.photosets.getPhotos({
                user_id: userId,
                photoset_id: setId,
            });
            if (response && response.body.stat == 'ok'){
                ids = response.body.photoset.photo;
            }
        } catch (error) {
            console.error(error);
        }

        return ids;
    }

    async getLargestPhotoUrl(photoId) {
        let url = null;
        try {
            const response = await this.flickr.photos.getSizes({
                photo_id: photoId,
            });
            if (response && response.body.stat == 'ok'){
                const sizeInfos = response.body.sizes.size;
                if (sizeInfos.length > 0) {
                    url = sizeInfos[sizeInfos.length - 1].source;
                }
            }
        } catch (error) {
            console.error(error);
        }

        return url;
    }

    async getPhotoSetInfo(userId, setId) {
        let setInfo = null;
        try {
            const response = await this.flickr.photosets.getInfo({
                user_id: userId,
                photoset_id: setId,
            });
            if (response && response.body.stat == 'ok'){
                setInfo = response.body.photoset;
            }
        } catch (error) {
            console.error(error);
        }

        return setInfo;
    }

    async findUserIdByUrl(photosPageUrl) {
        let userId = null;
        try {
            const response = await this.flickr.urls.lookupUser({
                url: photosPageUrl,
            });

            if (response.body.stat == "ok") {
                userId = response.body.user.id;
            }
        } catch (error) {
            console.error(error);
        }

        return userId;
    }

    async findUserIdByUsername(username) {
        let userId = null;
        try {
            const response = await this.flickr.people.findByUsername({
                username: username,
            });
            
            if (response.body.stat == "ok") {
                userId = response.body.user.id;
            }
        } catch (error) {
            console.error(error);
        }

        return userId;
    }
}

export default new FlickrModel();