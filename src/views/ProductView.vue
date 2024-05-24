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
              <li class="breadcrumb-item active" aria-current="page">Shop Category</li>
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
                    <input
                      class="pixel-radio"
                      type="radio"
                      id="all"
                      name="category"
                      value="all"
                      @change="filterProductsByCategory('all')"
                    />
                    <label for="all">Todos los productos</label>
                  </li>
                  <!-- Iterar sobre la lista de categorías y mostrar cada una como una opción de radio -->
                  <li
                    v-for="category in categories"
                    :key="category.id"
                    class="filter-list"
                  >
                    <input
                      class="pixel-radio"
                      type="radio"
                      :id="category.id"
                      name="category"
                      :value="category.nombre"
                      @change="filterProductsByCategory(category.nombre)"
                    />
                    <label :for="category.id">{{ category.nombre }} <span>({{ category.count }})</span></label>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-8 col-md-7">
          <!-- Start Best Seller -->
          <section class="lattest-product-area pb-40 category-list">
            <div class="row">
              <!-- Utiliza v-for para iterar sobre la lista de productos -->
              <div
                class="col-md-6 col-lg-4"
                v-for="product in products"
                :key="product.id"
              >
                <div class="card text-center card-product">
                  <div class="card-product__img">
                    <!-- Usa la imagen del producto -->
                    <img class="card-img" :src="product.image" alt="" />
                    <ul class="card-product__imgOverlay">
                      <li>
                        <button><i class="ti-shopping-cart"></i></button>
                      </li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <!-- Muestra la categoría del producto -->
                    <p>{{ product.categoryName }}</p>
                    <h4 class="card-product__title">
                      <router-link
                        :to="{ name: 'ProductDetail', params: { id: product.id } }"
                        >{{ product.nombre }}</router-link
                      >
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
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      categories: [] // Aquí almacenarás las categorías obtenidas de la API
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
        this.products = await this.addCategoryNames(response.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/producto');
        this.products = await this.addCategoryNames(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/categoria-producto');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async addCategoryNames(products) {
      // Obtener los nombres de las categorías para cada producto
      const productsWithCategories = await Promise.all(
        products.map(async (product) => {
          try {
            const categoryResponse = await axios.get(
              `http://localhost:3000/categoria-producto/${product.categoriaId}`
            );
            return {
              ...product,
              categoryName: categoryResponse.data.nombre
            };
          } catch (error) {
            console.error('Error fetching category name:', error);
            return product;
          }
        })
      );
      return productsWithCategories;
    }
  }
};
</script>
