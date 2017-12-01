<template>
  <v-app light>

    <v-toolbar app>
     
      <v-toolbar-title v-text="title"></v-toolbar-title>

    </v-toolbar>


    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Food Data'
      }
    }
  }
</script>
