<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { frontImg1, frontImg2, backImg } from '@/store/store';

  let videoRef = document.getElementById('camera') as HTMLVideoElement;
  let canvasRef = document.getElementById('canvas') as HTMLCanvasElement;

  const images = [frontImg1, frontImg2, backImg];
  let targetIndex = 0;
  let image = null;
  let w = document.documentElement.clientWidth;
  let h = document.documentElement.clientHeight;

  async function openCamera(constraints) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoTracks = stream.getVideoTracks();
      console.log('使用的设备是:' + videoTracks[0]);
      const audioTracks = stream.getAudioTracks();
      console.log('使用的设备是:' + audioTracks[0]);
      console.log(stream);
      videoRef.srcObject = stream;
      videoRef.onloadedmetadata = function (e) {
        videoRef.pause();
        videoRef.play();
      };
    } catch (error) {
      if (error.name === 'ConstraintNotSatisfiedError') {
        console.log(`宽:${videoRef?.width} 高:${videoRef?.height} 设备不支持`);
      } else if (error.name === 'PermissionDeniedError') {
        console.log('没有摄像头和麦克风的使用权限,请点击允许按钮');
      }
      console.log('getUserMedia错误:', error);
    }
  }
  onMount(async () => {
    await openCamera({ audio: true, video: { facingMode: { exact: 'environment' } } });
  });
  function capture() {
    w = canvasRef.width = videoRef.videoWidth;
    h = canvasRef.height = videoRef.videoHeight;
    canvasRef.getContext('2d').drawImage(videoRef, 0, 0, w, h);
    image = canvasRef.toDataURL('image/jpeg');
  }
  function handleCancel() {
    canvasRef.getContext('2d').clearRect(0, 0, w, h);
    images[targetIndex].set('');
  }
  async function handleOK() {
    images[targetIndex].set(image);
    image = null;
    targetIndex++;
    if (targetIndex === 3) {
      await openCamera({ audio: true, video: { facingMode: 'user' } });
    }
    if (images[targetIndex]) {
      handleCancel();
    } else {
      push('/result');
    }
  }
</script>

<div class="container">
  <canvas id="canvas" />
  <video id="camera" autoplay playsinline>
    <track src="captions_es.vtt" kind="captions" srclang="es" label="spanish_captions" />
  </video>
  <div id="actions">
    {#if image}
      <button class="button is-rounded" on:click={handleCancel}>キャンセル</button>
      <button class="button is-rounded is-success" on:click={handleOK}>確定</button>
    {:else}
      <button class="button is-rounded" on:click={capture}>icon</button>
    {/if}
  </div>
</div>

<style>
  .container {
    background: #222;
  }
  #canvas {
    z-index: 100;
    position: fixed;
    width: 100vw;
    height: 100vh;
  }
  #camera {
    width: 100vw;
    height: 100vh;
  }
  #actions {
    z-index: 1000;
    bottom: 0;
    width: 100vw;
    text-align: center;
    position: fixed;
  }
</style>
