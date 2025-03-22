<template>
  <div className="input-with-giphy">
    <GiphySearch
      v-if="showGiphy"
      @select="handleSendGif"
      @close="handleToggleGiphy"
    />

    <IonToolbar className="toolbar-no-border" v-if="!showGiphy">
      <IonButtons slot="start" align-self-bottom className="stick-bottom">
        <IonButton fill="solid" color="light" shape="round" className="button-gif" @click="handleToggleGiphy">
          GIF
        </IonButton>
      </IonButtons>
      <div className="input-block">
        <IonTextarea className="has-auto-grow" ref="inputRef" autoGrow :value="textInput" @ionChange="setTextInput($event.detail.value || '')" :rows="Number(1)" placeholder="Type a message" />
        <IonButtons className="stick-bottom button-submit">
          <IonButton
            type="submit"
            :disabled="textInput.length === 0"
            fill="clear"
            size="small"
            color="primary"
            @click="handleSendText"
          >
            Send
          </IonButton>
        </IonButtons>
      </div>
    </IonToolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  IonToolbar, IonButtons, IonButton, IonTextarea
} from '@ionic/vue';
import {

} from 'ionicons/icons';
import GiphySearch from '@/components/GiphySearch/GiphySearch.vue';
import './InputWithGiphy.scss';

export default defineComponent({
  name: 'InputWithGiphy',
  props: {

  },
  emits: ['change'],
  components: {
    IonToolbar, IonButtons, IonButton, IonTextarea,
    GiphySearch,
  },
  setup(props, { emit }) {
    const textInput = ref<string>('');
    const setTextInput = (state: string) => textInput.value = state;

    const showGiphy = ref<boolean>(false);
    const setShowGiphy = (state: boolean) => showGiphy.value = state;

    const inputRef = ref<any | null>(null);

    const handleToggleGiphy = () => {
      setShowGiphy(!showGiphy.value);
    }

    const handleSendText = () => {
      emit('change', {
        type: 'text',
        message: textInput.value,
      });

      setTextInput('');
      if (inputRef.value) {
        inputRef.value.$el.setFocus();
      }
    }

    const handleSendGif = (imageUrl: string) => {
      emit('change', {
        type: 'image',
        imageUrl: imageUrl
      });

      setTextInput('');
    }

    return {
      inputRef,
      textInput,
      showGiphy,
      setShowGiphy,
      setTextInput,
      handleToggleGiphy,
      handleSendText,
      handleSendGif,
    }
  }
})
</script>
