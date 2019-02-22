<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import { ERR_OK } from "api/config";
import { getSingerList } from "api/singer";
import Singer from "common/js/singer";
import { mapMutations } from "vuex";
import { playlistMixin } from "common/js/mixin";

import listView from "base/listview/listview";

const HOT_NAME = "热门";
const HOT_SINGER_LENGTH = 10;

export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    };
  },
  components: {
    listView
  },
  mounted() {
    this._getSingerList();
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";
      this.$refs.singer.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    selectSinger(item) {
      this.$router.push({
        path: `/singer/${item.id}`
      });
      this.setSinger(item);
    },

    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._nomallizeSinger(res.data.list);
        }
      });
    },
    _nomallizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };

      list.forEach((item, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        const key = item.Findex;
        if (map[key] === undefined) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      //为了得到有序列表，我们需要处理 map
      let ret = [];
      let hot = [];

      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });

      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
