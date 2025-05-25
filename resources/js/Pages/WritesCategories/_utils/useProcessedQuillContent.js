// useProcessedQuillContent.js
// Utility composable for processing Quill HTML content for display
// Handles images, code blocks, lists, empty paragraphs, and DaisyUI styling

import { watch, ref } from 'vue';
import { useHighlight } from './useHighlight';

/**
 * useProcessedQuillContent
 * @param {Ref} contentRef - The ref to the content container (for post-processing, e.g. links)
 * @param {Ref|string} contentString - The raw HTML string to process
 * @returns {ComputedRef<string>} - The processed HTML string
 */
export function useProcessedQuillContent(contentRef, content) {
  const processedContent = ref('');

  // URL'yi resme dönüştüren fonksiyon
  const convertUrlsToImages = (html) => {
    // Önce fazla boş satırları temizle
    let processed = html.replace(/(<p><br><\/p>|<p>&nbsp;<\/p>)\s*(<p>https?:\/\/[^\s<]+\/storage\/[^\s<]+\.(jpg|jpeg|png|gif))<\/p>/gi, '$2</p>');
    processed = processed.replace(/<p>(https?:\/\/[^\s<]+\/storage\/[^\s<]+\.(jpg|jpeg|png|gif))<\/p>\s*(<p><br><\/p>|<p>&nbsp;<\/p>)/gi, '<p>$1</p>');

    // Storage URL'lerini bul ve resme dönüştür
    const regex = /<p>(https?:\/\/[^\s<]+\/storage\/[^\s<]+\.(jpg|jpeg|png|gif))<\/p>/gi;
    return processed.replace(regex, (match, url, index) => {
      const imageId = `content-img-${index}`;
      return `
        <div class="relative">
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
            onerror="this.style.display = 'none'; document.getElementById('skeleton-${imageId}').style.display = 'none'; this.insertAdjacentHTML('afterend', '<div class=\'text-error text-sm py-2\'>Resim yüklenemedi</div>');"
          />
        </div>
      `;
    });
  };

  // HTML içeriğini işle
  const processHtml = (html) => {
    if (!html) return '';

    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Fix empty paragraphs for better spacing
    const paragraphs = doc.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (p.innerHTML.trim() === '<br>' || p.innerHTML.trim() === '' || !p.innerHTML.trim()) {
        p.innerHTML = '&nbsp;';
        p.style.marginBottom = '0.5rem';
        p.style.height = '1rem';
      }
    });

    // Style code blocks with DaisyUI mockup-code
    const codeBlocks = doc.querySelectorAll('.ql-code-block-container');
    codeBlocks.forEach((container) => {
      container.className = 'mockup-code bg-base-200 p-2 rounded-lg';
      const pre = doc.createElement('pre');
      const code = doc.createElement('code');
      const content = Array.from(container.querySelectorAll('.ql-code-block'))
        .map(block => block.textContent)
        .join('\n');
      code.textContent = content;
      pre.appendChild(code);
      container.innerHTML = '';
      container.appendChild(pre);
    });

    return doc.body.innerHTML;
  };

  // Add skeleton styles
  const addSkeletonStyles = () => {
    const style = document.createElement('style');
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
        processedContent.value = '';
        return;
      }

      // Skeleton stillerini ekle
      addSkeletonStyles();

      // Önce URL'leri resimlere dönüştür
      let processed = convertUrlsToImages(newContent);

      // Sonra HTML'i işle
      processed = processHtml(processed);

      // İşlenmiş içeriği kaydet
      processedContent.value = processed;

      // Highlight.js için bir sonraki tick'i bekle
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