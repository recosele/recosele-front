<script lang="ts">
  import { push } from 'svelte-spa-router';
  let fileType = 0;
  let yes = false;
  let showErr = false;

  function start() {
    if (!fileType || !yes) {
      showErr = true;
    } else {
      push(`/camera?fileType=${fileType}`);
    }
  }
</script>

<main class="main">
  <h1 class="title is-info">オンライン本人確認</h1>
  <h6 class="subtitle is-6">
    ご用意頂いた「顔写真付本人確認書類」を選択頂き、WEBカメラを使用して撮影shてください。
  </h6>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">書類選択</p>
    </header>
    <div class="card-content">
      <div class="content">
        <form>
          <label>
            <input type="radio" bind:group={fileType} value={1} />
            運転免許証
          </label>
          <label>
            <input type="radio" bind:group={fileType} value={2} />
            在留カード
          </label>
          <label>
            <input type="checkbox" bind:checked={yes} />
            以下利用規約に同意
          </label>
          <button class="button is-danger is-light" on:click={start}>本人確認を開始</button>
        </form>
      </div>
    </div>
  </div>
</main>

<style>
  .main {
    padding: 21px;
  }
</style>
