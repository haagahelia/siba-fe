<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h1 align="center">Siba project - Frontend</h1>

<h3 align="center">
   This project was created on the courses Softala-projekti / Software Project<br />
<br />
</div>

## Authors

  <p>SIBA22S</p>
  <p>SIBA23K</p>
  <p>SWP23K</p>

<!-- ABOUT THE PROJECT -->

## About the project

Copyrights reserved. This Project is collaborative work, which aims at building an information system that makes it possible to calculate and optimize teaching space and equipment usage for different lessons.

<p align="right">(<a href="#top">back to top</a>)</p>

### Frontend technology and other useful resources

- [React](https://reactjs.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [Formik](https://formik.org/)
- [MUI](https://mui.com/)
- [Colorhunt](https://colorhunt.co/)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Beginning

Frontend side installation instructions

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/haagahelia/siba-fe.git
   ```

2. Change directory

   ```sh
   cd siba-fe
   ```

3. Create **.env.local** file. Add .env to the root of the project.

   ```sh
   VITE_BE_SERVER_BASE_URL=http://...backend server address and port here.../api
   VITE_BE_SERVER_BASE_URL2=http://someotherserver:3001/api
   ```
   Basically start the backend, make sure it runs and copy the working address here, adding /api at the end. E.g. http://localhost:1234/api

4. Install needed packages

   ```sh
   npm install
   ```

5. Application launch
   ```sh
   npm start
   ```
6. Attention! Follow [Backend repo](https://github.com/haagahelia/Siba_be) installation instructions also

### How to run using docker-compose

1. Follow installation steps from 1 to 3

2. Run this command to launch application

   ```sh
   docker-compose -f docker-compose-fe.yaml up -d
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Using the system

### Teachings/Opetukset screen

1. In the lesson view, there is an option to add new lessons in the "Add lesson" section. The user also has the option to copy the information of an already existing lesson from the dropdown menu
2. All entered lessons are listed under the "Lessons" heading. Lessons can be searched using the "Teaching search:" text field
3. Listed lessons can be selected and then the Popup Dialog of the lesson will appear. In this dialog, you can remove, modify or add equipment to the lesson
4. The list always shows 15 lessons at once. At the bottom of the list, you can use pagination, where you can browse more lessons

### Results view

1. In the results view, the user starts the allocation with the "Start Allocation" button.

2. The user cannot start another allocation until he has pressed the "Reset Allocation" button.

3. At this moment, the user needs to refresh the page in order to see the changes to the allocation.

4. In the subject group section, the user can open a dropdown menu that tells which rooms the subject group uses and how many hours that room is in use.

5. By pressing the subject group information button, a pop-up window opens where the user can see subject-specific lessons.
    In the pop-up window, the user can open the lesson-specific dropdowns, from which you can see which room the lesson is in.

6. In the Room section, the user can see all the rooms in use and their occupancy rates.

7. In the Room section, the user can open the room-specific dropdown lists, where you can see what classes are in the rooms and how many hours they are used

8. The rooms are separated by color code, by class type. E.g. Studio, Performance spaces, Lecture classes and music classes

<p align="right">(<a href="#top">back to top</a>)</p>

## Problems inherited from the old course teams

### Add here at the end of the course

<p align="right">(<a href="#top">back to top</a>)</p>

## Further development ideas

### Add here at the end of the course

The addition of a lesson, where you can copy information from other lessons, could have, in addition to select, a search in the same function, so that the user can find the lesson he wants faster and more easily.

When adding a lesson, you could choose whether the lesson is distance learning, so that the calculation could take into account lessons that do not need or need less teaching space.

In the addition of the teaching, there would be a function with which the form could be reset from the entered inputs

dao.js file unifications

<p align="right">(<a href="#top">back to top</a>)</p>

## For Front-end Developers

### Styling
siba-fe\src\styles\theme.js <br>
[The Design](https://www.figma.com/file/c46uL5QTgbCKJAV2PyWUry/Soft-Dev-Project-Prototype?type=design&node-id=0-1&mode=design&t=52coA80ZYzrb7Dox-0) <br>

### Navigation Bar
siba-fe\src\routers\Nav.jsx <br>

### Lessons Page
siba-fe\src\views\SubjectView.jsx <br>

### Allocation Page
siba-fe\src\views\AllocRoundView.jsx <br>

### Buildings Page
siba-fe\src\components\building\BuildingList.jsx <br>

### Departments Page
siba-fe\src\components\department\Departments.jsx <br>

### Equipment Page
siba-fe\src\components\equipment\Equipments.jsx <br>

### Spaces Page
siba-fe\src\views\SpaceView.jsx <br>
siba-fe\src\components\space\AddSpace.jsx <br>

### Program Results Page
siba-fe\src\components\result\ProgramResult.jsx <br>

### Room Results Page
siba-fe\src\components\result\RoomResult.jsx <br>

### Register Page
siba-fe\src\components\user\AddUser.jsx <br>

### User List Page
siba-fe\src\views\UserView.jsx <br>

### Settings Page
siba-fe\src\views\SettingsView.jsx <br>

### Log In Page
siba-fe\src\views\LoginView.jsx <br>

<p align="right">(<a href="#top">back to top</a>)</p>
