function convertSeconds (songDuration, data =  {'result':''}) {
    let left;
    let right;

    left = Math.floor(songDuration / 60);
    right = songDuration % 60;

    (right < 9) ? data.result += `:0${right}` : data.result +=  `:${right}`
    if (left >= 60) {
        convertSeconds(left, data);
    } else {
        data.result += `:${left}`
        data.result = data.result.slice(1,data.result.length)
    }
    data.result = data.result.split(':').reverse().join(':')
    return(data.result)

}
let something = convertSeconds(3721)
console.log(something)