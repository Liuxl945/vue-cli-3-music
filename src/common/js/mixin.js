import {
  mapGetters,
  mapMutations,
  mapActions
} from "vuex"

import {
  playMode
} from "@/common/js/config";
import {
  shuffle
} from "@/common/js/util";

export const playlistMixin = {
  computed: {
    ...mapGetters([
      "playlist"
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  methods: {
    handlePlaylist() {
      throw new Error(`component must implement handlePlaylist method`)
    }
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newval) {
      this.handlePlaylist(newval)
    }
  }
}

export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ?
        "icon-sequence" :
        this.mode === playMode.loop ? "icon-loop" : "icon-random";
    },
    ...mapGetters(["sequenceList", "currentSong", "playlist", "mode"])
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this._resetCurrentIndex(list);
      this.setPlayList(list);
    },
    _resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    ...mapMutations({
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayMode: "SET_PLAY_MODE",
      setPlayList: "SET_PLAYLIST"
    })
  }
}

export const searchMixin = {
  data() {
    return {
      query: ""
    }
  },
  computed: {
    ...mapGetters(["searchHistory"])
  },
  methods: {
    saveSearch() {
      this.SaveSearchHistory(this.query);
    },
    blurInput() {
      this.$refs.searchBox.blur();
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
      this.query = query;
    },
    onQueryChange(query) {
      this.query = query;
    },
    ...mapActions([
      "SaveSearchHistory",
      "deleteSearchHistory",
    ])
  }
}