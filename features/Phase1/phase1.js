// cypress/e2e/step_definitions/orangehrm.js
// Step definition for opening OrangeHRM application using Cypress and Cucumber BDD

const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { User } = require('../user_flows/user'); // Corrected import path to match workspace structure


const user = new User("Admin", "yourPassword"); // Use actual credentials or config


Given('User is on OrangeHRM application', () => {
  cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
}
);

When('User Enter with valid Login Credentials', () => {
  user.enterText("//input[@name='username']", "Admin");
  cy.wait(3000)
  user.getText("//input[@name='username']").then((text) => {
  cy.log("Username: " + text);
  cy.log(5000)
  user.enterText("//input[@type='password']","admin123")
  user.click("//button[text()=' Login ']")
  cy.wait(3000)
  })
}
);

Then('User should be able to login successfully', () =>{
  user.getText("//h6[text()='Dashboard']").then((text) => {
    expect(text).to.eq("Dashboard");
    cy.log("Login successful, Dashboard text: " + text);
  });
});


When('User Click on PIM Tab', () => {
  user.click("//span[text()='PIM']")
  cy.wait(3000);

})

Then('User select any option from the Dropdown', () => {
  user.selectValueFromDropdown("((//div[text()='-- Select --'])[2]//parent::div)[1]", "//span[text()='Chief Executive Officer']/parent::div", "Chief Executive Officer", "(//div[@class='oxd-select-text-input'])[3]")
  cy.wait(3000)
  user.getValueFromDropdown("(//div[@class='oxd-select-text-input'])[3]").then((value) => {
  cy.log(value);
  cy.wait(3000);
  user.countsVisibleElements("(//div[@class='oxd-select-text-input'])").then((count) => {
    cy.log("Number of visible elements: " + count);
  cy.wait(3000);
  user.listsVisibleTexts("//label[@class='oxd-label']").then((texts) => {
    cy.log("Visible texts: " + texts.join(", "));
    for (i of texts){
      cy.wait(300)
      cy.log(i)
    }

  })
  })
})
});


Then('User enable the CheckBox',()=>{
  user.enablesCheckbox("(//input[@type='checkbox'])[3]","(//input[@type='checkbox'])[3]")
  cy.wait(3000)
  user.disablesCheckbox("(//input[@type='checkbox'])[3]","(//input[@type='checkbox'])[3]")
  cy.wait(3000)

})

Then('then disable the CheckBox', () =>{
  user.disablesCheckbox("(//input[@type='checkbox'])[3]","(//input[@type='checkbox'])[3]")
  cy.wait(3000)
})


Given('User is on Hoorokey App', () => {
  cy.visit("https://open.berkeley.edu/guides/site-builders-guide/edit-html-page/expandcollapse-content")
})

When('User Expand the collapse', () => {
  user.expandsDetails("//a[@id='openberkeley-collapsible-container-0-trigger']")
  cy.wait(3000)
})


Given('User is on DragAndDrop App', () => {
  cy.visit("https://practice.expandtesting.com/drag-and-drop")
  cy.wait(20000)
})

When('User Drag and Drop the element', () => {
  user.dragAndDrop("//div[@id='column-a']", "//div[@id='column-b']")

  cy.wait(5000)
})


Given('User is on Toggle App', () => {
  cy.visit("https://ng-toggle-button.netlify.app/")
  cy.wait(1000)
})

When('User Disable the toggle', () => {
  user.disablesToggle("//label[@for='ng-toggle-6']/child::div")
  cy.wait(1000)
 
})

Then('User Enable the toggle', () => {
 user.enablesToggle("//label[@for='ng-toggle-6']/child::div")
 cy.wait(1000)
})

Given('User is on Loader App', () => {
  cy.visit("https://practice.expandtesting.com/dynamic-loading/1");
  cy.wait(1000)
})

When('User Click on the Button to show loader', () => {
  user.click("//button[text()='Start']");
 
})

Then('User verify text after loader is displayed', () => {
  user.waitForLoaderToDisappear("//div[@id='loading']/child::img");
  user.getText("//div[@id='finish']/child::h4").then(text => {
    expect(text).to.eq("Hello World!");
  });
 
})


Given('User is on Download and Upload App', () => {
  cy.visit("https://practice.expandtesting.com/upload");
  cy.wait(1000);
  user.uploadFile("//input[@id='fileInput']","C:\\Users\\a00571008\\Downloads\\Sudhanshu_Pandey (2).pdf")
  cy.wait(3000);
});


When('User Upload A File', () => {
  user.uploadFile("//input[@id='fileInput']","C:\\Users\\a00571008\\Downloads\\Sudhanshu_Pandey (2).pdf")
  cy.wait(3000);
  user.click("//button[text()='Upload']")
});

Then('User verify the file is uploaded successfully', () => {
  if (user.validateUploadedFile("//div[@id='uploaded-files']","C:\\Users\\a00571008\\Downloads\\Sudhanshu_Pandey (2).pdf")){
    cy.log("File uploaded successfully");
  }
  
});

Given('User Click on the Download Button', () => {
  cy.visit('https://demo.automationtesting.in/FileDownload.html');
  cy.wait(2000);
  user.downloadFile("(//a[text()='Download'])[1]",'XYZ')
  cy.wait(5000);

});

