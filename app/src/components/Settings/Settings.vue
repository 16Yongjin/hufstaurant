<template>
<v-container fill-height grid-list-md style="overflow: auto">
  <v-layout align-center row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card >
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Content filtering</v-list-tile-title>
              <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Password</v-list-tile-title>
              <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-tile href="javascript:;">
            <v-list-tile-action>
              <v-checkbox
                v-model="notifications"
                readonly
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="notifications = !notifications">
              <v-list-tile-title>Notifications</v-list-tile-title>
              <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile href="javascript:;">
            <v-list-tile-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="sound = !sound">
              <v-list-tile-title>Sound</v-list-tile-title>
              <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile href="javascript:;">
            <v-list-tile-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="widgets = !widgets">
              <v-list-tile-title>Auto-add widgets</v-list-tile-title>
              <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>


        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>  
</template>

<script>
  export default {
    data () {
      return {
        notifications: false,
        sound: true,
        widgets: false
      }
    }
  }
</script>