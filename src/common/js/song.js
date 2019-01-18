export default class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    dration,
    image,
    url
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.dration = dration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer:fillterSinger(musicData.singer),
    album:musicData.albumname,
    dration:musicData.interval,
    name:musicData.songname,
    image:`//y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

function fillterSinger(singer) {
  let ret = []
  if (!singer) {
    return ""
  }
  singer.forEach(s => {
    ret.push(s.name)
  });

  return ret.join('/')
}
