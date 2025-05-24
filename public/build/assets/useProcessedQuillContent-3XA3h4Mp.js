import{i as h}from"./app-DSsJyxyl.js";function E(y,u){return h(()=>{if(!u.value)return"";const t=new DOMParser().parseFromString(u.value,"text/html");return t.querySelectorAll("img").forEach((e,c)=>{const r=`content-img-${c}`;e.id=r,e.setAttribute("loading","lazy"),e.setAttribute("decoding","async"),e.setAttribute("importance","low"),!e.hasAttribute("width")&&!e.hasAttribute("height")&&(e.setAttribute("width","800"),e.setAttribute("height","600"));const o=t.createElement("div");o.className="img-skeleton-wrapper relative",o.style.width="100%",o.style.marginBottom="1rem",o.style.marginTop="1rem";const s=t.createElement("div");s.className="skeleton img-skeleton absolute inset-0 h-full w-full rounded-lg",s.id=`skeleton-${r}`;const i=e.parentNode;if(i){const d=t.createElement("div");d.className="img-wrapper relative",d.style.width="100%",e.style.opacity="0",e.style.transition="opacity 0.3s ease-in-out",e.setAttribute("onload",`this.style.opacity = '1'; const skeleton = document.getElementById('skeleton-${r}'); if (skeleton) skeleton.style.display = 'none';`),e.setAttribute("onerror",`const skeleton = document.getElementById('skeleton-${r}'); if (skeleton) { skeleton.style.display = 'none'; skeleton.insertAdjacentHTML('afterend', '<div class='text-error text-sm py-2'>Image failed to load</div>'); } this.style.display = 'none';`);const l=e.cloneNode(!0);d.appendChild(l),o.appendChild(s),o.appendChild(d);try{i.insertBefore(o,e),i.removeChild(e)}catch(m){console.error("DOM manipulation error:",m)}}}),t.querySelectorAll("li").forEach(e=>{e.hasAttribute("data-list")||(e.parentElement&&e.parentElement.tagName==="OL"?e.setAttribute("data-list","ordered"):e.setAttribute("data-list","bullet"));const c=e.querySelector(".ql-ui");c&&c.setAttribute("contenteditable","false")}),t.querySelectorAll("p").forEach(e=>{(e.innerHTML.trim()==="<br>"||e.innerHTML.trim()===""||!e.innerHTML.trim())&&(e.innerHTML="&nbsp;",e.style.marginBottom="1rem",e.style.height="1.5rem")}),t.querySelectorAll(".ql-code-block-container").forEach((e,c)=>{e.setAttribute("class","mockup-code bg-base-200/70 text-base-content shadow-lg relative"),e.style.margin="2rem 0",e.style.padding="1rem 0 0.5rem 0",e.style.borderRadius="0.75rem",e.style.position="relative",e.style.overflow="hidden",e.style.border="1px solid rgba(0, 0, 0, 0.1)",e.style.boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";const r=t.createElement("div");r.className="absolute top-2 right-3 flex items-center gap-2 px-1 py-0.5 rounded bg-base-100/50 backdrop-blur-sm";const o=t.createElement("button");o.className="opacity-40 hover:opacity-100 transition-all duration-200 flex items-center gap-1 text-xs",o.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span class="hidden group-hover:inline">Copy</span>
      `,o.setAttribute("onclick",`
        const text = this.parentElement.parentElement.querySelector('pre').textContent;
        navigator.clipboard.writeText(text.replace(/\\d+/g, '')).then(() => {
          const originalHTML = this.innerHTML;
          this.innerHTML = '<span class="flex items-center gap-1 text-success"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><span>Copied!</span></span>';
          setTimeout(() => {
            this.innerHTML = originalHTML;
          }, 1000);
        });
      `);const s=t.createElement("div");s.className="opacity-40 font-mono flex items-center gap-1 text-xs",s.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        <span>Code</span>
      `,r.appendChild(o),r.appendChild(s),e.appendChild(r);const i=t.createElement("style");i.textContent=`
        .mockup-code pre code {
          border: none !important;
          background: none !important;
          box-shadow: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .mockup-code pre {
          border: none !important;
          background: none !important;
          box-shadow: none !important;
        }
        .mockup-code pre[data-prefix]:before {
          content: none !important;
        }
        .mockup-code .ql-code-block {
          border: none !important;
          background: none !important;
          box-shadow: none !important;
        }
        .ql-editor blockquote {
          background-color: hsl(var(--b2, 0 0% 93%)) !important;
          border-left: 4px solid hsl(var(--p)) !important;
          padding: 1rem !important;
          margin: 1.5rem 0 !important;
          border-radius: 0.5rem !important;
          font-style: italic !important;
          color: hsl(var(--bc)) !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
        }
        .ql-editor blockquote p {
          margin: 0 !important;
        }
        [data-theme='dark'] .ql-editor blockquote {
          background-color: hsl(var(--b2, 215 28% 17%)) !important;
          color: hsl(var(--bc)) !important;
        }
      `,e.appendChild(i);const d=e.querySelectorAll(".ql-code-block");if(d.length>0){e.innerHTML="",e.appendChild(i),e.appendChild(r);const l=t.createElement("pre");l.style.margin="0",l.style.padding="0",l.style.backgroundColor="transparent",l.style.border="none",l.style.boxShadow="none",Array.from(d).forEach((m,b)=>{const a=t.createElement("pre");a.className="group px-4 py-1 border-l-4 border-transparent hover:bg-base-300/50 hover:border-primary/40 transition-all duration-200",a.style.margin="0",a.style.fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",a.style.border="none",a.style.boxShadow="none";const n=t.createElement("code");n.style.fontFamily="inherit",n.style.color="inherit",n.style.padding="0 0 0 0.5rem",n.style.border="none",n.style.background="none",n.style.boxShadow="none",n.style.whiteSpace="pre-wrap",n.style.wordBreak="break-word",n.textContent=m.textContent||m.innerText;const p=t.createElement("span");p.className="inline-block w-4 mr-3 text-base-content/20 group-hover:text-base-content/30 select-none transition-colors duration-200",p.style.fontSize="0.75em",p.style.fontWeight="300",p.textContent=(b+1).toString().padStart(2,"0"),a.insertBefore(p,a.firstChild),a.appendChild(n),l.appendChild(a)}),e.appendChild(l)}}),t.querySelectorAll('[style*="color"], [style*="background-color"]').forEach(e=>{e.style.color&&e.classList.add("quill-colored-text"),e.style.backgroundColor&&e.classList.add("quill-colored-background")}),t.body.innerHTML})}export{E as u};
