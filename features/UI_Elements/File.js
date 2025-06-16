const { SimpleUIElement } = require('./simple_ui_element');

class FileHandler extends SimpleUIElement {

  downloadFile(downloadLocator, expectedFileName, downloadFolder = 'cypress/downloads') {
    cy.xpath(downloadLocator).click({ force: true });
    cy.task('renameNewestFile', { downloadFolder, expectedFileName }, { timeout: 20000 }).then((newPath) => {
      cy.readFile(newPath, { timeout: 20000 }).should('exist');
    });
  }


  uploadFile(uploadLocator, filePath, uploadButtonLocator = null) {
    if (uploadButtonLocator) {
      cy.xpath(uploadButtonLocator).click({ force: true });
      cy.wait(500);
    }
    cy.xpath(uploadLocator).selectFile(filePath, { force: true });
    
  }

  uploadFileByDragAndDrop(dropAreaLocator, filePath) {
    cy.get(dropAreaLocator).selectFile(filePath, { action: 'drag-drop', force: true });
  }

  validateUploadedFile(validationLocator, filePath) {
    const fileName = filePath.split(/[/\\]/).pop();
    return cy.xpath(validationLocator).invoke('text').then(text => {
      if (text && text.includes(fileName)) {
        return true;
      } else {
        return false;
      }
    });
  }
}

module.exports = { FileHandler };
