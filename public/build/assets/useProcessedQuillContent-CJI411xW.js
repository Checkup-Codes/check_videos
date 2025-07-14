import{i as y}from"./app-Bzk6KU4a.js";function T(g,u){return y(()=>{if(!u.value)return"";const t=new DOMParser().parseFromString(u.value,"text/html"),h=e=>{if(e.nodeType===Node.TEXT_NODE){const i=/(https?:\/\/[^\/]+\/storage\/[^\s]+\.(png|jpg|jpeg|gif))/gi,s=e.textContent.match(i);if(s){const o=t.createDocumentFragment();let n=0;s.forEach(l=>{const a=e.textContent.indexOf(l,n);a>n&&o.appendChild(t.createTextNode(e.textContent.substring(n,a)));const c=t.createElement("img");c.src=l,c.alt="Content Image",c.style.maxWidth="100%",c.style.height="auto",c.style.display="block";const r=t.createElement("div");r.style.margin="0",r.style.padding="0",r.style.lineHeight="0",r.appendChild(c),o.appendChild(r),n=a+l.length}),n<e.textContent.length&&o.appendChild(t.createTextNode(e.textContent.substring(n))),e.parentNode.replaceChild(o,e)}}else e.nodeType===Node.ELEMENT_NODE&&Array.from(e.childNodes).forEach(h)};return h(t.body),t.querySelectorAll("img").forEach((e,i)=>{const s=`content-img-${i}`;e.id=s,e.setAttribute("loading","lazy"),e.setAttribute("decoding","async"),e.setAttribute("importance","low"),!e.hasAttribute("width")&&!e.hasAttribute("height")&&(e.style.width="100%",e.style.maxWidth="800px",e.style.height="auto",e.style.aspectRatio="16/9");const o=t.createElement("div");o.className="img-skeleton-wrapper";const n=t.createElement("div");n.className="skeleton",n.id=`skeleton-${s}`;const l=e.parentNode;if(l){const a=t.createElement("div");a.className="img-wrapper",e.style.opacity="0",e.style.transition="opacity 0.3s ease-in-out",e.setAttribute("onload",`
          this.style.opacity = '1';
          const skeleton = document.getElementById('skeleton-${s}');
          if (skeleton) {
            skeleton.style.opacity = '0';
            setTimeout(() => skeleton.style.display = 'none', 300);
          }
        `),e.setAttribute("onerror",`
          const skeleton = document.getElementById('skeleton-${s}');
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
        `);const c=e.cloneNode(!0);a.appendChild(c),o.appendChild(n),o.appendChild(a);try{l.tagName.toLowerCase()==="p"?l.parentNode.replaceChild(o,l):(l.insertBefore(o,e),l.removeChild(e))}catch(r){console.error("DOM manipulation error:",r)}}}),t.querySelectorAll("li").forEach(e=>{e.hasAttribute("data-list")||(e.parentElement&&e.parentElement.tagName==="OL"?e.setAttribute("data-list","ordered"):e.setAttribute("data-list","bullet"));const i=e.querySelector(".ql-ui");i&&i.setAttribute("contenteditable","false")}),t.querySelectorAll("p").forEach(e=>{(e.innerHTML.trim()==="<br>"||e.innerHTML.trim()===""||!e.innerHTML.trim())&&(e.innerHTML="&nbsp;",e.style.marginBottom="1rem",e.style.height="1.5rem")}),t.querySelectorAll(".ql-code-block-container").forEach((e,i)=>{e.setAttribute("class","mockup-code");const s=t.createElement("div");s.className="code-header",console.log("Creating copy button");const o=t.createElement("button");o.className="copy-btn",o.setAttribute("type","button"),o.setAttribute("title","Copy code"),o.innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span>Copy</span>
      `,o.setAttribute("onclick",`
        console.log('Copy button clicked');
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
      `),console.log("Adding copy button to header"),s.appendChild(o),console.log("Copy button added successfully"),e.appendChild(s);const n=e.querySelectorAll(".ql-code-block");if(n.length>0){const l=t.createElement("div");l.className="code-content",Array.from(n).forEach((a,c)=>{const r=t.createElement("div");r.className="code-line";const d=t.createElement("span");d.className="line-number",d.textContent=(c+1).toString().padStart(2,"0");const m=t.createElement("code");let p=a.textContent||a.innerText;p=p.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,'<span class="comment">$1</span>').replace(/\b(function|return|if|else|for|while|var|let|const|class|import|export|default|from|async|await)\b/g,'<span class="keyword">$1</span>').replace(/(['"`])(.*?)\1/g,'<span class="string">$1$2$1</span>').replace(/\b(\d+(\.\d+)?)\b/g,'<span class="number">$1</span>').replace(/\b([a-zA-Z_]\w*)\s*\(/g,'<span class="function">$1</span>(').replace(/([+\-*/%=<>!&|])/g,'<span class="operator">$1</span>'),m.innerHTML=p,r.appendChild(d),r.appendChild(m),l.appendChild(r)}),e.innerHTML="",e.appendChild(s),e.appendChild(l)}}),t.querySelectorAll('[style*="color"], [style*="background-color"]').forEach(e=>{e.style.color&&e.classList.add("quill-colored-text"),e.style.backgroundColor&&e.classList.add("quill-colored-background")}),t.body.innerHTML})}export{T as u};
