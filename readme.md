# Flickr Downloader CLI

A CLI to download whole photo sets from Flickr.

```
$ node index.js https://www.flickr.com/photos/flickr/albums/72157656845052880
Downloading flickr's photoset "Catchy Colors"
(1/23) Downloading photo "Catchy Colors: Purple, Orange & Green"
(2/23) Downloading photo "Catchy Colors: Orange & Blue"
(3/23) Downloading photo "Catchy Colors: Maroon"
(4/23) Downloading photo "Catchy Colors: Rainbow"
(5/23) Downloading photo "Catchy Colors - Blue and Yellow"
(6/23) Downloading photo "Catchy Colors: Red"
(7/23) Downloading photo "CatchyColors: White"
(8/23) Downloading photo "Catchy Colors: Silver"
```

## Usage

1. Install dependencies

```
$ npm install
```

2. Create a `.env` file at project root and assign your [Flickr API key](https://www.flickr.com/services/apps/create/).

```
API_KEY = [Assign your API key here]
```

3. Run the node and pass the url of photo set you want to download as parameter.

```
$ node index.js https://www.flickr.com/photos/flickr/albums/72157656845052880
Downloading flickr's photoset "Catchy Colors"
(1/23) Downloading photo "Catchy Colors: Purple, Orange & Green"
(2/23) Downloading photo "Catchy Colors: Orange & Blue"
(3/23) Downloading photo "Catchy Colors: Maroon"
(4/23) Downloading photo "Catchy Colors: Rainbow"
(5/23) Downloading photo "Catchy Colors - Blue and Yellow"
(6/23) Downloading photo "Catchy Colors: Red"
(7/23) Downloading photo "CatchyColors: White"
(8/23) Downloading photo "Catchy Colors: Silver"
```

For now it only downloads the largest photos.

## Configuration

The configuration file path is `config/default.json`.

```
{
    "download": {
        "path": "../downloads/",
        "delay": 200
    }
}
```

- `path`: Destination of downloaded photo sets. Photos will be organized as `downloads/account/photoset`.
- `delay`: Delay time in ms between photo downloads to prevent Flickr from considering it's malicious.