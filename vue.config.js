const axios = require('axios')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '' : '/',
  // lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('vue$','vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('common', resolve("src/common"))
  },
  devServer: {
    before(app) {
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
      app.get('/getMusicResult',(req,res)=>{
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        axios.get(url,{
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
    }
  },
}