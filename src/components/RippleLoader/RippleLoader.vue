<template>
  <div className="ripple-loader">
    <IonAvatar className="thumbnail-xl ripple-trigger">
      <img :src="imageUrl" alt="" />
    </IonAvatar>
    <div className="ripple-1"></div>
    <div className="ripple-2"></div>
  </div>
</template>

<script lang="ts">
import {
  IonAvatar
} from '@ionic/vue';
import {

} from 'ionicons/icons';
import './RippleLoader.scss';

export default {
  name: 'RippleLoader',
  props: {
    imageUrl: String,
  },
  components: {
    IonAvatar
  },
  setup() {
    return {

    }
  }
}
</script>
