# **User Registration and Notification System**

A **User Registration and Notification System** built using **Firebase Functions v2**, **Firebase Firestore**, and **Nodemailer** to send automated welcome emails to users upon registration. This project demonstrates how to use serverless functions with Firebase, integrate Firestore triggers, and send personalized email notifications.

---

## **Table of Contents**

- [**User Registration and Notification System**](#user-registration-and-notification-system)
  - [**Table of Contents**](#table-of-contents)
  - [**Features**](#features)
  - [**Technologies Used**](#technologies-used)
  - [**Prerequisites**](#prerequisites)
      - [Setup](#setup)
      - [Contributing](#contributing)
      - [How to contribute:](#how-to-contribute)

---

## **Features**

- **Automated Welcome Emails**: Sends a personalized welcome email to every new user upon their registration.
- **Firestore Trigger**: Automatically listens for new user documents in the Firestore `users` collection.
- **Custom HTML Email Templates**: Generates personalized email templates with user-specific information.
- **Email Logging**: Logs the status of email delivery, including success or failure, and updates Firestore accordingly.
- **Modular and Scalable**: Easily extendable for additional notifications or features like user verification or password reset emails.

---

## **Technologies Used**

- **Firebase Functions v2**: Serverless backend functions for handling events such as Firestore document changes.
- **Firebase Firestore**: Cloud-based NoSQL database for storing user data.
- **Nodemailer**: For sending transactional emails through SMTP (Gmail, etc.).
- **HTML Email Templates**: Simple email templates using HTML for dynamic content.
- **Firebase CLI**: For deploying and managing Firebase functions.

---

## **Prerequisites**

Before starting, make sure you have the following:

1. **Node.js** (v16 or above) installed on your machine.
2. **Firebase Project** with Firestore and Firebase Functions enabled.
3. **Google Cloud SDK** set up for deploying Firebase functions.
4. **A Gmail account** or any SMTP server to send emails (you will need to set up SMTP credentials).
5. **Firebase CLI** installed and configured.

To install Firebase CLI globally, run:

```bash
npm install -g firebase-tools
```


#### Setup
- Step 1: Clone the Repository

```
git clone https://github.com/mehedihasansabbir220/User-Registration-and-Notification-System.git
cd User-Registration-and-Notification-System
```

- Step 2: Install Dependencies
Inside the project folder, install the required Node.js dependencies:
```
npm install
```
- Step 3: Initialize Firebase Functions
    - If you haven't already initialized Firebase Functions, do so by running:
        ```
        firebase init functions
        ```
    Make sure to select the Firebase project and enable Firestore and Functions.
- Step 4: Configure Nodemailer
  - Set up Nodemailer with your SMTP credentials (example: Gmail) in the index.js file:
    ```
    const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "your-email@gmail.com",  // Replace with your Gmail address
        pass: "your-email-password",    // Use App Password for Gmail
    },
    });
  ```
  Make sure to use an App Password if you're using Gmail with two-factor authentication enabled.
- Step 5: Deploy Functions
  - Deploy the Firebase functions to your Firebase project:
    ```
    firebase deploy --only functions
    ```

#### Usage
This project listens for new documents added to the Firestore users collection. When a new document is added (a new user registers), it automatically triggers the Firebase function to send a welcome email to the user.

- Firestore Data Structure
- Each user document in Firestore should have the following fields:

    - name: The user's full name.
    - email: The user's email address.
    - emailSent: (Optional) A flag indicating whether the welcome email has been sent.

#### New User Registration (Firestore Trigger)
When a new document is added to the users/{userId} collection, the function will send a welcome email to the registered email address.
The email is personalized with the user’s name and includes an HTML-based message.


####  Project Structure

```
user-registration-notification/
│
├── functions/
│   ├── index.js                  # Firebase Functions and Nodemailer logic
│   ├── package.json              # Node.js dependencies
│   └── .env                      # Firebase environment configurations (not in repo)
│
├── README.md                     # Project documentation (this file)
└── .gitignore                    # Git ignore file

```


####  Contributing
- Feel free to fork this project and submit pull requests. For any major changes, please open an issue first to discuss what you’d like to change.

####  How to contribute:
- Fork the repository
- Create a new branch (git checkout -b feature/your-feature)
- Make your changes and commit them (git commit -am 'Add new feature')
- Push your branch (git push origin feature/your-feature)
Open a pull request# User-Registration-and-Notification-System
