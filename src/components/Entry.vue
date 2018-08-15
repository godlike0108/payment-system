<template>
<div>
<section class="section-1">
  <header class="sec-1-width">
    <Row>
      <Col :xs="{ span: 20 }" :lg="{ span: 3 }">
        <img class="logo" src="/static/images/entry/logo.png" alt="">
      </Col>
      <Col class="menu-btn-container" :xs="{ span: 4 }" :lg="{ span: 3 }">
        <span class="menu-btn" @click="toggleMenu"><Icon type="navicon" size="36" /></span>
      </Col>
      <Col class="menu-container" :xs="{ span: 24 }" :lg="{ span: 8, offset: 10 }">
        <ul class="menu" :class="{ 'menu-collapsed': menuCollapsed }">
          <li>服務項目</li>
          <li>安全保證</li>
          <li>關於我們</li>
          <li>線上支援</li>
          <li>會員登入</li>
        </ul>
      </Col>
    </Row>
  </header>
  <div class="sec-1-content sec-1-width">
    <Row class="slogan-container">
      <Col :lg="{ span: 10 }">
        <p class="slogan">無論身在何處<br>轉帳就是這麼輕鬆</p>
        <p class="sub-slogan">白金支付提供您業界最頂尖的電子錢包服務，免費註冊，安全無虞，火速到款</p>
        <p><button class="slogan-btn">
          <Icon type="ios-plus-outline" size="24" /><span>建立你的電子錢包</span>
        </button></p>
      </Col>
    </Row>
  </div>
  <footer class="sec-1-width">
    <Row>
      <Col>
        <p class="sec1-footer-text">超過 {{ customerQuantity }} 名客戶使用 DGPay 轉帳服務</p>
      </Col>
    </Row>
  </footer>
</section>
<section class="section-2">
  <h2>DGPay 的優勢</h2>
  <h4>Our Adventage</h4>
  <br><br>
  <p>著教對員問那結小黨條，界議。
也給當密成化立冷而多，紀充紙半們作到等費：中舉之雙們什政一，下精得爭的約去，究弟人出生一想他再：童長生上……一建天下無難業半以他步夫什：的在家其的不國入方，常創奇主然力係著未布火天出委過法的心且大成小家會起或巴數人面間都但師望可館情中口來的總歌在運生天密區直經第其同斷次了。張福可演記？黑滿不商結不雄招？有樓子時生學需有應！賽向觀媽地指話樣沒特來……說近節在不。活量大以我們性樓近：們什死，遠打更會中間眼離參始然有。你走山爸興道；意物是相；運可依大我到來老是否山模共一過我色！</p>
</section>
</div>
</template>

<script>
export default {

  name: 'Entry',
  mounted () {
    if (window.innerWidth < 1200) { this.menuCollapsed = true}
  },
  data () {
    return {
      menuCollapsed: false,
      customerQuantity: 13000
    }
  },
  methods: {
    toggleMenu () { this.menuCollapsed = !this.menuCollapsed }
  }
}
</script>

<style lang="less" scoped>
@media-lg: 1200px;
@bg-primary: #bbe2ec; /* 背景藍 */
@bg-sec: #f1f2f5; /* 背景灰 */
@text-primary: #2e2e2e; /* 內文字灰 */
@text-slogan: #0939b3; /* 標語文字藍 */
@text-green: #0b808a; /* 文字綠 */
@text-size: 16px; /* 內文文字大小 */
@text-size-slogan: 60px; /* 標語文字大小 */
@text-size-pad-slogan: 30px; /* 標語文字大小 */
@text-size-h2: 36px; /* 標題文字大小 */
@text-size-h4: 24px; /* 標題文字大小 */

.section-1 {
  position: relative;
  height: 100vh;
  width: 100vw;
  background: fixed @bg-primary right 0% center url('/static/images/entry/banner_image.png') no-repeat ;
  @media( max-width: 1200px ) {
    background-size: contain;
  }
  font-size: @text-size;
  header {
    position: absolute;
    top: 0%;
    width: 100%;
    height: 80px;
    .ivu-row {
      height: 100%;
    }
    .ivu-col {
      height: 100%;
      display: flex;
      align-items:center;
    }
    .menu-container {
      @media( max-width: 1200px ) {
        align-items: flex-start;
      }
    }
  }
  .sec-1-content {
    height: 100vh;
    display: flex;
    align-items: center;
  }
  footer {
    position: absolute;
    bottom: 0;
    height: 100px;
  }
}

.sec-1-width {
  padding: 0 100px;
  @media( max-width: 1200px ) {
    padding: 0 30px;
  }
}

.logo {
  width: 160px;
  height: auto;
}

.menu-btn-container {
  display: flex;
  justify-content: center;
  .menu-btn {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid @text-primary;
    display: flex;
    justify-content: center;
    align-items: center;
    @media( min-width: 1200px ) {
      display: none;
    }
  }
}

.menu {
  width: 100%;
  list-style-type: none;
  display: flex;
  @media( max-width: 1200px ) {
    flex-wrap: wrap;
  }
  &.menu-collapsed {
    display: none;
  }
  li {
    padding: 5px 0px;
    display: block;
    width: 100%;
  }
}

.slogan-container {
  width: 100%;
  p {
    text-align: left;
    margin-bottom: 1rem;
  }
  .slogan {
    font-size: @text-size-slogan;
    color: @text-slogan;
    @media( max-width: 1200px ) {
      font-size: @text-size-pad-slogan;
    }
  }
  .slogan-btn {
    color: @text-green;
    border: none;
    border-radius: 50px;
    padding: 30px;
    letter-spacing: 5px;
    background-color: #FFF;
    span {
      vertical-align: middle;
    }
    i {
      padding: 0px 5px;
      vertical-align: middle;
    }
  }
}

.sec1-footer-text {
  text-align: left;
}

.section-2 {
  padding: 100px;
  @media( max-width: 1200px ) {
    padding: 50px;
  }
  font-size: @text-size;
  width: 100%;
  height: 800px;
  background: fixed @bg-sec bottom 0% center url('/static/images/entry/cityscape.png') repeat-x ;
  h2 {
    font-size: @text-size-h2;
    margin-bottom: 0.5rem;
  }
  h4 {
    font-size: @text-size-h4;
    margin-bottom: 1rem;
  }
  p {
    letter-spacing: 5px;
  }
}

</style>
