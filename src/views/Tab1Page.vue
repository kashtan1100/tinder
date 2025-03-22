<template>
  <IonPage>
    <IonContent className="explore-bg explore-page" :forceOverscroll="false">
      <div className="full-height safe-area-bottom" v-if="isLoading">
        <IonRow
          className="full-height ion-justify-content-center ion-align-items-center"
        >
          <RippleLoader imageUrl="assets/img/avatars/hieu.png" />
        </IonRow>
      </div>

      <div
        className="cards-container safe-area-bottom"
        v-if="!isLoading && state.cards.length > 0"
      >
        <SwingWrapper
          ref="stackRef"
          className="card-stack"
          :config="stackConfig"
          @setStack="handleSetStack"
          @throwin="handleThrowIn"
          @throwoutleft="
            handleCardThrowOut($event, SwingWrapper.Direction.LEFT)
          "
          @throwoutright="
            handleCardThrowOut($event, SwingWrapper.Direction.RIGHT)
          "
          @throwoutend="handleCardThrowOutEnd"
        >
          <div
            v-for="(item, index) in state.cards"
            :key="item.id"
            :className="`card-item${
              index < state.cards.length - 2 ? ' ion-hide' : ''
            }`"
            data-card-id="item.id"
          >
            <SwipeCard
              :user="item"
              @noMoreSlide="handleNoMoreSlide"
              @onViewInfo="handleOpenProfile(item)"
            />

            <div className="stamp stamp-like">Like</div>
            <div className="stamp stamp-nope">Nope</div>
          </div>
        </SwingWrapper>

      </div>
    </IonContent>

    <IonModal
      swipeToClose
      :isOpen="isMatchModalOpen"
      :enterAnimation="modalEnterZoomOut"
      :leaveAnimation="modalLeaveZoomIn"
    >
      <MatchedModal @close="setIsMatchModalOpen(false)" />
    </IonModal>

    <IonModal :isOpen="isProfileOpen" swipeToClose>
      <Profile v-if="state.currentProfile" :user="state.currentProfile" @close="setIsProfileOpen(false)" />

    </IonModal>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import {
  IonPage,
  IonContent,
  IonRow,
  IonGrid,
  IonCol,
  IonButton,
  IonIcon,
  IonModal,
} from "@ionic/vue";
import { refresh, closeSharp, star, heartSharp, flash } from "ionicons/icons";
import { modalEnterZoomOut, modalLeaveZoomIn } from "@/animations/animations";
import USERS from "./users.dummy";
import RippleLoader from "@/components/RippleLoader/RippleLoader.vue";
import SwipeCard from "@/components/SwipeCard/SwipeCard.vue";
import MatchedModal from "@/views/MatchedModal/MatchedModal.vue";
import Profile from "@/views/Profile/Profile.vue";
import SwingWrapper from "@/components/SwingWrapper/SwingWrapper.vue";
import { TUser } from "@/types/types.d";
import "./Explore.scss";

type TState = {
  isLocked: boolean;
  currentProfile: TUser | null;
  cards: any[];
  stack: any;
};

export default defineComponent({
  name: "Explore",
  components: {
    IonPage,
    IonContent,
    IonRow,
    IonGrid,
    IonCol,
    IonButton,
    IonIcon,
    IonModal,
    RippleLoader,
    MatchedModal,
    Profile,
    SwipeCard,
    SwingWrapper,
  },
  setup() {
    const stackRef = ref<any | null>(null);
    const state = reactive<TState>({
      isLocked: false,
      currentProfile: null,
      cards: [],
      stack: null,
    });
    let nopeEl: HTMLElement | null = null;
    let likeEl: HTMLElement | null = null;
    let nextCardEl: HTMLElement | null = null;

    const isLoading = ref(false);
    const setIsLoading = (state: boolean) => (isLoading.value = state);

    const isMatchModalOpen = ref(false);
    const setIsMatchModalOpen = (state: boolean) =>
      (isMatchModalOpen.value = state);

    const isProfileOpen = ref(false);
    const setIsProfileOpen = (state: boolean) => (isProfileOpen.value = state);

    const getData = () => {
      // API call goes here
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        state.cards = [...USERS] as TUser[];
      }, 3000);
    };

    const getTopCardEl = () => {
      if (stackRef.value) {
        const { children } = stackRef.value.$el;
        let targetEl;

        if (children.length >= 1) {
          targetEl = children[children.length - 1];
        }

        if (targetEl) return targetEl;
      }

      return null;
    };

    const getNextCardEl = () => {
      if (stackRef.value) {
        const { children } = stackRef.value.$el;
        let targetEl;

        if (children.length >= 2) {
          targetEl = children[children.length - 2];
        }

        if (targetEl) return targetEl;
      }

      return null;
    };

    const checkMatching = (card: any) => {
      if (card.name === "Hieu Pham") {
        console.info("MATCHED!!!");

        setIsMatchModalOpen(true);
      }
    };

    const handleSetStack = (swingStack: any) => {
      state.stack = swingStack;

      const topCardEl = getTopCardEl();

      if (topCardEl) {
        nopeEl = topCardEl.querySelector(".stamp-nope");
        likeEl = topCardEl.querySelector(".stamp-like");
        if (nopeEl) nopeEl.style.opacity = "0";
        if (likeEl) likeEl.style.opacity = "0";
      }

      nextCardEl = getNextCardEl();
    };

    const handleButtonClicked = (type = "NOPE") => {
      if (state.isLocked) return false;

      const { stack } = state;

      if (stackRef.value && stack) {
        const topCardEl = getTopCardEl();

        if (topCardEl) {
          if (type === "NOPE") {
            if (nopeEl) nopeEl.style.opacity = "1";
          } else {
            if (likeEl) likeEl.style.opacity = "1";
          }

          setTimeout(() => {
            const card = stack.getCard(topCardEl);
            const throwX =
              type === "NOPE"
                ? -0.5 * topCardEl.offsetWidth
                : 0.5 * topCardEl.offsetWidth;
            card.throwOut(
              throwX,
              20,
              type === "NOPE"
                ? SwingWrapper.Direction.LEFT
                : SwingWrapper.Direction.RIGHT
            );
          }, 500);
        }
      }
    };

    const handleClickNope = () => {
      handleButtonClicked("NOPE");
    };

    const handleClickLike = () => {
      handleButtonClicked("LIKE");
    };

    const handleGetMoreCards = () => {
      if (state.isLocked) return false;

      getData();
    };

    // Called whenever we drag an element
    const handleCardDragging = (
      element: HTMLElement,
      x: number,
      y: number,
      r: number
    ) => {
      const calculatedValue = Math.min(100, Math.abs(x) - 20) / 100; // 0 <-> 1 for Opacity

      window.requestAnimationFrame(() => {
        element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${r}deg)`;
      });

      if (Math.abs(x) > 20 && Math.abs(x) <= element.offsetWidth / 2) {
        window.requestAnimationFrame(() => {
          if (nopeEl)
            nopeEl.style.opacity = x < 0 ? String(calculatedValue) : "0";
          if (likeEl)
            likeEl.style.opacity = x < 0 ? "0" : String(calculatedValue);
        });

        // Zoom effect for the card behind the current one
        window.requestAnimationFrame(() => {
          if (nextCardEl) {
            nextCardEl.style.transform = `translate3d(0,0,0) scale(${
              0.94 + 0.06 * calculatedValue
            }, ${0.94 + 0.06 * calculatedValue})`;
          }
        });
      } else if (x === 0) {
        window.requestAnimationFrame(() => {
          if (likeEl) likeEl.style.opacity = "0";
          if (nopeEl) nopeEl.style.opacity = "0";
        });
      }
    };

    const handleCardThrowOut = (
      e: any,
      direction = SwingWrapper.Direction.LEFT
    ) => {
      state.isLocked = true;

      const removedCard: TUser = state.cards[state.cards.length - 1];

      if (direction === SwingWrapper.Direction.RIGHT) {
        checkMatching(removedCard);
      }

      console.log(
        `${
          direction === SwingWrapper.Direction.LEFT
            ? "SWIPED LEFT"
            : "SWIPED RIGHT"
        }: ${removedCard.name}`
      );
    };

    const handleThrowIn = () => {
      state.isLocked = false;
    };

    const handleCardThrowOutEnd = () => {
      const { cards: cardList } = state;

      // Remove the last element
      cardList.pop();

      state.cards = cardList;

      // Scale the top card to its full size
      const topCardEl = getTopCardEl();

      if (topCardEl) {
        topCardEl.style.transform = "scale(1, 1)";
      }

      state.isLocked = false;

      // If there's no more cards left, show Loading screen and load more
      if (state.cards.length === 0) {
        getData();
      }
    };

    const handleNoMoreSlide = (isOnTheLeft: boolean) => {
      if (stackRef.value) {
        const className = isOnTheLeft ? "rotate-left" : "rotate-right";

        stackRef.value.$el.classList.add(className);
        setTimeout(() => {
          stackRef.value.$el.classList.remove(className);
        }, 250);
      }
    };

    const handleOpenProfile = (user: TUser) => {
      setIsProfileOpen(true);
      state.currentProfile = user;
    };

    /**
      Read more: https://github.com/gajus/swing#configuration
    */
    const stackConfig = {
      // Default setting only allows UP, LEFT and RIGHT so you can override this as below
      allowedDirections: [
        SwingWrapper.Direction.LEFT,
        SwingWrapper.Direction.RIGHT,
      ],
      throwOutConfidence: (
        offsetX: number,
        _offsetY: number,
        element: HTMLElement
      ) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      },
      transform: (element: HTMLElement, x: number, y: number, r: number) => {
        handleCardDragging(element, x, y, r);
      },
      throwOutDistance: () => {
        return window.outerWidth * 1.5;
      },
    };

    onMounted(() => {
      getData();
    });

    return {
      refresh,
      closeSharp,
      star,
      heartSharp,
      flash,
      state,
      stackRef,
      modalEnterZoomOut,
      modalLeaveZoomIn,
      stackConfig,
      isLoading,
      isMatchModalOpen,
      setIsMatchModalOpen,
      isProfileOpen,
      setIsProfileOpen,
      handleSetStack,
      handleGetMoreCards,
      handleClickLike,
      handleClickNope,
      handleNoMoreSlide,
      handleOpenProfile,
      handleThrowIn,
      handleCardThrowOut,
      handleCardThrowOutEnd,
      SwingWrapper,
    };
  },
});
</script>
