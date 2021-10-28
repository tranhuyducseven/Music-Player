const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $(".player");
console.log(player);
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");

const apps = {
  currentIndex: 6,
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
    //scroll
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    //click play
    playBtn.addEventListener("click", () => {
      audio.play();
      player.classList.add("playing");
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
