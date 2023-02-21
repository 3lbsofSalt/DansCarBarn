<template>
  <div>
    <input
      v-model="email"
    />
    <input
      v-model="password"
      type="password"
    />
    <button
      @click="login"
    >
      Login
    </button>
  </div>
</template>

<script>
 export default {
   data: () => ({
     email: '',
     password: ''
   }),
   methods: {
     login: function() {
       fetch('http://localhost:3001/user/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           email: this.email,
           password: this.password
         })
       })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
     }
   }
 }
</script>
