<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div v-if="recomends.length" class="slider-wapper">
          <silder>
            <div v-for="item in recomends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </silder>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌曲推荐</h1>
          <ul >
            <li @click="selectItem(item)" v-for="item in discList" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container">
        <loading v-show="!discList.length"></loading>
      </div>
    </scroll>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRecomend, getDiscList } from "@/api/recommend";
import { ERR_OK } from "@/api/config";
import { playlistMixin } from "common/js/mixin";
import { mapMutations } from "vuex";
import Silder from "@/base/slider/slider";
import Scroll from "@/base/scroll/scroll";
import Loading from "@/base/loading/loading";

export default {
  mixins: [playlistMixin],
  components: {
    Silder,
    Scroll,
    Loading
  },
  data() {
    return {
      recomends: [],
      discList: []
    };
  },
  created() {
    this._getRecomend();
    this._getDistList();
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? "60px" : "";

      this.$refs.recommend.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      });
      this.setDisc(item);
    },
    _getRecomend() {
      getRecomend().then(res => {
        if (res.code === ERR_OK) {
          this.recomends = res.data.slider;
        }
      });
    },
    _getDistList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      });
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
};
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/style/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>