<template>
    <!-- ================ start banner area ================= -->
    <section class="blog-banner-area" id="category">
        <div class="container h-100">
            <div class="blog-banner">
                <div class="text-center">
                    <h1>Product Checkout</h1>
                    <nav aria-label="breadcrumb" class="banner-breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Checkout</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <!-- ================ end banner area ================= -->

    <!--================Checkout Area =================-->
    <section class="checkout_area section-margin--small">
        <div class="container">
            <div class="cupon_area">
                <div class="check_title">
                    <h2>Have a coupon?</h2>
                </div>
                <input type="text" placeholder="Enter coupon code">
                <a class="button button-coupon" href="#">Apply Coupon</a>
            </div>
            <div class="billing_details">
                <div class="row">
                    <div class="col-lg-8">
                        <h3>Contact Details</h3>
                        <div class="row contact_form">
                            <div class="col-md-6 form-group p_star">
                                <p><strong>First name: </strong>{{ billingDetails.firstName }}</p>
                            </div>
                            <div class="col-md-6 form-group p_star">
                                <p><strong>Last name: </strong>{{ billingDetails.lastName }}</p>
                            </div>
                            <div class="col-md-6 form-group p_star">
                                <p><strong>Phone number: </strong>{{ billingDetails.phone }}</p>
                            </div>
                            <div class="col-md-12 form-group p_star">
                                <p><strong>Address: </strong>{{ billingDetails.address1 }}</p>
                            </div>
                            <div class="col-md-12 form-group p_star">
                                <p><strong>Town/City: </strong>{{ billingDetails.city }}</p>
                            </div>
                            <div class="col-md-12 form-group p_star">
                                <p><strong>State: </strong>{{ billingDetails.state }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="order_box">
                            <h2>Your Order</h2>
                            <ul class="list">
                                <li><a href="#">
                                        <h4>Product <span>Total</span></h4>
                                    </a></li>
                                <li v-for="item in cartItems" :key="item.id">
                                    <a href="#">{{ item.productName }} <span class="middle">x {{ item.cantidad }}</span>
                                        <span class="last">${{ item.totalPrice }}</span></a>
                                </li>
                            </ul>
                            <ul class="list list_2">
                                <li><a href="#">Subtotal <span>${{ cartSubtotal }}</span></a></li>
                                <li><a href="#">Total <span>${{ cartTotal }}</span></a></li>
                            </ul>
                            <div class="payment_item">
                                <div class="radion_btn">
                                    <input type="radio" id="f-option5" name="selector">
                                    <label for="f-option5">Check payments</label>
                                    <div class="check"></div>
                                </div>
                                <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                                    Store Postcode.</p>
                            </div>
                            <div class="payment_item active">
                                <div class="radion_btn">
                                    <input type="radio" id="f-option6" name="selector">
                                    <label for="f-option6">Paypal </label>
                                    <img src="img/product/card.jpg" alt="">
                                    <div class="check"></div>
                                </div>
                                <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.
                                </p>
                            </div>
                            <div class="text-center">
                                <a class="button button-paypal" href="#">Proceed to Paypal</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--================End Checkout Area =================-->
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            billingDetails: {
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                companyName: ''
            },
            cartItems: [],
            cartTotal: 0,
        };
    },
    computed: {
        ...mapGetters(['getUser']),
        user() {
            return this.getUser || { id: null, nombre: '', apellido: '', direccion: '', telefono: '', ciudad: '', estado: '', ciudadId: null };
        },
        cartSubtotal() {
            return this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
        },
    },
    mounted() {
        this.initializeBillingDetails();
        this.fetchCartItems();
        this.fetchCityAndState();
    },
    methods: {
        async initializeBillingDetails() {
            this.billingDetails.firstName = this.user.nombre;
            this.billingDetails.lastName = this.user.apellido;
            this.billingDetails.address1 = this.user.direccion;
            this.billingDetails.zip = this.user.zip;
            this.billingDetails.phone = this.user.telefono;
            this.billingDetails.email = this.user.email;
        },
        async fetchCityAndState() {
            try {
                if (this.user.ciudadId) {
                    const ciudadResponse = await axios.get(`http://localhost:3000/ciudad/${this.user.ciudadId}`);
                    this.billingDetails.city = ciudadResponse.data.nombre;
                    const estadoResponse = await axios.get(`http://localhost:3000/estado/${ciudadResponse.data.estadoId}`);
                    this.billingDetails.state = estadoResponse.data.nombre;
                }
            } catch (error) {
                console.error('Error fetching city and state:', error);
            }
        },
        async fetchCartItems() {
            try {
                const response = await axios.get(`http://localhost:3000/item-carrito/cart-items/${this.user.id}`);
                this.cartItems = await Promise.all(response.data.map(async item => {
                    const productResponse = await axios.get(`http://localhost:3000/producto/${item.productId}`);
                    return {
                        ...item,
                        productName: productResponse.data.nombre,
                        totalPrice: item.cantidad * item.precioUnitario
                    };
                }));
                if (this.cartItems.length > 0) {
                    const carritoId = this.cartItems[0].carritoId;
                    await this.fetchCartTotal(carritoId);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        },
        async fetchCartTotal(carritoId) {
            try {
                const response = await axios.get(`http://localhost:3000/carrito-compra/${carritoId}`);
                this.cartTotal = response.data.total;
            } catch (error) {
                console.error('Error fetching cart total:', error);
            }
        }
    }
};
</script>