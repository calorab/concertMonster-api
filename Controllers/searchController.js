// const apiMiddleware = require('../Middleware/apiMiddleware');
const axios = require('axios').default;


exports.getArtistResults = (req, res, next) => {
    let artistName = req.body.artist;
    console.log('here in getArtistFromSongkick');
    axios.get('https://api.songkick.com/api/3.0/search/artists.json?apikey=ZOV7FltnOvfdD7o9&', {params: {query: artistName}})
        .then(response => {
            console.log(response.data.resultsPage.results, 'Your results are in');
            const artistsResults = response.data.resultsPage;
            res.status(200).json(artistsResults);
        }).catch(err => {
            console.log(err);
        }
    );
    // console.log('here in getArtistresults');
    // const results = apiMiddleware.getArtistsFromSongkick(artistName);
    // console.log('after apiMiddleware'); 
    // return results;
};

exports.getConcertResults = (req, res, next) => {
    let concertResults = {
        concerts: {
            event: {
                artistName: 'Alison Wonderland',
                city: 'Los Angeles',
                date: '2019-8-19',
                uri: 'somethingsomething.com/alisonwonderland',
                venue: 'PPG arena'
            },
            event: {
                artistName: 'Alison Wonderland',
                city: 'London',
                date: '2019-10-19',
                uri: 'somethingsomething.com/alisonwonderland',
                venue: 'O2 Arena'
            },
            event: {
                artistName: 'Alison Wonderland',
                city: 'Sydney',
                date: '2019-12-19',
                uri: 'somethingsomething.com/alisonwonderland',
                venue: 'Sydney Operahouse'
            }
        }
    };
    res.status(200).json(concertResults);
};

