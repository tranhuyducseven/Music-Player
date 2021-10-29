const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const apps = {
  currentIndex: 0,
  isPlaying: false,
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
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  render: function () {
    const htmls = this.songs.map((song) => {
      return `   <div class="song">
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
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
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
  },

  start: function () {
    this.defineProperties();
    this.handleEvent();
    this.loadCurrentSong();
    this.render();
  },
};
apps.start();
