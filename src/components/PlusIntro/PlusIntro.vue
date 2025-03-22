<template>
  <IonSlides
    className="plus-intro"
    pager
    ref="ionSlidesRef"
    @ionSlidesDidLoad="handleLoaded"
  >
    <IonSlide :key="item.title" v-for="(item, index) in items">
      <div>
        <div className="slide-title">
          <IonIcon :icon="item.icon" :className="`icon-slide-${index + 1}`" />
          {{ item.title }}
        </div>
        <div className="slide-body">{{ item.body }}</div>
      </div>
    </IonSlide>
  </IonSlides>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  IonSlides, IonSlide, IonIcon
} from '@ionic/vue';
import {
  flameSharp, flashSharp, starSharp, locationSharp, keySharp, refreshCircleSharp, heartSharp,
} from 'ionicons/icons';
import './PlusIntro.scss';

export default defineComponent({
  name: 'PlusIntro',
  props: {

  },
  components: {
    IonSlides, IonSlide, IonIcon
  },
  setup() {
    const ionSlidesRef = ref<any | null>(null);
    const items = [
      {
        icon: flameSharp,
        title: 'Get Tinder Gold',
        body: 'See who Likes You & more!'
      },
      {
        icon: flashSharp,
        title: 'Get Matches Faster',
        body: 'Boost your profile once a month!'
      },
      {
        icon: starSharp,
        title: 'Stand Out With Super Likes',
        body: `You're 3x more likely to get a match!`
      },
      {
        icon: locationSharp,
        title: 'Swipe Around the World',
        body: 'Passport to anywhere with Tinder Plus!'
      },
      {
        icon: keySharp,
        title: 'Control Your Profile',
        body: 'Limit what others see with Tinder Plus.'
      },
      {
        icon: refreshCircleSharp,
        title: 'I Meant to Swipe Right',
        body: 'Get unlimited Rewinds with Tinder Plus!'
      },
      {
        icon: heartSharp,
        title: 'Increase Your Chances',
        body: 'Get unlimited Likes with Tinder Plus!'
      }
    ]

    const handleLoaded = () => {
      if (ionSlidesRef.value) {
        ionSlidesRef.value.$el.update();
      }
    }

    return {
      flameSharp, flashSharp, starSharp, locationSharp, keySharp, refreshCircleSharp, heartSharp,
      ionSlidesRef,
      items,
      handleLoaded,
    }
  }
})
</script>
