<template>
  <v-app>
    <v-navigation-drawer fixed temporary v-model="sideNav" >
      <v-list v-if="userIsAuthenticated">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile>
          <v-list-tile-action>
            <v-icon>star</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            LV. 2
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-else>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-icon large>account_circle</v-icon>            
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>로그인 해주세요.</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list>
        <v-divider></v-divider>

        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link"
          >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

         <v-list-tile 
            v-if="userIsAuthenticated"
            @click="onLogout">
          <v-list-tile-action >
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>
        <v-list-tile 
          v-for="item in menuItems2" 
          :key="item.title"
          :to="item.link"
          >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark app fixed class="primary">
      <v-toolbar-side-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          Hufstaurant
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link"
          >
          <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
                    
          <v-btn flat 
            v-if="userIsAuthenticated"
            @click="onLogout">
            <v-icon left dark>exit_to_app</v-icon>
              Logout
          </v-btn>
      </v-toolbar-items>
        <v-btn flat icon class="hidden-sm-and-up" @click="close" v-if="!isHome">
          <v-icon>close</v-icon>
        </v-btn>
    </v-toolbar>

    <v-content >
      <transition name="slide" mode="out-in">
      <router-view ></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        menuItems2: [
          { icon: 'settings', title: '설정', link: '/settings' },
          { icon: 'feedback', title: '공지사항', link: '/infos' }
        ]
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          { icon: 'supervisor_account', title: 'Review', link: '/reviews' },
          { icon: 'face', title: 'Sign up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign in', link: '/signin' }
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            { icon: 'favorite', title: 'Likes', link: '/likes' },
            { icon: 'supervisor_account', title: 'Reviews', link: '/reviews' }
            // { icon: 'person', title: 'Profile', link: '/profile' }
          ]
        }
        return menuItems
      },
      user () {
        return this.$store.getters.user
      },
      userIsAuthenticated () {
        return this.user !== null && this.user !== undefined
      },
      isHome () {
        return this.$route.path === '/'
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      },
      close () {
        // console.log(this.$route.path)
        if (this.$route.path === '/reviews/new') {
          return this.$router.go(-1)
        }
        this.$router.push('/')
      }
    }
  }
</script>

<style>

.slide-enter {
    opacity: 0;
}

.slide-enter-active {
    animation: slide-in .5s ease-out forwards;
    transition: opacity .5s;
}

.slide-leave {}

.slide-leave-active {
    animation: slide-out .5s ease-out forwards;
    transition: opacity .5s;
    opacity: 0;
}

.slide-move {
    transition: transform 0.5s;
}

@keyframes slide-in {
    from {
        transform: translateY(20px);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes slide-out {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(20px);
    }
}


.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>