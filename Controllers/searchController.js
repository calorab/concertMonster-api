exports.getArtistResults = (req, res, next) => {
    let testResults = {
        name: Alison Wonderland,
        genre: EDM/Electronic,
        url: alisonwonderland.com
    }
    res.status(200).json(testResults);
};

exports.getConcertResults = (req, res, next) => {
    let testResults = {
        concerts: {
            event: {
                artistName: 'Alison Wonderland',
                city: 'Los Angeles',
                date: '2019-8-19',
                uri: somethingsomething.com/alisonwonderland,
                venue: 'PPG arena'
            },
            event: {
                artistName: 'Alison Wonderland',
                city: 'London',
                date: '2019-10-19',
                uri: somethingsomething.com/alisonwonderland,
                venue: 'O2 Arena'
            },
            event: {
                artistName: 'Alison Wonderland',
                city: 'Sydney',
                date: '2019-12-19',
                uri: somethingsomething.com/alisonwonderland,
                venue: 'Sydney Operahouse'
            }
        }
    };
    res.status(200).json(testResults);
};

