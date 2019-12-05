const axios = require('axios').default;

exports.getArtistsFromSongkick = (artist) => {
    console.log('here in getArtistFromSongkick');
    axios.get('https://api.songkick.com/api/3.0/search/artists.json?apikey=ZOV7FltnOvfdD7o9&', {params: {query: artist}})
        .then(data => {
            console.log(data, 'success in artist search');
            return data;
        }).catch(err => {
            console.log(err);
        }
    );
};

exports.getConcertsFromSongkick = (artistId) => {};