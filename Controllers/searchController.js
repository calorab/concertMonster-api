const axios = require('axios').default;


exports.getArtistResults = (req, res, next) => {
    let artistName = req.body.artist;
    console.log(artistName, req);
    axios.get('https://api.songkick.com/api/3.0/search/artists.json?apikey=ZOV7FltnOvfdD7o9&', {params: {query: artistName}})
        .then(response => {
            console.log('Your results are in!!!!!', response.data.resultsPage.results);
            const artistsResults = response.data.resultsPage;
            res.status(200).json(artistsResults);
        }).catch(err => {
            console.log(err);
        }
    );
};

exports.getConcertResults = (req, res, next) => {
    let artistName = req.body.artist;
    // Artist search
    axios.get('https://api.songkick.com/api/3.0/search/artists.json?apikey=ZOV7FltnOvfdD7o9&', {params: {query: artistName}})
        .then(response => {
            console.log(response.data.resultsPage.results);
            const artistId = req.body.id;
            axios({
                url: 'https://api.songkick.com/api/3.0/artists/' + artistId + '/calendar.json?apikey=ZOV7FltnOvfdD7o9'
            }).then(result => {
                const concertResults = result.data.resultsPage;
                res.status(200).json(concertResults);
            }).catch(err => {
                console.log(err, 'concert search');
            });
        }).catch(err => {
            console.log(err);
        }
    );
};

