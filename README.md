GW

---

# Comfie - Comforting Companion

## Setup Guide
1. **Database Setup**: 
    - Make sure you have XAMPP installed on your system.
    - Start Apache and MySQL modules in XAMPP Control Panel.
    - Open phpMyAdmin and create a new database named `login_register`.
    - Insert the necessary columns for the the table named `users`.
2. **File Placement**:
    - Place all PHP files (`database.php`, `index.php`, `login.php`, `logout.php`, `registration.php`) in your web server's directory.
    - Place `style.css` in your web server's directory.
3. **Configuration**:
    - Open `database.php` and modify the database connection settings if necessary (username, password, hostname, etc.).

## Functions
1. **index.php**:
    - This is the main page of the website.
    - Users can navigate to the login or registration pages from here.

2. **login.php**:
    - Allows existing users to log in to their accounts.
    - Validates user credentials against the database.
    - Redirects to `index.php` on successful login.
    - Displays error messages for invalid login attempts.

3. **logout.php**:
    - Logs out the current user by destroying the session.
    - Redirects to `index.php` after logout.

4. **registration.php**:
    - Allows new users to register for an account.
    - Validates user inputs (username, email, password, etc.).
    - Inserts new user data into the database upon successful registration.
    - Redirects to `index.php` on successful registration.
    - Displays error messages for invalid registration attempts.

5. **database.php**:
    - Contains database connection settings and functions for interacting with the database.
    - Includes functions for user authentication, registration, and logout.

## Purpose
This website project serves as a simple login-register system for our Comfie.AI but because of the time constraints, we made a choice to put this as a future feature. Users can create an account, log in, and log out. The project demonstrates basic PHP web development principles including database interaction, user authentication, form validation, and session management. It can be used as a foundation for more complex web applications requiring user authentication functionalities.
