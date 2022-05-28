<script lang="ts">
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { frontImg1, frontImg2, backImg } from '@/store/store';

  const images = [frontImg1, frontImg2, backImg];
  let targetIndex = 0;
  let image = null;
  let w = document.documentElement.clientWidth;
  let h = document.documentElement.clientHeight;

  async function openCamera(constraints) {
    try {
      let videoRef = document.getElementById('camera') as HTMLVideoElement;
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoTracks = stream.getVideoTracks();
      console.log('使用的设备是:' + videoTracks[0]);
      const audioTracks = stream.getAudioTracks();
      console.log('使用的设备是:' + audioTracks[0]);
      videoRef.srcObject = stream;
      await videoRef.play();
    } catch (error) {
      if (error.name === 'ConstraintNotSatisfiedError') {
        let videoRef = document.getElementById('camera') as HTMLVideoElement;
        console.log(`宽:${videoRef?.width} 高:${videoRef?.height} 设备不支持`);
      } else if (error.name === 'PermissionDeniedError') {
        console.log('没有摄像头和麦克风的使用权限,请点击允许按钮');
      }
      console.log('getUserMedia错误:', error);
    }
  }
  onMount(async () => {
    await openCamera({ audio: false, video: { facingMode: { exact: 'environment' } } });
  });
  function handleStart() {
    let videoRef = document.getElementById('camera') as HTMLVideoElement;
    videoRef.play();
  }
  function handleCapture() {
    let videoRef = document.getElementById('camera') as HTMLVideoElement;
    let canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
    w = canvasRef.width = videoRef.videoWidth;
    h = canvasRef.height = videoRef.videoHeight;
    canvasRef.getContext('2d').drawImage(videoRef, 0, 0, w, h);
    image = canvasRef.toDataURL('image/jpeg');
  }
  function handleCancel() {
    let canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
    canvasRef.getContext('2d').clearRect(0, 0, w, h);
    image = null;
  }
  async function handleOK() {
    images[targetIndex].set(image);
    image = null;
    targetIndex++;
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
    <track src="" kind="captions" />
  </video>
  <div id="actions">
    {#if image}
      <button class="button is-rounded" on:click={handleCancel}>キャンセル</button>
      <button class="button is-rounded is-success" on:click={handleOK}>確定</button>
    {:else}
      <button class="button is-rounded" on:click={handleCapture}>icon</button>
      <button class="button is-rounded" on:click={handleStart}>start</button>
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
