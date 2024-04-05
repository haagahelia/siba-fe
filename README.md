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

3. Create **.env** file. Add .env to the root of the project.

   ```sh
   VITE_BE_SERVER_BASE_URL=http://...backend server address and port here.../api
   VITE_BE_SERVER_BASE_URL2=http://someotherserver:3001/api
   ```
   Basically start the backend, make sure it runs and copy the working address here, adding /api at the end. E.g. http://localhost:1234/api

   Optional environment variables:
   ```sh
   VITE_MODE=development    # This enables e.g. debug logs in console
   PORT=5173                # This changes the frontend port number. If this is not set then default port 5173 is used
   ```

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

2. If you have .env.local file then rename it to .env (or copy and rename)

   Add PORT environment variable to the .env file
   ```sh
   PORT=5173
   ```

3. Run this command to launch the application using Node development server.
   ```sh
   docker-compose -f docker-compose-fe-dev.yaml up -d
   ```

4. OR run this command to launch the application using Nginx web server. This is more suitable for production environment.
   ```sh
   docker-compose -f docker-compose-fe-nginx.yaml up -d
   ```

   The container overwrites default Nginx configuration file with the `nginx.conf` file found at the project root. It contains directives to make the React application work properly.

5. Access the application e.g. http://localhost:5173. Replace the port with the port you set in step 2.

6. Stop and remove the started container depending on which command you ran:
   ```sh
   docker-compose -f docker-compose-fe-dev.yaml down
   ```
   OR
   ```sh
   docker-compose -f docker-compose-fe-nginx.yaml down
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

## Project overview structure
This is the current structure of front-end development. Last updated 21.11.2023
<pre>
├── App.css
├── App.jsx
├── AppContext.js
├── ajax
│   ├── ajaxRequestErrorHandler.js
│   ├── dao.ts
│   ├── dao_allocRound.ts
│   ├── dao_allocation.ts
│   ├── dao_building.ts
│   ├── dao_department.ts
│   ├── dao_departmentplanner.ts
│   ├── dao_equipment.ts
│   ├── dao_program.ts
│   ├── dao_resetDatabase.ts
│   ├── dao_settings.ts
│   ├── dao_space.ts
│   ├── dao_spaceEquipment.ts
│   ├── dao_spaceType.ts
│   ├── dao_subject.ts
│   ├── dao_subjectEquipment.ts
│   ├── dao_user.ts
│   └── request.ts
├── components
│   ├── allocRound
│   │   ├── AddAllocRound.jsx
│   │   ├── AddAllocRoundForm.jsx
│   │   ├── AllocRoundControlPanel.jsx
│   │   ├── AllocRoundDetails.jsx
│   │   ├── AllocRoundInputField.jsx
│   │   ├── AllocRoundList.jsx
│   │   ├── AllocRoundListContainer.jsx
│   │   ├── AllocRoundPagination.jsx
│   │   ├── DeleteAllocRound.jsx
│   │   ├── EditAllocRound.jsx
│   │   ├── EditAllocRoundForm.jsx
│   │   └── SelectAllocRound.jsx
│   ├── building
│   │   ├── AddBuildingContainer.jsx
│   │   ├── AddBuildingForm.jsx
│   │   ├── BuildingDisplay.jsx
│   │   ├── BuildingInputField.jsx
│   │   ├── BuildingList.jsx
│   │   ├── BuildingListContainer.jsx
│   │   ├── BuildingListItem.jsx
│   │   ├── BuildingListPagination.jsx
│   │   ├── BuildingTemplate.jsx
│   │   ├── DeleteBuilding.jsx
│   │   ├── EditBuildingContainer.jsx
│   │   ├── EditBuildingForm.jsx
│   │   ├── ExportBuildingButton.jsx
│   │   ├── ImportBuildingButton.jsx
│   │   ├── ImportBuildingContainer.jsx
│   │   └── SingleBuildingDialog.jsx
│   ├── common
│   │   ├── AlertBox.jsx
│   │   └── ConfirmationDialog.jsx
│   ├── department
│   │   ├── AddDepartment.jsx
│   │   ├── AddDepartmentDialogConfirmation.jsx
│   │   ├── DeleteDepartment.jsx
│   │   ├── DepartmentDialog.jsx
│   │   ├── DepartmentList.jsx
│   │   ├── DepartmentListContainer.jsx
│   │   ├── Departments.jsx
│   │   ├── EditDepartment.jsx
│   │   └── SingleDepartmentDialog.jsx
│   ├── equipment
│   │   ├── AddEquipment.jsx
│   │   ├── AddEquipmentDialogConfirmation.jsx
│   │   ├── DeleteEquipment.jsx
│   │   ├── EditEquipment.jsx
│   │   ├── EquipmentList.jsx
│   │   ├── EquipmentListContainer.jsx
│   │   ├── EquipmentTemplate.jsx
│   │   ├── Equipments.jsx
│   │   ├── ExportEquipmentButton.jsx
│   │   ├── ImportEquipmentButton.jsx
│   │   ├── ImportEquipmentContainer.jsx
│   │   └── SingleEquipmentDialog.jsx
│   ├── program
│   ├── result
│   │   ├── CollapsedRow.jsx
│   │   ├── CollapsedRowB.jsx
│   │   ├── ProgramResult.jsx
│   │   ├── RoomResult.jsx
│   │   └── SubjectResult.jsx
│   ├── room
│   │   ├── RoomList.jsx
│   │   └── RoomsWithTimesList.jsx
│   ├── settings
│   │   ├── AddSettingContainer.jsx
│   │   ├── AddSettingForm.jsx
│   │   ├── DeleteSetting.jsx
│   │   ├── EditSettingContainer.jsx
│   │   ├── EditSettingForm.jsx
│   │   ├── SettingsDetails.jsx
│   │   ├── SettingsList.jsx
│   │   └── SettingsListContainer.jsx
│   ├── space
│   │   ├── AddSpace.jsx
│   │   ├── AddSpaceDialogConfirmation.jsx
│   │   ├── AddSpaceEquipContainer.jsx
│   │   ├── AddSpaceEquipForm.jsx
│   │   ├── DeleteSpace.jsx
│   │   ├── EditSpaceContainer.jsx
│   │   ├── EditSpaceForm.jsx
│   │   ├── ExportSpaceButton.jsx
│   │   ├── ImportSpaceButton.jsx
│   │   ├── ImportSpaceContainer.jsx
│   │   ├── SingleSpaceDialog.jsx
│   │   ├── SpaceEquipmentList.jsx
│   │   ├── SpaceFiltering.jsx
│   │   ├── SpaceList.jsx
│   │   ├── SpaceListContainer.jsx
│   │   ├── SpacePagination.jsx
│   │   └── SpaceTemplate.jsx
│   ├── subject
│   │   ├── AddSubEquipContainer.jsx
│   │   ├── AddSubEquipForm.jsx
│   │   ├── AddSubjectContainer.jsx
│   │   ├── AddSubjectForm.jsx
│   │   ├── DeleteSubEquip.jsx
│   │   ├── DeleteSubject.jsx
│   │   ├── EditSubEquipContainer.jsx
│   │   ├── EditSubEquipForm.jsx
│   │   ├── EditSubjectContainer.jsx
│   │   ├── EditSubjectForm.jsx
│   │   ├── ExportSubjectButton.jsx
│   │   ├── ImportSubjectButton.jsx
│   │   ├── ImportSubjectContainer.jsx
│   │   ├── SingleSubjectDialog.jsx
│   │   ├── SubjectEquipmentList.jsx
│   │   ├── SubjectFiltering.jsx
│   │   ├── SubjectList.jsx
│   │   ├── SubjectListContainer.jsx
│   │   ├── SubjectPagination.jsx
│   │   └── SubjectTemplate.jsx
│   └── user
│       ├── AddDepartmentPlannerContainer.jsx
│       ├── AddDepartmentPlannerForm.jsx
│       ├── AddUser.jsx
│       ├── DeleteUser.jsx
│       ├── DeleteUserPlanner.jsx
│       ├── EditUserContainer.jsx
│       ├── EditUserForm.jsx
│       ├── SingleUserDialog.jsx
│       ├── UserDepartmentList.jsx
│       ├── UserFiltering.jsx
│       ├── UserList.jsx
│       ├── UserListContainer.jsx
│       └── UserPagination.jsx
├── data
│   ├── ResultAllocationStore.js
│   ├── ResultProgramStore.js
│   ├── ResultRoomsStore.js
│   └── testData.js
├── hooks
│   ├── useRoleLoggedIn.js
│   └── useThemeSwitcher.js
├── importDataFunctions
│   ├── exportData.js
│   ├── importData.js
│   └── processFile.js
├── logger
│   └── logger.ts
├── main.jsx
├── routers
│   └── Nav.jsx
├── styles
│   ├── AllocationFailure.css
│   ├── ColorModelFrom_2022FallGroup.png
│   ├── ColorModelFrom_2022FallGroup_3.png
│   ├── ResultView.css
│   ├── SibeliusLogo.svg
│   ├── SibeliusLogoLoginPage.svg
│   ├── SibeliusLogoSmall.svg
│   ├── palettes
│   │   ├── commonColors.ts
│   │   ├── darkPalette.ts
│   │   ├── lightPalette.ts
│   │   ├── redPalette.ts
│   │   └── yellowPalette.ts
│   ├── theme.js
│   └── themeIcons.jsx
├── types
│   ├── colors.ts
│   └── index.ts
├── validation
│   ├── ValidateAddAllocRound.js
│   ├── ValidateAddBuilding.js
│   ├── ValidateAddEditDepartment.js
│   ├── ValidateAddEditSetting.js
│   ├── ValidateAddEquipment.js
│   ├── ValidateAddSpace.js
│   ├── ValidateAddSpaceEquipment.js
│   ├── ValidateAddSubject.js
│   ├── ValidateAddSubjectEquipment.js
│   ├── ValidateEditAllocRound.js
│   ├── ValidateEditBuilding.js
│   ├── ValidateEditEquipment.js
│   ├── ValidateEditSpace.js
│   ├── ValidateEditSubject.js
│   ├── ValidateEditSubjectEquipment.js
│   └── ValidateEditUser.js
├── views
│   ├── AllocRoundView.jsx
│   ├── AllocationSubjectFailureView.jsx
│   ├── BuildingView.jsx
│   ├── DepartmentView.jsx
│   ├── EquipmentView.jsx
│   ├── ForgetPasswordView.jsx
│   ├── LoginView.jsx
│   ├── NotFoundView.jsx
│   ├── ProgramResultView.jsx
│   ├── RegisterView.jsx
│   ├── ResetPasswordView.jsx
│   ├── RoomResultView.jsx
│   ├── SettingsView.jsx
│   ├── SpaceView.jsx
│   ├── SubjectView.jsx
│   └── UserView.jsx
└── vite-env.d.ts
</pre>

<p align="right">(<a href="#top">back to top</a>)</p>
