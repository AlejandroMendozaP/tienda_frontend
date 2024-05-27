<template>
    <section class="login_box_area section-margin">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="login_box_img">
                        <div class="hover">
                            <h4>New to our website?</h4>
                            <p>There are advances being made in science and technology everyday, and a good example of this is the</p>
                            <router-link class="button button-account" to="/register">Create an Account</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="login_form_inner">
                        <h3>Log in to enter</h3>
                        <form @submit.prevent="handleLogin" class="row login_form">
                            <div class="col-md-12 form-group">
                                <input type="text" class="form-control" v-model="email" placeholder="Email" required>
                            </div>
                            <div class="col-md-12 form-group">
                                <input type="password" class="form-control" v-model="password" placeholder="Password" required>
                            </div>
                            <div class="col-md-12 form-group">
                                <div class="creat_account"></div>
                            </div>
                            <div class="col-md-12 form-group">
                                <button type="submit" class="button button-login w-100">Log In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        ...mapActions(['login']),
        async handleLogin() {
            try {
                // Log to check email and password
                console.log('Trying to log in with', this.email, this.password);

                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message || 'Failed to login');
                }

                const data = await response.json();
                this.login({ user: data.token.users, token: data.token.token });

                // Fetch user info to get the role
                const userInfoResponse = await fetch(`http://localhost:3000/cliente/${this.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.token.token}`
                    }
                });

                if (!userInfoResponse.ok) {
                    const errorResponse = await userInfoResponse.json();
                    throw new Error(errorResponse.message || 'Failed to fetch user info');
                }

                const userInfo = await userInfoResponse.json();

                // Log to check userInfo
                console.log('User info:', userInfo);

                // Redirect based on user role
                if (userInfo.rol === 'admin') {
                    this.$router.push('/admin');
                } else {
                    this.$router.push('/');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('Login failed. Please check your credentials and try again.');
            }
        }
    }
};
</script>
