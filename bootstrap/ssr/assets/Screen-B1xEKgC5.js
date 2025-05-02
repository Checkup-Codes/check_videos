import { ref, onMounted, computed, withCtx, createBlock, openBlock, Fragment, renderList, createVNode, toDisplayString, createTextVNode, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import axios from "axios";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./GoBackButton-r241H7w7.js";
import { _ as _sfc_main$1 } from "./CheckScreen-CM3g7Drr.js";
import _sfc_main$3 from "./Card-qmctt-Ej.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
            _push2(`<div class="mb-5" data-v-ef3cb8c1${_scopeId}><div class="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0" data-v-ef3cb8c1${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { href: "/lessons" }, null, _parent2, _scopeId));
            _push2(`<div class="w-full sm:w-auto" data-v-ef3cb8c1${_scopeId}><h2 class="text-primary truncate text-xl font-bold sm:text-2xl" data-v-ef3cb8c1${_scopeId}>${ssrInterpolate(lesson.value.title)}</h2></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, { class: "card-compact mt-5 w-full shadow-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (loading.value) {
                    _push3(`<div class="space-y-4 p-4" data-v-ef3cb8c1${_scopeId2}><!--[-->`);
                    ssrRenderList(3, (n) => {
                      _push3(`<div class="flex animate-pulse items-center space-x-4" data-v-ef3cb8c1${_scopeId2}><div class="bg-base-200 h-28 w-40 flex-shrink-0 rounded-lg md:w-52" data-v-ef3cb8c1${_scopeId2}></div><div class="flex-1 space-y-4 py-1" data-v-ef3cb8c1${_scopeId2}><div class="bg-base-200 h-4 w-3/4 rounded" data-v-ef3cb8c1${_scopeId2}></div><div class="bg-base-200 h-4 w-1/2 rounded" data-v-ef3cb8c1${_scopeId2}></div></div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div data-v-ef3cb8c1${_scopeId2}>`);
                    if (videos.value.length === 0) {
                      _push3(`<div class="p-4" data-v-ef3cb8c1${_scopeId2}><div class="alert alert-warning" data-v-ef3cb8c1${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24" data-v-ef3cb8c1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-ef3cb8c1${_scopeId2}></path></svg><span data-v-ef3cb8c1${_scopeId2}>Bu oynatma listesinde görüntülenecek video bulunamadı.</span></div></div>`);
                    } else {
                      _push3(`<ul class="divide-base-200 divide-y" data-v-ef3cb8c1${_scopeId2}><!--[-->`);
                      ssrRenderList(videos.value, (video) => {
                        _push3(`<li class="hover:bg-base-100 p-4" data-v-ef3cb8c1${_scopeId2}><div class="flex flex-col md:flex-row md:items-center" data-v-ef3cb8c1${_scopeId2}><div class="mb-3 h-auto w-full md:mb-0 md:h-28 md:w-40 lg:w-52" data-v-ef3cb8c1${_scopeId2}><img${ssrRenderAttr("src", video.thumbnail)} alt="Video Thumbnail" class="h-full w-full rounded-lg object-cover shadow-sm" data-v-ef3cb8c1${_scopeId2}></div><div class="w-full md:px-6" data-v-ef3cb8c1${_scopeId2}><a${ssrRenderAttr("href", `https://www.youtube.com/watch?v=${video.id}`)} target="_blank" class="link link-hover link-primary text-base font-medium md:text-lg" data-v-ef3cb8c1${_scopeId2}>${ssrInterpolate(video.title)}</a><div class="mt-2 flex flex-nowrap gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0" data-v-ef3cb8c1${_scopeId2}><span class="badge badge-neutral whitespace-nowrap" data-v-ef3cb8c1${_scopeId2}>${ssrInterpolate(video.duration)}</span><span class="badge badge-neutral whitespace-nowrap" data-v-ef3cb8c1${_scopeId2}>${ssrInterpolate(formatNumber(video.viewCount))} görüntülenme</span><span class="badge badge-neutral whitespace-nowrap" data-v-ef3cb8c1${_scopeId2}>${ssrInterpolate(formatNumber(video.likeCount))} beğeni</span></div><div class="mt-3 flex flex-wrap gap-2" data-v-ef3cb8c1${_scopeId2}><a${ssrRenderAttr("href", `https://www.youtube.com/watch?v=${video.id}`)} target="_blank" class="btn btn-sm btn-primary" data-v-ef3cb8c1${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef3cb8c1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" data-v-ef3cb8c1${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ef3cb8c1${_scopeId2}></path></svg> İzle </a><button class="btn btn-sm btn-outline" data-v-ef3cb8c1${_scopeId2}>`);
                        if (isChecked(video.id)) {
                          _push3(`<svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ef3cb8c1${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-ef3cb8c1${_scopeId2}></path></svg>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        if (isChecked(video.id)) {
                          _push3(`<span data-v-ef3cb8c1${_scopeId2}>İzlendi</span>`);
                        } else {
                          _push3(`<span data-v-ef3cb8c1${_scopeId2}>İzlenmedi</span>`);
                        }
                        _push3(`</button></div></div></div></li>`);
                      });
                      _push3(`<!--]--></ul>`);
                    }
                    _push3(`<div class="flex justify-center overflow-x-auto p-4" data-v-ef3cb8c1${_scopeId2}><div class="join" data-v-ef3cb8c1${_scopeId2}><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="${ssrRenderClass([currentPage.value === 1 ? "btn-active" : "", "join-item btn btn-sm"])}" data-v-ef3cb8c1${_scopeId2}> 1 </button>`);
                    if (currentPage.value > 3) {
                      _push3(`<span class="join-item btn btn-sm btn-disabled" data-v-ef3cb8c1${_scopeId2}>...</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<!--[-->`);
                    ssrRenderList(visiblePages.value, (page) => {
                      _push3(`<button class="${ssrRenderClass([currentPage.value === page ? "btn-active" : "", "join-item btn btn-sm"])}" data-v-ef3cb8c1${_scopeId2}>${ssrInterpolate(page)}</button>`);
                    });
                    _push3(`<!--]-->`);
                    if (currentPage.value < totalPages.value - 2) {
                      _push3(`<span class="join-item btn btn-sm btn-disabled" data-v-ef3cb8c1${_scopeId2}>...</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (totalPages.value > 1) {
                      _push3(`<button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="${ssrRenderClass([currentPage.value === totalPages.value ? "btn-active" : "", "join-item btn btn-sm"])}" data-v-ef3cb8c1${_scopeId2}>${ssrInterpolate(totalPages.value)}</button>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div></div>`);
                  }
                } else {
                  return [
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4 p-4"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(3, (n) => {
                        return createVNode("div", {
                          key: n,
                          class: "flex animate-pulse items-center space-x-4"
                        }, [
                          createVNode("div", { class: "bg-base-200 h-28 w-40 flex-shrink-0 rounded-lg md:w-52" }),
                          createVNode("div", { class: "flex-1 space-y-4 py-1" }, [
                            createVNode("div", { class: "bg-base-200 h-4 w-3/4 rounded" }),
                            createVNode("div", { class: "bg-base-200 h-4 w-1/2 rounded" })
                          ])
                        ]);
                      }), 64))
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
                        class: "divide-base-200 divide-y"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(videos.value, (video) => {
                          return openBlock(), createBlock("li", {
                            key: video.id,
                            class: "hover:bg-base-100 p-4"
                          }, [
                            createVNode("div", { class: "flex flex-col md:flex-row md:items-center" }, [
                              createVNode("div", { class: "mb-3 h-auto w-full md:mb-0 md:h-28 md:w-40 lg:w-52" }, [
                                createVNode("img", {
                                  src: video.thumbnail,
                                  alt: "Video Thumbnail",
                                  class: "h-full w-full rounded-lg object-cover shadow-sm"
                                }, null, 8, ["src"])
                              ]),
                              createVNode("div", { class: "w-full md:px-6" }, [
                                createVNode("a", {
                                  href: `https://www.youtube.com/watch?v=${video.id}`,
                                  target: "_blank",
                                  class: "link link-hover link-primary text-base font-medium md:text-lg"
                                }, toDisplayString(video.title), 9, ["href"]),
                                createVNode("div", { class: "mt-2 flex flex-nowrap gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0" }, [
                                  createVNode("span", { class: "badge badge-neutral whitespace-nowrap" }, toDisplayString(video.duration), 1),
                                  createVNode("span", { class: "badge badge-neutral whitespace-nowrap" }, toDisplayString(formatNumber(video.viewCount)) + " görüntülenme", 1),
                                  createVNode("span", { class: "badge badge-neutral whitespace-nowrap" }, toDisplayString(formatNumber(video.likeCount)) + " beğeni", 1)
                                ]),
                                createVNode("div", { class: "mt-3 flex flex-wrap gap-2" }, [
                                  createVNode("a", {
                                    href: `https://www.youtube.com/watch?v=${video.id}`,
                                    target: "_blank",
                                    class: "btn btn-sm btn-primary"
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
                                    class: "btn btn-sm btn-outline",
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
                            class: ["join-item btn btn-sm", currentPage.value === 1 ? "btn-active" : ""]
                          }, " 1 ", 10, ["disabled", "onClick"]),
                          currentPage.value > 3 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "join-item btn btn-sm btn-disabled"
                          }, "...")) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(visiblePages.value, (page) => {
                            return openBlock(), createBlock("button", {
                              key: page,
                              onClick: ($event) => goToPage(page),
                              class: ["join-item btn btn-sm", currentPage.value === page ? "btn-active" : ""]
                            }, toDisplayString(page), 11, ["onClick"]);
                          }), 128)),
                          currentPage.value < totalPages.value - 2 ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: "join-item btn btn-sm btn-disabled"
                          }, "...")) : createCommentVNode("", true),
                          totalPages.value > 1 ? (openBlock(), createBlock("button", {
                            key: 2,
                            disabled: currentPage.value === totalPages.value,
                            onClick: ($event) => goToPage(totalPages.value),
                            class: ["join-item btn btn-sm", currentPage.value === totalPages.value ? "btn-active" : ""]
                          }, toDisplayString(totalPages.value), 11, ["disabled", "onClick"])) : createCommentVNode("", true)
                        ])
                      ])
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mb-5" }, [
                createVNode("div", { class: "flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0" }, [
                  createVNode(_sfc_main$2, { href: "/lessons" }),
                  createVNode("div", { class: "w-full sm:w-auto" }, [
                    createVNode("h2", { class: "text-primary truncate text-xl font-bold sm:text-2xl" }, toDisplayString(lesson.value.title), 1)
                  ])
                ]),
                createVNode(_sfc_main$3, { class: "card-compact mt-5 w-full shadow-md" }, {
                  default: withCtx(() => [
                    loading.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4 p-4"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(3, (n) => {
                        return createVNode("div", {
                          key: n,
                          class: "flex animate-pulse items-center space-x-4"
                        }, [
                          createVNode("div", { class: "bg-base-200 h-28 w-40 flex-shrink-0 rounded-lg md:w-52" }),
                          createVNode("div", { class: "flex-1 space-y-4 py-1" }, [
                            createVNode("div", { class: "bg-base-200 h-4 w-3/4 rounded" }),
                            createVNode("div", { class: "bg-base-200 h-4 w-1/2 rounded" })
                          ])
                        ]);
                      }), 64))
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
                        class: "divide-base-200 divide-y"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(videos.value, (video) => {
                          return openBlock(), createBlock("li", {
                            key: video.id,
                            class: "hover:bg-base-100 p-4"
                          }, [
                            createVNode("div", { class: "flex flex-col md:flex-row md:items-center" }, [
                              createVNode("div", { class: "mb-3 h-auto w-full md:mb-0 md:h-28 md:w-40 lg:w-52" }, [
                                createVNode("img", {
                                  src: video.thumbnail,
                                  alt: "Video Thumbnail",
                                  class: "h-full w-full rounded-lg object-cover shadow-sm"
                                }, null, 8, ["src"])
                              ]),
                              createVNode("div", { class: "w-full md:px-6" }, [
                                createVNode("a", {
                                  href: `https://www.youtube.com/watch?v=${video.id}`,
                                  target: "_blank",
                                  class: "link link-hover link-primary text-base font-medium md:text-lg"
                                }, toDisplayString(video.title), 9, ["href"]),
                                createVNode("div", { class: "mt-2 flex flex-nowrap gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0" }, [
                                  createVNode("span", { class: "badge badge-neutral whitespace-nowrap" }, toDisplayString(video.duration), 1),
                                  createVNode("span", { class: "badge badge-neutral whitespace-nowrap" }, toDisplayString(formatNumber(video.viewCount)) + " görüntülenme", 1),
                                  createVNode("span", { class: "badge badge-neutral whitespace-nowrap" }, toDisplayString(formatNumber(video.likeCount)) + " beğeni", 1)
                                ]),
                                createVNode("div", { class: "mt-3 flex flex-wrap gap-2" }, [
                                  createVNode("a", {
                                    href: `https://www.youtube.com/watch?v=${video.id}`,
                                    target: "_blank",
                                    class: "btn btn-sm btn-primary"
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
                                    class: "btn btn-sm btn-outline",
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
                            class: ["join-item btn btn-sm", currentPage.value === 1 ? "btn-active" : ""]
                          }, " 1 ", 10, ["disabled", "onClick"]),
                          currentPage.value > 3 ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "join-item btn btn-sm btn-disabled"
                          }, "...")) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(visiblePages.value, (page) => {
                            return openBlock(), createBlock("button", {
                              key: page,
                              onClick: ($event) => goToPage(page),
                              class: ["join-item btn btn-sm", currentPage.value === page ? "btn-active" : ""]
                            }, toDisplayString(page), 11, ["onClick"]);
                          }), 128)),
                          currentPage.value < totalPages.value - 2 ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: "join-item btn btn-sm btn-disabled"
                          }, "...")) : createCommentVNode("", true),
                          totalPages.value > 1 ? (openBlock(), createBlock("button", {
                            key: 2,
                            disabled: currentPage.value === totalPages.value,
                            onClick: ($event) => goToPage(totalPages.value),
                            class: ["join-item btn btn-sm", currentPage.value === totalPages.value ? "btn-active" : ""]
                          }, toDisplayString(totalPages.value), 11, ["disabled", "onClick"])) : createCommentVNode("", true)
                        ])
                      ])
                    ]))
                  ]),
                  _: 1
                })
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
const Screen = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ef3cb8c1"]]);
export {
  Screen as default
};
