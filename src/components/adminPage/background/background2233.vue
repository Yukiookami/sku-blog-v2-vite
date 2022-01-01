<!--
 * @Author: zxy
 * @Date: 2021-12-30 14:59:32
 * @LastEditTime: 2022-01-01 21:10:04
 * @FilePath: /sku-blog-vite/src/components/adminPage/background/background2233.vue
-->
<template>
  <div class="home-page-back">
    <!-- 背景视频 -->
    <video class="test-bg-video"
    :class="{'show-video': overLoad}"
    @playing="loadOver" autoplay loop muted src="../../../assets/bilibili-back/bg.mp4"></video>
    <!-- 右半部分漂浮物 -->
    <div class="test-bg-float">
      <img src="../../../assets/bilibili-back/float.png" alt="">
    </div>
    <!-- 背景组件 -->
    <div class="test-bg-back-sec">
      <!--背景图 -->
      <div class="test-bg-back-img">
        <img src="../../../assets/bilibili-back/back.png" alt="">
      </div>

      <!-- 背景区左部分2233 -->
      <div class="test-bg-left-sec">
        <p class="test-bg-text test-bg-text-loding">Initializing…………</p>
        <p class="test-bg-text test-bg-text-welcome">Welcome to the System!</p>
        <!-- 马赛克2233 -->
        <div class="test-bg-kakubox" id="box">
          <canvas id="canvas"></canvas>
        </div>
        <!-- 2233 -->
        <div class="test-bg-mainImage">
          <img src="../../../assets/bilibili-back/2233.png" alt="">
        </div>
      </div>

      <!-- 红色进度条，圆，准星，时间，警告 -->
      <div class="test-bg-right-sec">
        <!-- 上层 -->
        <div class="test-bg-right-top">
          <!-- 红色进度条 -->
          <div class="test-bg-red-loop">
            <img src="../../../assets/bilibili-back/redpro.png" alt="">
          </div>
          
          <!-- 圆和时钟 -->
          <div class="test-yuan-timer-sec">
            <!-- 圆-->
            <div class="test-bg-yuan">
              <!-- 内圈圆 -->
              <img class="test-bg-yuan-naka" src="../../../assets/bilibili-back/yuan/naka.png">
              <!-- 外圈圆 -->
              <img class="test-bg-yuan-soto" src="../../../assets/bilibili-back/yuan/soto.png">
            </div>
            <!-- 时钟 -->
            <div class="test-bg-timer">
              <img src="../../../assets/bilibili-back/time.png" alt="">
              <div class="test-time-text">
                {{time}}
              </div>
            </div>
          </div>
        </div>

        <!-- 下层 -->
        <div class="test-bg-rigth-bottom">
          <!-- 准星 -->
          <div class="test-bg-mark-sec">
            <img class="test-bg-mark-bord bord-left" src="../../../assets/bilibili-back/mark/left.png" alt="">
            <img class="test-bg-mark-ura" src="../../../assets/bilibili-back/mark/naka-soto.png" alt="">
            <img class="test-bg-mark-soto" src="../../../assets/bilibili-back/mark/naka-ura.png" alt="">
            <img class="test-bg-mark-bord bord-right" src="../../../assets/bilibili-back/mark/right.png" alt="">
          </div>
          <!-- 警告 -->
          <div class="test-bg-attention">
            <img src="../../../assets/bilibili-back/attention.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 导入图片马赛克模组
  import Mosaic from "image-mosaic";

  // 引入图片资源
  import backGround2233 from '../../../assets/bilibili-back/2233.png'

  export default {
    data () {
      return {
        // 当前时间
        time: "00'00",
        // 背景马赛克图片
        imgSrc: backGround2233,
        // 视频是否加载完成
        overLoad: false
      }
    },
    created () {
      this.getTimeNow()
      setInterval(() => {
        this.getTimeNow()
      }, 1000)
    },
    mounted () {
      this.initMosaic();
    },
    methods: {
      /**
       * @description 设置图片马赛克
       */
      drawImageToCanvas() {
        const canvas = document.querySelector("#canvas");
        const ctx = canvas.getContext("2d");
        let imageUrl;
        if (this.imgSrc) {
          imageUrl = this.imgSrc;
        }
        return new Promise((resolve) => {
          const image = new Image();
          image.crossOrigin = "Annoymous";
          image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(this, 0, 0, image.width, image.height);
            resolve(ctx);
          };
          image.src = imageUrl;
        });
      },
      initMosaic() {
        this.drawImageToCanvas().then((ctx) => {
          const mosaic = new Mosaic(ctx);
          const MouseEvents = {
            init() {
              mosaic.context.canvas.addEventListener(
                "mousedown",
                MouseEvents.mousedown
              );
            },
            mousedown() {
              mosaic.context.canvas.addEventListener(
                "mousemove",
                MouseEvents.mousemove
              );
              document.addEventListener("mouseup", MouseEvents.mouseup);
            },
            mousemove(e) {
              if (e.shiftKey) {
                mosaic.eraseTileByPoint(e.layerX, e.layerY);
                return;
              }
              mosaic.drawTileByPoint(e.layerX, e.layerY);
            },
            mouseup() {
              mosaic.context.canvas.removeEventListener(
                "mousemove",
                MouseEvents.mousemove
              );
              document.removeEventListener("mouseup", MouseEvents.mouseup);
            },
          };
          mosaic.drawAllTiles();
        });
      },
      /**
       * @description 获取当前时间
       */
      getTimeNow () {
        let myDate = new Date()
        
        this.time = `${myDate.getHours()}'${myDate.getMinutes()}`
      },
      /**
       * @description: 视频是否加载完成
       * @param {*}
       * @return {*}
       */      
      loadOver () {
        this.overLoad = true
      }
    }
  }
</script>

<style lang="scss" scoped>
// 导入动画css 
@import '../../../assets/css/adminCss/animetionBackground.css';

// 整体css
.home-page-back {
  position: fixed;
  left: 8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 100vh;  
  background-color: #000;
  width: 100%;
  user-select: none;

  // 背景视频
  .test-bg-video {
    position: fixed;
    transition: all .3s ease-in-out;
    // width: 90vw;
    background-size: 100% 100%;
    left: 55vw;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -10;
    opacity: 0;
  }

  .show-video {
    opacity: 1;
  }

  // 背景漂浮物
  .test-bg-float {
    position: absolute;
    left: 52vw;
    top: 11vw;
    width: 22vw;
    animation: dift 7s linear infinite alternate-reverse;
    z-index: 10;

    img {
      width: 100%;
    }
  }

  // 背景区
  .test-bg-back-sec {
    position: relative;
    display: flex;
    width: 70vw;
    min-height: calc(70vw / 1.73);
    z-index: 1;

    // 背景图
    .test-bg-back-img {
       width: 70vw;
       position: fixed;
       z-index: -1;

       img {
         width: 100%;
       }
    }
  }

  // 背景区左半部分
  .test-bg-left-sec {
    position: relative;
    // display: flex;
    // align-items: center;
    width: 40vw;
    margin-right: 2vw;

    // 欢迎文字
    .test-bg-text {
      position: absolute;
      top: 8vw;
      left: 5vw;
      font-weight: bold;
      color: #abbdca;
      font-size: 0.83333vw;
    }

    .test-bg-text-welcome {
      animation: textWelcome 4s linear;
    }

    .test-bg-text-loding {
      top: 6.3vw;
      animation: textShow 1.5s linear 2;
    }

    // 马赛克2233
    .test-bg-kakubox {
      position: absolute;
      top: 10vw;
      overflow: hidden;
      width: 40vw;
      // height: calc(40vw / 1.66);
      height: 0;
      animation: mosaic 12s linear;

      canvas {
        width: 100%;
      }
    }

    // 2233
    .test-bg-mainImage {
      overflow: hidden;
      margin-top: 10vw;
      width: 40vw;
      height: calc(40vw / 1.66);
      animation: mainImage 8s linear;

      img {
        width: 100%;
      }
    }
  }

  // 背景区右半部分
  .test-bg-right-sec {
    padding-top: 7.5vw;
    width: 25vw;
    animation: dift 7s linear infinite alternate;

    // 右半上层
    .test-bg-right-top {
      display: flex;

      // 红色进度条
      .test-bg-red-loop {
        position: relative;
        width: 2vw;
        height: .6vw;
        overflow: hidden;
        margin-top: 1.5vw;
        
        &::after {
          content: "";
          position: absolute;
          top: 0;
          display: block;
          background-color: rgba(0, 0, 0, .5);
          width: 100%;
          height: 100%;
          animation: fromYtoY 1s linear infinite;
        }

        img {
          width: 100%;
        }
      }

      // 圆，时钟
      .test-yuan-timer-sec {
        display: flex;
        align-items: flex-end;

        // 圆
        .test-bg-yuan {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 7.1vw;
          width: 7.1vw;
          margin: 0 1.5vw 0 7.5vw;
  
          // 内圈圆
          .test-bg-yuan-naka {
            position: absolute;
            width: 6vw;
            height: 6vw;
            animation: mawaru 20s linear reverse infinite;
          }
  
          // 外圈圆
          .test-bg-yuan-soto {
            position: absolute;
            width: 7.1vw;
            height: 7.1vw;
            animation: mawaru 20s linear infinite;
          }
        }

        // 时钟
        .test-bg-timer {
          font-family: SimHei;
          width: 3vw;
          font-size: 1.18vw;
          color: #abbdca;
          
          img {
            width: 100%;
          }

          .test-time-text {
            filter: blur(.8px);
          }
        }
      }
    }

    // 右半下层
    .test-bg-rigth-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 5vw;

      // 准星
      .test-bg-mark-sec {
        position: relative;
        display: flex;
        height: 12vw;
        width: 10.5vw;

        // 边框
        .test-bg-mark-bord {
          position: absolute;
          height: 12vw;
        }

        // 左框
        .bord-left {
          width: 4vw;
          left: -2.2vw;
          animation: markLeft 5s infinite ease alternate;
        }

        // 右框
        .bord-right {
          width: 6.9vw;
          right: -5.1vw;
          animation: markRight 5s infinite ease alternate;
        }

        // 中心圆
        .test-bg-mark-ura {
          position: absolute;
          top: calc((12vw - 4vw) / 2);
          left: calc((10.5vw - 4vw) / 2);
          width: 4vw;
          height: 4vw;
        }

        // 中心框
        .test-bg-mark-soto {
          position: absolute;
          top: calc((12vw - 10.1vw) / 2);
          left: calc((10.5vw - 6.3vw) / 2);
          width: 6.3vw;
          height: 10.1vw;
        }
      }
    }

    // 警告
    .test-bg-attention {
      width: 5vw;
      margin-right: 3vw;
      animation: attention .2s infinite linear alternate;

      img {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 1500px) {
    .home-page-back {
      width: 85vw;;
    }
  }

</style>