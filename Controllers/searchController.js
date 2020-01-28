const axios = require('axios').default;


exports.getArtistResults = (req, res, next) => {
    let artistName = req.params.artistName;
    if (!artistName) {
        throw new Error('no artist name');
    }
    axios.get('https://api.songkick.com/api/3.0/search/artists.json?apikey=ZOV7FltnOvfdD7o9&', {params: {query: artistName}})
        .then(response => {
            const artistsResults = response.data.resultsPage;
            res.status(200).json(artistsResults);
        }).catch(err => {
            console.log(err);
            next(err);
        }
    );
};

