<template>
  <div class="text-center mt-4">
    <div class="bg-white max-w-sm mx-auto px-6 py-8 w-full">
      <h1 class="text-gray-900 text-2xl font-bold mb-4">Sign Up</h1>

      <form @submit.prevent="signup(email, password)">
        <input
          class="border border-transperent block shadow-mdTopBottom w-full p-3 rounded mb-4"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        />

        <input
          class="border border-transperent block shadow-mdTopBottom w-full p-3 rounded mb-4"
          :class="{ 'border-red-500 focus:outline-none' : checkPasswordConfirmation() }"
          type="password"
          placeholder="Password"
          v-model="password"
          minlength="6"
          required
        />

        <input
          class="border border-transperent block shadow-mdTopBottom w-full p-3 rounded mb-4"
          :class="{ 'border-red-500 focus:outline-none' : checkPasswordConfirmation() }"
          type="password"
          placeholder="Password Confirmation"
          v-model="passwordConfirmation"
          minlength="6"
          required
        />

        <label class="text-sm text-gray-700 flex justify-start items-center mb-4">
          <input class="mr-2" type="checkbox" v-model="agredToPP" /> I agree to the
          <a
            class="text-blue-600 underline ml-1"
            href="https://ayub-begimkulov.github.io/simple-workout-tracker-privacy-policy/"
          >privacy policy</a>
        </label>

        <button
          class="w-full bg-blue-600 shadow-lg rounded text-white font-semibold p-3 hover:bg-blue-700"
          :disabled="checkPasswordConfirmation() || !agredToPP"
        >Sign Up</button>

        <div
          v-if="checkPasswordConfirmation()"
          class="bg-red-600 text-white p-3 mt-4"
        >Please, confirm your password</div>

        <div v-if="authErrors" class="bg-red-600 text-white mt-4 p-2 w-full">{{ authErrors }}</div>
      </form>
    </div>

    <p class="my-4">
      Already have an account?
      <router-link class="underline text-blue-600" to="/login">Log In</router-link>
    </p>
  </div>
</template>

<script>
import { auth } from '../firebaseInit';

export default {
  data() {
    return {
      email: '',
      agredToPP: false,
      password: '',
      passwordConfirmation: '',
      authErrors: ''
    };
  },

  methods: {
    signup(email, password) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => this.$router.push('/'))
        .catch(err => (this.authErrors = err.message));
    },

    checkPasswordConfirmation() {
      return this.password !== this.passwordConfirmation;
    }
  }
};
</script>
