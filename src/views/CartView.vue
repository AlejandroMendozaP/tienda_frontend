<template>
    <!-- ================ start banner area ================= -->
    <section class="blog-banner-area" id="category">
        <div class="container h-100">
            <div class="blog-banner">
                <div class="text-center">
                    <h1>Shopping Cart</h1>
                    <nav aria-label="breadcrumb" class="banner-breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <!-- ================ end banner area ================= -->

    <!--================Cart Area =================-->
    <section class="cart_area">
        <div class="container">
            <div class="cart_inner">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cartItems" :key="item.id">
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img :src="item.image" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>{{ item.productName }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${{ item.precioUnitario }}</h5>
                                </td>
                                <td>
                                    <div class="product_count">
                                        <input type="number" v-model.number="item.cantidad" @change="updateItemQuantity(item)" min="1" />
                                    </div>
                                </td>
                                <td>
                                    <h5>${{ item.totalItem }}</h5>
                                </td>
                                <td>
                                    <button @click="removeItem(item.id)" class="btn btn-danger"><i class="ti-trash"></i></button>
                                </td>
                            </tr>
                            <tr class="bottom_button">
                                <td>
                                </td>
                                <td></td>
                                <td>
                                    <h5>Subtotal</h5>
                                </td>
                                <td>
                                    <h5>${{ cartTotal }}</h5>
                                </td>
                            </tr>
                            <tr class="out_button_area">
                                <td class="d-none-l"></td>
                                <td class=""></td>
                                <td></td>
                                <td>
                                    <div class="checkout_btn_inner d-flex align-items-center">
                                        <a class="gray_btn"><router-link to="/products">Continue Shopping</router-link></a>
                                        <a class="primary-btn ml-2"><router-link to="/checkout">Checkout</router-link></a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <!--================End Cart Area =================-->
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            cartItems: [], // Aquí almacenarás los items del carrito
            cartTotal: 0,  // Aquí almacenarás el total del carrito
        };
    },
    computed: {
        ...mapGetters(['getUser']) // Obtener el usuario del store de Vuex
    },
    mounted() {
        this.fetchCartData();
    },
    methods: {
        async fetchCartData() {
            try {
                const clienteId = this.getUser.id; // Obtener el ID del cliente desde Vuex

                // Obtener items del carrito para obtener el carritoId
                const itemsResponse = await axios.get(`http://localhost:3000/item-carrito/cart-items/${clienteId}`);
                const items = itemsResponse.data;
                const carritoId = items[0].carritoId; // Asumiendo que siempre habrá al menos un item en el carrito

                // Obtener información del carrito usando el carritoId
                const cartResponse = await axios.get(`http://localhost:3000/carrito-compra/${carritoId}`);
                this.cartTotal = cartResponse.data.total;

                // Obtener información adicional del producto
                const productDetails = await Promise.all(
                    items.map(item => axios.get(`http://localhost:3000/producto/${item.productId}`))
                );

                // Agregar la información adicional al objeto del item
                this.cartItems = items.map((item, index) => ({
                    ...item,
                    productName: productDetails[index].data.nombre,
                    image: productDetails[index].data.image
                }));
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        },
        async removeItem(itemId) {
            try {
                await axios.delete(`http://localhost:3000/item-carrito/${itemId}`);
                this.cartItems = this.cartItems.filter(item => item.id !== itemId);

                // Recalcular el total del carrito
                const clienteId = this.getUser.id; // Obtener el ID del cliente desde Vuex
                const itemsResponse = await axios.get(`http://localhost:3000/item-carrito/cart-items/${clienteId}`);
                const items = itemsResponse.data;
                const carritoId = items.length > 0 ? items[0].carritoId : null;

                if (carritoId) {
                    const cartResponse = await axios.get(`http://localhost:3000/carrito-compra/${carritoId}`);
                    this.cartTotal = cartResponse.data.total;
                } else {
                    this.cartTotal = 0;
                }
            } catch (error) {
                console.error('Error removing item:', error);
            }
        },
        async updateItemQuantity(item) {
            try {
                const updatedItem = {
                    cantidad: item.cantidad,
                    totalItem: item.cantidad * item.precioUnitario // Recalcular el total del item
                };

                await axios.patch(`http://localhost:3000/item-carrito/${item.id}`, updatedItem);

                // Actualizar el total del carrito después de la modificación
                const clienteId = this.getUser.id; // Obtener el ID del cliente desde Vuex
                const itemsResponse = await axios.get(`http://localhost:3000/item-carrito/cart-items/${clienteId}`);
                const items = itemsResponse.data;
                const carritoId = items.length > 0 ? items[0].carritoId : null;

                if (carritoId) {
                    const cartResponse = await axios.get(`http://localhost:3000/carrito-compra/${carritoId}`);
                    this.cartTotal = cartResponse.data.total;
                } else {
                    this.cartTotal = 0;
                }
            } catch (error) {
                console.error('Error updating item quantity:', error);
            }
        }
    }
};
</script>
