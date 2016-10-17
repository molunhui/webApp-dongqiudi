
let host = "https://api.dongqiudi.com"

module.exports = {
    index: function(page, url = `${host}/app/tabs/android/1.json?mark=gif`) {
        console.log(url)
        let time = Math.floor(new Date().getTime()/1000)
        return url
    },

    recommendLive: function(data) {
        return `${host}/data/index`
    }
}