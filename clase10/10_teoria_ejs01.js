const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const mascotas = [
        {name: 'Sammy', organization: 'DigitalOcean', birth_year: 2012},
        {name: 'Tux', organization: 'Linux', birth_year: 1994},
        {name: 'Moby Dock', organization: 'Docker', birth_year: 2013}
    ];
    const tagline = 'No programming concept is complete without a cute animal mascot.';

    res.render('pages/index', {
        mascots: mascotas,
        tagline: tagline
    });
});

app.get('/about', (req, res) => {
    res.render('pages/about');
});

app.listen(9191, () => {
    console.log('Server listening on port 9191');
});