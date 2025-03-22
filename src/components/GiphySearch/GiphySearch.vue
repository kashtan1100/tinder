<template>
  <div className="giphy-search">
    <div className="giphy-container">
      <div className="giphy-loading" v-if="isLoading">
        <IonSpinner />
      </div>
      <div className="no-result" v-if="!isLoading && gifs.length === 0">No GIF found</div>
      <div className="scroll-horizontal" v-if="!isLoading">
        <div className="scroll-item" v-for="gif in gifs" :key="gif.id" @click="handleSelect(gif)">
          <img :src="gif.images.fixed_height_small.url" alt="" />
        </div>
      </div>
    </div>

    <IonToolbar className="toolbar-no-border">
      <IonButtons slot="start" @click="handleClose">
        <IonButton color="primary" className="giphy-close">
          <IonIcon slot="icon-only" :icon="closeSharp" />
        </IonButton>
      </IonButtons>
      <IonInput
        type="text"
        autofocus
        :debounce="500"
        placeholder="Search for a GIF..."
        :value="query"
        @ionChange="handleSearch($event.detail.value || '')"
      />
    </IonToolbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {
  IonSpinner, IonToolbar, IonButtons, IonButton, IonIcon, IonInput
} from '@ionic/vue';
import {
  closeSharp
} from 'ionicons/icons';
import GiphyService from '@/services/giphy.service';
import './GiphySearch.scss';

export default defineComponent({
  name: 'GiphySearch',
  props: {

  },
  emits: ['select', 'close'],
  components: {
    IonSpinner, IonToolbar, IonButtons, IonButton, IonIcon, IonInput
  },
  setup(props, { emit }) {
    const gifs = ref<any[]>([]);
    const setGifs = (state: any[]) => gifs.value = state;

    const isLoading = ref<boolean>(false);
    const setIsLoading = (state: boolean) => isLoading.value = state;

    const query = ref<string>('');
    const setQuery = (state: string) => query.value = state;

    const getTrending = () => {
      setIsLoading(true);

      GiphyService.trending()
        .then((res: { data: { data: any[]; }; }) => {
          setGifs(res.data.data);
          setIsLoading(false);
        })
    }

    const handleSearch = (text: string) => {
      setQuery(text);

      if (text.length === 0) return getTrending();
      setIsLoading(true);

      GiphyService.search(text)
        .then((res: { data: { data: any[]; }; }) => {
          setGifs(res.data.data);
          setIsLoading(false);
        }, () => {
          setGifs([]);
        })
    }

    const handleSelect = (gif: any) => {
      emit('select', gif.images.downsized_medium.url);
    }

    const handleClose = () => {
      setQuery('');
      emit('close');
    }

    onMounted(() => {
      getTrending();
    });

    return {
      closeSharp,
      gifs,
      isLoading,
      query,
      handleSearch,
      handleSelect,
      handleClose,
    }
  }
})
</script>
