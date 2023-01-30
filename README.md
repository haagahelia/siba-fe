<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h1 align="center">SIBA project</h1>

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

This Project is Haaga-Helia's and Sibelius Academy's collaborative work, which aims at building an information system that makes it possible to calculate and optimize Sibelius Academy's teaching space and equipment usage for different lessons.

<p align="right">(<a href="#top">back to top</a>)</p>

### Frontend technology and other useful resources

- [React](https://reactjs.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [Formik](https://formik.org/)
- [MUI](https://mui.com/)
- [Colorhunt](https://colorhunt.co/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Beginning

Frontend side installation instructions

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/haagahelia/siba-fe.git
   ```
2. Install needed packages

   ```sh
   npm install
   ```

3. Create **.env.local** file. Add .env to the root of the project

   ```sh
   REACT_APP_BE_SERVER_BASE_URL=http://localhost:3001/api
   REACT_APP_BE_SERVER_BASE_URL2=http://someotherserver:3001/api
   ```

4. Application launch
   ```sh
   npm start
   ```
5. Attention! Follow [Backend repo](https://github.com/haagahelia/Siba_be) asennusohjetta myös

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

dao.js file unifications

<p align="right">(<a href="#top">back to top</a>)</p>

## Further development ideas

### Add here at the end of the course

The addition of a lesson, where you can copy information from other lessons, could have, in addition to select, a search in the same function, so that the user can find the lesson he wants faster and more easily.

When adding a lesson, you could choose whether the lesson is distance learning, so that the calculation could take into account lessons that do not need or need less teaching space.

In the addition of the teaching, there would be a function with which the form could be reset from the entered inputs

<p align="right">(<a href="#top">back to top</a>)</p>
