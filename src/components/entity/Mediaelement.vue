<template>
  <video
    v-if="type === 'video'"
    :height="height"
    :width="width"
    :autoplay="autoplay"
    :preload="preload"
  ></video>
  <audio v-else :width="width" :autoplay="autoplay" :preload="preload"></audio>
</template>

<script>
import "mediaelement";
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
    refresh: false,
    player: null,
  }),
  mounted() {
    console.log(this.type);
    const { MediaElementPlayer } = global;
    const componentObject = this;
    this.player = new MediaElementPlayer(this.$el, {
      pluginPath: "https://cdn.jsdelivr.net/npm/mediaelement@4.2.7/build/",
      shimScriptAccess: "always",
      forceLive: this.forceLive,
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
    Features(key) {
      const { mejs } = global;
      return mejs.Features[key];
    },
    remove() {
      this.player.remove();
    },
  },
  beforeDestroy() {
    this.remove();
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
