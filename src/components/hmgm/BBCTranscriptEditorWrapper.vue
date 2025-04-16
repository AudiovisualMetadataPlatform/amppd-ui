<template>
  <div ref="bbcEditorContainer"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import React from 'react';
import { createRoot } from 'react-dom/client';
import BBCTranscriptEditor from "@bbc/react-transcript-editor/dist";

export default {
  name: 'BBCTranscriptEditorWrapper',
  props: {
    key: Number,
    transcriptData: Object,
    mediaUrl: String,
    sttJsonType: String,
    fileName: String,
    isEditable: {
      type: Boolean,
      default: true
    },
    handleAutoSaveChanges: Function,
    autoSaveContentType: {
      type: String,
      default: 'draftjs'
    },
    ref: Object,
  },
  setup(props, { emit }) {
    const bbcEditorContainer = ref(null);
    let reactRoot = null;
    onMounted(() => {
      reactRoot = createRoot(bbcEditorContainer.value);
      reactRoot.render(React.createElement(BBCTranscriptEditor, props));
    });

    onBeforeUnmount(() => {
      reactRoot.unmount();
    });

    return {
      bbcEditorContainer
    };
  }
};
</script>
