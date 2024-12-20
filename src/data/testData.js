// EXTRA File, fake data for initial app dev
// Not used anymore

/*
const testData = {
  rooms: [
    {
      id: 1,
      name: "n-1234",
      allocatedHours: 50,
      requiredHours: 60,
    },
    {
      id: 2,
      name: "n-2222",
      allocatedHours: 15,
      requiredHours: 60,
    },
    {
      id: 3,
      name: "n-41312",
      allocatedHours: 50,
      requiredHours: 60,
    },
    {
      id: 4,
      name: "n-890",
      allocatedHours: 60,
      requiredHours: 60,
    },
    {
      id: 5,
      name: "n-62728",
      allocatedHours: 50,
      requiredHours: 100,
    },
  ],
  programs: [
    {
      id: 1,
      name: "Huilu soittajat",
      rooms: [
        {
          name: "n-2222",
          allocatedHours: 20,
        },
        {
          id: 3,
          name: "n-41312",
          allocatedHours: 5,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 8,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 10,
        },
      ],
      allocatedHours: 43,
      requiredHours: 50,
    },
    {
      id: 2,
      name: "Bongo soittajat",
      rooms: [
        {
          id: 2,
          name: "n-2222",
          allocatedHours: 20,
        },
        {
          id: 3,
          name: "n-41312",
          allocatedHours: 5,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 8,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 12,
        },
      ],
      allocatedHours: 45,
      requiredHours: 40,
    },
    {
      id: 3,
      name: "Jazz klarinetistit",
      rooms: [
        {
          id: 2,
          name: "n-2222",
          allocatedHours: 30,
        },
        {
          id: 3,
          name: "n-41312",
          allocatedHours: 30,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 20,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 10,
        },
      ],
      allocatedHours: 90,
      requiredHours: 60,
    },
    {
      id: 4,
      name: "Viulistit",
      rooms: [
        {
          id: 2,
          name: "n-2222",
          allocatedHours: 30,
        },
        {
          id: 3,
          name: "n-41312",
          allocatedHours: 40,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 20,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 20,
        },
      ],
      allocatedHours: 110,
      requiredHours: 130,
    },
    {
      id: 5,
      name: "Pohjoismainen nokkahuilu",
      rooms: [
        {
          id: 2,
          name: "n-2222",
          allocatedHours: 11,
        },
        {
          id: 3,
          name: "n-41312",
          allocatedHours: 30,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 20,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 20,
        },
        {
          id: 6,
          name: "n-420",
          allocatedHours: 30,
        },
        {
          id: 7,
          name: "n-123469",
          allocatedHours: 69,
        },
      ],
      allocatedHours: 180,
      requiredHours: 90,
    },
    {
      id: 6,
      name: "Espanjalainen jazz",
      rooms: [
        {
          id: 2,
          name: "n-2222",
          allocatedHours: 35,
        },
        {
          id: 3,
          name: "n-41312",
          allocatedHours: 10,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 30,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 40,
        },
      ],
      allocatedHours: 115,
      requiredHours: 90,
    },
    {
      id: 7,
      name: "Trumpetti solistit",
      rooms: [
        {
          id: 2,
          name: "n-2222",
          allocatedHours: 25,
        },
        {
          id: 3,
          name: "n-41312",
          allocatedHours: 10,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 30,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 15,
        },
      ],
      allocatedHours: 80,
      requiredHours: 155,
    },
  ],
  subjects: {
    1: [
      {
        id: 1,
        name: "subjekti1",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 2,
        name: "subjekti2",
        allocatedHours: 80,
        requiredHours: 100,
      },
      {
        id: 3,
        name: "subjekti3",
        allocatedHours: 75,
        requiredHours: 100,
      },
    ],
    2: [
      {
        id: 4,
        name: "subjekti4",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 5,
        name: "subjekti5",
        allocatedHours: 75,
        requiredHours: 100,
      },
      {
        id: 6,
        name: "subjekti6",
        allocatedHours: 60,
        requiredHours: 100,
      },
    ],
    3: [
      {
        id: 7,
        name: "subjekti3",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 8,
        name: "subjekti1",
        allocatedHours: 80,
        requiredHours: 120,
      },
      {
        id: 9,
        name: "subjekti6",
        allocatedHours: 120,
        requiredHours: 100,
      },
    ],
    4: [
      {
        id: 10,
        name: "subjekti7",
        allocatedHours: 50,
        requiredHours: 120,
      },
      {
        id: 11,
        name: "subjekti12",
        allocatedHours: 60,
        requiredHours: 100,
      },
      {
        id: 12,
        name: "subjekti4",
        allocatedHours: 110,
        requiredHours: 100,
      },
    ],
    5: [
      {
        id: 13,
        name: "subjekti4",
        allocatedHours: 50,
        requiredHours: 150,
      },
      {
        id: 14,
        name: "subjekti1",
        allocatedHours: 80,
        requiredHours: 75,
      },
      {
        id: 15,
        name: "subjekti7",
        allocatedHours: 100,
        requiredHours: 100,
      },
    ],
    6: [
      {
        id: 16,
        name: "subjekti5",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 17,
        name: "subjekti3",
        allocatedHours: 80,
        requiredHours: 50,
      },
      {
        id: 18,
        name: "subjekti4",
        allocatedHours: 75,
        requiredHours: 100,
      },
    ],
    7: [
      {
        id: 20000,
        name: "subjekti4",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 20001,
        name: "subjekti4",
        allocatedHours: 80,
        requiredHours: 100,
      },
      {
        id: 20002,
        name: "subjekti9",
        allocatedHours: 100,
        requiredHours: 100,
      },
    ],
  },
};

export default testData;
*/
