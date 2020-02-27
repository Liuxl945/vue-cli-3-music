const express = require('express')
const axios = require('axios')

var app = express()

app.get('/getDiscList', (req, res) => {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/portal/playlist.html',
            origin: 'https://y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(e => {
        console.log(e)
    })
})
app.get('/getSinger', (req, res) => {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/portal/singer_list.html',
            origin: 'https://y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(e => {
        console.log(e)
    })
})
app.get('/getMusicResult', (req, res) => {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/portal/player.html',
            origin: 'https://y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(e => {
        console.log(e)
    })
})
app.get("/Lyric", (req, res) => {
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/portal/player.html',
            origin: 'https://y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(e => {
        console.log(e)
    })
})
app.get('/disstList', (req, res) => {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

    axios.get(url, {
        headers: {
            referer: `https://y.qq.com/n/yqq/playlist`,
            origin: 'https://y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(e => {
        console.log(e)
    })
})
app.get("/TopList", (req, res) => {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

    axios.get(url, {
        headers: {
            referer: `https://m.y.qq.com/`,
            origin: 'https://m.y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(e => {
        console.log(e)
    })
})
app.get("/getSearch", (req, res) => {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

    axios.get(url, {
        headers: {
            referer: `https://m.y.qq.com/?ADTAG=myqq`,
            origin: 'https://m.y.qq.com'
        },
        params: req.query
    }).then(response => {
        res.json(response.data)
    }).catch(e => {
        console.log(e)
    })
})

app.use(express.static('./dist'))

module.exports = app.listen(4000,err=>{
    if(err){
        console.log(err)
        return
    }
    console.log("http server is listening at localhost:4000")
})
