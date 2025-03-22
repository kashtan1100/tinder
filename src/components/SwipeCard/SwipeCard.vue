<template>
  <div className="swipe-card">
    <ProfileImageSlides
        :images="user?.images"
        isClickable
        @noMoreSlide="handleNoMoreSlide"
        @change="handleSlideChange"
    />

    <div className="card-caption">

      <div class="down">
        <button class="down-btn"></button>
      </div>
      <div className="card-title">
            <span className="card-user-name">
              {{ user?.name }}
            </span>
        <span className="card-user-age">{{ user?.age }}</span>
        <div class="verified"></div>
        <div class="status">Онлайн</div>
<!--        TODO если понадобится вернуть-->
<!--        <span className="icon-verified">-->
<!--              <IonIcon :icon="checkmarkOutline"/>-->
<!--            </span>-->
      </div>


      <div class="desc-container">
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol>

            <div className="card-user-info" v-if="currentIndex === 0">
              <div>
                <IonIcon :icon="ellipse" color="success"/>
                Recently active
              </div>
              <div v-if="user">
                <IonIcon :icon="briefcaseOutline"/>
                {{ user.job_title }}
              </div>

              <div>
                <IonIcon :icon="locationOutline"/>
                71 kilometers away
              </div>
            </div>

            <div className="card-user-info" v-if="currentIndex === 1">
              <div className="passion-list">
                <IonButton
                    fill="outline"
                    shape="round"
                    color="white"
                    size="small"
                >
                  Netflix
                </IonButton>
                <IonButton
                    fill="outline"
                    shape="round"
                    color="white"
                    size="small"
                >
                  Foodie
                </IonButton>
                <IonButton
                    fill="outline"
                    shape="round"
                    color="white"
                    size="small"
                >
                  Instagram
                </IonButton>
                <IonButton
                    fill="outline"
                    shape="round"
                    color="white"
                    size="small"
                >
                  Photography
                </IonButton>
                <IonButton
                    fill="outline"
                    shape="round"
                    color="white"
                    size="small"
                >
                  Travel
                </IonButton>
              </div>
            </div>

            <div className="card-user-info" v-if="currentIndex > 1">
              <p>
                Deeply in love with making Ionic prototypes, in my spare time.
                Always challenge myself to...
              </p>
            </div>
          </IonCol>
          <IonCol size="auto" v-if="!isPreview">
            <IonIcon
                className="button-info"
                :icon="informationCircle"
                @click="handleViewInfo"
            />
          </IonCol>
        </IonRow>
        <div class="card-buttons">
          <button class="my-back-btn">
          </button>
          <button class="my-dislike-btn" @click="handleDislike">
          </button>
          <button class="my-star-btn" @click="megaLike">
          </button>
          <button class="my-like-btn" @click="like">
          </button>
          <button class="my-bust-btn">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {IonRow, IonCol, IonIcon, IonButton} from "@ionic/vue";
import {
  checkmarkOutline,
  ellipse,
  briefcaseOutline,
  locationOutline,
  informationCircle,
} from "ionicons/icons";
import ProfileImageSlides from "../ProfileImageSlides/ProfileImageSlides.vue";
import "./SwipeCard.scss";

export default defineComponent({
  name: "SwipeCard",
  props: {
    user: Object,
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["noMoreSlide", "onViewInfo", "dislike", "like", "megaLike"],
  components: {
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    ProfileImageSlides,
  },
  setup(props, {emit}) {
    const currentIndex = ref<number>(0);
    const setCurrentIndex = (state: number) => (currentIndex.value = state);

    const handleNoMoreSlide = (isOnTheLeft: boolean) => {
      emit("noMoreSlide", isOnTheLeft);
    };

    const handleDislike = () => {
      emit("dislike"); // Отправляем событие вверх
    };
    const like = () => {
      emit("like"); // Отправляем событие вверх
    };
    const megaLike = () => {
      emit("megaLike"); // Отправляем событие вверх
    };

    const handleViewInfo = () => {
      emit("onViewInfo");
    };

    const handleSlideChange = (index: number) => {
      setCurrentIndex(index);
    };

    return {
      megaLike,
      like,
      handleDislike,
      checkmarkOutline,
      ellipse,
      briefcaseOutline,
      locationOutline,
      informationCircle,
      currentIndex,
      handleNoMoreSlide,
      handleViewInfo,
      handleSlideChange,
    };
  },
});
</script>

<style lang="scss">
.swipe-card {
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: var(--swipe-card-border-radius);


  .card-caption {
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    color: #fff;

    .down {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
      padding-right: 12px;
      .down-btn {
        width: 50px;
        height: 50px;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: white;
        border-radius: 50%;
        background-image: url(@/images/buttons/Subtract.png);
      }
    }

    .card-title {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 6px;
      padding-left: 12px;

      .verified {
        width: 28px;
        height: 28px;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url(@/images/buttons/daw.png);
      }
      .status {
        padding: 2px 8px;
        font-size: 10px;
        color: hsl(131, 100%, 5%);
        background-color: hsl(148, 89%, 55%);
        border-radius: 20px;
      }
    }

    .desc-container {
      padding: 0 12px 17px 12px;
      color: #fff;
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7) 10%, rgba(40, 50, 60, 0.1) 100%);
      border-radius: 0 0 var(--swipe-card-border-radius) var(--swipe-card-border-radius);
      text-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
      .card-buttons {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;

        .my-back-btn, .my-star-btn, .my-bust-btn {
          width: 46px;
          height: 46px;
          border: 1px solid hsl(50, 100%, 67%);
          border-radius: 50%;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url(@/images/buttons/back.png);
        }

        .my-dislike-btn, .my-like-btn {
          width: 60px;
          height: 60px;
          border: 1px solid hsl(354, 100%, 63%);
          border-radius: 50%;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url(@/images/buttons/dislike.png);
        }

        .my-star-btn {
          background-image: url(@/images/buttons/star.png);
          border: 1px solid hsl(196, 96%, 62%);
        }

        .my-like-btn {
          background-image: url(@/images/buttons/like.png);
          border: 1px solid hsl(163, 100%, 60%);
        }

        .my-bust-btn {
          background-image: url(@/images/buttons/bust.png);
          border: 1px solid hsl(279, 97%, 60%);
        }
      }
      .button-info {
        font-size: 32px;
      }
    }
  }

  .card-user-name {
    font-size: 32px;
    font-weight: 700;
    margin-right: 4px;
  }

  .card-user-age {
    font-size: 24px;
  }

  //.button-info {
  //  font-size: 32px;
  //}

  .card-user-info {
    line-height: 1.4em;
    font-size: 18px;

    ion-icon {
      margin-right: 8px;
      font-size: 12px;
    }
  }

  .passion-list {
    ion-button {
      --padding-start: 12px;
      --padding-end: 12px;
      --border-width: 0;
      margin-right: 8px;
      margin-bottom: 8px;
      border-radius: 999em;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}

</style>
