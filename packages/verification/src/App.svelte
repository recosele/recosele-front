<script lang="ts">
  import Router, { replace } from 'svelte-spa-router';
  import './app.css';
  // import { getAuth } from "./services/Auth";
  import Home from './routes/home.svelte';
  import Camera from './routes/camera.svelte';
  import Result from './routes/result.svelte';

  const routes = {
    '/': Home,
    '/camera/': Camera,
    '/result/': Result,
  };

  window.alert = function (name) {
    var iframe = document.createElement('IFRAME');
    iframe.style.display = 'none';
    iframe.setAttribute('src', 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
  };

  function routeLoaded(event) {
    // console.log("routeLoaded event", event.detail);
    // const auth = getAuth();
    // if (!auth && event.detail.location !== "/login") {
    //   replace("/login");
    // }
    // if (auth && event.detail.location === "/login") {
    //   replace("/");
    // }
  }
</script>

<Router {routes} on:routeLoaded={routeLoaded} />
