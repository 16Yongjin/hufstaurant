<template>
    <v-container fill-height>
        <v-layout row align-center>
            <v-flex xs12 sm6 offset-sm3>
                <v-layout row v-if="error">
                    <v-flex xs12 sm6 offset-sm3>
                    <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                    </v-flex>
                </v-layout>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignup"> 
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="email"
                                            label="E-Mail"
                                            id="email"
                                            v-model="email"
                                            type="email"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="password"
                                            label="Password"
                                            id="password"
                                            v-model="password"
                                            type="password"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            id="confirmPassword"
                                            v-model="confirmPassword"
                                            type="password"
                                            required
                                            :rules="[comparePassword]">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                            name="userName"
                                            label="User Name"
                                            id="userName"
                                            v-model="userName"
                                            type="text"
                                            required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex x12>
                                        <v-btn type="submit" :disabled="loading" :loading="loading">
                                            Sign up
                                            <span slot="loader" class="custom-loader">
                                                <v-icon light>cached</v-icon>
                                            </span>
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      userName: ''
    }
  },
  computed: {
    comparePassword () {
      return this.password !== this.confirmPassword ? 'Password do not match' : true
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      const { email, password, userName } = this
      this.$store.dispatch('signUserUp', { email, password, userName })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style scoped>

</style>