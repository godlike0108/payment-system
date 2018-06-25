<template>
<Row  type="flex" justify="start" align="top">
    <Col  :xs="0" :sm="24" :md="24" :lg="24" class="head" >
		<Row type="flex" justify="start" >
			<Col :xs="0" :sm="6" :md="6" :lg="6">
			<img src="../assets/w.png" alt="" >
			</Col>
		</Row>
	</Col>
	<Col  :xs="0" :sm="24" :md="24" :lg="24" class="slider" >
		<Carousel loop>
			<CarouselItem>
				<div class="demo-carousel">	</div>
			</CarouselItem>
			<CarouselItem>
				<div class="demo-carousel"></div>
			</CarouselItem>
		</Carousel>
		
	</Col>
    <Col  :xs="24" :sm="24" :md="24" :lg="24" class="storyArea">
		<Row>
			<Col :xs="{span:20,offset:2}" :sm="{span:8,offset:2}" :md="{span:6,offset:2}" :lg="{span:6,offset:2}">
				<router-view></router-view>
			</Col>
			<Col :xs="0" :sm="{span:11,offset:1}" :md="{span:13,offset:1}" :lg="{span:13,offset:1}">
				<h2 class="title left">無論身在何處，<img src="../assets/w.png"> 轉帳就是這麼輕鬆。</h2>
				<p class="text left">白金支付提供您業界最頂尖的電子錢包服務，免費註冊，安全無虞，火速到款。</p>
				<div class="left">
					<Button type="primary" shape="circle" size="large" class="more ">了解更多</Button>
				</div>
			</Col>
		</Row>
		
    </Col>
	<Col  :xs="0" :sm="24" :md="24" :lg="24" >
		<h3 class="slogn ">白金支付完美支援各種行動裝置，理財高枕無憂。</h3>
	</Col>
	<Col  :xs="0" :sm="24" :md="24" :lg="24" class="footer">
		<Row  type="flex" justify="center" align="middle">
			<Col  :xs="0" :sm="20" :md="20" :lg="20" >
				<Row type="flex" justify="space-between" align="middle" class="link">
					<Col :sm="6" :md="6" :lg="6" class="left"><span class="line-item">聯絡我們</span><span class="line-item">交易安全</span></Col>
					<Col :sm="6" :md="6" :lg="6" class="right"></Col>
				</Row>
			</Col>
			<Col :xs="0" :sm="20" :md="20" :lg="20" class="divider"></Col>
			<Col  :xs="0" :sm="20" :md="20" :lg="20" >
				<Row type="flex" justify="space-between" align="middle" class="link">
					<Col :sm="12" :md="12" :lg="12" class="left" >
						<span class="line2-item">關於白金支付</span><span class="line2-item">企業合作</span><span class="line2-item">人才招募</span><span class="line2-item">English sevice</span>
					</Col>
					<Col :sm="6" :md="6" :lg="6" class="right">
						<span class="line2-item">網站導覽</span><span class="line2-item">使用條款</span><span class="line2-item">回饋建議</span>
					</Col>
				</Row>
			</Col>
		</Row>
	</Col>
</Row>
</template>

<script>
import { mapActions,mapState,mapGetters,mapMutations } from 'vuex'
	export default {
	props : [''],
		data() {
			return {
				
				ruleInline: {
				}
			}
        },
        computed:{
           
        },
		methods:{
		}
	}
</script>

<style>

.ivu-carousel-list{
		border-radius: 0px 0px 60% 60% / 0px 0px 90px 90px;
		overflow: hidden;
		box-shadow: 0px 5px 10px rgba(50,50,50,0.4)
	}
</style>


<style scoped>
	.head {
	width: 100%;
	height: 75px;
	background-image:linear-gradient(to bottom, #02BEF7 0%, #004A8B 100%)
	}
	.head img {
	margin: 24px 0
	}
	.slider{
		position: relative;
		
	}
	.slider img {
		width: 100%;
	}
	.storyArea{
		position: absolute;
		top:204px
	}
	.demo-carousel{
		height: 80vh;
		background-image: url('../assets/web.png');
		background-size: cover;
		background-position: 45%;
	}
	.slogn{
		color: #fff;
		font-size: 2em;
		font-weight: 400;
		margin: 40px auto
	}
	.title{
		color: #fff;
		font-size: 2em;
		font-weight: 400;
	}
	.text{
		color:#fff;
		font-size:1.3em;
		margin:15px 0;
		max-width: 470px;
	}
	.more{
	border:0px;
	padding: 8px 120px;
	background-image:linear-gradient(to bottom, #F9A738 0%, #F68C32 100%)
	}
	.footer{
		width: 100%;
		background: #fff;
		/* height: 206px; */
	}
	.link{
		margin: 35px auto
	}
	.line-item{
		font-size:1.2em;
		color: #4A4A4A;
		padding:20px
	}
	.line2-item{
		font-size:1.1em;
		color:#9B9B9B;
		padding:20px
	}
	.divider{
		height: 1px;
		background: #E2E1E7
	}
	.left{
		text-align: left
	}
	.right{
		text-align: right
	}
	
</style>