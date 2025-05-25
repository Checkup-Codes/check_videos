import { ref, watch } from "vue";
import hljs from "highlight.js";
function useHighlight(element) {
  if (!element) return;
  const codeBlocks = element.querySelectorAll("pre code");
  codeBlocks.forEach((block) => {
    hljs.highlightElement(block);
  });
}
function useProcessedQuillContent(contentRef, content) {
  const processedContent = ref("");
  const convertUrlsToImages = (html) => {
    let processed = html.replace(/(<p><br><\/p>|<p>&nbsp;<\/p>)\s*(<p>https?:\/\/[^\s<]+\/storage\/[^\s<]+\.(jpg|jpeg|png|gif))<\/p>/gi, "$2</p>");
    processed = processed.replace(/<p>(https?:\/\/[^\s<]+\/storage\/[^\s<]+\.(jpg|jpeg|png|gif))<\/p>\s*(<p><br><\/p>|<p>&nbsp;<\/p>)/gi, "<p>$1</p>");
    const regex = /<p>(https?:\/\/[^\s<]+\/storage\/[^\s<]+\.(jpg|jpeg|png|gif))<\/p>/gi;
    return processed.replace(regex, (match, url, index) => {
      const imageId = `content-img-${index}`;
      return `
        <div class="relative my-1">
          <!-- Skeleton -->
          <div id="skeleton-${imageId}" class="absolute inset-0 animate-pulse bg-base-300 rounded-lg"></div>
          <!-- Image -->
          <img 
            id="${imageId}"
            src="${url}" 
            alt="Resim" 
            class="relative w-full h-auto rounded-lg shadow-lg opacity-0 transition-opacity duration-300"
            style="min-height: 200px"
            loading="lazy"
            onload="this.style.opacity = '1'; document.getElementById('skeleton-${imageId}').style.display = 'none';"
            onerror="this.style.display = 'none'; document.getElementById('skeleton-${imageId}').style.display = 'none'; this.insertAdjacentHTML('afterend', '<div class='text-error text-sm py-2'>Resim yüklenemedi</div>');"
          />
        </div>
      `;
    });
  };
  const processHtml = (html) => {
    if (!html) return "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    paragraphs.forEach((p) => {
      if (p.innerHTML.trim() === "<br>" || p.innerHTML.trim() === "" || !p.innerHTML.trim()) {
        p.innerHTML = "&nbsp;";
        p.style.marginBottom = "0.5rem";
        p.style.height = "1rem";
      }
    });
    const codeBlocks = doc.querySelectorAll(".ql-code-block-container");
    codeBlocks.forEach((container) => {
      container.className = "mockup-code bg-base-200 my-2 p-4 rounded-lg";
      const pre = doc.createElement("pre");
      const code = doc.createElement("code");
      const content2 = Array.from(container.querySelectorAll(".ql-code-block")).map((block) => block.textContent).join("\n");
      code.textContent = content2;
      pre.appendChild(code);
      container.innerHTML = "";
      container.appendChild(pre);
    });
    return doc.body.innerHTML;
  };
  const addSkeletonStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: .5;
        }
      }
      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `;
    document.head.appendChild(style);
  };
  watch(
    content,
    (newContent) => {
      if (!newContent) {
        processedContent.value = "";
        return;
      }
      addSkeletonStyles();
      let processed = convertUrlsToImages(newContent);
      processed = processHtml(processed);
      processedContent.value = processed;
      setTimeout(() => {
        if (contentRef.value) {
          useHighlight(contentRef.value);
        }
      });
    },
    { immediate: true }
  );
  return processedContent;
}
export {
  useProcessedQuillContent as u
};
