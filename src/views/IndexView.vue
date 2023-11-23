<script setup>
</script>

<template>
	<!-- 초록색 메인 페이지 -->
	<section id="mu-featured-slider">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="mu-featured-area" style="filter: drop-shadow(0 0 5rem #292d44);">
						<h1 style="font-family:'Supermario' ;letter-spacing: 15px; font-size: 110px;">WHO's </h1>
						<br>
						<h1 style="font-family:'Supermario'; word-break:normal;letter-spacing: 15px; font-size: 160px;color:#CBBDE5">BANGU ? </h1>

						<!-- Start text slide -->
						<!-- <div class="mu-featured-slider-wrapper">
							<div class="mu-featured-slider" id="typed-strings">
								<p>I am <span>UI/UX Designer</span></p>
								<p>I am <span>Web Developer</span></p>
		   						<p>I am <span>Photographer</span></p>
							</div>
							<span id="typed"></span>
						</div> -->
						<!-- Start text slide -->
						
						<div class="mu-featured-content">
							<p>방학 때 잠시 있을 곳이 필요한가요? 특정 지역에 단기적으로 머물러야 하나요? 짧게든 길게든 단기적으로 머물러야 할 때,</p>
							<p>방구를 이용해서 방을 구해보세요! [방 구할 사람~?]</p>
							<div class="rank-flex">
								<RouterLink :to="{name:'chart'}" class="mu-primary-btn view-my-work-btn go-box" style="font-size: 20px;">랭킹 차트 보러 가기</RouterLink>
								<RouterLink :to="{name:'rent-room'}" class="mu-primary-btn view-my-work-btn go-box" style="font-size: 20px;">양도방 보러 가기</RouterLink>
							</div>
						</div>

					</div>
				</div>			
			</div>
		</div>
	</section>
	
	<!-- End Featured Slider -->


<!-- Start main content -->
		
	<main role="main">

		<!-- Start Testimonials -->
		  <section id="mu-testimonials">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="mu-testimonials-area">
							<div class="mu-testimonial-header">
								<h2 class="mu-heading-title">Client Testimonials</h2>
								<span class="mu-header-dot"></span>
							</div>

							<div class="mu-testimonials-block">
								<ul class="mu-testimonial-slide">

									<li>
										<i class="fa fa-quote-right mu-quote-icon"></i>
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
										<h5 class="mu-ct-name"> - Jhon Doe</h5>
										<span class="mu-ct-title">CEO, Apple Inc.</span>
									</li>

									<li>
										<i class="fa fa-quote-right mu-quote-icon"></i>
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
										<h5 class="mu-ct-name"> - Alice Boga</h5>
										<span class="mu-ct-title">Director, Google Inc.</span>
									</li>

									<li>
										<i class="fa fa-quote-right mu-quote-icon"></i>
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
										<h5 class="mu-ct-name"> - Jhon Smith</h5>
										<span class="mu-ct-title">Web Developer</span>
									</li>

								</ul>
							</div>

						</div>
					</div>
				</div>
			</div>
		</section>

		
		<!-- End Testimonials -->
	</main>
	
	<!-- End main content -->	
</template>

<style scoped>

@import "@/assets/css/bootstrap.min.css";
@import "@/assets/css/theme-color/default-theme.css";
@import "@/assets/css/style.css";
    /* @import '@/assets/images'; */
    /* @import '@/assets/css/slick.css';
    @import '@/assets/css/magnific-popup.css';
    @import '@/assets/css/theme-color/default-theme.css'; */
.rank-flex{
	display: flex;
	justify-content: space-around;
}
.go-box {
	width:300px;
}
.mu-featured-area{
	padding:180px;
	padding:200px 20px 250px 20px;

}
</style>