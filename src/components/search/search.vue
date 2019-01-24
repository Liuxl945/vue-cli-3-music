<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" v-show="!query" class="shortcut-wrapper">
      <scroll ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list :searches="searchHistory" @select="addQuery" @delete="deleteOne"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest ref="suggest" @select="saveSearch" :query="query" @listScroll="blurInput"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchBox from "@/base/search-box/search-box";
import SearchList from "@/base/search-list/search-list";
import { getHotKey } from "@/api/search";
import { ERR_OK } from "api/config";
import Suggest from "@/components/suggest/suggest";
import Confirm from "@/base/confirm/confirm";
import Scroll from "@/base/scroll/scroll";
import { mapActions, mapGetters } from "vuex";
import { playlistMixin } from "common/js/mixin";
export default {
  mixins: [playlistMixin],
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Scroll,
    Confirm
  },
  data() {
    return {
      hotKey: [],
      query: ""
    };
  },
  created() {
    this._getHotKey();
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory);
    },
    ...mapGetters(["searchHistory"])
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";

      this.$refs.shortcutWrapper.style.bottom = bottom;
      this.$refs.searchResult.style.bottom = bottom;
      this.$refs.shortcut.refresh();
      this.$refs.suggest.refresh();
    },
    blurInput() {
      this.$refs.searchBox.blur();
    },
    saveSearch() {
      this.SaveSearchHistory(this.query);
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    deleteOne(item) {
      this.deleteSearchHistory(item);
    },
    onQueryChange(query) {
      this.query = query;
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query);
      this.query = query;
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      });
    },
    ...mapActions([
      "SaveSearchHistory",
      "deleteSearchHistory",
      "clearSearchHistory"
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh();
        }, 20);
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/style/variable';
@import '~common/style/mixin';

.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: $font-size-medium;
          color: $color-text-l;

          .text {
            flex: 1;
          }

          .clear {
            extend-click();

            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>