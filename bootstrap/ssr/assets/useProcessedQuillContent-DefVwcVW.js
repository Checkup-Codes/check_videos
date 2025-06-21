import { computed } from "vue";
function useProcessedQuillContent(contentRef, contentString) {
  return computed(() => {
    if (!contentString.value) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentString.value, "text/html");
    const findAndReplaceImageUrls = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const urlRegex = /(https?:\/\/[^\/]+\/storage\/[^\s]+\.(png|jpg|jpeg|gif))/gi;
        const matches = node.textContent.match(urlRegex);
        if (matches) {
          const fragment = doc.createDocumentFragment();
          let lastIndex = 0;
          matches.forEach((url) => {
            const startIndex = node.textContent.indexOf(url, lastIndex);
            if (startIndex > lastIndex) {
              fragment.appendChild(doc.createTextNode(node.textContent.substring(lastIndex, startIndex)));
            }
            const img = doc.createElement("img");
            img.src = url;
            img.alt = "Content Image";
            img.style.maxWidth = "100%";
            img.style.height = "auto";
            img.style.display = "block";
            const wrapper = doc.createElement("div");
            wrapper.style.margin = "0";
            wrapper.style.padding = "0";
            wrapper.style.lineHeight = "0";
            wrapper.appendChild(img);
            fragment.appendChild(wrapper);
            lastIndex = startIndex + url.length;
          });
          if (lastIndex < node.textContent.length) {
            fragment.appendChild(doc.createTextNode(node.textContent.substring(lastIndex)));
          }
          node.parentNode.replaceChild(fragment, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(findAndReplaceImageUrls);
      }
    };
    findAndReplaceImageUrls(doc.body);
    const images = doc.querySelectorAll("img");
    images.forEach((img, index) => {
      const imageId = `content-img-${index}`;
      img.id = imageId;
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
      img.setAttribute("importance", "low");
      if (!img.hasAttribute("width") && !img.hasAttribute("height")) {
        img.style.width = "100%";
        img.style.maxWidth = "800px";
        img.style.height = "auto";
        img.style.aspectRatio = "16/9";
      }
      const skeletonWrapper = doc.createElement("div");
      skeletonWrapper.className = "img-skeleton-wrapper";
      const skeleton = doc.createElement("div");
      skeleton.className = "skeleton";
      skeleton.id = `skeleton-${imageId}`;
      const imgParent = img.parentNode;
      if (imgParent) {
        const imgWrapper = doc.createElement("div");
        imgWrapper.className = "img-wrapper";
        img.style.opacity = "0";
        img.style.transition = "opacity 0.3s ease-in-out";
        img.setAttribute(
          "onload",
          `
          this.style.opacity = '1';
          const skeleton = document.getElementById('skeleton-${imageId}');
          if (skeleton) {
            skeleton.style.opacity = '0';
            setTimeout(() => skeleton.style.display = 'none', 300);
          }
        `
        );
        img.setAttribute(
          "onerror",
          `
          const skeleton = document.getElementById('skeleton-${imageId}');
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
        `
        );
        const imgClone = img.cloneNode(true);
        imgWrapper.appendChild(imgClone);
        skeletonWrapper.appendChild(skeleton);
        skeletonWrapper.appendChild(imgWrapper);
        try {
          if (imgParent.tagName.toLowerCase() === "p") {
            imgParent.parentNode.replaceChild(skeletonWrapper, imgParent);
          } else {
            imgParent.insertBefore(skeletonWrapper, img);
            imgParent.removeChild(img);
          }
        } catch (error) {
          console.error("DOM manipulation error:", error);
        }
      }
    });
    const listItems = doc.querySelectorAll("li");
    listItems.forEach((item) => {
      if (!item.hasAttribute("data-list")) {
        if (item.parentElement && item.parentElement.tagName === "OL") {
          item.setAttribute("data-list", "ordered");
        } else {
          item.setAttribute("data-list", "bullet");
        }
      }
      const qlUi = item.querySelector(".ql-ui");
      if (qlUi) {
        qlUi.setAttribute("contenteditable", "false");
      }
    });
    const paragraphs = doc.querySelectorAll("p");
    paragraphs.forEach((p) => {
      if (p.innerHTML.trim() === "<br>" || p.innerHTML.trim() === "" || !p.innerHTML.trim()) {
        p.innerHTML = "&nbsp;";
        p.style.marginBottom = "1rem";
        p.style.height = "1.5rem";
      }
    });
    const codeBlocks = doc.querySelectorAll(".ql-code-block-container");
    codeBlocks.forEach((container, blockIndex) => {
      container.setAttribute("class", "mockup-code");
      const headerBar = doc.createElement("div");
      headerBar.className = "code-header";
      console.log("Creating copy button");
      const copyButton = doc.createElement("button");
      copyButton.className = "copy-btn";
      copyButton.setAttribute("type", "button");
      copyButton.setAttribute("title", "Copy code");
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span>Copy</span>
      `;
      copyButton.setAttribute(
        "onclick",
        `
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
      `
      );
      console.log("Adding copy button to header");
      headerBar.appendChild(copyButton);
      console.log("Copy button added successfully");
      container.appendChild(headerBar);
      const codeLines = container.querySelectorAll(".ql-code-block");
      if (codeLines.length > 0) {
        const codeContent = doc.createElement("div");
        codeContent.className = "code-content";
        Array.from(codeLines).forEach((line, index) => {
          const codeLine = doc.createElement("div");
          codeLine.className = "code-line";
          const lineNumber = doc.createElement("span");
          lineNumber.className = "line-number";
          lineNumber.textContent = (index + 1).toString().padStart(2, "0");
          const code = doc.createElement("code");
          let content = line.textContent || line.innerText;
          content = content.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="comment">$1</span>').replace(
            /\b(function|return|if|else|for|while|var|let|const|class|import|export|default|from|async|await)\b/g,
            '<span class="keyword">$1</span>'
          ).replace(/(['"`])(.*?)\1/g, '<span class="string">$1$2$1</span>').replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>').replace(/\b([a-zA-Z_]\w*)\s*\(/g, '<span class="function">$1</span>(').replace(/([+\-*/%=<>!&|])/g, '<span class="operator">$1</span>');
          code.innerHTML = content;
          codeLine.appendChild(lineNumber);
          codeLine.appendChild(code);
          codeContent.appendChild(codeLine);
        });
        container.innerHTML = "";
        container.appendChild(headerBar);
        container.appendChild(codeContent);
      }
    });
    const styledElements = doc.querySelectorAll('[style*="color"], [style*="background-color"]');
    styledElements.forEach((el) => {
      if (el.style.color) {
        el.classList.add("quill-colored-text");
      }
      if (el.style.backgroundColor) {
        el.classList.add("quill-colored-background");
      }
    });
    return doc.body.innerHTML;
  });
}
export {
  useProcessedQuillContent as u
};
