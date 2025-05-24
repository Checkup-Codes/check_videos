// useProcessedQuillContent.js
// Utility composable for processing Quill HTML content for display
// Handles images, code blocks, lists, empty paragraphs, and DaisyUI styling

import { computed, nextTick } from 'vue';

/**
 * useProcessedQuillContent
 * @param {Ref} contentRef - The ref to the content container (for post-processing, e.g. links)
 * @param {Ref|string} contentString - The raw HTML string to process
 * @returns {ComputedRef<string>} - The processed HTML string
 */
export function useProcessedQuillContent(contentRef, contentString) {
  return computed(() => {
    if (!contentString.value) return '';

    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentString.value, 'text/html');

    // Add lazy loading and skeleton to all images
    const images = doc.querySelectorAll('img');
    images.forEach((img, index) => {
      const imageId = `content-img-${index}`;
      img.id = imageId;
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      img.setAttribute('importance', 'low');
      if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
        img.setAttribute('width', '800');
        img.setAttribute('height', '600');
      }
      // Skeleton wrapper
      const skeletonWrapper = doc.createElement('div');
      skeletonWrapper.className = 'img-skeleton-wrapper relative';
      skeletonWrapper.style.width = '100%';
      skeletonWrapper.style.marginBottom = '1rem';
      skeletonWrapper.style.marginTop = '1rem';
      const skeleton = doc.createElement('div');
      skeleton.className = 'skeleton img-skeleton absolute inset-0 h-full w-full rounded-lg';
      skeleton.id = `skeleton-${imageId}`;
      const imgParent = img.parentNode;
      if (imgParent) {
        const imgWrapper = doc.createElement('div');
        imgWrapper.className = 'img-wrapper relative';
        imgWrapper.style.width = '100%';
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        img.setAttribute('onload', `this.style.opacity = '1'; const skeleton = document.getElementById('skeleton-${imageId}'); if (skeleton) skeleton.style.display = 'none';`);
        img.setAttribute('onerror', `const skeleton = document.getElementById('skeleton-${imageId}'); if (skeleton) { skeleton.style.display = 'none'; skeleton.insertAdjacentHTML('afterend', '<div class=\'text-error text-sm py-2\'>Image failed to load</div>'); } this.style.display = 'none';`);
        const imgClone = img.cloneNode(true);
        imgWrapper.appendChild(imgClone);
        skeletonWrapper.appendChild(skeleton);
        skeletonWrapper.appendChild(imgWrapper);
        try {
          imgParent.insertBefore(skeletonWrapper, img);
          imgParent.removeChild(img);
        } catch (error) {
          console.error('DOM manipulation error:', error);
        }
      }
    });

    // Handle Quill list items for correct display
    const listItems = doc.querySelectorAll('li');
    listItems.forEach((item) => {
      if (!item.hasAttribute('data-list')) {
        if (item.parentElement && item.parentElement.tagName === 'OL') {
          item.setAttribute('data-list', 'ordered');
        } else {
          item.setAttribute('data-list', 'bullet');
        }
      }
      const qlUi = item.querySelector('.ql-ui');
      if (qlUi) {
        qlUi.setAttribute('contenteditable', 'false');
      }
    });

    // Fix empty paragraphs for better spacing
    const paragraphs = doc.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (p.innerHTML.trim() === '<br>' || p.innerHTML.trim() === '' || !p.innerHTML.trim()) {
        p.innerHTML = '&nbsp;';
        p.style.marginBottom = '1rem';
        p.style.height = '1.5rem';
      }
    });

    // Style code blocks with DaisyUI mockup-code
    const codeBlocks = doc.querySelectorAll('.ql-code-block-container');
    codeBlocks.forEach((container, blockIndex) => {
      // Add mockup-code class and custom styling
      container.setAttribute('class', 'mockup-code bg-base-200/70 text-base-content shadow-lg relative');
      container.style.margin = '2rem 0';
      container.style.padding = '1rem 0 0.5rem 0';
      container.style.borderRadius = '0.75rem';
      container.style.position = 'relative';
      container.style.overflow = 'hidden';
      container.style.border = '1px solid rgba(0, 0, 0, 0.1)';
      container.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';

      // Add a header div for controls
      const headerControls = doc.createElement('div');
      headerControls.className = 'absolute top-2 right-3 flex items-center gap-2 px-1 py-0.5 rounded bg-base-100/50 backdrop-blur-sm';
      
      // Add copy button with enhanced styling
      const copyButton = doc.createElement('button');
      copyButton.className = 'opacity-40 hover:opacity-100 transition-all duration-200 flex items-center gap-1 text-xs';
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span class="hidden group-hover:inline">Copy</span>
      `;
      copyButton.setAttribute('onclick', `
        const text = this.parentElement.parentElement.querySelector('pre').textContent;
        navigator.clipboard.writeText(text.replace(/\\d+/g, '')).then(() => {
          const originalHTML = this.innerHTML;
          this.innerHTML = '<span class="flex items-center gap-1 text-success"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg><span>Copied!</span></span>';
          setTimeout(() => {
            this.innerHTML = originalHTML;
          }, 1000);
        });
      `);

      // Add a "Code" label
      const label = doc.createElement('div');
      label.className = 'opacity-40 font-mono flex items-center gap-1 text-xs';
      label.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        <span>Code</span>
      `;

      // Add controls to header
      headerControls.appendChild(copyButton);
      headerControls.appendChild(label);
      container.appendChild(headerControls);

      // Add style to remove word borders and override DaisyUI styles
      const style = doc.createElement('style');
      style.textContent = `
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
      `;
      container.appendChild(style);

      const codeLines = container.querySelectorAll('.ql-code-block');
      if (codeLines.length > 0) {
        container.innerHTML = '';
        container.appendChild(style);
        container.appendChild(headerControls);

        const pre = doc.createElement('pre');
        pre.style.margin = '0';
        pre.style.padding = '0';
        pre.style.backgroundColor = 'transparent';
        pre.style.border = 'none';
        pre.style.boxShadow = 'none';
        
        // Process each line separately for better styling
        Array.from(codeLines).forEach((line, index) => {
          const codeLine = doc.createElement('pre');
          codeLine.className = 'group px-4 py-1 border-l-4 border-transparent hover:bg-base-300/50 hover:border-primary/40 transition-all duration-200';
          codeLine.style.margin = '0';
          codeLine.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
          codeLine.style.border = 'none';
          codeLine.style.boxShadow = 'none';
          
          const code = doc.createElement('code');
          code.style.fontFamily = 'inherit';
          code.style.color = 'inherit';
          code.style.padding = '0 0 0 0.5rem';
          code.style.border = 'none';
          code.style.background = 'none';
          code.style.boxShadow = 'none';
          code.style.whiteSpace = 'pre-wrap';
          code.style.wordBreak = 'break-word';
          code.textContent = line.textContent || line.innerText;
          
          // Add line number with more subtle styling
          const lineNumber = doc.createElement('span');
          lineNumber.className = 'inline-block w-4 mr-3 text-base-content/20 group-hover:text-base-content/30 select-none transition-colors duration-200';
          lineNumber.style.fontSize = '0.75em';
          lineNumber.style.fontWeight = '300';
          lineNumber.textContent = (index + 1).toString().padStart(2, '0');
          
          codeLine.insertBefore(lineNumber, codeLine.firstChild);
          codeLine.appendChild(code);
          pre.appendChild(codeLine);
        });

        container.appendChild(pre);
      }
    });

    // Add classes for colored text/background
    const styledElements = doc.querySelectorAll('[style*="color"], [style*="background-color"]');
    styledElements.forEach((el) => {
      if (el.style.color) {
        el.classList.add('quill-colored-text');
      }
      if (el.style.backgroundColor) {
        el.classList.add('quill-colored-background');
      }
    });

    // Return the processed HTML
    return doc.body.innerHTML;
  });
} 