Feature: Working with products on main page

Scenario: Check information of all products on main page
Given user is logged in successfully
When user is on main page
Then information of all products on main page is correct

Scenario Outline: Check information of all products on main page depending on the desired value in products filter
Given user is logged in successfully
When user is on main page
And user can choose one products filter <value>
Then user should have correct information
Examples:
  |        value      |
  |Name (Z to A)      |
  |Price (low to high)|
  |Price (high to low)|