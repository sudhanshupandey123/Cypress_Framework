const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { UI_User } = require('../user_flows/ui_user'); 
const ui_user = new UI_User("Admin", "yourPassword"); 
const { setContextVar } = require('../../cypress/utils/utils');
const {getContextVar} = require('../../cypress/utils/utils');




Given('User is on OrangeHRM application', () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
}
);

When('User Enter with valid Login Credentials', function () {
  ui_user.enterText("//input[@name='username']", "Admin");
  ui_user.getText("//input[@name='username']").then((text) => {
  cy.log("Username: " + text);
  UserName = text;
  setContextVar(this,"UserName", UserName);
  ui_user.enterText("//input[@type='password']","admin123")
  ui_user.click("//button[text()=' Login ']")
  })
}
);

Then('User should be able to login successfully', function () {
  ui_user.getText("//h6[text()='Dashboard']").then((text) => {
    expect(text).to.eq("Dashboard");
    cy.log("Login successful, Dashboard text: " + text);
  });
  cy.log(getContextVar(this, "UserName"));
  
  expect(this.vars.UserName).to.eq("Admin");
  cy.log(this.vars)
});


When('User Click on PIM Tab', () => {
ui_user.click("//span[text()='PIM']")
  

})

Then('User select any option from the Dropdown', function() {
  ui_user.selectValueFromDropdown("((//div[text()='-- Select --'])[2]//parent::div)[1]", "//span[text()='Chief Executive Officer']/parent::div", "Chief Executive Officer", "(//div[@class='oxd-select-text-input'])[3]")
  
  ui_user.getValueFromDropdown("(//div[@class='oxd-select-text-input'])[3]").then((value) => {
  cy.log(value);
  
  ui_user.countsVisibleElements("(//div[@class='oxd-select-text-input'])").then((count) => {
    cy.log("Number of visible elements: " + count);
  
  ui_user.listsVisibleTexts("//label[@class='oxd-label']").then((texts) => {
    cy.log("Visible texts: " + texts.join(", "));
    for (i of texts){
      
      cy.log(i)
    }

  })
  cy.log(getContextVar(this, "UserName"));
  
  })
})
});


Then('User enable the CheckBox',()=>{
  ui_user.enablesCheckbox("(//input[@type='checkbox'])[3]","(//input[@type='checkbox'])[3]")
  cy.wait(3000)
  ui_user.disablesCheckbox("(//input[@type='checkbox'])[3]","(//input[@type='checkbox'])[3]")
  cy.wait(3000)

})

Then('then disable the CheckBox', () =>{
  ui_user.disablesCheckbox("(//input[@type='checkbox'])[3]","(//input[@type='checkbox'])[3]")
  cy.wait(3000)
})


Given('User is on Hoorokey App', () => {
  cy.visit("https://open.berkeley.edu/guides/site-builders-guide/edit-html-page/expandcollapse-content")
})

When('User Expand the collapse', () => {
  ui_user.expandsDetails("//a[@id='openberkeley-collapsible-container-0-trigger']")
  cy.wait(3000)
})


Given('User is on DragAndDrop App', () => {
  cy.visit("https://practice.expandtesting.com/drag-and-drop")
  cy.wait(20000)
})

When('User Drag and Drop the element', () => {
  ui_user.dragAndDrop("//div[@id='column-a']", "//div[@id='column-b']")

  cy.wait(5000)
})


Given('User is on Toggle App', () => {
  cy.visit("https://ng-toggle-button.netlify.app/")
  cy.wait(1000)
})

When('User Disable the toggle', () => {
  ui_user.disablesToggle("//label[@for='ng-toggle-6']/child::div")
  cy.wait(1000)
 
})

Then('User Enable the toggle', () => {
 ui_user.enablesToggle("//label[@for='ng-toggle-6']/child::div")
 cy.wait(1000)
})

Given('User is on Loader App', () => {
  cy.visit("https://practice.expandtesting.com/dynamic-loading/1");
  cy.wait(1000)
})

When('User Click on the Button to show loader', () => {
  ui_user.click("//button[text()='Start']");
 
})

Then('User verify text after loader is displayed', () => {
  ui_user.waitForLoaderToDisappear("//div[@id='loading']/child::img");
  ui_user.getText("//div[@id='finish']/child::h4").then(text => {
    expect(text).to.eq("Hello World!");
  });
 
})


Given('User is on Upload App', () => {
  cy.visit("https://practice.expandtesting.com/upload");
  cy.wait(1000);
  ui_user.uploadFile("//input[@id='fileInput']","C:\\Users\\a00571008\\Downloads\\Sudhanshu_Pandey (2).pdf")
  cy.wait(3000);
});


When('User Upload A File', () => {
  ui_user.uploadFile("//input[@id='fileInput']","C:\\Users\\a00571008\\Downloads\\Sudhanshu_Pandey (2).pdf")
  cy.wait(3000);
  ui_user.click("//button[text()='Upload']")
});

Then('User verify the file is uploaded successfully', () => {
  if (ui_user.validateUploadedFile("//div[@id='uploaded-files']","C:\\Users\\a00571008\\Downloads\\Sudhanshu_Pandey (2).pdf")){
    cy.log("File uploaded successfully");
  }
  
});

Given('User Click on the Download Button', () => {
  cy.visit('https://demo.automationtesting.in/FileDownload.html');
  cy.wait(2000);
  ui_user.downloadFile("(//a[text()='Download'])[1]",'XYZ')
  cy.wait(5000);

});

