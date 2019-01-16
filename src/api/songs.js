import jsonp from '@/common/js/jsonp'
import axios from 'axios'
import {
  commonParams,
  options
} from './config'


export function getMusicResult(songmid) {
  const url = '/getMusicResult'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    // "-":"getplaysongvkey21453345029647064",
    data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"1416627489","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1416627489","songmid":["${songmid}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}