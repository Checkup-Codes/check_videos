import { ref, onMounted, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import axios from "axios";
import { usePage } from "@inertiajs/vue3";
import "./GoBackButton-CwBeSdRG.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const maxResultsPerPage = 10;
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const lesson = ref(props.lesson);
    const API_KEY = "AIzaSyCoIcX9-KNL9aOYwsvdDpflXxHImczwFlQ";
    const playlistId = ref(lesson.value.playlist_id);
    const videos = ref([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const nextPageToken = ref(null);
    const prevPageToken = ref(null);
    const totalVideos = ref(0);
    onMounted(() => {
      fetchVideos();
    });
    const fetchVideos = async (pageToken = "") => {
      loading.value = true;
      videos.value = [];
      try {
        const playlistResponse = await axios.get(`${BASE_URL}/playlistItems`, {
          params: {
            part: "snippet",
            playlistId: playlistId.value,
            maxResults: maxResultsPerPage,
            pageToken,
            key: API_KEY
          }
        });
        const videoIds = playlistResponse.data.items.map((item) => item.snippet.resourceId.videoId);
        totalVideos.value = playlistResponse.data.pageInfo.totalResults;
        const videoDetailsResponse = await axios.get(`${BASE_URL}/videos`, {
          params: {
            part: "snippet,contentDetails,statistics",
            id: videoIds.join(","),
            key: API_KEY
          }
        });
        videos.value = videoDetailsResponse.data.items.map((item) => ({
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url,
          duration: parseDuration(item.contentDetails.duration),
          viewCount: item.statistics.viewCount.toLocaleString(),
          likeCount: item.statistics.likeCount.toLocaleString()
        }));
        nextPageToken.value = playlistResponse.data.nextPageToken || null;
        prevPageToken.value = pageToken ? pageToken : null;
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        loading.value = false;
      }
    };
    const totalPages = computed(() => Math.ceil(totalVideos.value / maxResultsPerPage));
    const visiblePages = computed(() => {
      const pages = [];
      const total = totalPages.value;
      if (currentPage.value > 2 && currentPage.value < total - 1) {
        for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
          pages.push(i);
        }
      } else if (currentPage.value <= 2) {
        for (let i = 2; i <= Math.min(3, total - 1); i++) {
          pages.push(i);
        }
      } else if (currentPage.value >= total - 1) {
        for (let i = Math.max(total - 2, 2); i < total; i++) {
          pages.push(i);
        }
      }
      return pages;
    });
    const parseDuration = (isoDuration) => {
      const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
      const matches = isoDuration.match(regex);
      const hours = matches[1] ? matches[1].slice(0, -1) : "00";
      const minutes = matches[2] ? matches[2].slice(0, -1) : "00";
      const seconds = matches[3] ? matches[3].slice(0, -1) : "00";
      return `${hours}:${minutes}:${seconds}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 p-5 leading-loose" }, _attrs))}><div class="rounded-lg bg-white p-3 shadow-lg">`);
      if (loading.value) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(10, (n) => {
          _push(`<div class="flex animate-pulse items-center space-x-4"><div class="h-28 w-40 flex-shrink-0 rounded-lg bg-gray-200 md:w-52"></div><div class="flex-1 space-y-4 py-1"><div class="h-4 w-3/4 rounded bg-gray-200"></div><div class="h-4 w-1/2 rounded bg-gray-200"></div><div class="h-4 w-1/3 rounded bg-gray-200"></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<ul class="mt-6 space-y-4"><!--[-->`);
        ssrRenderList(videos.value, (video) => {
          _push(`<li class="flex flex-col items-start rounded-lg bg-gray-100 p-4 shadow-sm md:flex-row md:items-center"><div class="mb-4 h-28 w-full flex-shrink-0 md:mb-0 md:w-40 lg:w-52"><img${ssrRenderAttr("src", video.thumbnail)} alt="Video Thumbnail" class="h-full w-full rounded-lg object-cover shadow-sm"></div><div class="w-full md:px-12"><a${ssrRenderAttr("href", `https://www.youtube.com/watch?v=${video.id}`)} target="_blank" class="text-md font-semibold text-gray-800 hover:underline md:text-lg">${ssrInterpolate(video.title)}</a><p class="text-sm text-gray-500">Süre: ${ssrInterpolate(video.duration)}</p><p class="text-sm text-gray-500">Görüntülenme: ${ssrInterpolate(video.viewCount)}</p><p class="text-sm text-gray-500">Beğeniler: ${ssrInterpolate(video.likeCount)}</p></div></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`<div class="mt-6 flex items-center justify-center space-x-2"><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="${ssrRenderClass([currentPage.value === 1 ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800", "rounded px-3 py-2 text-sm transition-all hover:bg-gray-300"])}"> 1 </button>`);
      if (currentPage.value > 3) {
        _push(`<span>...</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(visiblePages.value, (page) => {
        _push(`<button class="${ssrRenderClass([currentPage.value === page ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800", "rounded px-3 py-2 text-sm transition-all hover:bg-gray-300"])}">${ssrInterpolate(page)}</button>`);
      });
      _push(`<!--]-->`);
      if (currentPage.value < totalPages.value - 2) {
        _push(`<span>...</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="${ssrRenderClass([currentPage.value === totalPages.value ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800", "rounded px-3 py-2 text-sm transition-all hover:bg-gray-300"])}">${ssrInterpolate(totalPages.value)}</button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Lessons/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
