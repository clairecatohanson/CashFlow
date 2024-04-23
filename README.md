# CashFlow

Welcome to CashFlow! Read the documentation below for a description of the app, the target audience, key features, and installation steps. The app comes pre-loaded with a demo user and demo data, or you can opt to create a new account with no data to fully customize your experience.

## Overview

CashFlow is a user-friendly personal finance web application designed to streamline expense sharing and payment tracking among friends and family. Shared expenses are seamlessly integrated with each user's private personal expenses, ensuring a smooth and hassle-free financial management experience. With CashFlow, users can effortlessly keep track of who owes them money for past expenses or how much they owe their friends, eliminating the risk of overlooking shared expenses. In addition, the web app provides insightful visualization tools that allow users to easily monitor their spending trends over time, empowering them to make informed decisions and gain valuable insights into their financial habits.

## Target Audience

While CashFlow provides comprehensive functionality for any individual who wants to track personal expenses, its true power lies in its ability to facilitate expense sharing among groups and integrate group costs into the unique personal expenses of each user. Users who plan to create or join expense-sharing teams with friends and family will unlock a range of specialized features that set CashFlow apart from traditional spending trackers. Whether managing personal finances or collaborating on shared expenses, CashFlow offers a solution for users seeking efficient and intuitive financial management.

## Key Features

* Create and Edit Expense-Sharing Teams: Easily set up and tailor expense-sharing teams with other users on the platform according to your needs.
* Allocate Cost Percentages: Designate a percentage share that each user within a team is responsible for paying towards all expenses assigned to that team.
* Expense Entry and Management: Add, update, and delete expenses. Designate them as personal or assign them to an expense-sharing team.
* Integrated Expense Tracking: Access an integrated view of all personal and shared expenses, including those entered by other team members, with convenient filtering options by date range, category, team, and description.
* Payment Tracking: Stay informed about shared expenses initiated by you by tracking each team member's contribution towards settling the bill.
* Debt Settlement: Manage your share of expenses initiated by other users by tracking outstanding amounts owed and logging payments made.
* Flexible Categorization: Categorize expenses using predefined categories or create custom ones to suit your specific needs.
* Spending Analytics: Gain valuable insights into your spending habits over time by visualizing expenditures across various expense groups, categories, and teams. 

## Installation

Complete the following steps in your terminal in the parent directory where you would like the repository to download.

### 1. Clone the repository onto your local machine.
`git clone git@github.com:clairecatohanson/frontend-capstone.git`

### 2. Navigate to the directory that was just cloned.
`cd CashFlow`

### 3. Complete installations.
`npm install`

### 4. Open a second termianl, navigate to the demo_api directory, and begin serving the demo database using json-server on port 8088.
`cd CashFlow/demo_api`

`json-server demo.json -p 8088 --watch`

Note* json-server should have been installed in step 3. If it was not successfully installed, run `npm install json-server` within the CashFlow directory.

### 5. Within the first terminal in the CashFlow directory, start the application.
`npm start`

This should automatically open a new tab in your browser at the login page.

### 6. (Recommended)* Login with the demo username, demo-mike
Explore the demo data as the fictional user, Mike Brown. 

### 7. (Optional) Register your own unique username
If you would like to start the app without any demo data, register your own unique username and begin adding customized data.


## Demonstration

### Home Page - Personal Financial Snapshot
https://www.loom.com/share/9dfa932548dc43068ee39433032f09d4?sid=3143f5bf-0c00-430f-9294-ffd04b5abb26

### Teams - View Your Expense-Sharing Teams and View Single Team Details
https://www.loom.com/share/825e8eb75f624f758f7098a92041470d?sid=8f0d01f7-610c-4b95-8ea6-9ad7b53b4e38

### Expenses View - View Amounts Owed and Settle Your Portion of an Expense
https://www.loom.com/share/a648651109c34a9398d72f8706394102?sid=67b04de3-e8fa-4aef-8968-926a9fe28299

### Categories - View Spending Analytics By Category and Customize Spending Categories
https://www.loom.com/share/94368ac617e84bbe818a480cfed8ca49?sid=e8dfb01d-5458-46c6-86cc-dad58c883292

More features await in the app itself. Check it out as demo_mike to experience all of the features!

## Created By
Claire Hanson

[GitHub](https://github.com/clairecatohanson)

[LinkedIn](https://www.linkedin.com/in/claire-hanson/)
