# Learning Management System (LMS)
  #### ( Next.js and Express.js)
# Introduction
Welcome to the LMS App - a state-of-the-art Learning Management System designed to provide an interactive and comprehensive online learning experience. Built with Next.js and Express.js, this platform is equipped with advanced features for course management, student engagement, and secure, seamless user experiences.

# Some UI Preview

**Sign-up/sign-in page**
###### clerk authentication for secure user
<p align="center">
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(284).png" height="auto" width="600"/>
</p>

**Courses page**
###### Teacher/Admin to see course lists
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(305).png" alt="Course Page" height="auto" width="600" />

**Courses/:courseId page**
###### Teacher/Admin to create, edit, delete, and see full detail course
<p align="center">
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(289).png" alt="Course Page" height="auto" width="500" />
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(290).png" alt="Course Page" height="auto" width="500" />
</p>

**Chapter page**
###### Teacher/Admin to (create, edit, delete, and see full detail) chapter for a course
<p align="center">
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(293).png" alt="Course Page" height="auto" width="500"/>
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(294).png" alt="Course Page" height="auto" width="500" />
</p>

**Analytics page**
###### Teacher/Admin to analyze how much course are sold and how much revenue gained
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(291).png" alt="Course Page" height="auto" width="600" />

**Chapter page**
###### Customers can enroll for a course, see free chapters
<p align="center">
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(297).png" alt="Course Page" height="auto" width="500" />
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(298).png" alt="Course Page" height="auto" width="500" />
</p>

**Stripe for payment process**
###### Customers check out payment proccess
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(299).png" alt="Course Page" height="auto" width="600" />

**Chapter page**
###### Customers can see course attachments, their progress after purchased the course
<p align="center">
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(295).png" alt="Course Page" height="auto" width="500" />
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(296).png" alt="Course Page" height="auto" width="500" />
</p>

**Dashboard page**
###### Customers can see their progress courses, completed courses
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(301).png" alt="Course Page" height="auto" width="600" />


**Sidebar menu/alerts**
###### responsive and user friendly interfaces
<p align="center">
  <img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(300).png" alt="Course Page" height="auto" width="600" />
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(302).png" alt="Course Page" height="auto" width="350" />
</p>
<p align="center">
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(303).png" alt="Course Page" height="auto" width="400" />
<img src="https://github.com/bemnet16/Learning-management-system/blob/UI-Preview/screenshots/Screenshot%20(304).png" alt="Course Page" height="auto" width="400" />
</p>


# Key Features
Dynamic Course Creation & Management: Easily create and manage course content, including images and attachments.
Robust Authentication: Secure user authentication using Clerk.
Interactive Video Playback & Upload: Integrated with Mux for a smooth video experience.
Secure Payments: Stripe integration for handling course payments and subscriptions.
User-Friendly Interface: Modern, responsive design with Tailwind CSS.
Document and Image Uploads: Utilizing UploadThing for hassle-free file management.

# Technologies Used

## Frontend

**Technologies Used:**

- React *18.2.0*
- Next.js *13.4.12*
- Tailwind CSS *3.3.5*
- React Hook Form *7.48.2*
- React-Quill *2.0.0*
- Recharts *2.10.3*
- Lucide-React *0.294.0*

**Key Libraries:**

- **@clerk/nextjs** *4.27.2*: For secure user authentication.
- **@mux/mux-node** and **@mux/mux-player-react** *7.3.3* & *2.3.0*: For video playback and uploads.
- **@uploadthing/react** *6.0.2*: For handling document and image uploads.
- **react-hot-toast** *2.4.1*: For elegant notifications.
- **zustand** *4.4.7*: State management.

**UI/UX Enhancements:**

- **Tailwind Merge** *2.0.0*: For optimizing Tailwind CSS classes.
- **cmdk** *0.2.0*: Command menu interface.
- **react-dropzone** *14.2.3*: Drag and drop file uploads.
- **@tanstack/react-table** *8.10.7*: For building and managing tables.
- **@radix-ui/react-dialog**, **@radix-ui/react-dropdown-menu**, etc., for advanced UI components.

**Features:**

- Interactive and user-friendly interface.
- Seamless integration with video streaming and file upload services.
- Comprehensive course creation and management tools.
- Responsive design ensuring compatibility across various devices.

**Development Tools:**

- **eslint** *8.54.0*: For code linting.
- **postcss** *8.4.31* and **autoprefixer** *10.4.16*: For CSS processing.
- **typescript** *5.3.2*: For type-checking.


## Backend

**Main Technologies:**

- Express.js *4.18.2*: The backbone of the server, handling routing and middleware.
- Mongoose *8.0.2*: ODM for MongoDB, simplifying database interactions.
- Node.js: The runtime environment for executing JavaScript on the server side.

**Database:**

- MongoDB: NoSQL database used for storing application data.

**Key Libraries and Middleware:**

- **dotenv** *16.3.1*: For managing environment variables.
- **nodemon** *3.0.2* (Development): For automatically restarting the server during development.

**Features:**

- Robust REST API endpoints for data retrieval and manipulation.
- Secure connection to the database with efficient query handling.
- Scalable architecture suitable for expanding features and user base.

**Security and Authentication:**

- Integrated security measures for API endpoints.
- Authentication and authorization logic to protect user data.

**Development Tools:**

- Various NPM packages for enhancing functionality and efficiency.
- Postman for testing and validating API endpoints.

**Integrations:**

- **Stripe** for payment processing: Integrated with Stripe's webhooks for handling transactions.
- Other third-party services as required by the application.


