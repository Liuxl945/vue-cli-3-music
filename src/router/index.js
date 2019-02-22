import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const Rank = resolve => {
  import('components/rank/rank').then(module => {
    resolve(module)
  })
}
const Recommend = resolve => {
  import('components/recommend/recommend').then(module => {
    resolve(module)
  })
}
const Search = resolve => {
  import('components/search/search').then(module => {
    resolve(module)
  })
}
const Singer = resolve => {
  import('components/singer/singer').then(module => {
    resolve(module)
  })
}
const SingerDtail = resolve => {
  import('components/singer-detail/singer-detail').then(module => {
    resolve(module)
  })
}
const Disc = resolve => {
  import('components/disc/disc').then(module => {
    resolve(module)
  })
}
const TopList = resolve => {
  import('components/top-list/top-list').then(module => {
    resolve(module)
  })
}
const UserCenter = resolve => {
  import('components/user-center/user-center').then(module => {
    resolve(module)
  })
}

export default new Router({
  mode: "hash",
  routes: [{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      children: [{
        path: ":id",
        component: TopList
      }]
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend,
      children: [{
        path: ":id",
        component: Disc
      }]
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      children: [{
        path: ":id",
        component: SingerDtail
      }]
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [{
        path: ":id",
        component: SingerDtail
      }]
    }, {
      path: '/user',
      name: 'user',
      component: UserCenter
    }
  ]
})