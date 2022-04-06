let printDate = function() {
    console.log(module)
    console.log('6th')
}

let printMonth = function() {
    console.log(module)
    console.log('April')
}

let getBAtchInfo = function() {
    console.log(module)
    console.log('Uranium, W2, d3, the topic for today is Nodejs module system')
}
module.exports.currentDate = printDate
module.exports.currentMonth = printMonth
module.exports.batchInfo = getBAtchInfo



// const data = new Date();

// let printDate = function() {
//     return data.getDate();
// }
// console.log(printDate)

// let printMonth = function() {
//     return data.toLocaleString('default', { month: 'long' });

// }
// let getBAtchInfo = function() {
//     return 'Uranium, W2, d3, the topicfor today is Nodejs module system '
// }

// module.exports.currentDate = printDate
// module.exports.currentMonth = printMonth
// module.exports.batchInfo = getBAtchInfo