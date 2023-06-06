# Ultra.io : Web UI Challenge

## Project: Developing an automated test suite for a dummy web application
<br>

### Description: 

The first task will check your knowledge in user interface automation.<br>
The expected outcome is an automated test framework for the https://www.saucedemo.com/ dummy website.<br>
Use the `standard_user` whose credentials are provided on the main page. <br>
Automate the purchase flow.<br>
<br>

You are expected to:

1. Provide the manual test case(s) covering the flow
2. Automate the prepared manual test case(s)
3. Enable the testing of the provided functionality as part of a CI/CD pipeline
4. Provide execution instructions and enough information explaining the final solution
5. Describe the chosen testing approach and anything you could improve about the technical task

<br>

### **1. Provide the manual test case(s) covering the flow**
 **Title: E2E - Succesfully purchase one product** 
<br>

Preconditions: The cart is empty, there are no pending items to purchase

<br>
Steps:

1. Log in into the site using the provided credentials (`standard_user`)
    - Expected partial results: 
      - User is succesfully logged in 
      - The homepage with a list of products is displayed to the user 
      - The cart is empty (it is not showing any value)

2. Select a product and take note of its values: price, description, etc

3. Click on the `Add to cart` button of the selected product
   - Expected partial results: 
      - The `Add to cart` button that was clicked changed its text to `Remove`
      - The cart is now showing a `1`

4. Click on the Cart icon to access its content
   - Expected partial results:     
      - The content of the cart is displayed to the user
      - The values of the product in the cart are correct (`input: step 2`)
      - The app under test does not allow users to buy more than 1 item of the same product, so the quantity value will be `1`

5. Click on the Checkout button
   - Expected partial results:     
      - A form page is displayed to the user
      - The form has 3 fields that the user needs to fill out in order to proceed with the purchase: `First Name`, `Last Name` and `Zip/Postal Code`

6. Fill out all the fields in the form and click on Continue button
   - Expected partial results:     
      - An overview of the purchase is displayed to the user
      - The values of the product in the cart are correct (`input: step 2`)
      - The user can see also related information about: `Payment, Shipping, Prices and Total amount`
      - The maths are correct based on the price of the product and the applied taxes
      - The cart is still showing `1` 

7. Click on the Finish button
   - Expected results:     
      - A succesful message is displayed to the user confirming that the purchased was finished correctly
      - No email is sent to the user 
      - The cart does not show any value

<br>

### **2. Automate the prepared manual test case(s)**

**Tech Stack**
- The test case was automated using Cypress and Typescript
- Current project can be found here: https://github.com/arielmachado-uy/ultra-web-challenge

<br>

### **3. Enable the testing of the provided functionality as part of a CI/CD pipeline**

**CI/CD implementation**
- The automation project is integrated with github actions for CI/CD
- The automated test case will run after every push to the `main` branch
- The automated test case can be run manually using the github workflow
- **Extra:** the automation project is also integrated with `Cypress Cloud` for reporting and debugging purposes

<br>

### **4. Provide execution instructions and enough information explaining the final solution**

**Automation implementation**

<br>
Project setup

1. Make sure you have Node installed on your system before proceeding with the project (based on your OS)
   - https://nodejs.org/en/download
   - https://formulae.brew.sh/formula/node
2. Checkout the code from the provided url (https://github.com/arielmachado-uy/ultra-web-challenge)
3. Open the project on VS Code
4. Open the terminal and run `yarn` in order to install needed dependencies

<br>
Project execution

- There are 3 scripts in the package.json file to run the scenario in different ways
- `yarn cy:run`
- `yarn cy:open`
- `yarn cy:ci`

Script `yarn cy:run`
- When running this script the test case will be executed locally in a headless way
- After the test finishes running, a new video will be stored inside the `videos` folder with a record of the execution (videos are deleted before every new exeuction)
- In case there was a failure, the framework will take a screenshot of the error and store it inside the `screenshots` folder
- The results of the execution will be displayed like this:

![Image](/documentation/cypress_run.png)

<br>

Script `yarn cy:open`
- When running this script the Cypress Runner will be opened and user can utilize it to execute the test case
- When using the runner, the user can navigate back in time and review previous steps and responses
- The user can see the execution of the test inside the runner
- No videos, nor screenshots are stored during this execution
- The user can re-run the test case from the runner without using the script again
- Check the following video to see the execution of the test inside the runner

https://github.com/arielmachado-uy/ultra-web-challenge/assets/18541519/cd59fe87-783a-47cb-b569-fbfe18884e6c

