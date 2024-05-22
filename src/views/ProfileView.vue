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
              <ul class="profile-details">
                <li><strong>Name:</strong> {{ user.nombre }} {{ user.apellido }}</li>
                <li><strong>Email:</strong> {{ user.email }}</li>
                <li><strong>Phone:</strong> {{ user.telefono }}</li>
                <li><strong>Address:</strong> {{ user.direccion }}</li>
                <li><strong>City:</strong> {{ ciudadNombre }}</li>
                <li><strong>State:</strong> {{ estadoNombre }}</li>
                <li><strong>Registration Date:</strong> {{ formatDate(user.fechaRegistro) }}</li>
              </ul>
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
        estadoNombre: ''
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
          // Fetch the state name using the estadoId from the ciudad data
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
      }
    },
    mounted() {
      if (this.user.ciudadId) {
        this.fetchCiudadNombre(this.user.ciudadId);
      }
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
  
  .button-logout {
    background: #f96d00;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  