<template>
  <IonHeader>
    <IonToolbar className="toolbar-reduced toolbar-no-border" color="light" />
  </IonHeader>

  <IonContent className="profile-page">
    <div className="profile-header">
      <ProfileImageSlides
        :images="user?.images"
      />

      <IonFab vertical="bottom" horizontal="end" edge slot="fixed">
        <IonButton color="white" className="button-custom button-icon button-sm button-brand" @click="$emit('close')">
          <IonIcon :icon="arrowDown" slot="icon-only" />
        </IonButton>
      </IonFab>
    </div>

    <div className="profile-info border-bottom">
      <div className="profile-title">
        <span className="profile-user-name">
          {{ user?.name }}
        </span>
        <span className="profile-user-age">{{ user?.age }}</span>
        <span className="icon-verified">
          <IonIcon :icon="checkmarkOutline" />
        </span>
      </div>

      <div className="profile-user-info">
        <div className="info-item">
          <IonIcon :icon="briefcaseOutline" />{{ user?.job_title }}
        </div>
        <div className="info-item">
          <IonIcon :icon="locationOutline" />10,001 kilometers away
        </div>
      </div>

      <div className="passion-list">
        <IonButton fill="outline" shape="round" color="medium" size="small">
          Netflix
        </IonButton>
        <IonButton fill="outline" shape="round" color="medium" size="small">
          Foodie
        </IonButton>
        <IonButton fill="outline" shape="round" color="medium" size="small">
          Instagram
        </IonButton>
        <IonButton fill="outline" shape="round" color="medium" size="small">
          Photography
        </IonButton>
        <IonButton fill="outline" shape="round" color="medium" size="small">
          Travel
        </IonButton>
      </div>
    </div>

    <div className="profile-intro border-bottom">
      <p>Grew up on Earth. Want to dance on Mars.</p>
      <p>Deeply in love with making Ionic prototypes, in my spare time. Always challenge myself
        to replicate the look and feel of native mobile apps on hybrid apps.
        See more at <a href="http://takethatdesign.com">takethatdesign.com</a>
      </p>
    </div>

    <div className="profile-anthem border-bottom">
      <div className="section-title">My Anthem</div>

      <IonRow className="grid-no-padding">
        <IonCol className="ion-align-self-center">
          <div>
            <strong>Fake ID</strong>
          </div>
          <div>
            <IonIcon :icon="musicalNote" color="medium" />
            <IonText color="medium">Riton & Kah-Lo</IonText>
          </div>
        </IonCol>
        <IonCol size="auto">
          <div className="album-artwork">
            <div className="album-cover background-img" :style="{ backgroundImage: `url(assets/img/album.png)` }" />
            <IonRow className="ion-justify-content-center ion-align-items-center">
              <div className="album-artwork-overlay">
                <IonButton color="white" className="button-custom button-icon text-primary">
                  <IonIcon slot="icon-only" :icon="play" />
                </IonButton>
              </div>
            </IonRow>
          </div>
        </IonCol>
      </IonRow>
    </div>

    <div className="profile-spotify border-bottom">
      <SpotifyHighlights />
    </div>

    <div className="profile-share border-bottom">
      <IonButton fill="clear" expand="block" color="primary" size="small">
        <div className="button-label">
          <div>SHARE HIEU PHAM'S PROFILE</div>
          <div>SEE WHAT A FRIEND THINKS</div>
        </div>
      </IonButton>
    </div>

    <div className="profile-footer border-bottom">
      <IonButton fill="clear" expand="block" color="medium" size="small">
        <div className="button-label">
          REPORT THIS PROFILE
        </div>
      </IonButton>
    </div>

    <IonFab className="bottom-actions" vertical="bottom" horizontal="center" slot="fixed">
      <IonButton color="white" className="button-custom button-icon button-dislike button-lg">
        <IonIcon slot="icon-only" :icon="closeSharp" />
      </IonButton>
      <IonButton color="white" className="button-custom button-icon button-star">
        <IonIcon slot="icon-only" :icon="star" />
      </IonButton>
      <IonButton color="white" className="button-custom button-icon button-like button-lg">
        <IonIcon slot="icon-only" :icon="heartSharp" />
      </IonButton>
    </IonFab>
  </IonContent>
</template>

<script lang="ts">
import {
  IonHeader, IonToolbar, IonContent, IonFab, IonButton, IonIcon, IonRow, IonCol, IonText,
} from '@ionic/vue';
import {
  arrowDown, checkmarkOutline, briefcaseOutline, locationOutline, musicalNote, play, closeSharp, star, heartSharp
} from 'ionicons/icons';
import ProfileImageSlides from '@/components/ProfileImageSlides/ProfileImageSlides.vue';
import SpotifyHighlights from '@/components/SpotifyHighlights/SpotifyHighlights.vue';
import './Profile.scss';

export default  {
  name: 'Profile',
  props: {
    user: Object,
  },
  emits: ['close'],
  components: {
    IonHeader, IonToolbar, IonContent, IonFab, IonButton, IonIcon, IonRow, IonCol, IonText,
    ProfileImageSlides,
    SpotifyHighlights,
  },
  setup() {
    return {
      arrowDown, checkmarkOutline, briefcaseOutline, locationOutline, musicalNote, play, closeSharp, star, heartSharp,
    }
  }
}
</script>
