<template>
	<!-- ================ start banner area ================= -->
	<section class="blog-banner-area" id="category">
		<div class="container h-100">
			<div class="blog-banner">
				<div class="text-center">
					<h1>Register</h1>
					<nav aria-label="breadcrumb" class="banner-breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><a href="#">Home</a></li>
							<li class="breadcrumb-item active" aria-current="page">Register</li>
						</ol>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- ================ end banner area ================= -->

	<!--================Login Box Area =================-->
	<section class="login_box_area section-margin">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<div class="login_box_img">
						<div class="hover">
							<h4>Already have an account?</h4>
							<p>There are advances being made in science and technology everyday, and a good example of
								this is the</p>
							<a class="button button-account" href="login.html">Login Now</a>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="login_form_inner register_form_inner">
						<h3>Create an account</h3>
						<form class="row login_form" @submit.prevent="registerUser">
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" v-model="user.nombre" placeholder="Nombre"
									required />
							</div>
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" v-model="user.apellido" placeholder="Apellido"
									required />
							</div>
							<div class="col-md-12 form-group">
								<input type="email" class="form-control" v-model="user.email"
									placeholder="Email Address" required />
							</div>
							<div class="col-md-12 form-group">
								<input type="password" class="form-control" v-model="user.contrasena"
									placeholder="Password" required />
							</div>
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" v-model="user.telefono" placeholder="Teléfono"
									required />
							</div>
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" v-model="user.direccion" placeholder="Dirección"
									required />
							</div>
							<div class="col-md-12 form-group">
								<select class="form-control" v-model="user.ciudad" required>
									<option v-for="ciudad in ciudades" :key="ciudad.id" :value="ciudad.id">
										{{ ciudad.nombre }}
									</option>
								</select>
							</div>
							<div class="col-md-12 form-group">
								<button type="submit" value="submit"
									class="button button-register w-100">Register</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!--================End Login Box Area =================-->
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			user: {
				nombre: '',
				apellido: '',
				email: '',
				contrasena: '',
				telefono: '',
				direccion: '',
				ciudad: ''
			},
			ciudades: []
		};
	},
	mounted() {
		this.fetchCiudades();
	},
	methods: {
		async fetchCiudades() {
			try {
				const response = await axios.get('http://localhost:3000/ciudad');
				this.ciudades = response.data;
			} catch (error) {
				console.error('Error fetching ciudades:', error);
			}
		},
		async registerUser() {
			try {
				const userPayload = { ...this.user };
				const response = await axios.post('http://localhost:3000/cliente', userPayload);
				console.log('Usuario registrado:', response.data);
				this.$router.push('/login');
			} catch (error) {
				console.error('Error registrando usuario:', error);
			}
		}
	}
};
</script>