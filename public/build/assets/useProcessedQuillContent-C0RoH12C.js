import"./app--BojfMby.js";import{e as k,y as T,p as L}from"./ssr-CVKOEYhR.js";const h=new Map,w=50;function j(A,v){const u=k(!1),p=k(""),b=d=>{if(!d){p.value="";return}const m=d;if(h.has(m)){p.value=h.get(m);return}if(u.value){p.value=d;return}u.value=!0;try{const t=new DOMParser().parseFromString(d,"text/html"),g=e=>{if(e.nodeType===Node.TEXT_NODE){const c=/(https?:\/\/[^\/]+\/storage\/[^\s]+\.(png|jpg|jpeg|gif))/gi,n=e.textContent.match(c);if(n){const o=t.createDocumentFragment();let l=0;n.forEach(s=>{const r=e.textContent.indexOf(s,l);r>l&&o.appendChild(t.createTextNode(e.textContent.substring(l,r)));const i=t.createElement("img");i.src=s,i.alt="Content Image",i.style.maxWidth="100%",i.style.height="auto",i.style.display="block";const a=t.createElement("div");a.style.margin="0",a.style.padding="0",a.style.lineHeight="0",a.appendChild(i),o.appendChild(a),l=r+s.length}),l<e.textContent.length&&o.appendChild(t.createTextNode(e.textContent.substring(l))),e.parentNode.replaceChild(o,e)}}else e.nodeType===Node.ELEMENT_NODE&&Array.from(e.childNodes).forEach(g)};g(t.body),t.querySelectorAll("img").forEach((e,c)=>{const n=`content-img-${c}`;e.id=n,e.setAttribute("loading","lazy"),e.setAttribute("decoding","async"),e.setAttribute("importance","low"),!e.hasAttribute("width")&&!e.hasAttribute("height")&&(e.style.width="100%",e.style.maxWidth="800px",e.style.height="auto",e.style.aspectRatio="16/9");const o=t.createElement("div");o.className="img-skeleton-wrapper";const l=t.createElement("div");l.className="skeleton",l.id=`skeleton-${n}`;const s=e.parentNode;if(s){const r=t.createElement("div");r.className="img-wrapper",e.style.opacity="0",e.style.transition="opacity 0.3s ease-in-out",e.setAttribute("onload",`
            this.style.opacity = '1';
            const skeleton = document.getElementById('skeleton-${n}');
            if (skeleton) {
              skeleton.style.opacity = '0';
              setTimeout(() => skeleton.style.display = 'none', 300);
            }
          `),e.setAttribute("onerror",`
            const skeleton = document.getElementById('skeleton-${n}');
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
          `);const i=e.cloneNode(!0);r.appendChild(i),o.appendChild(l),o.appendChild(r);try{s.tagName.toLowerCase()==="p"?s.parentNode.replaceChild(o,s):(s.insertBefore(o,e),s.removeChild(e))}catch(a){console.error("DOM manipulation error:",a)}}}),t.querySelectorAll("li").forEach(e=>{e.hasAttribute("data-list")||(e.parentElement&&e.parentElement.tagName==="OL"?e.setAttribute("data-list","ordered"):e.setAttribute("data-list","bullet"));const c=e.querySelector(".ql-ui");c&&c.setAttribute("contenteditable","false")}),t.querySelectorAll("p").forEach(e=>{(e.innerHTML.trim()==="<br>"||e.innerHTML.trim()===""||!e.innerHTML.trim())&&(e.innerHTML="&nbsp;",e.style.marginBottom="1rem",e.style.height="1.5rem")}),t.querySelectorAll(".ql-code-block-container").forEach((e,c)=>{e.setAttribute("class","mockup-code");const n=t.createElement("div");n.className="code-header";const o=t.createElement("button");o.className="copy-btn",o.setAttribute("type","button"),o.setAttribute("title","Copy code"),o.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        `,o.setAttribute("onclick",`
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
        `),n.appendChild(o),e.appendChild(n);const l=e.querySelectorAll(".ql-code-block");if(l.length>0){const s=t.createElement("div");s.className="code-content",Array.from(l).forEach((r,i)=>{const a=t.createElement("div");a.className="code-line";const y=t.createElement("span");y.className="line-number",y.textContent=(i+1).toString().padStart(2,"0");const x=t.createElement("code");let E=r.textContent||r.innerText;x.textContent=E,a.appendChild(y),a.appendChild(x),s.appendChild(a)}),e.innerHTML="",e.appendChild(n),e.appendChild(s)}}),t.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((e,c)=>{if(!e.id){const r=e.textContent.trim().toLowerCase().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").substring(0,50);e.id=r||`heading-${c}`}const n=t.createElement("div");n.className="heading-wrapper",n.style.position="relative";const o=t.createElement("a");o.href=`#${e.id}`,o.className="heading-anchor",o.setAttribute("aria-label","Link to heading"),o.innerHTML="#";const l=e.cloneNode(!0);n.appendChild(o),n.appendChild(l),e.parentNode.replaceChild(n,e)}),t.querySelectorAll('[style*="color"], [style*="background-color"]').forEach(e=>{e.style.color&&e.classList.add("quill-colored-text"),e.style.backgroundColor&&e.classList.add("quill-colored-background")});const C=t.body.innerHTML;if(h.size>=w){const e=h.keys().next().value;h.delete(e)}h.set(m,C),p.value=C,u.value=!1}catch(f){console.error("Error processing content:",f),p.value=d,u.value=!1}};return T(v,d=>{b(d)},{immediate:!0}),L(()=>p.value)}export{j as u};
