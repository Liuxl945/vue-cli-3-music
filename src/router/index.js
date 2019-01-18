import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/rank/rank'
import Recommend from '@/components/recommend/recommend'
import Search from '@/components/search/search'
import Singer from '@/components/singer/singer'
import SingerDtail from "@/components/singer-detail/singer-detail"
import Disc from "@/components/disc/disc"
import TopList from "@/components/top-list/top-list"
Vue.use(Router)

export default new Router({
  mode:"hash",
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children:[{
        path:":id",
        component:TopList
      }]
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children:[{
        path:":id",
        component:Disc
      }]
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children:[{
        path:":id",
        component:SingerDtail
      }]
    }
  ]
})
