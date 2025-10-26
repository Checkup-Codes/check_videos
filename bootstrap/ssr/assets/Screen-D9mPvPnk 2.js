import { ref, onMounted, computed, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createTextVNode, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import axios from "axios";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./GoBackButton-u55EQwn1.js";
import { _ as _sfc_main$1 } from "./CheckScreen-faNUnK3u.js";
import { _ as _export_sfc } from "../ssr.js";
import "@fortawesome/vue-fontawesome";
import "vuex";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const maxResultsPerPage = 10;
const _sfc_main = {
  __name: "Screen",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const lesson = ref(props.lesson);
    const API_KEY = void 0;
    const playlistId = ref(lesson.value.playlist_id);
    const videos = ref([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const nextPageToken = ref(null);
    const prevPageToken = ref(null);
    const totalVideos = ref(0);
    const checkedVideos = ref([]);
    onMounted(() => {
      fetchVideos();
      loadCheckedVideos();
    });
    const loadCheckedVideos = () => {
      const savedCheckedVideos = localStorage.getItem(`checkedVideos_${lesson.value.id}`);
      if (savedCheckedVideos) {
        checkedVideos.value = JSON.parse(savedCheckedVideos);
      }
    };
    const saveCheckedVideos = () => {
      localStorage.setItem(`checkedVideos_${lesson.value.id}`, JSON.stringify(checkedVideos.value));
    };
    const isChecked = (videoId) => {
      return checkedVideos.value.includes(videoId);
    };
    const toggleChecked = (video) => {
      const index = checkedVideos.value.indexOf(video.id);
      if (index === -1) {
        checkedVideos.value.push(video.id);
      } else {
        checkedVideos.value.splice(index, 1);
      }
      saveCheckedVideos();
    };
    const formatNumber = (numStr) => {
      if (!numStr) return "0";
      const num = parseInt(numStr.replace(/,/g, ""));
      if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + "M";
      } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + "K";
      }
      return numStr;
    };
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
          thumbnail: item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url : item.snippet.thumbnails.default.url,
          duration: parseDuration(item.contentDetails.duration),
          viewCount: item.statistics.viewCount ? item.statistics.viewCount.toLocaleString() : "0",
          likeCount: item.statistics.likeCount ? item.statistics.likeCount.toLocaleString() : "0"
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
    const goToPage = (page) => {
      currentPage.value = page;
      fetchVideos(page === 1 ? "" : nextPageToken.value);
    };
    const parseDuration = (isoDuration) => {
      const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
      const matches = isoDuration.match(regex);
      const hours = matches[1] ? matches[1].slice(0, -1) : "00";
      const minutes = matches[2] ? matches[2].slice(0, -1).padStart(2, "0") : "00";
      const seconds = matches[3] ? matches[3].slice(0, -1).padStart(2, "0") : "00";
      return hours === "00" ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-5" data-v-91d2a193${_scopeId}><div class="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0" data-v-91d2a193${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { href: "/lessons" }, null, _parent2, _scopeId));
            _push2(`<div class="w-full sm:w-auto" data-v-91d2a193${_scopeId}><h2 class="truncate text-xl font-bold text-primary sm:text-2xl" data-v-91d2a193${_scopeId}>${ssrInterpolate(lesson.value.title)}</h2></div></div><div class="card mt-5 border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" data-v-91d2a193${_scopeId}><div class="card-body p-6" data-v-91d2a193${_scopeId}>`);
            if (loading.value) {
              _push2(`<div class="flex justify-center p-8" data-v-91d2a193${_scopeId}><span class="loading loading-spinner loading-lg" data-v-91d2a193${_scopeId}></span></div>`);
            } else {
              _push2(`<div data-v-91d2a193${_scopeId}>`);
              if (videos.value.length === 0) {
                _push2(`<div class="p-4" data-v-91d2a193${_scopeId}><div class="alert alert-warning" data-v-91d2a193${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24" data-v-91d2a193${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-91d2a193${_scopeId}></path></svg><span data-v-91d2a193${_scopeId}>Bu oynatma listesinde görüntülenecek video bulunamadı.</span></div></div>`);
              } else {
                _push2(`<ul class="divide-y" data-v-91d2a193${_scopeId}><!--[-->`);
                ssrRenderList(videos.value, (video) => {
                  _push2(`<li class="py-4 hover:bg-base-100" data-v-91d2a193${_scopeId}><div class="flex flex-col md:flex-row md:space-x-4" data-v-91d2a193${_scopeId}><div class="relative mb-3 md:mb-0 md:w-1/3" data-v-91d2a193${_scopeId}><a${ssrRenderAttr("href", `https://www.youtube.com/watch?v=${video.id}`)} target="_blank" class="aspect-w-16 aspect-h-9 block overflow-hidden rounded-lg" data-v-91d2a193${_scopeId}><img${ssrRenderAttr("src", video.thumbnail)} alt="Video thumbnail" class="h-full w-full object-cover" data-v-91d2a193${_scopeId}><div class="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-1 py-0.5 text-xs text-white" data-v-91d2a193${_scopeId}>${ssrInterpolate(video.duration)}</div></a></div><div class="flex flex-col justify-between md:w-2/3" data-v-91d2a193${_scopeId}><div data-v-91d2a193${_scopeId}><h3 class="mb-1 text-base font-medium leading-tight" data-v-91d2a193${_scopeId}>${ssrInterpolate(video.title)}</h3><div class="mb-3 flex space-x-4 text-xs text-gray-500" data-v-91d2a193${_scopeId}><div class="flex items-center" data-v-91d2a193${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-91d2a193${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-91d2a193${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-91d2a193${_scopeId}></path></svg> ${ssrInterpolate(formatNumber(video.viewCount))} görüntülenme </div><div class="flex items-center" data-v-91d2a193${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-91d2a193${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" data-v-91d2a193${_scopeId}></path></svg> ${ssrInterpolate(formatNumber(video.likeCount))}</div></div></div><div class="flex space-x-2" data-v-91d2a193${_scopeId}><a${ssrRenderAttr("href", `https://www.youtube.com/watch?v=${video.id}`)} target="_blank" class="btn btn-primary btn-sm" data-v-91d2a193${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-91d2a193${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" data-v-91d2a193${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-91d2a193${_scopeId}></path></svg> İzle </a><button class="btn btn-outline btn-sm" data-v-91d2a193${_scopeId}>`);
                  if (isChecked(video.id)) {
                    _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-91d2a193${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-91d2a193${_scopeId}></path></svg>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (isChecked(video.id)) {
                    _push2(`<span data-v-91d2a193${_scopeId}>İzlendi</span>`);
                  } else {
                    _push2(`<span data-v-91d2a193${_scopeId}>İzlenmedi</span>`);
                  }
                  _push2(`</button></div></div></div></li>`);
                });
                _push2(`<!--]--></ul>`);
              }
              _push2(`<div class="flex justify-center overflow-x-auto p-4" data-v-91d2a193${_scopeId}><div class="join" data-v-91d2a193${_scopeId}><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="${ssrRenderClass([currentPage.value === 1 ? "btn-active" : "", "btn btn-sm join-item"])}" data-v-91d2a193${_scopeId}> 1 </button>`);
              if (currentPage.value > 3) {
                _push2(`<span class="btn btn-disabled btn-sm join-item" data-v-91d2a193${_scopeId}>...</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(visiblePages.value, (page) => {
                _push2(`<button class="${ssrRenderClass([currentPage.value === page ? "btn-active" : "", "btn btn-sm join-item"])}" data-v-91d2a193${_scopeId}>${ssrInterpolate(page)}</button>`);
              });
              _push2(`<!--]-->`);
              if (currentPage.value < totalPages.value - 2) {
                _push2(`<span class="btn btn-disabled btn-sm join-item" data-v-91d2a193${_scopeId}>...</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (totalPages.value > 1) {
                _push2(`<button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="${ssrRenderClass([currentPage.value === totalPages.value ? "btn-active" : "", "btn btn-sm join-item"])}" data-v-91d2a193${_scopeId}>${ssrInterpolate(totalPages.value)}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "mb-5" }, [
                createVNode("div", { class: "flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0" }, [
                  createVNode(_sfc_main$2, { href: "/lessons" }),
                  createVNode("div", { class: "w-full sm:w-auto" }, [
                    createVNode("h2", { class: "truncate text-xl font-bold text-primary sm:text-2xl" }, toDisplayString(lesson.value.title), 1)
                  ])
                ]),
                createVNode("div", { class: "card mt-5 border border-gray-200 bg-white shadow-lg transition-all duration-200 dark:border-gray-700 dark:bg-base-100" }, [
                  createVNode("div", { class: "card-body p-6" }, [
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center p-8"
                    }, [
                      createVNode("span", { class: "loading loading-spinner loading-lg" })
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      videos.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-4"
                      }, [
                        createVNode("div", { class: "alert alert-warning" }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "h-6 w-6 shrink-0 stroke-current",
                            fill: "none",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            })
                          ])),
                          createVNode("span", null, "Bu oynatma listesinde görüntülenecek video bulunamadı.")
                        ])
                      ])) : (openBlock(), createBlock("ul", {
                        key: 1,
                        class: "divide-y"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(videos.value, (video) => {
                          return openBlock(), createBlock("li", {
                            key: video.id,
                            class: "py-4 hover:bg-base-100"
                          }, [
                            createVNode("div", { class: "flex flex-col md:flex-row md:space-x-4" }, [
                              createVNode("div", { class: "relative mb-3 md:mb-0 md:w-1/3" }, [
                                createVNode("a", {
                                  href: `https://www.youtube.com/watch?v=${video.id}`,
                                  target: "_blank",
                                  class: "aspect-w-16 aspect-h-9 block overflow-hidden rounded-lg"
                                }, [
                                  createVNode("img", {
                                    src: video.thumbnail,
                                    alt: "Video thumbnail",
                                    class: "h-full w-full object-cover"
                                  }, null, 8, ["src"]),
                                  createVNode("div", { class: "absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-1 py-0.5 text-xs text-white" }, toDisplayString(video.duration), 1)
                                ], 8, ["href"])
                              ]),
                              createVNode("div", { class: "flex flex-col justify-between md:w-2/3" }, [
                                createVNode("div", null, [
                                  createVNode("h3", { class: "mb-1 text-base font-medium leading-tight" }, toDisplayString(video.title), 1),
                                  createVNode("div", { class: "mb-3 flex space-x-4 text-xs text-gray-500" }, [
                                    createVNode("div", { class: "flex items-center" }, [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "mr-1 h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        }),
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        })
                                      ])),
                                      createTextVNode(" " + toDisplayString(formatNumber(video.viewCount)) + " görüntülenme ", 1)
                                    ]),
                                    createVNode("div", { class: "flex items-center" }, [
                                      (openBlock(), createBlock("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        class: "mr-1 h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                        })
                                      ])),
                                      createTextVNode(" " + toDisplayString(formatNumber(video.likeCount)), 1)
                                    ])
                                  ])
                                ]),
                                createVNode("div", { class: "flex space-x-2" }, [
                                  createVNode("a", {
                                    href: `https://www.youtube.com/watch?v=${video.id}`,
                                    target: "_blank",
                                    class: "btn btn-primary btn-sm"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "mr-1 h-4 w-4",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      stroke: "currentColor"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                      }),
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      })
                                    ])),
                                    createTextVNode(" İzle ")
                                  ], 8, ["href"]),
                                  createVNode("button", {
                                    class: "btn btn-outline btn-sm",
                                    onClick: ($event) => toggleChecked(video)
                                  }, [
                                    isChecked(video.id) ? (openBlock(), createBlock("svg", {
                                      key: 0,
                                      xmlns: "http://www.w3.org/2000/svg",
                                      class: "mr-1 h-4 w-4",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      stroke: "currentColor"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M5 13l4 4L19 7"
                                      })
                                    ])) : createCommentVNode("", true),
                                    isChecked(video.id) ? (openBlock(), createBlock("span", { key: 1 }, "İzlendi")) : (openBlock(), createBlock("span", { key: 2 }, "İzlenmedi"))
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])),
                      createVNode("div", { class: "flex justify-center overflow-x-auto p-4" }, [
                        createVNode("div", { class: "join" }, [
                          createVNode("button", {
                            disabled: currentPage.value === 1,
                            onClick: ($event) => goToPage(1),
                            class: ["btn btn-sm join-item", currentPage.value === 1 ? "btn-active" : ""]
                          }, " 1 ", 10, ["disabled", "onClick"]),
                          currentPage.value > 3 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "btn btn-disabled btn-sm join-item"
                          }, "...")) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(visiblePages.value, (page) => {
                            return openBlock(), createBlock("button", {
                              key: page,
                              onClick: ($event) => goToPage(page),
                              class: ["btn btn-sm join-item", currentPage.value === page ? "btn-active" : ""]
                            }, toDisplayString(page), 11, ["onClick"]);
                          }), 128)),
                          currentPage.value < totalPages.value - 2 ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: "btn btn-disabled btn-sm join-item"
                          }, "...")) : createCommentVNode("", true),
                          totalPages.value > 1 ? (openBlock(), createBlock("button", {
                            key: 2,
                            disabled: currentPage.value === totalPages.value,
                            onClick: ($event) => goToPage(totalPages.value),
                            class: ["btn btn-sm join-item", currentPage.value === totalPages.value ? "btn-active" : ""]
                          }, toDisplayString(totalPages.value), 11, ["disabled", "onClick"])) : createCommentVNode("", true)
                        ])
                      ])
                    ]))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Lessons/Show/Screen.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-91d2a193"]]);
export {
  Screen as default
};
