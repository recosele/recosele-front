<script lang="ts">
  import { onMount } from 'svelte';
  import { replace, querystring } from 'svelte-spa-router';
  import { frontImg1, frontImg2, backImg, faceImg } from '@/store/store';

  let params = new URLSearchParams($querystring);

  const images = [
    {
      label: '证件正面1',
      content: '将证件正面朝上，按照指示，从正上方进行拍摄。',
      source: frontImg1,
    },
    {
      label: '证件正面2',
      content: '将证件正面朝上，按照指示，从斜上方进行拍摄。',
      source: frontImg2,
    },
    {
      label: '证件背面',
      content: '将证件背面朝上，按照指示，从正上方进行拍摄。',
      source: backImg,
    },
    {
      label: '面部',
      content: '将申请人整个面部和头部露出，按照指示，从正前方进行拍摄。',
      source: faceImg,
    },
  ];
  let targetIndex = 0;
  let image = null;
  let w = document.documentElement.clientWidth;
  let h = document.documentElement.clientHeight;

  let selectedVideoDevice = '';
  let videoDevices = [];
  let stream;

  // 自动打开摄像头并加载所有摄像头设备
  onMount(() => {
    start()
      .then(updateDevices)
      .then((data) => {
        if (selectedVideoDevice === '' && data.videoDevices.length > 0) {
          selectedVideoDevice = data.videoDevices[0].deviceId;
        }
        videoDevices = data.videoDevices;
      });
  });

  function handleWap() {
    const canvas = document.getElementById('camera-wap') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 100, 100);
  }

  // 获取可用摄像头设备
  async function updateDevices() {
    try {
      let videoDevices = [];
      const devices = await navigator.mediaDevices.enumerateDevices();
      for (let device of devices) {
        if (device.kind === 'videoinput') {
          videoDevices.push(device);
        }
      }
      return Promise.resolve({
        videoDevices,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // 切换摄像头
  function handleVideoDeviceChange(e) {
    selectedVideoDevice = e.target.value;
    if (Boolean(navigator.userAgent.match(/iphone|ipod|iOS|ipad/gi))) {
      setTimeout(start, 100);
    } else {
      closeMediaStream(stream);
      setTimeout(start, 100);
    }
  }

  // 打开摄像头
  async function start() {
    try {
      let videoRef = document.getElementById('camera') as HTMLVideoElement;
      const videoSource = selectedVideoDevice;
      const constraints = {
        audio: false,
        video: {
          width: 1980,
          height: 1024,
          deviceId: videoSource ? { exact: videoSource } : undefined,
        },
      };
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.srcObject = stream;
    } catch (error) {
      console.log(error);
    }
  }

  // 关闭流
  function closeMediaStream(stream) {
    if (!stream) return;

    let tracks, i, len;
    if (stream.getTracks) {
      tracks = stream.getTracks();
      for (i = 0, len = tracks.length; i < len; i += 1) {
        tracks[i].stop();
      }
    } else {
      tracks = stream.getAudioTracks();
      for (i = 0, len = tracks.length; i < len; i += 1) {
        tracks[i].stop();
      }

      tracks = stream.getVideoTracks();
      for (i = 0, len = tracks.length; i < len; i += 1) {
        tracks[i].stop();
      }
    }
  }

  function handleCapture() {
    let videoRef = document.getElementById('camera') as HTMLVideoElement;
    let canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
    let modalRef = document.getElementById('image-modal') as HTMLDivElement;
    w = canvasRef.width = videoRef.videoWidth;
    h = canvasRef.height = videoRef.videoHeight;
    canvasRef.getContext('2d').drawImage(videoRef, 0, 0, w, h);
    image = canvasRef.toDataURL('image/jpeg');
    modalRef.classList.add('is-active');
  }
  function handleCancel() {
    let canvasRef = document.getElementById('canvas') as HTMLCanvasElement;
    let modalRef = document.getElementById('image-modal') as HTMLDivElement;
    modalRef.classList.remove('is-active');
    canvasRef.getContext('2d').clearRect(0, 0, w, h);
    image = null;
  }
  async function handleOK() {
    images?.[targetIndex]?.source?.set(image);
    image = null;
    targetIndex++;
    if (images?.[targetIndex]) {
      handleCancel();
    } else {
      replace(`/result?${params.toString()}`);
    }
  }
</script>

<main class="container">
  <section class="view">
    <canvas id="camera-wap" />
    <canvas id="canvas" />
    <video id="camera" autoplay playsinline>
      <track src="" kind="captions" />
    </video>
  </section>
  <section class="actions">
    <h1 class="title is-4 has-text-white">{images?.[targetIndex]?.label}</h1>
    <h1 class="subtitle is-6 has-text-white">{images?.[targetIndex]?.content}</h1>
    <div class="field">
      <label class="label has-text-white">
        <span>摄像头选择</span>
        <select
          class="select is-primary is-small"
          value={selectedVideoDevice}
          on:change={handleVideoDeviceChange}
        >
          {#each videoDevices as device}
            <option value={device.deviceId}>
              {device.label}
            </option>
          {/each}
        </select>
      </label>
    </div>
    <div>
      <button class="button is-info" on:click={handleCapture}>拍摄</button>
    </div>
  </section>
  <div id="image-modal" class="modal">
    <div class="modal-background" />
    <div class="modal-content">
      <p class="image">
        <img src={image} alt="" width={w} height={h} />
      </p>
    </div>
    <footer class="modal-action">
      <button class="button" on:click={handleCancel}>取消</button>
      <button class="button is-info" on:click={handleOK}>確定</button>
    </footer>
  </div>
</main>

<style>
  .container {
    background: #222;
    width: 100vw;
    height: 100vh;
  }
  .view {
    position: relative;
    width: 100vw;
    height: 60vh;
  }
  #canvas {
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
  #camera {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
  .actions {
    padding: 12px;
  }
  .modal-action {
    display: flex;
    justify-content: space-between;
    margin-top: 21px;
    width: 60vw;
  }
</style>
