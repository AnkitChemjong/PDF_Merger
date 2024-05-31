const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const multer = require('multer');
const upload = multer({ dest: 'mergedPdf/' });
const mergerwin = require('./winpdf.js'); // Assuming mergerwin can handle dynamic number of PDFs

app.use('/static', express.static('mergedPdf'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload/index.html'));
});

app.post('/merge', upload.array('pdfs'), async (req, res) => {
  try {
    console.log(req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).send('Please upload at least one PDF file.');
    }

    // Generate the array of file paths
    const filePaths = req.files.map(file => path.join(__dirname, file.path));

    // Perform the PDF merge operation with dynamic file paths
    await mergerwin(...filePaths);

    // Redirect to the merged PDF
    res.redirect('http://localhost:3000/static/merged.pdf');
  } catch (error) {
    console.error('Error during merging:', error);
    res.status(500).send('An error occurred while merging the PDFs.');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
