const express = require('express');
const logger = require('./logger')

const router = express.Router();

router.get('/user-profile/:abcd', function(req, res) {
    console.log(req)
    console.log(req.params.abcd)
    res.send('dummy response')
})

router.get('/test-me', function(req, res) {
    console.log('------------------')
    console.log(req)
    console.log('------------------')
    console.log('These are the request query parameters: ', req.query)
    res.send('My first ever api!')
});

//7 April Assignment
// 1 Problem

router.get('/movies', function(req, res) {
    const arr = ['muvi1', 'muvi2', 'muvi3', 'muvi4', 'muvi5']
    res.send(arr)
});

// 2 Problem

// router.get('/movies/:indexNumber', function(req, res) {
//     const arr = ['muvi1', 'muvi2', 'muvi3', 'muvi4', 'muvi5']
//     let data = req.params.indexNumber;
//     res.send(arr[data])
// });

// 2 & 3 problem
router.get('/movies/:indexNumber', function(req, res) {
    function getMovies() {
        const arr = ['muvi1', 'muvi2', 'muvi3', 'muvi4', 'muvi5']
        let data = req.params.indexNumber;
        if (arr.length >= data) {
            return arr[data]
        } else if (data > arr.length)
            return "Please enter valid number."
    }
    res.send(getMovies())
});


// 4 problem
router.get('/films', function(req, res) {

    let film = [{
        'id': 1,
        'name': 'The Shining'
    }, {
        'id': 2,
        'name': 'Incendies'
    }, {
        'id': 3,
        'name': 'Rang de Basanti'
    }, {
        'id': 4,
        'name': 'Finding Nemo'
    }]

    res.send(film)


});

// 5 problem
// router.get('/films/:filmId', function(req, res) {
//     function printMovies() {
//         let film = [{
//             'id': 1,
//             'name': 'The Shining'
//         }, {
//             'id': 2,
//             'name': 'Incendies'
//         }, {
//             'id': 3,
//             'name': 'Rang de Basanti'
//         }, {
//             'id': 4,
//             'name': 'Finding Nemo'
//         }]

//         let cinema = req.params.filmId;
//         for (let i = 0; i <= film.length; i++) {
//             if (cinema == film[i].id) {
//                 return film[i]
//             } else if (cinema !== film[i].id) {
//                 return 'No movie exist with this id.'
//             }
//         }
//     }
//     res.send(printMovies())

// });

// 1) Find the missing number of given array.

router.get('/array', function(req, res) {
    const arr = [1, 2, 3, 4, 5, 7, 8, 9];

    function missingNum(arr) {
        let n = arr.length;
        let total = (n * (n + 1)) / 2;
        for (let i = 0; i < n; i++) {


        }

    }


});


module.exports = router;
// adding this comment for no reason