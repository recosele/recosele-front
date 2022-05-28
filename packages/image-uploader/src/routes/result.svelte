<script lang="ts">
  // import { replace } from "svelte-spa-router";
  import { frontImg1, frontImg2, backImg } from '@/store/store';

  let values = {
    userId: '',
    front_img1: '',
    front_img2: '',
    back_img: '',
  };
  frontImg1?.subscribe((v) => (values.front_img1 = v));
  frontImg2?.subscribe((v) => (values.front_img2 = v));
  backImg?.subscribe((v) => (values.back_img = v));
</script>

<main>
  <div>
    <img src={values.front_img1} alt="front_img1" />
    <img src={values.front_img2} alt="front_img2" />
    <img src={values.back_img} alt="back_img" />
  </div>
</main>

<style>
</style>
