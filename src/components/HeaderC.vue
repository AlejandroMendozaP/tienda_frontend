<template>
  <header class="header_area">
    <div class="main_menu">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <a class="navbar-brand logo_h" href="index.html"><img src="@/assets/img/logo.png" alt=""></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul class="nav navbar-nav menu_nav ml-auto mr-auto">
              <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
              <li class="nav-item"><router-link to="/products" class="nav-link">Shop</router-link></li>
              <!--<li class="nav-item submenu dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                  aria-expanded="false">Shop</a>
                <ul class="dropdown-menu">
                  <li class="nav-item"><router-link to="/products" class="nav-link">Products</router-link></li>
                  <li class="nav-item"><a class="nav-link" href="single-product.html">View All</a></li>
                </ul>
              </li>-->
              <li class="nav-item"><router-link to="/contact" class="nav-link">Contact</router-link></li>
            </ul>

            <ul class="nav-shop">
              <li v-if="isAuthenticated" class="nav-item"><button><router-link to="/cart"><i class="ti-shopping-cart"></i></router-link></button> </li>
              <!--<li class="nav-item"><router-link to="/login" class="button button-header">Login</router-link>&nbsp;&nbsp;<router-link to="/register" class="button button-header">Register</router-link></li>-->
              <li v-if="isAuthenticated"><router-link to="/profile">Profile</router-link></li>
              <li v-if="!isAuthenticated"><router-link class="button button-header" to="/login">Login</router-link></li>
              <li v-if="!isAuthenticated"><router-link class="button button-header" to="/register">Register</router-link></li>
              <li v-if="isAuthenticated"><router-link to="/"><a @click="logout">Logout</a></router-link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logout'])
  }
};
</script>