const { Button } = require('../UI_Elements/button');
const { Checkbox } = require('../UI_Elements/checkbox');
const { Collapse } = require('../UI_Elements/collapse');
const { DragAndDrop } = require('../UI_Elements/drag_and_drop');
const { DropDown } = require('../UI_Elements/dropdown');
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');
const { Text } = require('../UI_Elements/text');
const { Toggle } = require('../UI_Elements/toggle');
const {Loader} = require('../UI_Elements/loader');
const { FileHandler } = require('../UI_Elements/File');

class UI_User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  refreshBrowser() {
    cy.reload();
  }

  //tested
  enterText(selector, inputText, validatePostCondition = true, clearText = true) {
    const textInput = new Text(selector);
    if (clearText) textInput.clear();
    textInput.enterText(inputText, validatePostCondition, clearText);
  }
  //tested
  selectValueFromDropdown(dropdownLocator, optionLocator, valueToSelect, validationLocator, validatePostCondition = true) {
    new DropDown(dropdownLocator,optionLocator).selectValueFromDropdown(valueToSelect, validationLocator, validatePostCondition);
  }

    //tested
  getValueFromDropdown(dropdownLocator) {
    return new DropDown(dropdownLocator).getValue();
  }
  //tested
  expandsDetails(selector) {
    new Collapse(selector).expand();
  }

  seesCheckboxChecked(selector) {
    return new Checkbox(selector).getValue();
  }
  //tested
  enablesCheckbox(selector, validationSelector) {
    new Checkbox(selector, { validationSelector }).check();
  }
  //tested
  disablesCheckbox(selector, validationSelector) {
    new Checkbox(selector, { validationSelector }).uncheck();
  }
  //tested
  enablesToggle(selector) {
    new Toggle(selector).enable();
  }
  //tested
  disablesToggle(selector) {
    new Toggle(selector).disable();
  }
  //tested
  waitForLoaderToDisappear(locator) {
    Loader.waitForLoaderToDisappear(locator)
  }
  
  //tested
  listsVisibleTexts(selector) {
    return new Text(selector).getTexts();
  }

  //tested
  click(selector) {
    new Button(selector).click();
  }

  //tested
  downloadFile(selector, fileName) {
    new FileHandler().downloadFile(selector, fileName)
  }

  //tested
  uploadFile(selector, filepath) {
    new FileHandler().uploadFile(selector,filepath);
  }

  //tested
  validateUploadedFile(selector, filePath){
    return new FileHandler().validateUploadedFile(selector, filePath);

  }


  //tested
  dragAndDrop(source, target) {
    new DragAndDrop().dragAndDrop(source,target);
  }

  seesElement(selector) {
    return new SimpleUIElement(selector).element.should('be.visible');
  }

  //tested
  countsVisibleElements(selector) {
    return new SimpleUIElement(selector).count();
  }


  //tested
  getText(selector) {
    return new Text(selector).getText();
  }

  setContextVar(context, key, value, level = "scenario") {
  if (level === "scenario") {
    context.vars = context.vars || {};
    context.vars[key] = value;
  } else if (level === "feature") {
    if (!context.feature) context.feature = {};
    context.feature.vars = context.feature.vars || {};
    context.feature.vars[key] = value;
  } else {
    throw new Error(`Level ${level} defined is invalid.`);
  }
}
 

  

}

module.exports = { UI_User };
