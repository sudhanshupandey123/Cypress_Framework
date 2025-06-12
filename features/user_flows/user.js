// cypress/support/user.js
// Cypress/Node.js version of the User class for UI automation
const { Button } = require('../UI_Elements/button');
const { Checkbox } = require('../UI_Elements/checkbox');
const { Collapse } = require('../UI_Elements/collapse');
const { DragAndDrop } = require('../UI_Elements/drag_and_drop');
const { DropDown } = require('../UI_Elements/dropdown');
const { SimpleUIElement } = require('../UI_Elements/simple_ui_element');
const { Text } = require('../UI_Elements/text');
const { Toggle } = require('../UI_Elements/toggle');
const {Loader} = require('../UI_Elements/loader');
// const {DateTime} = require('../UI_Elements/date_time');
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  login(host) {
    cy.login(this.username, this.password, host);
  }

  logout() {
    // Implement logout logic as needed
    cy.get('button:contains("Logout")').click({ force: true });
  }

  sees(text, maxTime = 10000) {
    cy.contains(text, { timeout: maxTime }).should('be.visible');
  }

  get loggedIn() {
    return cy.get('.name').should('be.visible');
  }

  refreshBrowser() {
    cy.reload();
  }

  navigateTo(location) {
    cy.visit(location);
  }

  navigatePageTo(url) {
    cy.visit(url);
  }

  enterText(selector, inputText, validatePostCondition = true, clearText = true) {
    const textInput = new Text(selector);
    if (clearText) textInput.clear();
    textInput.enterText(inputText, validatePostCondition, clearText);
  }

  selectValueFromDropdown(dropdownLocator, optionLocator, valueToSelect, validatePostCondition = true) {
    new DropDown(dropdownLocator,optionLocator).selectValueFromDropdown(valueToSelect, validatePostCondition);
  }

  getValueFromDropdown(dropdownName) {
    return new DropDown(dropdownName).getValue();
  }

  expandsDetails(selector) {
    new Collapse(selector).expand();
  }

  seesCheckboxChecked(selector) {
    return new Checkbox(selector).getValue();
  }

  enablesCheckbox(selector, validationSelector) {
    new Checkbox(selector, { validationSelector }).check();
  }

  disablesCheckbox(selector, validationSelector) {
    new Checkbox(selector, { validationSelector }).uncheck();
  }

  enablesToggle(selector) {
    new Toggle(selector).enable();
  }

  disablesToggle(selector) {
    new Toggle(selector).disable();
  }

  waitForLoaderToDisappear(locator) {
    Loader.waitForLoaderToDisappear(locator)
  }
  
  waitsForPageToLoad() {
    cy.get('.ant-spin-dot', { timeout: 10000 }).should('not.exist');
  }

  cannotEditText(selector) {
    new Text(selector).areInputsDisabled().should('be.true');
  }

  listsVisibleTexts(selector) {
    return new Text(selector).getTexts();
  }

  click(selector) {
    new Button(selector).click();
  }

  downloads(selector, saveAs) {
    new File(selector).download(saveAs);
  }

  waitsForElementToAppear(selector, timeout = 10000) {
    return new SimpleUIElement(selector, { maxTime: timeout }).element.should('be.visible');
  }

  uploadsAFile(selector, filepath) {
    new File(selector).uploadFile(filepath);
  }

  seesNumberOfElementsDisplayed(selector) {
    return new SimpleUIElement(selector).count();
  }

  doesNotSee(text) {
    cy.contains(text).should('not.exist');
  }

  waitForElementToAppears(selector) {
    return new SimpleUIElement(selector).element.should('be.visible');
  }

  dragAndDrop(source, target) {
    new DragAndDrop().dragAndDrop(source,target);
  }

  seesElement(selector) {
    return new SimpleUIElement(selector).element.should('be.visible');
  }

  countsVisibleElements(selector) {
    return new SimpleUIElement(selector).count();
  }

  getValueBasedOnAttribute(selector, attributeName) {
    return cy.get(selector).invoke('attr', attributeName);
  }

  getText(selector) {
    return new Text(selector).getText();
  }

  hoverElement(selector) {
    cy.get(selector).trigger('mouseover');
  }

  iframeObject(selector) {
    // Requires cypress-iframe plugin
    return cy.frameLoaded(selector);
  }

 
  waitForElementToDisappear(selector) {
    cy.get(selector, { timeout: 60000 }).should('not.be.visible');
  }
}

module.exports = { User };
