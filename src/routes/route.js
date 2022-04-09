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
// router.get('/films', function(req, res) {

//     let film = [{
//         'id': 1,
//         'name': 'The Shining'
//     }, {
//         'id': 2,
//         'name': 'Incendies'
//     }, {
//         'id': 3,
//         'name': 'Rang de Basanti'
//     }, {
//         'id': 4,
//         'name': 'Finding Nemo'
//     }]

//     res.send(film)


// });

// 5 problem
router.get('/films/:filmId', function(req, res) {
    const film = req.params.filmId
    const arryy = [{
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

    let result = arryy[film]
    if (result.length <= 0) {
        res.send("please enter a valid number")
    } else {
        res.send(result)
    }



});

// 1) Find the missing number of given array.

router.get('/array', function(req, res) {
    const arr = [1, 2, 3, 4, 5, 7, 8, 9];

    let total = 0;
    for (var i in arr) {
        total += arr[i];
    }

    let lastDigit = arr.pop()
    let consecutiveSum = lastDigit * (lastDigit + 1) / 2
    let missingNumber = consecutiveSum - total

    res.send({ data: missingNumber })


});


// 2) problem
router.get("/sol2", function(req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr = [33, 34, 35, 37, 38]
    let len = arr.length

    let total = 0;
    for (var i in arr) {
        total += arr[i];
    }

    let firstDigit = arr[0]
    let lastDigit = arr.pop()
    let consecutiveSum = (len + 1) * (firstDigit + lastDigit) / 2
    let missingNumber = consecutiveSum - total

    res.send({
        data: missingNumber
    })
});



module.exports = router;
// adding this comment for no reason