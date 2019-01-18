import {
  mapGetters
} from "vuex"

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