<template>
  <IonContent :forceOverscroll="false" className="matched-modal-page">
    <div className="matched-container">
      <div :style="{ backgroundImage: `url('${ user.profileImageUrl }')` }" className="background-img full-height" />
      <div className="matched-overlay">
        <LabelMatched />

        <div className="matched-input">
          <div className="label">
            <IonIcon icon={heart} />
            <div>
              Ionic Tinder likes you too!
            </div>
          </div>

          <div className="ion-padding">
            <IonToolbar>
              <IonInput placeholder="Say something nice"></IonInput>
              <IonButtons slot="end">
                <IonButton type="submit" fill="clear" size="small" color="primary" @click="$emit('close')">
                  SEND
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </div>
        </div>

        <IonButton fill="clear" color="primary" @click="$emit('close')">
          Back to Tinder
        </IonButton>
      </div>

    </div>
  </IonContent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonContent, IonIcon, IonToolbar, IonInput, IonButtons, IonButton
} from '@ionic/vue';
import {
  heart,
} from 'ionicons/icons';
import LabelMatched from '@/components/LabelMatched/LabelMatched.vue';
import './MatchedModal.scss';

export default defineComponent({
  name: 'MatchedModal',
  props: {

  },
  emits: ['close'],
  components: {
    IonContent, IonIcon, IonToolbar, IonInput, IonButtons, IonButton, LabelMatched,
  },
  setup() {
    const user = {
      profileImageUrl: 'assets/img/people/ironman.png',
    }

    return {
      heart,
      user,
    }
  }
})
</script>
