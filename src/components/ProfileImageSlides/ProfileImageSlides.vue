<template>
  <div className="profile-image-slides">
    <IonSlides
      v-if="isSlidesReady"
      className="slides"
      ref="ionSlidesRef"
      @ionSlidesDidLoad="handleSlideLoaded"
      @ionSlideDidChange="handleSlideChange"
      @ionSlideReachStart="handleReachStart"
      @ionSlideReachEnd="handleReachEnd"
    >
      <IonSlide v-for="(item, index) in images" :key="item.id">
        <div
          class="slide-img background-img"
          :style="{ backgroundImage: `url('${(item as any).imageUrl}')` }"
        />
      </IonSlide>
    </IonSlides>
    <div className="custom-pagination">
      <div
        v-for="(item, index) in images"
        :key="item.id"
        :className="`pagination-bullet${
          activeIndex === index ? ' pagination-bullet-active' : ''
        }`"
      />
    </div>

    <div className="overlay-navigation" v-if="isClickable">
      <div className="navi navi-left" @click="handleMoveSlide(-1)" />
      <div className="navi navi-right" @click="handleMoveSlide(1)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { TapticEngine } from "@ionic-native/taptic-engine";
import { IonSlides, IonSlide } from "@ionic/vue";
import {} from "ionicons/icons";
import { TSlidesRef } from "@/types/types.d";
import "./ProfileImageSlides.scss";

interface Image {
  id: number;
  imageUrl: string;
} 

export default defineComponent({
  name: "ProfileImageSlides",
  props: {
    images: {
      type: Array as () => Image[],
      default: () => [],
    },
    isClickable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["noMoreSlide", "change"],
  components: {
    IonSlides,
    IonSlide,
  },
  setup(props, { emit }) {
    const ionSlidesRef = ref<any | null>(null);

    const activeIndex = ref<number>(0);
    const setActiveIndex = (state: number) => (activeIndex.value = state);

    const currentEnd = ref<number>(-1);
    const setCurrentEnd = (state: number) => (currentEnd.value = state);

    const isSlidesReady = ref<boolean>(false);
    const setIsSlidesReady = (state: boolean) => (isSlidesReady.value = state);

    const onNoMore = (isOnTheLeft: boolean) => {
      emit("noMoreSlide", isOnTheLeft);
      TapticEngine.notification({ type: "warning" });
    };

    const handleSlideLoaded = ({ target }: TSlidesRef) => {
      target.update();
    };

    const handleSlideChange = ({ target }: TSlidesRef) => {
      target.getActiveIndex().then((index: number) => {
        setActiveIndex(index);
        emit("change", index);
      });
    };

    const handleMoveSlide = (step = 1) => {
      if (ionSlidesRef.value) {
        if (step === -1) {
          ionSlidesRef.value.$el.slidePrev();
        } else if (step === 1) {
          ionSlidesRef.value.$el.slideNext();
        }

        if (step === currentEnd.value) {
          // Could not go next or prev
          onNoMore(currentEnd.value === -1);
        } else {
          setCurrentEnd(0);
          TapticEngine.selection();
        }
      }
    };

    const handleReachStart = () => {
      setCurrentEnd(-1);
    };
    const handleReachEnd = () => {
      setCurrentEnd(1);
    };

    onMounted(() => {
      setTimeout(() => {
        setIsSlidesReady(true);
      });
    });

    return {
      ionSlidesRef,
      activeIndex,
      isSlidesReady,
      handleSlideLoaded,
      handleSlideChange,
      handleMoveSlide,
      handleReachStart,
      handleReachEnd,
    };
  },
});
</script>
