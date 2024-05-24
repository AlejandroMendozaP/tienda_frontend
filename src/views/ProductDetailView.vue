<template>
	<!-- ================ start banner area ================= -->
	<section class="blog-banner-area" id="blog">
		<div class="container h-100">
			<div class="blog-banner">
				<div class="text-center">
					<h1>Shop Single</h1>
					<nav aria-label="breadcrumb" class="banner-breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="#">Home</a></li>
							<li class="breadcrumb-item active" aria-current="page">Shop Single</li>
						</ol>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- ================ end banner area ================= -->

	<!--================Single Product Area =================-->
	<div class="product_image_area">
		<div class="container">
			<div class="row s_product_inner">
				<!-- Aquí puedes mostrar la información del producto utilizando el ID proporcionado -->
				<div class="col-lg-6">
					<div class="owl-carousel owl-theme s_Product_carousel">
						<div class="single-prd-item">
							<img class="img-fluid" :src="product.image" alt="" />
						</div>
					</div>
				</div>
				<div class="col-lg-5 offset-lg-1">
					<div class="s_product_text">
						<h3>{{ product.nombre }}</h3>
						<h2>${{ product.precio }}</h2>
						<ul class="list">
							<li><span>Quantity</span>: {{ product.cantidadStock }}</li>
							<!-- Aquí puedes mostrar más detalles del producto -->
						</ul>
						<p>
							Comprar <br />
							<!-- Selector de cantidad -->
							<input type="number" v-model.number="selectedQuantity" min="1"
								:max="product.cantidadStock" />&nbsp;&nbsp;&nbsp;&nbsp;
							<!-- Botón de agregar al carrito -->
							<button @click="addToCart" class="button primary-btn">
								Agregar al carrito
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--================End Single Product Area =================-->

	<!--================Product Description Area ================= -->
	<section class="product_description_area">
		<div class="container">
			<ul class="nav nav-tabs" id="myTab" role="tablist">
				<li class="nav-item">
					<a class="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
						aria-selected="true">Description</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
						aria-controls="profile" aria-selected="false">Specification</a>
				</li>
			</ul>
			<div class="tab-content" id="myTabContent">
				<div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
					<p>{{ product.descripcion }}</p>
				</div>
				<div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
					<div class="table-responsive">
						<table class="table">
							<tbody>
								<tr>
									<td>
										<h5>Categoria</h5>
									</td>
									<td>
										<h5>{{ product.category }}</h5>
									</td>
								</tr>
								<tr>
									<td>
										<h5>Proveedor</h5>
									</td>
									<td>
										<h5>{{ product.proveedor }}</h5>
									</td>
								</tr>
								<tr>
									<td>
										<h5>Marca</h5>
									</td>
									<td>
										<h5>{{ product.marca }}</h5>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- ================End Product Description Area =================-->
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
	props: {
		id: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			product: {}, // Aquí almacenarás los detalles del producto basado en el ID proporcionado
			selectedQuantity: 1
		};
	},
	computed: {
		...mapGetters(['getUser']),
		user() {
			return this.getUser || { id: null };
		}
	},
	mounted() {
		this.fetchProductDetails();
	},
	methods: {
		async fetchProductDetails() {
			try {
				const response = await axios.get(`http://localhost:3000/producto/${this.id}`);
				this.product = response.data;

				const categoryResponse = await axios.get(`http://localhost:3000/categoria-producto/${this.product.categoriaId}`);
				this.product.category = categoryResponse.data.nombre; // Asignar la categoría al objeto de producto

				const marcaResponse = await axios.get(`http://localhost:3000/marca/${this.product.marcaId}`);
				this.product.marca = marcaResponse.data.nombre; // Asignar la categoría al objeto de producto

				const proveedorResponse = await axios.get(`http://localhost:3000/proveedor/${this.product.marcaId}`);
				this.product.proveedor = proveedorResponse.data.nombre;
			} catch (error) {
				console.error('Error fetching product details:', error);
			}
		},
		async addToCart() {
			try {
				const cartItem = {
					clienteId: this.user.id,
					productId: this.product.id,
					cantidad: this.selectedQuantity,
					precioUnitario: this.product.precio
				};
				const response = await axios.post('http://localhost:3000/item-carrito/agregar-producto', cartItem);
				console.log('Producto agregado al carrito:', response.data);
				alert('Producto agregado al carrito correctamente!');
			} catch (error) {
				console.error('Error adding product to cart:', error);
				alert('Hubo un error al agregar el producto al carrito.');
			}
		}
	}
};
</script>