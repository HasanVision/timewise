# Timewise

# Employee Work Time Tracker

## Features

### 1. User Authentication
- Employee and Admin login.
- Registration for employees with basic profile details (name, contact info, hourly wage).

### 2. Time Tracking
- Employees can clock in and clock out daily.
- A dashboard that shows total hours worked for the current day, week, or month.

### 3. Income and Tax Calculation
- Gross income is calculated based on the total hours worked and the employee’s hourly rate.
- Tax deductions are calculated automatically based on a predefined tax rate (e.g., 10-20%).
- Display of gross income, tax deducted, and net income.

### 4. Admin Dashboard
- Admins can add, edit, or remove employee profiles.
- Admins can view and manage the total work hours and income of employees.
- Generate simple payroll reports for all employees.

### 5. Reporting and Analytics
- Employees can view their own work and income reports for specific time periods.
- Admins can generate reports showing work hours, gross income, taxes, and net income.

## Technologies

### 1. Frontend
- **HTML/CSS** for structure and styling.
- **JavaScript** for interaction and form validation.
- **Angular** for frontend


### 2. Backend
- **PHP** to handle server-side logic and manage data flow between the frontend and database.
- **MySQL** to store employee information, work logs, income, and tax data.

### 3. Database
- **MySQL** or any other relational database to store employee data, hours worked, and income details.

### 4. Authentication
- Simple authentication system using PHP sessions for employee and admin login/logout functionality.

## Expected Outcomes
By the end of this project, the system will:
- Provide a fully functional employee time tracking system.
- Accurately calculate employee income and tax deductions.
- Offer reporting features for both employees and administrators.
- Enable small businesses or organizations to track work hours and manage payroll efficiently.

## Conclusion
This Employee Work Time Tracker project will provide a practical solution for businesses to manage employee work hours and income, with an easy-to-use interface. It will demonstrate my understanding of web development concepts such as user authentication, form handling, database interaction, and income/tax calculations.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

