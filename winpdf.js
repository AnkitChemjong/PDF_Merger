const PDFMerger = require('pdf-merger-js');

const mergerwin = async (...pdfPaths) => {
  const merger = new PDFMerger();
  
  for (const pdfPath of pdfPaths) {
    await merger.add(pdfPath); // Add each PDF to the merger
  }
  
  await merger.save('mergedPdf/merged.pdf'); // Save the merged PDF with the given name
};

module.exports = mergerwin;
