<template>
  <div ref="elRef">
    <slot></slot>
  </div>
</template>

<script lang="ts">
/**
  Based on https://github.com/goweiwen/vue-swing
  Refactored to support Vue 3
  Contact: mr_hie@yahoo.com
*/

import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import * as Swing from 'swing';

export default defineComponent({
  name: 'vue-swing',
  props: {
    config: Object,
  },
  setup(props, { emit }) {
    let stack: any | null = null;
    const cards: any[] = [];
    let observer: any | null = null;
    const elRef = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      let children: any[] = [];

      if (elRef.value) {
        children = Array.prototype.slice.call(elRef.value.children);

        stack = Swing.Stack(props.config || {});
        emit('setStack', stack);

        children.forEach(el => {
          cards.push(stack.createCard(el));
        })

        // Observe changes in DOM
        observer = new MutationObserver(mutations => {
          const addedElements: any[] = [];
          const removedElements: any[] = [];

          mutations.forEach(({ addedNodes, removedNodes }) => {
            addedElements.push(...Array.from(addedNodes));
            removedElements.push(...Array.from(removedNodes));

          })

          // Create a new card for each new element
          addedElements.forEach(el => {
            // Ignore if the added element is also removed
            const i = removedElements.indexOf(el);

            if (i !== -1) {
              removedElements.splice(i, 1);
              return;
            }

            const card = stack.getCard(el);

            if (card == null) {
              cards.push(stack.createCard(el));
            }
          })

          // Remove the card if the element is gone
          removedElements.forEach(el => {
            const card = stack.getCard(el);

            if (card != null) {
              cards.splice(cards.indexOf(card), 1);
              stack.destroyCard(card);
            }
          })

          // Stack has been updated
          emit('setStack', stack);
        })

        observer.observe(elRef.value, { childList: true });
      }

      // Register events
      const events = [
        'throwout',
        'throwoutend',
        'throwoutdown',
        'throwoutleft',
        'throwoutright',
        'throwoutup',
        'throwin',
        'throwinend',
        'dragstart',
        'dragmove',
        'dragend',
        'destroyCard'
      ]

      events.forEach(event => stack.on(event, (e: any) => emit(event, e)));
    })

    // beforeUnmout: remove all watchers if applicable
    onBeforeUnmount(() => {
      if (observer) observer.disconnect();
    })

    return {
      elRef,
      stack: null,
      cards: [],
      observer: null
    }
  },
  Direction: Swing.Direction,
})
</script>
