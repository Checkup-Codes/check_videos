import{r as v,s as w,p as T}from"./ssr-DzRk3HnO.js";const u=new Map,L=50;function I(A,x){const h=v(!1),p=v(""),E=i=>{if(!i){p.value="";return}const m=i;if(u.has(m)){p.value=u.get(m);return}if(h.value){p.value=i;return}h.value=!0;try{const t=new DOMParser().parseFromString(i,"text/html"),C=e=>{if(e.nodeType===Node.TEXT_NODE){const d=/(https?:\/\/[^\/]+\/storage\/[^\s]+\.(png|jpg|jpeg|gif))/gi,l=e.textContent.match(d);if(l){const o=t.createDocumentFragment();let n=0;l.forEach(s=>{const a=e.textContent.indexOf(s,n);a>n&&o.appendChild(t.createTextNode(e.textContent.substring(n,a)));const c=t.createElement("img");c.src=s,c.alt="Content Image",c.style.maxWidth="100%",c.style.height="auto",c.style.display="block";const r=t.createElement("div");r.style.margin="0",r.style.padding="0",r.style.lineHeight="0",r.appendChild(c),o.appendChild(r),n=a+s.length}),n<e.textContent.length&&o.appendChild(t.createTextNode(e.textContent.substring(n))),e.parentNode.replaceChild(o,e)}}else e.nodeType===Node.ELEMENT_NODE&&Array.from(e.childNodes).forEach(C)};C(t.body),t.querySelectorAll("img").forEach((e,d)=>{const l=`content-img-${d}`;e.id=l,e.setAttribute("loading","lazy"),e.setAttribute("decoding","async"),e.setAttribute("importance","low"),!e.hasAttribute("width")&&!e.hasAttribute("height")&&(e.style.width="100%",e.style.maxWidth="800px",e.style.height="auto",e.style.aspectRatio="16/9");const o=t.createElement("div");o.className="img-skeleton-wrapper";const n=t.createElement("div");n.className="skeleton",n.id=`skeleton-${l}`;const s=e.parentNode;if(s){const a=t.createElement("div");a.className="img-wrapper",e.style.opacity="0",e.style.transition="opacity 0.3s ease-in-out",e.setAttribute("onload",`
            this.style.opacity = '1';
            const skeleton = document.getElementById('skeleton-${l}');
            if (skeleton) {
              skeleton.style.opacity = '0';
              setTimeout(() => skeleton.style.display = 'none', 300);
            }
          `),e.setAttribute("onerror",`
            const skeleton = document.getElementById('skeleton-${l}');
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
          `);const c=e.cloneNode(!0);a.appendChild(c),o.appendChild(n),o.appendChild(a);try{s.tagName.toLowerCase()==="p"?s.parentNode.replaceChild(o,s):(s.insertBefore(o,e),s.removeChild(e))}catch(r){console.error("DOM manipulation error:",r)}}}),t.querySelectorAll("li").forEach(e=>{e.hasAttribute("data-list")||(e.parentElement&&e.parentElement.tagName==="OL"?e.setAttribute("data-list","ordered"):e.setAttribute("data-list","bullet"));const d=e.querySelector(".ql-ui");d&&d.setAttribute("contenteditable","false")}),t.querySelectorAll("p").forEach(e=>{(e.innerHTML.trim()==="<br>"||e.innerHTML.trim()===""||!e.innerHTML.trim())&&(e.innerHTML="&nbsp;",e.style.marginBottom="1rem",e.style.height="1.5rem")}),t.querySelectorAll(".ql-code-block-container").forEach((e,d)=>{e.setAttribute("class","mockup-code");const l=t.createElement("div");l.className="code-header";const o=t.createElement("button");o.className="copy-btn",o.setAttribute("type","button"),o.setAttribute("title","Copy code"),o.innerHTML=`
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
        `),l.appendChild(o),e.appendChild(l);const n=e.querySelectorAll(".ql-code-block");if(n.length>0){const s=t.createElement("div");s.className="code-content",Array.from(n).forEach((a,c)=>{const r=t.createElement("div");r.className="code-line";const y=t.createElement("span");y.className="line-number",y.textContent=(c+1).toString().padStart(2,"0");const k=t.createElement("code");let f=a.textContent||a.innerText;f=f.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,'<span class="comment">$1</span>').replace(/\b(function|return|if|else|for|while|var|let|const|class|import|export|default|from|async|await)\b/g,'<span class="keyword">$1</span>').replace(/(['"`])(.*?)\1/g,'<span class="string">$1$2$1</span>').replace(/\b(\d+(\.\d+)?)\b/g,'<span class="number">$1</span>').replace(/\b([a-zA-Z_]\w*)\s*\(/g,'<span class="function">$1</span>(').replace(/([+\-*/%=<>!&|])/g,'<span class="operator">$1</span>'),k.innerHTML=f,r.appendChild(y),r.appendChild(k),s.appendChild(r)}),e.innerHTML="",e.appendChild(l),e.appendChild(s)}}),t.querySelectorAll('[style*="color"], [style*="background-color"]').forEach(e=>{e.style.color&&e.classList.add("quill-colored-text"),e.style.backgroundColor&&e.classList.add("quill-colored-background")});const b=t.body.innerHTML;if(u.size>=L){const e=u.keys().next().value;u.delete(e)}u.set(m,b),p.value=b,h.value=!1}catch(g){console.error("Error processing content:",g),p.value=i,h.value=!1}};return w(x,i=>{E(i)},{immediate:!0}),T(()=>p.value)}export{I as u};
