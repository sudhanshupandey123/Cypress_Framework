@TestingFramework
Feature: Framework Testing

  @TextTesting
  Scenario: Login to OrangeHRM application
    Given User is on OrangeHRM application
    When User Enter with valid Login Credentials 
    Then User should be able to login successfully

  @DropdownTesting
  Scenario: Dropdown Testing
    Given User is on OrangeHRM application
    When User Enter with valid Login Credentials
    And User Click on PIM Tab 
    Then User select any option from the Dropdown

#  @CheckboxTesting
#  Scenario: CheckBox Testing
#     Given User is on OrangeHRM application
#     When User Enter with valid Login Credentials
#     And User Click on PIM Tab
#     Then User enable the CheckBox
#     And then disable the CheckBox

# @CollapseTesting
# Scenario: Collapse Testing
#     Given User is on Hoorokey App
#     When User Expand the collapse


# @DragAndDropTesting
# Scenario: Drag and Drop Testing
#     Given User is on DragAndDrop App
#     When User Drag and Drop the element

# @ToggleTesting
# Scenario: Toggle Testing
#     Given User is on Toggle App
#     When User Disable the toggle
#     Then User Enable the toggle

# @LoaderTesting
# Scenario: Loader Testing
#     Given User is on Loader App
#     When User Click on the Button to show loader
#     Then User verify text after loader is displayed
    

# @UploadFileTesting
# Scenario: Download and Upload Testing
#     Given User is on Upload App
    
#     When User Upload A File
    
#     Then User verify the file is uploaded successfully
    

#   @DownloadFileTesting
#   Scenario: Download Testing
    
#     Given User Click on the Download Button
    


  
   
    
