<template>
  <video
    v-if="type === 'video'"
    :height="height"
    :width="width"
    :autoplay="autoplay"
    :preload="preload"
    ref="mediaElement"
  ></video>
  <audio v-else :width="width" :autoplay="autoplay" :preload="preload" ref="mediaElement"></audio>
</template>

<script>
import "mediaelement/build/mediaelementplayer.css";
export default {
  name: "Mediaelement",
  props: {
    type: {
      type: String,
      required: false,
      default: "video",
    },
    source: {
      type: String,
      required: true,
      default: "",
    },
    width: {
      type: String,
      required: false,
      default: "auto",
    },
    height: {
      type: String,
      required: false,
      default: "auto",
    },
    preload: {
      type: String,
      required: false,
      default: "none",
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: false,
    },
    forceLive: {
      type: Boolean,
      required: false,
      default: true,
    },
    success: {
      type: Function,
      default() {
        return false;
      },
    },
    error: {
      type: Function,
      default() {
        return false;
      },
    },
  },
  data: () => ({
    player: null,
  }),
  mounted() {
    const { MediaElementPlayer } = global;
    const componentObject = this;
    this.player = new MediaElementPlayer(this.$refs.mediaElement, {
      forceLive: this.forceLive,
      // Load the control icons from the SVG file
      iconSprite: "../images/mejs-controls.svg",
      success: (mediaElement, originalNode, instance) => {
        instance.setSrc(componentObject.source);
        if (componentObject.autoplay) {
          mediaElement.addEventListener("canplay", function() {
            instance.play();
          });
        }
        this.success(mediaElement, originalNode, instance);
      },
      error: (e) => {
        this.error(e);
      },
    });
  },
  methods: {
    remove() {
      this.player.remove();
      this.player = null;
    },
  },
  beforeDestroy() {
    if(this.player) {
      this.remove();
    }
  },
  watch: {
    source: function(newSource) {
      this.player.setSrc(newSource);
      this.player.setPoster("");
      this.player.load();
    },
    forceLive: function(newForceLive, oldForceLive) {
      if (newForceLive === oldForceLive) {
        return;
      }
      this.player.options.forceLive = newForceLive;
    },
  },
};
</script>
<style>
/* MediaElement.js style overrides */

/* Remove outline for player on focus */
.mejs__container:focus {
  outline: none;
}
/* Remove border for volume sliders */
.mejs__horizontal-volume-total,
.mejs__volume-total {
  border: none;
}
/* Make the mejs loading spinner spin on its own axis */
.mejs__overlay-loading-bg-img {
  transform-origin: center;
}
</style>
