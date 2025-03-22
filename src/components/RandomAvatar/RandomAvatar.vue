<template>
  <div className="random-avatar">
    <div
      :className="classes"
      :style="styles"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import {

} from '@ionic/vue';
import {

} from 'ionicons/icons';
import './RandomAvatar.scss';

const USERS: any[] = [
  {
    id: 1,
    name: 'Black Panther',
    profileUrl: 'assets/img/avatars/tanya1.png',
  },
  {
    id: 2,
    name: 'Black Widow',
    profileUrl: 'assets/img/avatars/tanya2.png',
  },
  {
    id: 3,
    name: 'Captain',
    profileUrl: 'assets/img/avatars/tanya.png',
  },
  {
    id: 4,
    name: 'Hieu Pham',
    profileUrl: 'assets/img/avatars/tanya3.png',
  },
 
]

export default defineComponent({
  name: 'RandomAvatar',
  props: {
    size: {
      type: String,
      default: '',
    },
    customSize: {
      type: String,
      default: '',
    }
  },
  components: {

  },
  setup(props) {
    const { size, customSize } = toRefs(props);

    const randomIndex = Math.floor(Math.random() * (USERS.length - 1));
    const imageUrl = `${ USERS[randomIndex].profileUrl }`;
    const styles: any = {
      backgroundImage: `url(${ imageUrl })`,
    }
    let classes = 'avatar';

    if (size.value) {
      classes = `${classes} avatar-${size.value}`;
    }

    if (customSize.value) {
      styles.width = customSize.value;
      styles.height = customSize.value;
    }

    return {
      classes,
      styles,
    }
  }
})
</script>
