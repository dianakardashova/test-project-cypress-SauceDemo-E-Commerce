Feature: Working with products on main page

Scenario Outline: Verify information about all products on main page depending on the sorting of product names
  alphabetically or conversely
Given user is logged in successfully
When user is on main page
And user can choose one products filter <value>
Then user should have correct names information for chosen <value>
  Examples:
    |    value    |
    |Name (A to Z)|
    |Name (Z to A)|

Scenario Outline: Verify information about all products on main page depending on the sorting of product price
  from low to high or conversely
Given user is logged in successfully
When user is on main page
And user can choose one products filter <value>
Then user should have correct prices information for chosen <value>
Examples:
  |        value      |
  |Price (low to high)|
  |Price (high to low)|