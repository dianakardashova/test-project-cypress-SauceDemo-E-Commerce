Feature: Login

  @login
  Scenario: Verify login from login page
    Given user on the login page
    And user enters correct username & password on the corresponding fields
    When user clicks on login button
    Then user will be logged in system