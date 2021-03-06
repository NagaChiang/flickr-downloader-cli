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

## Setup

1. Install dependencies

```
$ npm install
```

2. Create a `.env` file at project root and assign your [Flickr API key](https://www.flickr.com/services/apps/create/).

```
API_KEY = [Assign your API key here]
```

## Usage

Run the node and pass the urls of the photo sets you want to download as parameters.

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

```
$ node index.js [url1] [url2] [url3] ...
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
