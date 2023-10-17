export const openPrintPdf = (data: Blob) => {
  const fileURL = URL.createObjectURL(data);

  const previousIframe = document.getElementById("pdfIframe");
  if (previousIframe) {
    previousIframe.remove();
  }
  const iframe = window.document.createElement("iframe");
  iframe.setAttribute(
    "style",
    "position:absolute;right:0; top:0; bottom:0; height:100%; width:100%;visibility: hidden"
  );
  iframe.setAttribute("id", "pdfIframe"); // Set the ID attribute
  window.document.body.appendChild(iframe);
  iframe.src = fileURL;
  // Open print dialog after the iframe has loaded
  iframe.onload = function () {
    const printWindow = iframe.contentWindow;
    if (printWindow) printWindow.print();
  };
};
