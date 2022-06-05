<script lang="ts">
  import { frontImg1, frontImg2, backImg, faceImg } from '@/store/store';
  import { querystring, replace } from 'svelte-spa-router';
  import { uploadUserImages } from '@/api/auth';

  let params = new URLSearchParams($querystring);
  params.delete("fileType");

  let values = {
    userId: params?.get('userId'),
    front_img1: $frontImg1,
    front_img2: $frontImg2,
    back_img: $backImg,
    face_img: $faceImg,
  };

  async function handleSubmit() {
    let buttonRef = document.getElementById('submitButton');
    buttonRef.classList.add('is-loading');
    await uploadUserImages(values);
    setTimeout(() => {
      buttonRef.classList.remove('is-loading');
      replace(`/?${params.toString()}`);
    }, 1000);
  }
</script>

<main class="container">
  <div class="box">
    <div class="card block">
      <div class="card-content">
        <p class="title is-6">证件正面1</p>
      </div>
      <div class="card-image">
        <figure class="image">
          <img src={values.front_img1} alt="front_img1" />
        </figure>
      </div>
    </div>
    <div class="card block">
      <div class="card-content">
        <p class="title is-6">证件正面2</p>
      </div>
      <div class="card-image">
        <figure class="image">
          <img src={values.front_img2} alt="front_img2" />
        </figure>
      </div>
    </div>
    <div class="card block">
      <div class="card-content">
        <p class="title is-6">证件背面</p>
      </div>
      <div class="card-image">
        <figure class="image">
          <img src={values.back_img} alt="back_img" />
        </figure>
      </div>
    </div>
    <div class="card block">
      <div class="card-content">
        <p class="title is-6">面部</p>
      </div>
      <div class="card-image">
        <figure class="image">
          <img src={values.face_img} alt="face_img" />
        </figure>
      </div>
    </div>
    <button
      id="submitButton"
      class="button is-info is-large is-fullwidth"
      on:click={handleSubmit}
    >
      确认并提交
    </button>
  </div>
</main>

<style>
</style>
