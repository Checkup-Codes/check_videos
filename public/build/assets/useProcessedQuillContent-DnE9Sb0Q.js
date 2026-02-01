import"./app-D89HnukT.js";import{g as T,y as M,b as q}from"./ssr-BnCI734g.js";const w=new Map,I=50;let B=0;function A(n){if(!n||n.nodeType!==Node.ELEMENT_NODE)return!1;if(n.classList&&n.classList.contains("img-skeleton-wrapper"))return!0;if(n.tagName==="P"){const i=n.children;if(i.length===1&&i[0].tagName==="IMG"||i.length===1&&i[0].classList&&i[0].classList.contains("img-skeleton-wrapper"))return!0}if(n.tagName==="DIV"&&!n.classList.contains("image-slider-container")){const i=n.querySelector("img"),s=n.textContent.trim();if(i&&s==="")return!0}return!1}function H(n){return n.querySelector("img")}function $(n){const i=n.body,s=Array.from(i.childNodes);let o=0;for(;o<s.length;){const h=s[o];if(h.nodeType!==Node.ELEMENT_NODE){o++;continue}if(A(h)){const l=[h];let c=o+1;for(;c<s.length;){const r=s[c];if(r.nodeType===Node.TEXT_NODE&&r.textContent.trim()===""){c++;continue}if(r.nodeType===Node.ELEMENT_NODE&&A(r))l.push(r),c++;else break}if(l.length>=2){const r=j(n,l);i.insertBefore(r,l[0]),l.forEach(t=>{t.parentNode===i&&i.removeChild(t)}),s.splice(o,l.length,r)}}o++}}function j(n,i){const s=`image-slider-${B++}`,o=n.createElement("div");o.className="image-slider-container",o.id=s;const h=n.createElement("div");h.className="image-slider-slides",i.forEach((C,b)=>{const m=n.createElement("div");m.className="image-slider-slide",m.setAttribute("data-index",b.toString()),b===0&&m.classList.add("active");const k=H(C);if(k){const g=k.cloneNode(!0);g.style.opacity="1",g.style.width="auto",g.style.maxWidth="100%",g.style.height="auto",g.style.maxHeight="500px",g.style.objectFit="contain",g.style.margin="0 auto",g.style.display="block",g.removeAttribute("onload"),g.removeAttribute("onerror"),m.appendChild(g)}h.appendChild(m)}),o.appendChild(h);const l=n.createElement("button");l.className="image-slider-btn image-slider-prev",l.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>',l.setAttribute("onclick",`window.imageSliderNav('${s}', -1)`),l.setAttribute("type","button");const c=n.createElement("button");c.className="image-slider-btn image-slider-next",c.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>',c.setAttribute("onclick",`window.imageSliderNav('${s}', 1)`),c.setAttribute("type","button"),o.appendChild(l),o.appendChild(c);const r=n.createElement("div");r.className="image-slider-dots",i.forEach((C,b)=>{const m=n.createElement("button");m.className="image-slider-dot",m.setAttribute("type","button"),b===0&&m.classList.add("active"),m.setAttribute("onclick",`window.imageSliderGoTo('${s}', ${b})`),r.appendChild(m)}),o.appendChild(r);const t=n.createElement("div");return t.className="image-slider-counter",t.innerHTML=`<span class="current">1</span> / <span class="total">${i.length}</span>`,o.appendChild(t),o}typeof window<"u"&&(window.imageSliderNav=function(n,i){const s=document.getElementById(n);if(!s)return;const o=s.querySelectorAll(".image-slider-slide"),h=s.querySelectorAll(".image-slider-dot"),l=s.querySelector(".image-slider-counter .current");let c=0;o.forEach((t,C)=>{t.classList.contains("active")&&(c=C)});let r=c+i;r<0&&(r=o.length-1),r>=o.length&&(r=0),o.forEach((t,C)=>{t.classList.toggle("active",C===r)}),h.forEach((t,C)=>{t.classList.toggle("active",C===r)}),l&&(l.textContent=(r+1).toString())},window.imageSliderGoTo=function(n,i){const s=document.getElementById(n);if(!s)return;const o=s.querySelectorAll(".image-slider-slide"),h=s.querySelectorAll(".image-slider-dot"),l=s.querySelector(".image-slider-counter .current");o.forEach((c,r)=>{c.classList.toggle("active",r===i)}),h.forEach((c,r)=>{c.classList.toggle("active",r===i)}),l&&(l.textContent=(i+1).toString())});function _(n,i){const s=T(!1),o=T(""),h=l=>{if(!l){o.value="";return}const c=l;if(w.has(c)){o.value=w.get(c);return}if(s.value){o.value=l;return}s.value=!0;try{const t=new DOMParser().parseFromString(l,"text/html"),C=e=>{if(e.nodeType===Node.TEXT_NODE){const E=/(https?:\/\/[^\/]+\/storage\/[^\s]+\.(png|jpg|jpeg|gif))/gi,d=e.textContent.match(E);if(d){const a=t.createDocumentFragment();let p=0;d.forEach(u=>{const f=e.textContent.indexOf(u,p);f>p&&a.appendChild(t.createTextNode(e.textContent.substring(p,f)));const v=t.createElement("img");v.src=u,v.alt="Content Image",v.style.maxWidth="100%",v.style.height="auto",v.style.display="block";const y=t.createElement("div");y.style.margin="0",y.style.padding="0",y.style.lineHeight="0",y.appendChild(v),a.appendChild(y),p=f+u.length}),p<e.textContent.length&&a.appendChild(t.createTextNode(e.textContent.substring(p))),e.parentNode.replaceChild(a,e)}}else e.nodeType===Node.ELEMENT_NODE&&Array.from(e.childNodes).forEach(C)};C(t.body),t.querySelectorAll("img").forEach((e,E)=>{const d=`content-img-${E}`;e.id=d,e.setAttribute("loading","lazy"),e.setAttribute("decoding","async"),e.setAttribute("importance","low"),!e.hasAttribute("width")&&!e.hasAttribute("height")&&(e.style.width="100%",e.style.maxWidth="800px",e.style.height="auto",e.style.objectFit="contain");const a=t.createElement("div");a.className="img-skeleton-wrapper";const p=t.createElement("div");p.className="skeleton",p.id=`skeleton-${d}`;const u=e.parentNode;if(u){const f=t.createElement("div");f.className="img-wrapper",e.style.opacity="0",e.style.transition="opacity 0.3s ease-in-out",e.setAttribute("onload",`
            this.style.opacity = '1';
            const skeleton = document.getElementById('skeleton-${d}');
            if (skeleton) {
              skeleton.style.opacity = '0';
              setTimeout(() => skeleton.style.display = 'none', 300);
            }
          `),e.setAttribute("onerror",`
            const skeleton = document.getElementById('skeleton-${d}');
            if (skeleton) {
              skeleton.style.display = 'none';
              skeleton.insertAdjacentHTML('afterend', 
                '<div class="image-error">' +
                '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">' +
                '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>' +
                '</svg>' +
                '<span>Image failed to load</span>' +
                '</div>'
              );
            }
            this.style.display = 'none';
          `);const v=e.cloneNode(!0);f.appendChild(v),a.appendChild(p),a.appendChild(f);try{u.tagName.toLowerCase()==="p"?u.parentNode.replaceChild(a,u):(u.insertBefore(a,e),u.removeChild(e))}catch(y){console.error("DOM manipulation error:",y)}}}),$(t),t.querySelectorAll("li").forEach(e=>{e.hasAttribute("data-list")||(e.parentElement&&e.parentElement.tagName==="OL"?e.setAttribute("data-list","ordered"):e.setAttribute("data-list","bullet"));const E=e.querySelector(".ql-ui");E&&E.setAttribute("contenteditable","false")}),t.querySelectorAll("p").forEach(e=>{(e.innerHTML.trim()==="<br>"||e.innerHTML.trim()===""||!e.innerHTML.trim())&&(e.innerHTML="&nbsp;",e.style.marginBottom="1rem",e.style.height="1.5rem")}),t.querySelectorAll(".ql-code-block-container").forEach((e,E)=>{e.setAttribute("class","mockup-code");const d=t.createElement("div");d.className="code-header";const a=t.createElement("button");a.className="copy-btn",a.setAttribute("type","button"),a.setAttribute("title","Copy code"),a.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        `,a.setAttribute("onclick",`
          const codeBlock = this.closest('.mockup-code');
          let textToCopy = '';
          
          // Try to get text from pre element first
          const preElement = codeBlock.querySelector('pre');
          if (preElement) {
            textToCopy = preElement.textContent;
          }
          
          // If no pre element, try getting from code lines
          if (!textToCopy) {
            const codeLines = codeBlock.querySelectorAll('.code-line code');
            if (codeLines.length > 0) {
              textToCopy = Array.from(codeLines)
                .map(line => line.textContent)
                .join('\\n');
            }
          }
          
          // If still no text, try getting from original Quill blocks
          if (!textToCopy) {
            const quillBlocks = codeBlock.querySelectorAll('.ql-code-block');
            if (quillBlocks.length > 0) {
              textToCopy = Array.from(quillBlocks)
                .map(block => block.textContent)
                .join('\\n');
            }
          }
          
          if (textToCopy) {
            navigator.clipboard.writeText(textToCopy.trim()).then(() => {
              const originalHTML = this.innerHTML;
              this.classList.add('copied');
              this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><span>Copied!</span>';
              setTimeout(() => {
                this.classList.remove('copied');
                this.innerHTML = originalHTML;
              }, 2000);
            });
          }
        `),d.appendChild(a),e.appendChild(d);const p=e.querySelectorAll(".ql-code-block");if(p.length>0){const u=t.createElement("div");u.className="code-content",Array.from(p).forEach((f,v)=>{const y=t.createElement("div");y.className="code-line";const x=t.createElement("span");x.className="line-number",x.textContent=(v+1).toString().padStart(2,"0");const L=t.createElement("code");let S=f.textContent||f.innerText;L.textContent=S,y.appendChild(x),y.appendChild(L),u.appendChild(y)}),e.innerHTML="",e.appendChild(d),e.appendChild(u)}}),t.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((e,E)=>{if(!e.id){const f=e.textContent.trim().toLowerCase().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").substring(0,50);e.id=f||`heading-${E}`}const d=t.createElement("div");d.className="heading-wrapper",d.style.position="relative";const a=t.createElement("a");a.href=`#${e.id}`,a.className="heading-anchor",a.setAttribute("aria-label","Link to heading"),a.innerHTML="#";const p=e.cloneNode(!0);d.appendChild(a),d.appendChild(p),e.parentNode.replaceChild(d,e)}),t.querySelectorAll('[style*="color"], [style*="background-color"]').forEach(e=>{e.style.color&&e.classList.add("quill-colored-text"),e.style.backgroundColor&&e.classList.add("quill-colored-background")});const N=t.body.innerHTML;if(w.size>=I){const e=w.keys().next().value;w.delete(e)}w.set(c,N),o.value=N,s.value=!1}catch(r){console.error("Error processing content:",r),o.value=l,s.value=!1}};return M(i,l=>{h(l)},{immediate:!0}),q(()=>o.value)}export{_ as u};
