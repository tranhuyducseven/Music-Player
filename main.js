const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const nextButton = $(".btn-next");
const prevButton = $(".btn-prev");
const randomButton = $(".btn-random");
const repeatButton = $(".btn-repeat");
const apps = {
  currentIndex: 0,
  isPlaying: false,
  isRepeat: false,
  isPlayedArray: [],
  songs: [
    {
      name: "YÊU MỘT NGƯỜI CÓ LẼ",
      singer: "Lou Hoàng - Miu Lê",
      path: "./audio/YeuMotNguoiCoLe.mp3",
      image: "./img/yeumotnguoicole.jpg",
    },
    {
      name: "HƯƠNG",
      singer: "Văn Mai Hương",
      path: "./audio/Huong.mp3",
      image: "./img/huong.jpg",
    },
    {
      name: "AI",
      singer: "Da Sun Kid",
      path: "./audio/Ai.mp3",
      image: "./img/ai.jpg",
    },
    {
      name: "NẰM NGỦ EMRU",
      singer: "Bích Phương",
      path: "./audio/NamNguEmru.mp3",
      image: "./img/nam-ngu-emru.jpg",
    },
    {
      name: "24H",
      singer: "LyLy",
      path: "./audio/24H.mp3",
      image: "./img/24h.jpg",
    },
    {
      name: "THÁNG TƯ LÀ LỜI NÓI DỐI CỦA EM",
      singer: "Hà Anh Tuấn",
      path: "./audio/Thang4LaLoiNoiDoiCuaEm.mp3",
      image: "./img/thang4.jpg",
    },
    {
      name: "LẠC",
      singer: "Rhymastic",
      path: "./audio/Lac.mp3",
      image: "./img/lac.jpg",
    },
  ],
  initIsPlayedArray: function () {
    this.isPlayedArray.length = this.songs.length;
    for (var i = 0; i < this.isPlayedArray.length; i++)
      this.isPlayedArray[i] = false;
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `   <div class="song ${
        index === this.currentIndex ? "active" : ""
      }">
          <div
            class="thumb"
            style="
              background-image: url('${song.image}');
            "
          ></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>`;
    });
    $(".playlist").innerHTML = htmls.join("");
  },
  handleEvent: function () {
    const _this = this;
    const cdWidth = cdThumb.offsetWidth;

    //CD spin
    const cdAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdAnimate.pause();
    //scroll

    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    //click play
    playBtn.addEventListener("click", () => {
      if (_this.isPlaying) audio.pause();
      else audio.play();
      audio.onplay = () => {
        _this.isPlaying = true;
        player.classList.add("playing");
        cdAnimate.play();
      };
      audio.onpause = () => {
        _this.isPlaying = false;
        player.classList.remove("playing");
        cdAnimate.pause();
      };
      audio.ontimeupdate = () => {
        const progressPercentage = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercentage;
      };
      progress.onchange = function (e) {
        const seekTime = (e.target.value / 100) * audio.duration;
        audio.currentTime = seekTime;
      };
    });
    //Prev
    prevButton.addEventListener("click", () => {
      if (_this.isRandom) _this.playRandomSong();
      else _this.prevSong();
      _this.isPlayedArray[this.currentIndex] = true;
      audio.play();
      _this.render();
    });
    //Next
    nextButton.addEventListener("click", () => {
      if (_this.isRandom) _this.playRandomSong();
      else _this.nextSong();
      _this.isPlayedArray[this.currentIndex] = true;
      audio.play();
      _this.render();
    });
    //Random
    randomButton.addEventListener("click", () => {
      _this.isRandom = !_this.isRandom;
      randomButton.classList.toggle("active", _this.isRandom);
    });
    //Repeat
    repeatButton.addEventListener("click", () => {
      _this.isRepeat = !_this.isRepeat;
      repeatButton.classList.toggle("active", _this.isRepeat);
    });
    //Ended
    audio.addEventListener("ended", () => {
      if (_this.isRepeat) audio.play();
      else nextButton.click();
    });
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
    this.loadCurrentSong();
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) this.currentIndex = 0;
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    const prevIndex = this.currentIndex;
    do {
      this.currentIndex = Math.floor(Math.random() * this.songs.length);
      if (this.isPlayedArray.every((e) => e === true)) {
        this.initIsPlayedArray();
        break;
      }
    } while (
      prevIndex === this.currentIndex ||
      this.isPlayedArray[this.currentIndex]
    );
    this.loadCurrentSong();
  },
  start: function () {
    this.initIsPlayedArray();
    this.defineProperties();
    this.handleEvent();
    this.loadCurrentSong();
    this.render();
  },
};
apps.start();
