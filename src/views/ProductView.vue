<template>
  <!-- ================ start banner area ================= -->
  <section class="blog-banner-area" id="category">
    <div class="container h-100">
      <div class="blog-banner">
        <div class="text-center">
          <h1>Shop Category</h1>
          <nav aria-label="breadcrumb" class="banner-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                Shop Category
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </section>
  <!-- ================ end banner area ================= -->

  <!-- ================ category section start ================= -->
  <section class="section-margin--small mb-5">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-4 col-md-5">
          <div class="sidebar-filter">
            <div class="top-filter-head">Product Filters</div>
            <div class="common-filter">
              <div class="head">Categorías</div>
              <form action="#">
                <ul>
                  <li class="filter-list">
                    <input class="pixel-radio" type="radio" id="all" name="category" value="all"
                      @change="filterProductsByCategory('all')" />
                    <label for="all">Todos los productos</label>
                  </li>
                  <!-- Iterar sobre la lista de categorías y mostrar cada una como una opción de radio -->
                  <li v-for="category in categories" :key="category.id" class="filter-list">
                    <input class="pixel-radio" type="radio" :id="category.id" name="category" :value="category.nombre"
                      @change="filterProductsByCategory(category.nombre)" />
                    <label :for="category.id">{{ category.nombre }} <span>({{ category.count }})</span></label>
                  </li>
                </ul>
              </form>
            </div>
            <div class="common-filter">
              <div class="head">Price</div>
              <div class="price-range-area">
                <div id="price-range"></div>
                <div class="value-wrapper d-flex">
                  <div class="price">Price:</div>
                  <span>$</span>
                  <div id="lower-value"></div>
                  <div class="to">to</div>
                  <span>$</span>
                  <div id="upper-value"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-8 col-md-7">
          <!-- Start Filter Bar -->
          <div class="filter-bar d-flex flex-wrap align-items-center">
            <div class="sorting">
              <select>
                <option value="1">Default sorting</option>
                <option value="1">Default sorting</option>
                <option value="1">Default sorting</option>
              </select>
            </div>
            <div class="sorting mr-auto">
              <select>
                <option value="1">Show 12</option>
                <option value="1">Show 12</option>
                <option value="1">Show 12</option>
              </select>
            </div>
            <div>
              <div class="input-group filter-bar-search">
                <input type="text" placeholder="Search" />
                <div class="input-group-append">
                  <button type="button"><i class="ti-search"></i></button>
                </div>
              </div>
            </div>
          </div>
          <!-- End Filter Bar -->
          <!-- Start Best Seller -->
          <section class="lattest-product-area pb-40 category-list">
            <div class="row">
              <!-- Utiliza v-for para iterar sobre la lista de productos -->
              <div class="col-md-6 col-lg-4" v-for="product in products" :key="product.id">
                <div class="card text-center card-product">
                  <div class="card-product__img">
                    <!-- Usa la imagen del producto -->
                    <!-- <img class="card-img" :src="product.image" alt="" /> -->
                    <ul class="card-product__imgOverlay">
                      <li><button><i class="ti-search"></i></button></li>
                      <li><button><i class="ti-shopping-cart"></i></button></li>
                      <li><button><i class="ti-heart"></i></button></li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <!-- Muestra la categoría del producto -->
                    <!-- <p>{{ product.category }}</p> -->
                    <h4 class="card-product__title"><router-link
                        :to="{ name: 'ProductDetail', params: { id: product.id } }">{{ product.nombre }}</router-link>
                    </h4>
                    <!-- Muestra el precio del producto -->
                    <p class="card-product__price">${{ product.precio }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- End Best Seller -->
        </div>
      </div>
    </div>
  </section>
  <!-- ================ category section end ================= -->

  <!-- ================ top product area start ================= -->
  <section class="related-product-area">
    <div class="container">
      <div class="section-intro pb-60px">
        <p>Popular Item in the market</p>
        <h2>Top <span class="section-intro__style">Product</span></h2>
      </div>
      <div class="row mt-30">
        <div class="col-sm-6 col-xl-3 mb-4 mb-xl-0">
          <div class="single-search-product-wrapper">
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-1.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-2.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-3.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-xl-3 mb-4 mb-xl-0">
          <div class="single-search-product-wrapper">
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-4.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-5.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-6.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-xl-3 mb-4 mb-xl-0">
          <div class="single-search-product-wrapper">
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-7.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-8.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-9.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6 col-xl-3 mb-4 mb-xl-0">
          <div class="single-search-product-wrapper">
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-1.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-2.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
            <div class="single-search-product d-flex">
              <a href="#"><img src="@/assets/img/product/product-sm-3.png" alt="" /></a>
              <div class="desc">
                <a href="#" class="title">Gray Coffee Cup</a>
                <div class="price">$170.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- ================ top product area end ================= -->

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      categories: [] // Aquí almacenarás los productos obtenidos de la API
    };
  },
  mounted() {
    this.fetchProducts(); // Llama a fetchProducts cuando el componente se monta
    this.fetchCategories();
  },
  methods: {
    async filterProductsByCategory(categoryName) {
      try {
        let url;
        if (categoryName === 'all') {
          url = 'http://localhost:3000/producto';
        } else {
          url = `http://localhost:3000/producto/categoria/${categoryName}`;
        }
        const response = await axios.get(url);
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/producto');
        // Si la solicitud es exitosa, asigna los datos recibidos a una variable en tu componente
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/categoria-producto');
        // Si la solicitud es exitosa, asigna los datos recibidos a una variable en tu componente
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  }
}
</script>
