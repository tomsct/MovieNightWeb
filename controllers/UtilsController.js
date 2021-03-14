const AppError = require("../utils/AppError")
const TorrentSearchApi = require('torrent-search-api');
TorrentSearchApi.enablePublicProviders();

exports.get_torrents = async (req, res, next) => {
    let { query } = req.body;
    const torrent = await TorrentSearchApi.search([`Limetorrents`], query, 'Movies', 1);
    console.log(torrent);
    res.send(torrent[0].desc);
};