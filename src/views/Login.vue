<template>
  <div class="text-center mt-4">
    <div class="bg-white max-w-sm mx-auto px-6 py-8 w-full">
      <h1 class="text-gray-900 text-2xl font-bold mb-4">Log In</h1>

      <form @submit.prevent="login(email, password)">
        <FormInput :type="'email'" :placeholder="'Email'" v-model="email" />

        <FormInput :type="'password'" :placeholder="'Password'" v-model="password" :minlength="6" />

        <div class="text-gray-700 text-center text-sm mb-4">
          By logging in you agree to the
          <a
            class="text-blue-600 underline"
            href="https://ayub-begimkulov.github.io/simple-workout-tracker-privacy-policy/"
          >privacy policy</a>
        </div>

        <button
          class="w-full bg-blue-600 shadow-lg rounded text-white font-semibold p-3 hover:bg-blue-700"
        >Log In</button>

        <div v-if="authErrors" class="bg-red-600 text-white mt-4 p-2 w-full">{{ authErrors }}</div>
      </form>
    </div>

    <p class="my-4">
      Don't have an account?
      <router-link class="underline text-blue-600" to="/signup">Sign Up</router-link>
    </p>
  </div>
</template>

<script>
import FormInput from '../components/FormInput';
import { auth } from '../firebaseInit';

export default {
  components: {
    FormInput
  },

  data() {
    return {
      email: '',
      password: '',
      authErrors: ''
    };
  },

  methods: {
    login(email, password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(user => this.$router.push('/'))
        .catch(err => (this.authErrors = err.message));
    }
  }
};
</script>
