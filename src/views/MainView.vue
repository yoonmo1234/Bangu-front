<script setup>
// <RouterLink :to="{name : 'apt-deal' }" href="#" class="text-decoration-none text-dark">
</script>

<template>
  <!-- Start Header -->
  <header id="mu-header" class="" role="banner">
    <div class="container">
      <nav class="navbar navbar-default mu-navbar">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>

            <!-- Text Logo -->
            <a class="navbar-brand" href="#">Kevin</a>

            <!-- Image Logo -->
            <!-- <a class="navbar-brand" href="#"><img src="assets/images/logo.png"></a> -->
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div
            class="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav mu-menu navbar-right">
              <li><a href="#">HOME</a></li>
              <li><a href="#mu-about">ABOUT US</a></li>
              <li><a href="#mu-service">SERVICES</a></li>
              <li><a href="#mu-portfolio">PORTFOLIO</a></li>
              <li><a href="#mu-testimonials">TESTIMONIALS</a></li>
              <li><a href="#mu-contact">CONTACT</a></li>
            </ul>
          </div>
          <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
      </nav>
    </div>
  </header>
  <!-- End Header -->

  <!-- Start Featured Slider -->

  <section id="mu-featured-slider">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="mu-featured-area">
            <h1>Kevin Petter</h1>

            <!-- Start text slide -->
            <div class="mu-featured-slider-wrapper">
              <div class="mu-featured-slider" id="typed-strings">
                <p>I am <span>UI/UX Designer</span></p>
                <p>I am <span>Web Developer</span></p>
                <p>I am <span>Photographer</span></p>
              </div>
              <span id="typed"></span>
            </div>
            <!-- Start text slide -->

            <div class="mu-featured-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
                ipsa necessitatibus voluptate. Dolores sed neque, accusantium
                iusto inventore harum quibusdam, aspernatur, ullam vero ea eos
                ipsam tenetur dolore qui voluptatibus!
              </p>
              <a href="#mu-portfolio" class="mu-primary-btn view-my-work-btn"
                >VIEW MY WORK</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- End Featured Slider -->
</template>

<style scoped>
/* @import "@/assets/css/main.css"; */
</style>
