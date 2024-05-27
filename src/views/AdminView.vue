<template>
    <div class="admin-container">
        <nav class="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#users">Users</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#brands">Brands</a></li>
                <li><a href="#reports">Reports</a></li>
            </ul>
        </nav>
        <main class="main-content">
            <header>
                <h1>Admin Dashboard</h1>
            </header>
            <section class="content">
                <section id="users">
                    <div class="card">
                        <h3>Users</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="users.length">
                                    <tr v-for="user in users" :key="user.id">
                                        <td>{{ user.id }}</td>
                                        <td>{{ user.nombre }} {{ user.apellido }}</td>
                                        <td>{{ user.email }}</td>
                                        <td>
                                            <button class="edit-btn" @click="editUser(user)">Edit</button>
                                            <button class="delete-btn" @click="deleteUser(user.id)">Delete</button>
                                            <button class="chart-btn" @click="showChart(user.id)">Chart</button>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="4">No users found.</td>
                                    </tr>
                                </template>
                            </tbody>

                        </table>
                        <button class="add-btn" @click="openAddUserModal">Add New User</button>
                    </div>
                    <!-- Modal para mostrar el gráfico -->
                    <div v-if="showChartModal" class="modal">
                        <div class="modal-content">
                            <span class="close-btn" @click="closeChartModal">&times;</span>
                            <canvas id="ordersChart"></canvas>
                        </div>
                    </div>
                    <!-- Modal for Adding/Editing User -->
                    <div v-if="showModal" class="modal">
                        <div class="modal-content">
                            <span class="close-btn" @click="closeModal">&times;</span>
                            <h2>{{ isEditMode ? 'Edit User' : 'Add New User' }}</h2>
                            <form @submit.prevent="isEditMode ? updateUser() : registerUser()">
                                <div class="col-md-12 form-group">
                                    <input type="text" class="form-control" v-model="currentUser.nombre"
                                        placeholder="Nombre" required />
                                </div>
                                <div class="col-md-12 form-group">
                                    <input type="text" class="form-control" v-model="currentUser.apellido"
                                        placeholder="Apellido" required />
                                </div>
                                <div class="col-md-12 form-group">
                                    <input type="email" class="form-control" v-model="currentUser.email"
                                        placeholder="Email Address" required />
                                </div>
                                <div class="col-md-12 form-group">
                                    <input type="password" class="form-control" v-model="currentUser.contrasena"
                                        placeholder="Password" required />
                                </div>
                                <div class="col-md-12 form-group">
                                    <input type="text" class="form-control" v-model="currentUser.telefono"
                                        placeholder="Teléfono" required />
                                </div>
                                <div class="col-md-12 form-group">
                                    <input type="text" class="form-control" v-model="currentUser.direccion"
                                        placeholder="Dirección" required />
                                </div>
                                <div class="col-md-12 form-group">
                                    <select class="form-control" v-model="selectedEstado" @change="fetchCiudades"
                                        required>
                                        <option value="" disabled selected>Seleccione un estado</option>
                                        <option v-for="estado in estados" :key="estado.id" :value="estado.nombre">
                                            {{ estado.nombre }}
                                        </option>
                                    </select>
                                    <span v-if="estados.length === 0">No hay estados disponibles.</span>
                                </div>
                                <div class="col-md-12 form-group">
                                    <select class="form-control" v-model="currentUser.ciudad" required>
                                        <option value="" disabled selected>Seleccione una ciudad</option>
                                        <option v-for="ciudad in ciudades" :key="ciudad.id" :value="ciudad.id">{{
                                            ciudad.nombre }}</option>
                                    </select>
                                </div>
                                <div class="col-md-12 form-group">
                                    <button type="submit">{{ isEditMode ? 'Update' : 'Add' }} User</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section id="products">
                    <div class="card">
                        <h3>Products</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="products.length">
                                    <tr v-for="product in products" :key="product.id">
                                        <td>{{ product.id }}</td>
                                        <td>{{ product.nombre }}</td>
                                        <td>{{ product.descripcion }}</td>
                                        <td>{{ product.precio }}</td>
                                        <td>{{ product.cantidadStock }}</td>
                                        <td>
                                            <button class="edit-btn" @click="editProduct(product)">Edit</button>
                                            <button class="delete-btn"
                                                @click="deleteProduct(product.id)">Delete</button>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="6">No products found.</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <button class="add-btn" @click="openAddProductModal">Add New Product</button>
                    </div>

                    <div v-if="showProductModal" class="modal">
                        <div class="modal-content">
                            <span class="close-btn" @click="closeProductModal">&times;</span>
                            <h2>{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h2>
                            <form @submit.prevent="isEditMode ? updateProduct() : addNewProduct()"
                                enctype="multipart/form-data">
                                <div class="form-group">
                                    <label for="productImage">Product Image</label>
                                    <input type="file" id="productImage" @change="onFileChange">
                                </div>
                                <div class="form-group">
                                    <label for="productName">Name</label>
                                    <input type="text" id="productName" v-model="productName" required>
                                </div>
                                <div class="form-group">
                                    <label for="productDescription">Description</label>
                                    <input type="text" id="productDescription" v-model="productDescription" required>
                                </div>
                                <div class="form-group">
                                    <label for="productPrice">Price</label>
                                    <input type="text" id="productPrice" v-model="productPrice" required>
                                </div>
                                <div class="form-group">
                                    <label for="productStock">Stock</label>
                                    <input type="text" id="productStock" v-model="productStock" required>
                                </div>
                                <div class="form-group">
                                    <label for="productCategory">Category</label>
                                    <select id="productCategory" v-model="productCategory" required>
                                        <option v-for="category in categories" :key="category.id" :value="category.id">
                                            {{ category.nombre }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="productBrand">Brand</label>
                                    <select id="productBrand" v-model="productBrand" required>
                                        <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                                            {{ brand.nombre }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="productSupplier">Supplier</label>
                                    <select id="productSupplier" v-model="productSupplier" required>
                                        <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                                            {{ provider.nombre }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <button type="submit">{{ isEditMode ? 'Update' : 'Add' }} Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>



                <section id="categories">
                    <div class="card">
                        <h3>Categories</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="categories.length">
                                    <tr v-for="category in categories" :key="category.id">
                                        <td>{{ category.id }}</td>
                                        <td>{{ category.nombre }}</td>
                                        <td>
                                            <button class="edit-btn" @click="editCategory(category)">Edit</button>
                                            <button class="delete-btn"
                                                @click="deleteCategory(category.id)">Delete</button>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="3">No categories found.</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <button class="add-btn" @click="openAddCategoryModal">Add New Category</button>
                    </div>

                    <div v-if="showCategoryModal" class="modal">
                        <div class="modal-content">
                            <span class="close-btn" @click="closeCategoryModal">&times;</span>
                            <h2>{{ isCategoryEditMode ? 'Edit Category' : 'Add New Category' }}</h2>
                            <form @submit.prevent="isCategoryEditMode ? updateCategory() : addNewCategory()">
                                <div class="form-group">
                                    <label for="categoryName">Category Name</label>
                                    <input type="text" id="categoryName" v-model="newCategoryName" required>
                                </div>
                                <div class="form-group">
                                    <button type="submit">{{ isCategoryEditMode ? 'Update' : 'Add' }} Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section id="brands">
                    <div class="card">
                        <h3>Brand</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="brands.length">
                                    <tr v-for="brand in brands" :key="brand.id">
                                        <td>{{ brand.id }}</td>
                                        <td>{{ brand.nombre }}</td>
                                        <td>
                                            <button class="edit-btn" @click="editCategory(brand)">Edit</button>
                                            <button class="delete-btn" @click="deleteCategory(brand.id)">Delete</button>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="3">No brands found.</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <button class="add-btn" @click="openAddBrandModal">Add New Brand</button>
                    </div>

                    <div v-if="showBrandModal" class="modal">
                        <div class="modal-content">
                            <span class="close-btn" @click="closeBrandModal">&times;</span>
                            <h2>{{ isBrandEditMode ? 'Edit Brand' : 'Add New Brand' }}</h2>
                            <form @submit.prevent="isBrandEditMode ? updateBrand() : addNewBrand()">
                                <div class="form-group">
                                    <label for="categoryName">Brand Name</label>
                                    <input type="text" id="categoryName" v-model="newBrandName" required>
                                </div>
                                <div class="form-group">
                                    <button type="submit">{{ isBrandEditMode ? 'Update' : 'Add' }} Brand</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section id="providers">
                    <div class="card">
                        <h3>Providers</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Contact Info</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="providers.length">
                                    <tr v-for="provider in providers" :key="provider.id">
                                        <td>{{ provider.id }}</td>
                                        <td>{{ provider.nombre }}</td>
                                        <td>{{ provider.infoContacto }}</td>
                                        <td>
                                            <button class="edit-btn" @click="editProvider(provider)">Edit</button>
                                            <button class="delete-btn"
                                                @click="deleteProvider(provider.id)">Delete</button>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="4">No providers found.</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <button class="add-btn" @click="openAddProviderModal">Add New Provider</button>
                    </div>

                    <div v-if="showProviderModal" class="modal">
                        <div class="modal-content">
                            <span class="close-btn" @click="closeProviderModal">&times;</span>
                            <h2>{{ isProviderEditMode ? 'Edit Provider' : 'Add New Provider' }}</h2>
                            <form @submit.prevent="isProviderEditMode ? updateProvider() : addNewProvider()">
                                <div class="form-group">
                                    <label for="providerName">Provider Name</label>
                                    <input type="text" id="providerName" v-model="newProviderName" required>
                                </div>
                                <div class="form-group">
                                    <label for="providerContact">Contact Info</label>
                                    <input type="text" id="providerContact" v-model="newProviderContact" required>
                                </div>
                                <div class="form-group">
                                    <button type="submit">{{ isProviderEditMode ? 'Update' : 'Add' }} Provider</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>


                <section id="reports">
                    <div class="card">
                        <h3>Reports</h3>
                        <div class="report-buttons">
                            <button @click="fetchReport('weekly')">Weekly</button>
                            <button @click="fetchReport('monthly')">Monthly</button>
                            <button @click="fetchReport('annual')">Annual</button>
                        </div>
                        <div class="report-results" v-if="report">
                            <p>Total Orders: {{ report.totalOrders }}</p>
                            <p>Total Clients: {{ report.totalClients }}</p>
                            <p>Total Products: {{ report.totalProducts }}</p>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
    data() {
        return {
            users: [],
            products: [],
            categories: [],
            brands: [],
            providers: [],
            showProviderModal: false,
            isProviderEditMode: false,
            newProviderName: '',
            newProviderContact: '',
            providerIdToUpdate: null,
            showChartModal: false,
            chartData: null,
            chart: null,
            showCategoryModal: false,
            isCategoryEditMode: false,
            newCategoryName: '',
            categoryIdToUpdate: null,
            showBrandModal: false,
            isBrandEditMode: false,
            newBrandName: '',
            brandIdToUpdate: null,
            showModal: false,
            isEditMode: false,
            showProductModal: false,
            productImage: null, // Variable para almacenar la imagen del producto
            productName: '',
            productDescription: '',
            productPrice: '',
            productStock: '',
            productCategory: '',
            productBrand: '',
            productSupplier: '',
            report: null,
            currentUser: {
                id: null,
                nombre: '',
                apellido: '',
                email: '',
                contrasena: '',
                telefono: '',
                direccion: '',
                ciudad: ''
            },
            estados: [],
            ciudades: [],
            selectedEstado: ''
        };
    },
    mounted() {
        this.fetchEstados();
        this.fetchUsers();
        this.fetchProducts();
        this.fetchCategories();
        this.fetchBrands();
        this.fetchProviders();
    },
    methods: {
        async fetchProviders() {
            try {
                const response = await axios.get('http://localhost:3000/proveedor');
                this.providers = response.data;
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        },
        async addNewProvider() {
            try {
                const providerPayload = {
                    nombre: this.newProviderName,
                    infoContacto: this.newProviderContact
                };
                await axios.post('http://localhost:3000/proveedor', providerPayload);
                this.fetchProviders();
                this.closeProviderModal();
            } catch (error) {
                console.error('Error adding new provider:', error);
            }
        },
        async deleteProvider(providerId) {
            try {
                await axios.delete(`http://localhost:3000/proveedor/${providerId}`);
                this.fetchProviders();
            } catch (error) {
                console.error('Error deleting provider:', error);
            }
        },
        async updateProvider() {
            try {
                const providerPayload = {
                    nombre: this.newProviderName,
                    infoContacto: this.newProviderContact
                };
                await axios.patch(`http://localhost:3000/proveedor/${this.providerIdToUpdate}`, providerPayload);
                this.fetchProviders();
                this.closeProviderModal();
            } catch (error) {
                console.error('Error updating provider:', error);
            }
        },
        editProduct(product) {
            this.isEditMode = true;
            this.productName = product.nombre;
            this.productDescription = product.descripcion;
            this.productPrice = product.precio;
            this.productStock = product.cantidadStock;
            this.productCategory = product.categoria; // Asegúrate de que esto sea el ID de la categoría
            this.productBrand = product.marca; // Asegúrate de que esto sea el ID de la marca
            this.productSupplier = product.proveedor; // Asegúrate de que esto sea el ID del proveedor
            this.productIdToUpdate = product.id; // Asigna el ID del producto a actualizar
            this.showProductModal = true;
        },
        async updateProduct() {
            try {
                const formData = new FormData();
                //formData.append('file', this.productImage);
                formData.append('nombre', this.productName);
                formData.append('descripcion', this.productDescription);
                formData.append('precio', this.productPrice);
                formData.append('cantidadStock', this.productStock);
                formData.append('categoria', this.productCategory);
                formData.append('marca', this.productBrand);
                formData.append('proveedor', this.productSupplier);

                const response = await axios.patch(`http://localhost:3000/producto/${this.productIdToUpdate}`, formData);
                console.log('Producto actualizado:', response.data);
                this.fetchProducts();
                this.closeProductModal();
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
            }
        },
        openAddProviderModal() {
            this.isProviderEditMode = false;
            this.newProviderName = '';
            this.newProviderContact = '';
            this.showProviderModal = true;
        },
        closeProviderModal() {
            this.showProviderModal = false;
            this.newProviderName = '';
            this.newProviderContact = '';
        },
        editProvider(provider) {
            this.isProviderEditMode = true;
            this.newProviderName = provider.nombre;
            this.newProviderContact = provider.infoContacto;
            this.providerIdToUpdate = provider.id;
            this.showProviderModal = true;
        },
        async showChart(userId) {
            try {
                const response = await axios.get(`http://localhost:3000/orden-compra/grafico-pedidos/${userId}`);
                this.chartData = response.data;
                this.showChartModal = true;
                this.$nextTick(() => {
                    this.renderChart();
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        },
        closeChartModal() {
            this.showChartModal = false;
            if (this.chart) {
                this.chart.destroy();
            }
        },
        renderChart() {
            const ctx = document.getElementById('ordersChart').getContext('2d');
            const labels = this.chartData.map(item => item.month);
            const data = this.chartData.map(item => item.count);

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Orders Count',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        async fetchReport(type) {
            try {
                let url = '';
                if (type === 'weekly') {
                    url = 'http://localhost:3000/orden-compra/reporte';
                } else if (type === 'monthly') {
                    url = 'http://localhost:3000/orden-compra/reporte-mensual';
                } else if (type === 'annual') {
                    url = 'http://localhost:3000/orden-compra/reporte-anual';
                }

                const response = await axios.get(url);
                this.report = response.data;
            } catch (error) {
                console.error(`Error fetching ${type} report:`, error);
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
        async addNewCategory() {
            try {
                const categoryPayload = {
                    nombre: this.newCategoryName
                };
                await axios.post('http://localhost:3000/categoria-producto', categoryPayload);
                this.fetchCategories();
                this.closeCategoryModal();
            } catch (error) {
                console.error('Error adding new category:', error);
            }
        },
        async deleteCategory(categoryId) {
            try {
                await axios.delete(`http://localhost:3000/categoria-producto/${categoryId}`);
                this.fetchCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        },
        async updateCategory() {
            try {
                const categoryPayload = {
                    nombre: this.newCategoryName
                };
                await axios.patch(`http://localhost:3000/categoria-producto/${this.categoryIdToUpdate}`, categoryPayload);
                this.fetchCategories();
                this.closeCategoryModal();
            } catch (error) {
                console.error('Error updating category:', error);
            }
        },
        openAddCategoryModal() {
            this.isCategoryEditMode = false;
            this.newCategoryName = '';
            this.showCategoryModal = true;
        },
        closeCategoryModal() {
            this.showCategoryModal = false;
            this.newCategoryName = '';
        },
        editCategory(category) {
            this.isCategoryEditMode = true;
            this.newCategoryName = category.nombre;
            this.categoryIdToUpdate = category.id;
            this.showCategoryModal = true;
        },
        async fetchBrands() {
            try {
                const response = await axios.get('http://localhost:3000/marca');
                this.brands = response.data;
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        },
        async addNewBrand() {
            try {
                const brandPayload = {
                    nombre: this.newBrandName
                };
                await axios.post('http://localhost:3000/marca', brandPayload);
                this.fetchBrands();
                this.closeBrandModal();
            } catch (error) {
                console.error('Error adding new brand:', error);
            }
        },
        async deleteBrand(brandId) {
            try {
                await axios.delete(`http://localhost:3000/brand/${brandId}`);
                this.fetchBrands();
            } catch (error) {
                console.error('Error deleting brand:', error);
            }
        },
        async updateBrand() {
            try {
                const brandPayload = {
                    nombre: this.newBrandName
                };
                await axios.patch(`http://localhost:3000/marca/${this.brandIdToUpdate}`, brandPayload);
                this.fetchBrands();
                this.closeBrandModal();
            } catch (error) {
                console.error('Error updating brand:', error);
            }
        },
        openAddBrandModal() {
            this.isBrandEditMode = false;
            this.newBrandName = '';
            this.showBrandModal = true;
        },
        closeBrandModal() {
            this.showBrandModal = false;
            this.newBrandName = '';
        },
        editBrand(brand) {
            this.isBrandEditMode = true;
            this.newBrandName = brand.nombre;
            this.brandIdToUpdateBrand = brand.id;
            this.showBrandModal = true;
        },
        async fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/producto');
                this.products = response.data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async fetchEstados() {
            try {
                const response = await axios.get('http://localhost:3000/estado'); // Ajusta esta URL a tu API de estados
                this.estados = response.data;
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        },
        async fetchCiudades() {
            if (!this.selectedEstado) {
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3000/ciudad/estado/nombre/${this.selectedEstado}`);
                this.ciudades = response.data;
            } catch (error) {
                console.error('Error fetching ciudades:', error);
            }
        },
        async registerUser() {
            try {
                const userPayload = {
                    nombre: this.currentUser.nombre,
                    apellido: this.currentUser.apellido,
                    email: this.currentUser.email,
                    contrasena: this.currentUser.contrasena,
                    telefono: this.currentUser.telefono,
                    direccion: this.currentUser.direccion,
                    ciudadId: this.currentUser.ciudad
                };
                const response = await axios.post('http://localhost:3000/cliente', userPayload);
                console.log('Usuario registrado:', response.data);
                this.closeModal();
            } catch (error) {
                console.error('Error registrando usuario:', error);
            }
        },
        fetchUsers() {
            axios.get('http://localhost:3000/cliente')
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        },
        deleteUser(userId) {
            axios.delete(`http://localhost:3000/cliente/${userId}`)
                .then(() => {
                    this.users = this.users.filter(user => user.id !== userId);
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
        },
        openAddUserModal() {
            this.isEditMode = false;
            this.resetCurrentUser();
            this.showModal = true;
        },
        editUser(user) {
            this.isEditMode = true;
            // Asegúrate de asignar todas las propiedades del usuario actual
            this.currentUser = { ...user, ciudad: user.ciudadId };
            this.showModal = true;
        },
        updateUser() {
            // Crea un objeto con los datos actualizados del usuario
            const updatedUserData = {
                nombre: this.currentUser.nombre,
                apellido: this.currentUser.apellido,
                email: this.currentUser.email,
                contrasena: this.currentUser.contrasena,
                telefono: this.currentUser.telefono,
                direccion: this.currentUser.direccion,
                ciudadId: this.currentUser.ciudad
            };
            axios.patch(`http://localhost:3000/cliente/${this.currentUser.id}`, updatedUserData)
                .then(response => {
                    // Actualiza los datos del usuario en la lista
                    const index = this.users.findIndex(user => user.id === this.currentUser.id);
                    // Utiliza la notación de índice para actualizar el elemento en el array
                    this.users[index] = response.data;
                    // Cierra el modal y resetea los datos del usuario actual
                    this.closeModal();
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });
        },
        closeModal() {
            this.showModal = false;
            this.resetCurrentUser();
        },
        resetCurrentUser() {
            this.currentUser = {
                id: null,
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                direccion: ''
            };
        },
        fetchCities() {
            axios.get('http://localhost:3000/ciudad')
                .then(response => {
                    this.cities = response.data;
                })
                .catch(error => {
                    console.error('Error fetching cities:', error);
                });
        },
        async addNewProduct() {
            try {
                // Crear un objeto FormData para enviar la imagen y otros datos
                const formData = new FormData();
                formData.append('file', this.productImage);
                formData.append('nombre', this.productName);
                formData.append('descripcion', this.productDescription);
                formData.append('precio', this.productPrice);
                formData.append('cantidadStock', this.productStock);
                formData.append('categoria', this.productCategory);
                formData.append('marca', this.productBrand);
                formData.append('proveedor', this.productSupplier);

                // Enviar la solicitud POST al servidor
                const response = await axios.post('http://localhost:3000/producto/create', formData);
                console.log('Nuevo producto agregado:', response.data);
                this.fetchProducts();
                this.closeProductModal();
            } catch (error) {
                console.error('Error al agregar nuevo producto:', error);
            }
        },

        // Método para manejar el cambio de la imagen del producto
        onFileChange(event) {
            this.productImage = event.target.files[0];
        },

        // Método para abrir el modal de agregar producto
        openAddProductModal() {
            this.isEditMode = false;
            this.resetProductFields();
            this.showProductModal = true;
        },

        // Método para cerrar el modal de agregar producto
        closeProductModal() {
            this.showProductModal = false;
            this.resetProductFields();
        },

        // Método para restablecer los campos del producto
        resetProductFields() {
            this.productImage = null;
            this.productName = '';
            this.productDescription = '';
            this.productPrice = '';
            this.productStock = '';
            this.productCategory = '';
            this.productBrand = '';
            this.productSupplier = '';
        }
    },
};
</script>

<style scoped>
.admin-container {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: 250px;
    background: #333;
    color: #fff;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
    font-size: 22px;
    margin-bottom: 20px;
    text-align: center;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar ul li {
    margin-bottom: 15px;
}

.sidebar ul li a {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    display: block;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background 0.3s;
}

.sidebar ul li a:hover {
    background: #444;
}

.main-content {
    flex: 1;
    padding: 20px;
}

header h1 {
    font-size: 28px;
    margin-bottom: 20px;
}

.content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
}

section {
    padding: 20px 0;
    width: 100%;
}

.card h3 {
    font-size: 20px;
    margin-bottom: 15px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
}

table th,
table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
}

table th {
    background: #f9f9f9;
    font-weight: bold;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

button.edit-btn {
    background: #007bff;
    color: #fff;
    margin-right: 10px;
}

button.edit-btn:hover {
    background: #0056b3;
}

button.delete-btn {
    background: #dc3545;
    color: #fff;
}

button.delete-btn:hover {
    background: #c82333;
}

button.add-btn {
    align-self: flex-start;
    background: #28a745;
    color: #fff;
}

button.add-btn:hover {
    background: #218838;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 600px;
    max-height: 90%;
    overflow-y: auto;
}

.close-btn {
    float: right;
    font-size: 24px;
    cursor: pointer;
}

form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
}

button[type="submit"] {
    background: #007bff;
    color: #fff;
    align-self: flex-start;
}

button[type="submit"]:hover {
    background: #0056b3;
}

.chart-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
}

html {
    scroll-behavior: smooth;
}
</style>
