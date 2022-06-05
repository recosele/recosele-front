<script lang="ts">
  import { push, querystring } from 'svelte-spa-router';
  import { checkUser } from '@/api/auth';

  let fileType = 1;
  let yes = false;
  let showErr = '';
  let params = new URLSearchParams($querystring);
  const userId = params.get('userId');

  function start() {
    if (!fileType) {
      showErr = '请选择要上传证件的类型';
    } else if (!yes) {
      showErr = '请阅读并确认【安全条约】';
    } else {
      params.append('fileType', fileType + '');
      push(`/camera?${params.toString()}`);
    }
  }

  async function checkUserStatus() {
    if (userId) {
      const res = await checkUser({ userId });
      return res;
    } else {
      throw {
        message: '链接格式错误，请使用正确的链接。',
      };
    }
  }
</script>

{#await checkUserStatus()}
  <div class="loader-wrapper">
    <div class="loader is-loading" />
  </div>
{:then { data }}
  {#if !data?.verify_status}
    <div class="hero is-warning is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">未找到此用户</p>
          <p class="subtitle">请先于小程序注册账号。</p>
        </div>
      </div>
    </div>
  {:else}
    {#if data?.verify_status === '1'}
      <div class="hero is-info is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
            <p class="title">审核中</p>
            <p class="subtitle">请耐心等待审核结果。</p>
          </div>
        </div>
      </div>
    {:else if data?.verify_status === '2'}
      <div class="hero is-success is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
            <p class="title">审核成功</p>
            <p class="subtitle">恭喜您已通过身份审核。</p>
          </div>
        </div>
      </div>
    {:else if data?.verify_status === '3'}
      <div class="notification is-danger">审核失败，请重新上传。</div>
    {/if}
    {#if data?.verify_status === '0' || data?.verify_status === '3'}
      <main class="main">
        <h1 class="title is-info">本人确认</h1>
        <h6 class="subtitle is-6">
          请选择上传证件的类型，阅读并确认【安全条约】后，使用手机摄像头进行拍照上传。
        </h6>
        <div class="card block">
          <header class="card-header">
            <p class="card-header-title">证件类型选择</p>
          </header>
          <div class="card-content">
            <div class="content">
              <form>
                <div class="control block">
                  <label class="radio">
                    <input type="radio" bind:group={fileType} value={1} />
                    驾驶证
                  </label>
                  <label class="radio">
                    <input type="radio" bind:group={fileType} value={2} />
                    在留卡
                  </label>
                </div>
                <div class="block">
                  {#if fileType === 1}
                    <p class="subtitle is-6">证件正面1示例:</p>
                    <figure class="image is-2by1">
                      <img
                        src="https://www.npa.go.jp/policies/application/license_renewal/img/license.jpg"
                        alt="1"
                      />
                    </figure>
                    <p class="subtitle is-6">证件正面2示例:</p>
                    <figure class="image is-2by1">
                      <img
                        src="https://www.npa.go.jp/policies/application/license_renewal/img/license.jpg"
                        alt="2"
                      />
                    </figure>
                    <p class="subtitle is-6">证件背面示例:</p>
                    <figure class="image is-2by1">
                      <img
                        src="https://www.npa.go.jp/policies/application/license_renewal/img/license.jpg"
                        alt="3"
                      />
                    </figure>
                    <p class="subtitle is-6">面部示例:</p>
                    <figure class="image is-2by1">
                      <img
                        src="https://www.npa.go.jp/policies/application/license_renewal/img/license.jpg"
                        alt="4"
                      />
                    </figure>
                  {:else if fileType === 2}
                    <p class="subtitle is-6">证件正面1示例:</p>
                    <figure class="image is-2by1">
                      <img
                        src="https://aquaweasel75.sakura.ne.jp/select/wp-content/uploads/2021/03/%E5%9C%A8%E7%95%99%E3%82%AB%E3%83%BC%E3%83%89.jpg"
                        alt="1"
                      />
                    </figure>
                    <p class="subtitle is-6">证件正面2示例:</p>
                    <figure class="image is-2by1">
                      <img
                        src="https://aquaweasel75.sakura.ne.jp/select/wp-content/uploads/2021/03/%E5%9C%A8%E7%95%99%E3%82%AB%E3%83%BC%E3%83%89.jpg"
                        alt="2"
                      />
                    </figure>
                    <p class="subtitle is-6">证件背面示例:</p>
                    <figure class="image is-2by1">
                      <img
                        src="https://aquaweasel75.sakura.ne.jp/select/wp-content/uploads/2021/03/%E5%9C%A8%E7%95%99%E3%82%AB%E3%83%BC%E3%83%89.jpg"
                        alt="3"
                      />
                    </figure>
                    <p class="subtitle is-6">面部示例:</p>
                    <figure class="image is-2by1">
                      <img
                        src="https://aquaweasel75.sakura.ne.jp/select/wp-content/uploads/2021/03/%E5%9C%A8%E7%95%99%E3%82%AB%E3%83%BC%E3%83%89.jpg"
                        alt="4"
                      />
                    </figure>
                  {/if}
                </div>
                <div class="control">
                  <div class="content">
                    <h1>安全条约</h1>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni quia optio
                      consectetur odit recusandae reiciendis, sed at consequatur ipsa quis esse
                      fugit saepe nulla voluptates culpa officia eos quas. Excepturi.
                    </p>
                  </div>
                  <label class="label">
                    <input type="checkbox" bind:checked={yes} />
                    以上利用規約に同意
                  </label>
                </div>
                {#if showErr}
                  <p class="help is-danger">{showErr}</p>
                {/if}
              </form>
            </div>
          </div>
        </div>
        <button class="button is-info is-large is-fullwidth" on:click={start}
          >本人確認を開始</button
        >
      </main>
    {/if}
  {/if}
{:catch error}
  <div class="hero is-danger is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">ERROR</p>
        <p class="subtitle">{error?.message || JSON.stringify(error)}</p>
      </div>
    </div>
  </div>
{/await}

<style>
  .main {
    padding: 21px;
  }
  .loader-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #fff;
    transition: opacity 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader {
    height: 80px;
    width: 80px;
  }
</style>
