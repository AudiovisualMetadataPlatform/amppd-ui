<template>
  <div ref="bbcEditorContainer"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import React from 'react';
import * as ReactDOM from 'react-dom';
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
    onMounted(() => {
      // Need React 17.x or lower version render the component
      ReactDOM.render(
        React.createElement(BBCTranscriptEditor, props),
        bbcEditorContainer.value
      );
    });

    onBeforeUnmount(() => {
      ReactDOM.unmountComponentAtNode(bbcEditorContainer.value);
    });

    return {
      bbcEditorContainer
    };
  }
};
</script>
