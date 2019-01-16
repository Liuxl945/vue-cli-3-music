import jsonp from '@/common/js/jsonp'
import axios from 'axios'
import {
  commonParams,
  options
} from './config'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, options)

  // const url = '/getSinger'
  // const data = Object.assign({},commonParams,{
  //   platform: 'yqq.json',
  //   data:'{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}',
  //   needNewCode: 0,
  //   ct: 24,
  //   loginUin: 0,
  //   hostUin: 0,
  // })
  // return axios.get(url,{
  //   params:data
  // }).then(res=>{
  //   return Promise.resolve(res.data)
  // })
}


export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    format: 'json',
    platform: 'yqq.json',
    needNewCode: 0,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    singermid: singerId
  })

  return jsonp(url, data, options)
}
