<template>
<div>
<section class="section-1">
  <header class="sec-1-width">
    <Row>
      <Col :lg="{ span: 3 }" class="sub-header">
        <img class="logo" src="/static/images/entry/logo.png" alt="">
        <img class="logo-mobile" src="/static/images/entry/logo_mobile.png" alt="">
        <button class="head-btn">
          <router-link :to="'/login'">會員登入</router-link>
        </button>
      </Col>
      <Col class="menu-container" :xs="{ span: 24 }" :lg="{ span: 10, offset: 11 }">
        <ul class="menu">
          <li>服務項目</li>
          <li>安全保證</li>
          <li>關於我們</li>
          <li>線上支援</li>
          <li class="menu-phone">
            <router-link :to="'/login'">會員登入</router-link>
          </li>
        </ul>
      </Col>
    </Row>
  </header>
  <div class="sec-1-content sec-1-width">
    <Row class="slogan-container">
      <Col :lg="{ span: 10 }">
        <p v-html="entryData.section1.text1" class="slogan"></p>
        <p class="sub-slogan">{{ entryData.section1.text2 }}</p>
        <br>
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
<section class="sec-mobile">
  <footer class="sec-1-width">
    <Row>
      <Col>
        <p class="sec1-footer-text">超過 {{ customerQuantity }} 名客戶使用 DGPay 轉帳服務</p>
      </Col>
    </Row>
  </footer>
</section>
<section class="section-2">
  <h2>{{ entryData.section2.title }}</h2>
  <h4>{{ entryData.section2.subtitle }}</h4>
  <br><br>
  <p>{{ entryData.section2.text }}</p>
</section>
<section class="section-3">
  <h3 v-html="entryData.section3.quote"></h3>
  <br>
  <p>{{ entryData.section3.author }}</p>
</section>
<section class="section-4">
  <Row>
    <Col v-for="(item, key) in entryData.section4" :key="key" class="sec-4-feature" :lg="{ span: 12 }">
      <Row :gutter="20">
        <Col :lg="{ span: 4 }">
          <img :src="item.img" alt="">
        </Col>
        <Col :lg="{ span: 20 }">
          <h2>{{ item.title }}</h2>
          <h4>{{ item.subtitle }}</h4>
          <p>{{ item.text}}</p>
          <br>
          <button class="feature-btn">詳細資料</button>
        </Col>
      </Row>
    </Col>
  </Row>
</section>
<section class="section-5">
  <h2>{{ entryData.section5.title }}</h2>
  <h4>{{ entryData.section5.text }}</h4>
  <br><br>
  <button class="slogan-btn">
    <router-link :to="'/signup'">開始免費註冊</router-link>
  </button>
</section>
<section class="section-6">
  <Row>
    <Col :lg="{ offset: 6, span: 12 }">
      <ul class="menu">
        <li>服務項目</li>
        <li>安全保證</li>
        <li>關於我們</li>
        <li>線上支援</li>
        <li>
          <router-link :to="'/login'">會員登入</router-link>
        </li>
      </ul>
    </Col>
  </Row>
  <Row class="sec6-mobile" type="flex" :gutter="20" justify="center">
    <Col :xs="{ span: 12 }" :lg="{ span: 4 }"><button>
      <router-link :to="'/login'">會員登入</router-link>
    </button></Col>
    <Col :xs="{ span: 12 }" :lg="{ span: 4 }"><button>
      <router-link :to="'/signup'">會員註冊</router-link>
    </button></Col>
  </Row>
  <Row>
    <Col :lg="{ offset: 8, span: 8 }">
      <ul class="footer-menu">
        <li>企業合作</li>
        <li>人才招募</li>
        <li>隱私權條款</li>
      </ul>
    </Col>
  </Row>
  <Row class="sec6-link" type="flex" :gutter="20" justify="center">
    <Col :xs="{ span: 4 }"><img src="/static/images/entry/icon_facebook.png" alt=""></Col>
    <Col :xs="{ span: 4 }"><img src="/static/images/entry/icon_instagram.png" alt=""></Col>
  </Row>
</section>
</div>
</template>

<script>
// 匯入內容
import data from '@/assets/data/entry/entry'
export default {

  name: 'Entry',
  created() {
    this.entryData = data
  },
  data () {
    return {
      entryData: {},
      customerQuantity: 13000
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@media-md: 600px;
@media-lg: 1200px;
@bg-phone-head: #0939b3; /* 背景藍 */
@bg-primary: #bbe2ec; /* 背景藍 */
@bg-sec: #f1f2f5; /* 背景灰 */
@bg-green: #44d0b0; /* 背景綠 */
@text-primary: #2e2e2e; /* 內文字灰 */
@text-slogan: #0939b3; /* 標語文字藍 */
@text-green: #0b808a; /* 文字綠 */
@text-white: #FFF; /* 內文字白 */
@text-size: 16px; /* 內文文字大小 */
@text-size-mob: 14px; /* 內文文字大小-手機 */
@text-size-slogan: 60px; /* 標語文字大小 */
@text-size-mob-slogan: 30px; /* 標語文字大小 */
@text-size-h2: 36px; /* 標題文字大小 */
@text-size-mob-h2: 28px; /* 標語文字大小 */
@text-size-h3: 30px; /* 標題文字大小 */
@text-size-mob-h3: 24px; /* 標題文字大小 */
@text-size-h4: 24px; /* 標題文字大小 */
@border-green: rgba(12, 210, 139, 0.2); /* 文字綠 */

.section-1 {
  position: relative;
  height: 100vh;
  width: 100vw;
  background: fixed @bg-primary right 0% center url('/static/images/entry/banner_image.png') no-repeat ;
  @media( max-width: @media-lg ) {
    background-size: contain;
    background-position: center top 150px;
  }
  font-size: @text-size;
  @media( max-width: @media-lg) {
    font-size: @text-size-mob;
  }
  header {
    position: absolute;
    top: 0%;
    width: 100%;
    height: 80px;
    @media( max-width: @media-lg ) {
     background: @bg-phone-head;
    }
    .ivu-row {
      height: 100%;
    }
    .ivu-col {
      height: 100%;
      display: flex;
      align-items:center;
    }
    .menu-container {
      @media( max-width: @media-lg ) {
        align-items: flex-start;
      }
    }
    .sub-header {
      justify-content: space-between;
    }
    .head-btn {
      border: none;
      padding: 6px 20px;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.5);
      @media(min-width: @media-lg ) {
        display: none;
      }
      a {
        color: @text-primary;
      }
    }
  }
  .sec-1-content {
    height: 100vh;
    display: flex;
    align-items: center;
    @media(max-width: @media-lg ) {
      align-items: flex-end;
    }
  }
  footer {
    position: absolute;
    bottom: 0;
    height: 100px;
    @media(max-width: @media-lg ) {
      display: none;
    }
  }
}

.sec-mobile {
  padding: 10px;
  font-size: @text-size;
  @media( max-width: @media-lg) {
    font-size: @text-size-mob;
  }
  @media(min-width: @media-lg ) {
    display: none;
  }
  footer {
    bottom: 0;
    height: 100px;
    p {
      text-align: center;
    }
  }
}

.sec-1-width {
  padding: 0 100px;
  @media( max-width: @media-lg ) {
    padding: 0 30px;
  }
}

.logo {
  width: 150px;
  height: auto;
  @media( max-width: @media-lg ) {
    display: none;
  }
}
.logo-mobile {
  width: 100px;
  height: auto;
  @media( min-width: @media-lg ) {
    display: none;
  }
}

.menu {
  width: 100%;
  list-style-type: none;
  display: flex;
  font-weight: 600;
  li {
    padding: 5px 0px;
    display: block;
    width: 100%;
    a {
      color: ;
    }
    &:last-child {
      @media( max-width: @media-lg ) {
        display: none;
      }
    }
  }
}

.slogan-container {
  width: 100%;
  p {
    text-align: left;
    margin-bottom: 1rem;
    @media( max-width: @media-lg ) {
      text-align: center;
    }
  }
}

.slogan {
  font-size: @text-size-slogan;
  color: @text-slogan;
  @media( max-width: @media-lg ) {
    font-size: @text-size-mob-slogan;
  }
}
.slogan-btn {
  color: @text-green;
  border: none;
  border-radius: 50px;
  padding: 20px 30px;
  letter-spacing: 3px;
  background-color: #FFF;
  span {
    vertical-align: middle;
  }
  i {
    padding: 0px 5px;
    vertical-align: middle;
  }
  a {
    color: @text-green;
  }
}

.sec1-footer-text {
  text-align: left;
}

.section-2 {
  padding: 100px;
  @media( max-width: @media-lg ) {
    padding: 50px;
  }
  font-size: @text-size;
  @media( max-width: @media-lg) {
    font-size: @text-size-mob;
  }
  width: 100%;
  height: 800px;
  background: fixed @bg-sec bottom 0% center url('/static/images/entry/cityscape.png') repeat-x ;
  h2 {
    font-size: @text-size-h2;
    margin-bottom: 0.5rem;
    color: @text-slogan;
  }
  h4 {
    font-size: @text-size-h4;
    margin-bottom: 1rem;
  }
  p {
    letter-spacing: 3px;
  }
}

.section-3 {
  padding: 100px;
  @media( max-width: @media-lg ) {
    padding: 100px 50px;
  }
  font-size: @text-size;
  @media( max-width: @media-lg) {
    font-size: @text-size-mob;
  }
  color: @text-white;
  width: 100%;
  height: 400px;
  background: url('/static/images/entry/quote_background.jpg') center/cover no-repeat ;
  .quote {
    font-size: 72px;
  }
  h3 {
    font-size: @text-size-h3;
    @media( max-width: @media-md) {
      font-size: @text-size-mob-h3;
    }
    margin-bottom: 0.5rem;
  }
  p {
    letter-spacing: 3px;
  }
}

.section-4 {
  width: 100%;
  font-size: @text-size;
  @media( max-width: @media-lg) {
    font-size: @text-size-mob;
  }
  .ivu-row {
    flex-wrap: wrap;
    @media( min-width: @media-lg ) {
      display: flex;
      align-items: stretch;
    }
  }
  .sec-4-feature {
    padding: 50px 100px;
    @media( max-width: @media-lg ) {
      padding: 50px;
    }
    border: 1px solid @border-green;
    &:hover {
      border: none;
      &:before {
        border: 10px solid @text-white;
        z-index: 10;
        content:"";
        position: absolute;
        top: -1%;
        left: -1%;
        width: 102%;
        height: 102%;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
      }
    }
    img {
      max-width: 128px;
      width: 100%;
      height: auto;
      margin-bottom: 0.5rem;
    }
    h2 {
      font-size: @text-size-h2;
      margin-bottom: 0.5rem;
      color: @text-slogan;
    }
    h4 {
      font-size: @text-size-h4;
      margin-bottom: 1rem;
    }
    p {
      letter-spacing: 3px;
    }
    .feature-btn {
      border: none;
      background: @bg-green;
      padding: 10px 30px;
      border-radius: 30px;
      color: @text-white;
      letter-spacing: 3px;
      font-size: @text-size;
      @media( max-width: @media-lg) {
        font-size: @text-size-mob;
      }
    }
  }
}

.section-5 {
  width: 100%;
  background: @bg-primary url('/static/images/entry/calltoaction_background.png') center bottom no-repeat;
  padding: 100px;
  @media( max-width: @media-lg ) {
    padding: 50px;
  }
  font-size: @text-size;
  @media( max-width: @media-lg) {
    font-size: @text-size-mob;
  }
  h2 {
    font-size: @text-size-h2;
    margin-bottom: 0.5rem;
    color: @text-slogan;
  }
  h4 {
    font-size: @text-size-h4;
    margin-bottom: 1rem;
  }
  p {
    letter-spacing: 3px;
  }
}

.section-6 {
  font-size: @text-size;
  @media( max-width: @media-lg) {
    font-size: @text-size-mob;
  }
  padding: 30px 100px;
  @media( max-width: @media-lg ) {
    padding: 30px 30px;
  }
  .ivu-row {
    margin-bottom: 1rem;
  }
  .sec6-mobile {
    margin-bottom: 2rem;
    @media( min-width: @media-lg) {
      display: none;
    }
    button {
      border: 1px solid @text-primary;
      padding: 10px 30px;
      border-radius: 30px;
      background: transparent;
      color: @text-primary;
      font-size: @text-size;
      @media( max-width: @media-lg) {
        font-size: @text-size-mob;
      }
    }
  }
  .sec6-link {
    img {
      width: 100%;
      max-width: 64px;
      height: auto;
    }
  }
}

.footer-menu {
  width: 100%;
  list-style-type: none;
  display: flex;
  li {
    padding: 5px 0px;
    display: block;
    width: 100%;

  }
}
</style>
