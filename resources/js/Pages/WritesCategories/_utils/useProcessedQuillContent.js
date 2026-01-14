// useProcessedQuillContent.js
// Utility composable for processing Quill HTML content for display
// Handles images, code blocks, lists, empty paragraphs, and DaisyUI styling

import { computed, nextTick, ref, watch } from 'vue';
import '@/Shared/Css/quill-styles.css';

// Cache for processed content
const contentCache = new Map();
const cacheSize = 50; // Maximum number of cached items

// Slider counter for unique IDs
let sliderCounter = 0;

/**
 * Check if an element is an image wrapper
 */
function isImageElement(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return false;
  
  // Check if it's an img-skeleton-wrapper
  if (element.classList && element.classList.contains('img-skeleton-wrapper')) return true;
  
  // Check if it's a paragraph containing only an image
  if (element.tagName === 'P') {
    const children = element.children;
    if (children.length === 1 && children[0].tagName === 'IMG') return true;
    // Check for img inside div wrapper
    if (children.length === 1 && children[0].classList && children[0].classList.contains('img-skeleton-wrapper')) return true;
  }
  
  // Check if it's a div containing only an image
  if (element.tagName === 'DIV' && !element.classList.contains('image-slider-container')) {
    const img = element.querySelector('img');
    const textContent = element.textContent.trim();
    if (img && textContent === '') return true;
  }
  
  return false;
}

/**
 * Get image src from an element
 */
function getImageFromElement(element) {
  const img = element.querySelector('img');
  return img;
}

/**
 * Process consecutive images into sliders
 * Finds image elements that are adjacent and groups them into a slider
 * Does NOT remove other content - only groups consecutive images
 */
function processConsecutiveImagesIntoSliders(doc) {
  const body = doc.body;
  const children = Array.from(body.childNodes);
  
  let i = 0;
  while (i < children.length) {
    const child = children[i];
    
    // Skip non-element nodes (text, comments, etc.)
    if (child.nodeType !== Node.ELEMENT_NODE) {
      i++;
      continue;
    }
    
    // Check if this is an image element
    if (isImageElement(child)) {
      // Find consecutive image elements
      const consecutiveImages = [child];
      let j = i + 1;
      
      while (j < children.length) {
        const nextChild = children[j];
        
        // Skip whitespace text nodes
        if (nextChild.nodeType === Node.TEXT_NODE && nextChild.textContent.trim() === '') {
          j++;
          continue;
        }
        
        // Check if next element is also an image
        if (nextChild.nodeType === Node.ELEMENT_NODE && isImageElement(nextChild)) {
          consecutiveImages.push(nextChild);
          j++;
        } else {
          break;
        }
      }
      
      // If we have 2+ consecutive images, create a slider
      if (consecutiveImages.length >= 2) {
        const slider = createSlider(doc, consecutiveImages);
        
        // Insert slider before the first image
        body.insertBefore(slider, consecutiveImages[0]);
        
        // Remove the original image elements
        consecutiveImages.forEach(imgEl => {
          if (imgEl.parentNode === body) {
            body.removeChild(imgEl);
          }
        });
        
        // Update children array and continue from current position
        children.splice(i, consecutiveImages.length, slider);
      }
    }
    
    i++;
  }
}

/**
 * Create a slider element from a group of image elements
 */
function createSlider(doc, imageElements) {
  const sliderId = `image-slider-${sliderCounter++}`;
  
  // Create slider container
  const sliderContainer = doc.createElement('div');
  sliderContainer.className = 'image-slider-container';
  sliderContainer.id = sliderId;
  
  // Create slides wrapper
  const slidesWrapper = doc.createElement('div');
  slidesWrapper.className = 'image-slider-slides';
  
  // Add images to slides
  imageElements.forEach((imgWrapper, index) => {
    const slide = doc.createElement('div');
    slide.className = 'image-slider-slide';
    slide.setAttribute('data-index', index.toString());
    if (index === 0) slide.classList.add('active');
    
    // Get the image from the wrapper
    const img = getImageFromElement(imgWrapper);
    if (img) {
      const slideImg = img.cloneNode(true);
      // Reset styles for slider
      slideImg.style.opacity = '1';
      slideImg.style.width = 'auto';
      slideImg.style.maxWidth = '100%';
      slideImg.style.height = 'auto';
      slideImg.style.maxHeight = '500px';
      slideImg.style.objectFit = 'contain';
      slideImg.style.margin = '0 auto';
      slideImg.style.display = 'block';
      slideImg.removeAttribute('onload');
      slideImg.removeAttribute('onerror');
      slide.appendChild(slideImg);
    }
    
    slidesWrapper.appendChild(slide);
  });
  
  sliderContainer.appendChild(slidesWrapper);
  
  // Create navigation arrows
  const prevBtn = doc.createElement('button');
  prevBtn.className = 'image-slider-btn image-slider-prev';
  prevBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>`;
  prevBtn.setAttribute('onclick', `window.imageSliderNav('${sliderId}', -1)`);
  prevBtn.setAttribute('type', 'button');
  
  const nextBtn = doc.createElement('button');
  nextBtn.className = 'image-slider-btn image-slider-next';
  nextBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>`;
  nextBtn.setAttribute('onclick', `window.imageSliderNav('${sliderId}', 1)`);
  nextBtn.setAttribute('type', 'button');
  
  sliderContainer.appendChild(prevBtn);
  sliderContainer.appendChild(nextBtn);
  
  // Create dots indicator
  const dotsContainer = doc.createElement('div');
  dotsContainer.className = 'image-slider-dots';
  
  imageElements.forEach((_, index) => {
    const dot = doc.createElement('button');
    dot.className = 'image-slider-dot';
    dot.setAttribute('type', 'button');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('onclick', `window.imageSliderGoTo('${sliderId}', ${index})`);
    dotsContainer.appendChild(dot);
  });
  
  sliderContainer.appendChild(dotsContainer);
  
  // Counter
  const counter = doc.createElement('div');
  counter.className = 'image-slider-counter';
  counter.innerHTML = `<span class="current">1</span> / <span class="total">${imageElements.length}</span>`;
  sliderContainer.appendChild(counter);
  
  return sliderContainer;
}

// Global slider navigation functions
if (typeof window !== 'undefined') {
  window.imageSliderNav = function(sliderId, direction) {
    const container = document.getElementById(sliderId);
    if (!container) return;
    
    const slides = container.querySelectorAll('.image-slider-slide');
    const dots = container.querySelectorAll('.image-slider-dot');
    const counter = container.querySelector('.image-slider-counter .current');
    
    let currentIndex = 0;
    slides.forEach((slide, index) => {
      if (slide.classList.contains('active')) currentIndex = index;
    });
    
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === newIndex);
    });
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === newIndex);
    });
    
    if (counter) counter.textContent = (newIndex + 1).toString();
  };
  
  window.imageSliderGoTo = function(sliderId, index) {
    const container = document.getElementById(sliderId);
    if (!container) return;
    
    const slides = container.querySelectorAll('.image-slider-slide');
    const dots = container.querySelectorAll('.image-slider-dot');
    const counter = container.querySelector('.image-slider-counter .current');
    
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    if (counter) counter.textContent = (index + 1).toString();
  };
}

/**
 * useProcessedQuillContent
 * @param {Ref} contentRef - The ref to the content container (for post-processing, e.g. links)
 * @param {Ref|string} contentString - The raw HTML string to process
 * @returns {ComputedRef<string>} - The processed HTML string
 */
export function useProcessedQuillContent(contentRef, contentString) {
  const isProcessing = ref(false);
  const processedContent = ref('');

  // Process content function
  const processContent = (content) => {
    if (!content) {
      processedContent.value = '';
      return;
    }

    // Check cache first
    const cacheKey = content;
    if (contentCache.has(cacheKey)) {
      processedContent.value = contentCache.get(cacheKey);
      return;
    }

    // Prevent multiple simultaneous processing
    if (isProcessing.value) {
      processedContent.value = content; // Return raw content while processing
      return;
    }

    isProcessing.value = true;

    // Process content synchronously for immediate response
    try {
      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');

      // Process text nodes to find and convert URLs to images
      const findAndReplaceImageUrls = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const urlRegex = /(https?:\/\/[^\/]+\/storage\/[^\s]+\.(png|jpg|jpeg|gif))/gi;
          const matches = node.textContent.match(urlRegex);

          if (matches) {
            const fragment = doc.createDocumentFragment();
            let lastIndex = 0;

            matches.forEach((url) => {
              const startIndex = node.textContent.indexOf(url, lastIndex);

              // Add text before the URL
              if (startIndex > lastIndex) {
                fragment.appendChild(doc.createTextNode(node.textContent.substring(lastIndex, startIndex)));
              }

              // Create image element
              const img = doc.createElement('img');
              img.src = url;
              img.alt = 'Content Image';
              img.style.maxWidth = '100%';
              img.style.height = 'auto';
              img.style.display = 'block';

              // Create paragraph wrapper for the image
              const wrapper = doc.createElement('div');
              wrapper.style.margin = '0';
              wrapper.style.padding = '0';
              wrapper.style.lineHeight = '0';
              wrapper.appendChild(img);
              fragment.appendChild(wrapper);

              lastIndex = startIndex + url.length;
            });

            // Add remaining text
            if (lastIndex < node.textContent.length) {
              fragment.appendChild(doc.createTextNode(node.textContent.substring(lastIndex)));
            }

            node.parentNode.replaceChild(fragment, node);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          Array.from(node.childNodes).forEach(findAndReplaceImageUrls);
        }
      };

      // Process all nodes to find and convert URLs to images
      findAndReplaceImageUrls(doc.body);

      // Add lazy loading and skeleton to all images
      const images = doc.querySelectorAll('img');
      images.forEach((img, index) => {
        const imageId = `content-img-${index}`;
        img.id = imageId;
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
        img.setAttribute('importance', 'low');

        // Set default dimensions for better layout stability
        // Don't set aspect-ratio to preserve original image proportions
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
          img.style.width = '100%';
          img.style.maxWidth = '800px';
          img.style.height = 'auto';
          img.style.objectFit = 'contain';
        }

        // Enhanced skeleton wrapper with better styling
        const skeletonWrapper = doc.createElement('div');
        skeletonWrapper.className = 'img-skeleton-wrapper';

        const skeleton = doc.createElement('div');
        skeleton.className = 'skeleton';
        skeleton.id = `skeleton-${imageId}`;

        const imgParent = img.parentNode;
        if (imgParent) {
          const imgWrapper = doc.createElement('div');
          imgWrapper.className = 'img-wrapper';

          // Enhanced image loading transition
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.3s ease-in-out';
          img.setAttribute(
            'onload',
            `
            this.style.opacity = '1';
            const skeleton = document.getElementById('skeleton-${imageId}');
            if (skeleton) {
              skeleton.style.opacity = '0';
              setTimeout(() => skeleton.style.display = 'none', 300);
            }
          `
          );

          // Enhanced error handling
          img.setAttribute(
            'onerror',
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
            // If the parent is a paragraph, replace it with our wrapper
            if (imgParent.tagName.toLowerCase() === 'p') {
              imgParent.parentNode.replaceChild(skeletonWrapper, imgParent);
            } else {
              imgParent.insertBefore(skeletonWrapper, img);
              imgParent.removeChild(img);
            }
          } catch (error) {
            console.error('DOM manipulation error:', error);
          }
        }
      });

      // Process consecutive images into sliders
      processConsecutiveImagesIntoSliders(doc);

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
        // Add mockup-code class
        container.setAttribute('class', 'mockup-code');

        // Add a header div for controls
        const headerBar = doc.createElement('div');
        headerBar.className = 'code-header';

        // Add copy button
        const copyButton = doc.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.setAttribute('type', 'button');
        copyButton.setAttribute('title', 'Copy code');
        copyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy</span>
        `;

        copyButton.setAttribute(
          'onclick',
          `
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

        headerBar.appendChild(copyButton);

        container.appendChild(headerBar);

        const codeLines = container.querySelectorAll('.ql-code-block');
        if (codeLines.length > 0) {
          const codeContent = doc.createElement('div');
          codeContent.className = 'code-content';

          Array.from(codeLines).forEach((line, index) => {
            const codeLine = doc.createElement('div');
            codeLine.className = 'code-line';

            const lineNumber = doc.createElement('span');
            lineNumber.className = 'line-number';
            lineNumber.textContent = (index + 1).toString().padStart(2, '0');

            const code = doc.createElement('code');
            let content = line.textContent || line.innerText;

            // Set content as plain text without syntax highlighting
            code.textContent = content;

            codeLine.appendChild(lineNumber);
            codeLine.appendChild(code);
            codeContent.appendChild(codeLine);
          });

          container.innerHTML = '';
          container.appendChild(headerBar);
          container.appendChild(codeContent);
        }
      });

      // Process headings: add IDs and anchor links with hash icon
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading, index) => {
        // Generate a unique ID based on heading text or index
        if (!heading.id) {
          const headingText = heading.textContent.trim().toLowerCase();
          const slug = headingText
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 50);
          heading.id = slug || `heading-${index}`;
        }

        // Create anchor link wrapper
        const headingWrapper = doc.createElement('div');
        headingWrapper.className = 'heading-wrapper';
        headingWrapper.style.position = 'relative';

        // Create anchor link with hash icon
        const anchorLink = doc.createElement('a');
        anchorLink.href = `#${heading.id}`;
        anchorLink.className = 'heading-anchor';
        anchorLink.setAttribute('aria-label', 'Link to heading');
        anchorLink.innerHTML = `#`;

        // Clone heading and wrap it
        const headingClone = heading.cloneNode(true);
        headingWrapper.appendChild(anchorLink);
        headingWrapper.appendChild(headingClone);

        // Replace original heading with wrapper
        heading.parentNode.replaceChild(headingWrapper, heading);
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

      const result = doc.body.innerHTML;

      // Cache the result
      if (contentCache.size >= cacheSize) {
        // Remove oldest entry
        const firstKey = contentCache.keys().next().value;
        contentCache.delete(firstKey);
      }
      contentCache.set(cacheKey, result);

      processedContent.value = result;
      isProcessing.value = false;
    } catch (error) {
      console.error('Error processing content:', error);
      processedContent.value = content; // Return raw content on error
      isProcessing.value = false;
    }
  };

  // Watch for content changes
  watch(
    contentString,
    (newContent) => {
      processContent(newContent);
    },
    { immediate: true }
  );

  return computed(() => processedContent.value);
}

/**
 * Clear content cache
 */
export function clearContentCache() {
  contentCache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    size: contentCache.size,
    maxSize: cacheSize,
  };
}
