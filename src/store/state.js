import {
  playMode
} from '@/common/js/config'
import {
  loadPlay,
  loadSearch
} from "@/common/js/cache"

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay()
}

export default state