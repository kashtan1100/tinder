<template>
  <div
    className="person-card background-img"
    :style="{ backgroundImage: `url('${user?.profile_image_url || ''}')` }"

  >
    <div className="card-caption">
      <IonRow className="ion-align-items-end">
        <IonCol className="caption-text">
          <div className="caption-title">
            {{ user?.name }}, {{ user?.age }}
          </div>
          <div className="caption-time">
            15h left
          </div>
        </IonCol>
        <IonCol size="auto">
          <IonButton color="white" className="button-custom button-icon button-xs button-star">
            <IonIcon slot="icon-only" :icon="star" />
          </IonButton>
        </IonCol>
      </IonRow>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  IonRow, IonCol, IonButton, IonIcon
} from '@ionic/vue';
import {
  star
} from 'ionicons/icons';
import './PersonCard.scss';

export default defineComponent({
  name: 'PersonCard',
  props: {
    user: Object,
  },
  components: {
    IonRow, IonCol, IonButton, IonIcon
  },
  setup() {
    return {
      star
    }
  }
})
</script>
