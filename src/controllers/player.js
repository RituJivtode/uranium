let players = [{
        "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": [
            "swimming"
        ]
    },
    {
        "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports": [
            "soccer"
        ]
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ]
    },
]


let update = function(req, res) {
    let data = req.body
    console.log(data)



    if (players.find(item => item.name === data.name)) {
        res.send("player name is already exist!")
    } else {
        players.push(data)


        res.send({ data: players, status: true })
    }


}

module.exports.update = update