<template>
    <div>
        <div id="title-bar">
            <a id="back-button" href="#" @click="back">
                <span class="glyphicon glyphicon-chevron-left"></span>
            </a>
            <p class="animation-intro">
                <b>{{ course.title }}</b>
            </p>
            <hr>
        </div>

        <button id="create-button" class="btn btn-primary" data-toggle="modal" data-target="#add-forum-modal">Create Post</button>
    </div>
</template>

<script>
    const moment = require("moment");

    export default {
      data() {
        return {
          forums: [],
          forumTitleInput: "",
          forumDescInput: ""
        };
      },
      methods: {
        moment(date) {
          return moment(date).fromNow();
        },
        back() {
          this.$store.commit("changeCurrentSelectedCourse", {}); //clear selection
          this.$store.commit("switchView", {
            view: this.MainView,
            needRefresh: true
          });
        }
      },
      computed: {
        course() {
          return this.$store.state.currentSelectedCourse;
        },
        MainView() {
          return this.$store.state.MainView;
        },
        ForumView() {
          return this.$store.state.Forum;
        }
      },
      created() {
        if (this.$store.state.needRefresh) {
          this.refreshForums();
        } else {
          this.forums = this.$store.state.forums;
        }
      }
    };
</script>

<style scoped>
    @keyframes intro {
      from {
        opacity: 0;
        zoom: 0;
      }
      to {
        opacity: 1;
        zoom: 1;
      }
    }

    .animation-intro {
      animation-name: intro;
      animation-duration: 0.5s;
    }

    a#back-button {
      text-decoration: none;
      padding: 0 8px;
    }

    #title-bar {
      padding-top: 16px;
      background-color: white;
      /* position: -webkit-sticky;
      position: sticky; */
      position: fixed;
      top: 64px;
      right: 10%;
      left: 10%;
    }

    @media screen and (max-width: 1500px) {
      #title-bar {
        top: 64px;
        right: 2%;
        left: 2%;
      }
    }

    #title-bar span,
    #title-bar p {
      font-size: 20px;
      display: inline;
    }

    #title-bar hr {
      border-top-width: 2px;
      margin-bottom: 0;
    }

    .content {
      margin-top: 80px;
    }

    .forum-item {
      margin: 0;
      padding: 4px 12px;
      border-radius: 5px;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s;
      -moz-transition: all 0.2s;
    }

    .forum-item:hover {
      background: lightgray;
    }

    .forum-item h4,
    .forum-item p {
      text-overflow: ellipsis;
      -ms-text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      overflow: hidden;
    }

    .forum-item .owner-image {
      max-width: 30px;
    }

    #create-button {
      position: fixed;
      right: 30px;
      bottom: 30px;
    }
</style>
