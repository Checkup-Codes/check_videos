let exportHandler = null;

export function triggerProjectPdfExport() {
  exportHandler?.();
}

export function registerProjectPdfExport(handler) {
  exportHandler = handler;
}

export function unregisterProjectPdfExport(handler) {
  if (exportHandler === handler) {
    exportHandler = null;
  }
}
