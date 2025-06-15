// useHighlight.js
// Utility function for highlighting code blocks using highlight.js

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

/**
 * Applies syntax highlighting to code blocks within the given element
 * @param {HTMLElement} element - The container element with code blocks
 */
export function useHighlight(element) {
  if (!element) return;

  // Find all code blocks
  const codeBlocks = element.querySelectorAll('pre code');

  // Apply highlighting to each block
  codeBlocks.forEach((block) => {
    hljs.highlightElement(block);
  });
}
