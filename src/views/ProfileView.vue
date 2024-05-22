<template>
    <section class="profile-area section-margin">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <div class="profile-img">
              <img src="@/assets/img/profile-placeholder.png" alt="Profile Image">
            </div>
          </div>
          <div class="col-lg-8">
            <div class="profile-info">
              <h3>Profile Information</h3>
              <ul class="profile-details" v-if="!isEditing">
                <li><strong>Name:</strong> {{ user.nombre }} {{ user.apellido }}</li>
                <li><strong>Email:</strong> {{ user.email }}</li>
                <li><strong>Phone:</strong> {{ user.telefono }}</li>
                <li><strong>Address:</strong> {{ user.direccion }}</li>
                <li><strong>City:</strong> {{ ciudadNombre }}</li>
                <li><strong>State:</strong> {{ estadoNombre }}</li>
                <li><strong>Registration Date:</strong> {{ formatDate(user.fechaRegistro) }}</li>
              </ul>
              <form v-if="isEditing" @submit.prevent="updateUser">
                <div class="form-group">
                  <label for="nombre">Nombre</label>
                  <input type="text" class="form-control" v-model="editUser.nombre" required>
                </div>
                <div class="form-group">
                  <label for="apellido">Apellido</label>
                  <input type="text" class="form-control" v-model="editUser.apellido" required>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" v-model="editUser.email" required>
                </div>
                <div class="form-group">
                  <label for="telefono">Teléfono</label>
                  <input type="text" class="form-control" v-model="editUser.telefono" required>
                </div>
                <div class="form-group">
                  <label for="direccion">Dirección</label>
                  <input type="text" class="form-control" v-model="editUser.direccion" required>
                </div>
                <div class="form-group">
                  <label for="ciudad">Ciudad</label>
                  <select class="form-control" v-model="editUser.ciudadId" required>
                    <option v-for="ciudad in ciudades" :key="ciudad.id" :value="ciudad.id">
                      {{ ciudad.nombre }}
                    </option>
                  </select>
                </div>
                <button type="submit" class="button button-register">Update</button>
                <button type="button" class="button button-cancel" @click="isEditing = false">Cancel</button>
              </form>
              <button v-if="!isEditing" class="button button-edit" @click="editProfile">Edit Profile</button>
              <button class="button button-logout" @click="logout">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        ciudadNombre: '',
        estadoNombre: '',
        isEditing: false,
        editUser: {
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          direccion: '',
          ciudadId: ''
        },
        ciudades: []
      };
    },
    computed: {
      ...mapGetters(['getUser']),
      user() {
        return this.getUser || {
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          direccion: '',
          ciudadId: '',
          fechaRegistro: ''
        };
      }
    },
    methods: {
      ...mapActions(['logout']),
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      async fetchCiudadNombre(ciudadId) {
        try {
          const response = await axios.get(`http://localhost:3000/ciudad/${ciudadId}`);
          this.ciudadNombre = response.data.nombre;
          this.fetchEstadoNombre(response.data.estadoId);
        } catch (error) {
          console.error('Error fetching ciudad nombre:', error);
        }
      },
      async fetchEstadoNombre(estadoId) {
        try {
          const response = await axios.get(`http://localhost:3000/estado/${estadoId}`);
          this.estadoNombre = response.data.nombre;
        } catch (error) {
          console.error('Error fetching estado nombre:', error);
        }
      },
      async fetchCiudades() {
        try {
          const response = await axios.get('http://localhost:3000/ciudad');
          this.ciudades = response.data;
        } catch (error) {
          console.error('Error fetching ciudades:', error);
        }
      },
      editProfile() {
        this.isEditing = true;
        this.editUser = { ...this.user };
      },
      async updateUser() {
        try {
          const userId = this.user.id;
          const response = await axios.patch(`http://localhost:3000/cliente/${userId}`, this.editUser);
          console.log('User updated:', response.data);
          this.$store.commit('setUser', response.data); // Update the store with the new user data
          this.isEditing = false;
          this.fetchCiudadNombre(this.editUser.ciudadId); // Fetch new city name
        } catch (error) {
          console.error('Error updating user:', error);
        }
      }
    },
    mounted() {
      if (this.user.ciudadId) {
        this.fetchCiudadNombre(this.user.ciudadId);
      }
      this.fetchCiudades();
    }
  };
  </script>
  
  <style scoped>
  .profile-area {
    padding: 50px 0;
  }
  
  .profile-img img {
    width: 100%;
    border-radius: 50%;
  }
  
  .profile-info {
    padding: 20px;
    background: #f9f9ff;
    border-radius: 5px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  
  .profile-info h3 {
    margin-bottom: 20px;
  }
  
  .profile-details {
    list-style: none;
    padding: 0;
  }
  
  .profile-details li {
    margin-bottom: 10px;
  }
  
  .button-logout, .button-edit, .button-cancel {
    background: #f96d00;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .button-register {
    background: #00a8ff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  </style>
  