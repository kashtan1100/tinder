<template>
  <div className="spotify-highlights">
    <div className="section-title">
      My Top Spotify Artists
    </div>

    <div className="custom-pagination">
      <div
        v-for="bullet in items"
        :key="bullet"
        :className="`pagination-bullet${ activeIndex === bullet ? ' pagination-bullet-active' : '' }`"
      />
    </div>

    <IonSlides
      @ionSlidesDidLoad="handleLoaded"
      @ionSlideDidChange="handleSlideChange"
    >
      <IonSlide v-for="item in items" :key="item">
        <IonRow className="highlight-slide">
          <IonCol>
            <div className="highlight-item">
              <div className="album-artwork-fluid">
                <div className="album-cover background-img" :style="{ backgroundImage: 'url(assets/img/album.png)' }" />
                <IonRow className="ion-justify-content-center ion-align-items-center">
                  <div className="album-artwork-overlay">
                    <IonButton color="white" className="button-custom button-icon text-primary">
                      <IonIcon slot="icon-only" :icon="play" />
                    </IonButton>
                  </div>
                </IonRow>
              </div>
              <div className="item-caption">
                <div className="item-artist">
                  <div>Red Hot Chili Peppers</div>
                </div>
                <div className="item-title">
                  <IonText color="medium">Californication</IonText>
                </div>
              </div>
            </div>
          </IonCol>
          <IonCol>
            <div className="highlight-item">
              <div className="album-artwork-fluid">
                <div className="album-cover background-img" :style="{ backgroundImage: 'url(assets/img/album2.png)' }" />
                <IonRow className="ion-justify-content-center ion-align-items-center">
                  <div className="album-artwork-overlay">
                    <IonButton color="white" className="button-custom button-icon text-primary">
                      <IonIcon slot="icon-only" :icon="play" />
                    </IonButton>
                  </div>
                </IonRow>
              </div>
              <div className="item-caption">
                <div className="item-artist">
                  <div>Green Day</div>
                </div>
                <div className="item-title">
                  <IonText color="medium">Basket Case</IonText>
                </div>
              </div>
            </div>
          </IonCol>
        </IonRow>
      </IonSlide>
    </IonSlides>

    <div className="spotify-connect">
      <IonRow className="ion-justify-content-center ion-align-items-center">
        <IonCol>
          <IonText color="medium">Share your Spotify Music Interests</IonText>
        </IonCol>
        <IonCol size="auto">
          <IonButton color="success" size="small">
            LINK SPOTIFY
          </IonButton>
        </IonCol>
      </IonRow>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  IonSlides, IonSlide, IonRow, IonCol, IonButton, IonIcon, IonText
} from '@ionic/vue';
import {
  play,
} from 'ionicons/icons';
import { TSlidesRef } from '@/types/types.d';
import './SpotifyHighlights.scss';

export default defineComponent({
  name: 'SpotifyHighlights',
  props: {

  },
  components: {
    IonSlides, IonSlide, IonRow, IonCol, IonButton, IonIcon, IonText
  },
  setup() {
    const items: number[] = [0,1,2,3];

    const activeIndex = ref(0);
    const setActiveIndex = (state: number) => activeIndex.value = state;

    const handleLoaded = ({ target }: TSlidesRef) => {
      target.update();
    }

    const handleSlideChange = ({ target }: TSlidesRef) => {
      target.getActiveIndex()
        .then((index: number) => {
          setActiveIndex(index);
        })
    }

    return {
      play,
      items,
      activeIndex,
      setActiveIndex,
      handleLoaded,
      handleSlideChange,
    }
  }
})
</script>
