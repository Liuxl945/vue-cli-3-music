<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" v-show="!query" class="shortcut-wrapper">
      <scroll ref="shortcut" class="shortcut" :data="shortcut" :refreshDelay="refreshDelay">
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
    <top-tip ref="topTip">
      <div class="tip-title">
        <i class="icon-ok"></i>
        <span class="text">1首歌曲已经添加到播放列表</span>
      </div>
    </top-tip>
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
import TopTip from "base/top-tip/top-tip";
import Scroll from "@/base/scroll/scroll";

import { mapActions } from "vuex";
import { playlistMixin, searchMixin } from "common/js/mixin";
export default {
  mixins: [playlistMixin, searchMixin],
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Scroll,
    Confirm,
    TopTip
  },
  data() {
    return {
      hotKey: []
    };
  },
  created() {
    this._getHotKey();
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory);
    }
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";

      this.$refs.shortcutWrapper.style.bottom = bottom;
      this.$refs.searchResult.style.bottom = bottom;
      this.$refs.shortcut.refresh();
      this.$refs.suggest.refresh();
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    deleteOne(item) {
      this.deleteSearchHistory(item);
    },
    _getHotKey() {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10);
        }
      });
    },
    ...mapActions(["clearSearchHistory"])
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
  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;

    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }

    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
}
</style>