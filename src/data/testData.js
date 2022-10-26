// const testData =
export default {
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
      requiredHours: 40,
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
          allocatedHours: 10,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 10,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 10,
        },
      ],
      allocatedHours: 60,
      requiredHours: 80,
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
          allocatedHours: 10,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 10,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 10,
        },
      ],
      allocatedHours: 95,
      requiredHours: 100,
    },
    {
      id: 5,
      name: "Pohjoismainen nokkahuilu",
      rooms: [
        {
          id: 2,
          name: "n-2222",
          allocatedHours: 30,
        },
        {
          id: 3,
          name: "n-41312",
          allocatedHours: 10,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 10,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 10,
        },
      ],
      allocatedHours: 90,
      requiredHours: 100,
    },
    {
      id: 6,
      name: "Espanjalainen jazz",
      rooms: [
        {
          id: 2,
          name: "n-2222",
          allocatedHours: 30,
        },
        {
          id: 3,
          name: "n-41312",
          allocatedHours: 10,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 10,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 10,
        },
      ],
      allocatedHours: 100,
      requiredHours: 80,
    },
    {
      id: 7,
      name: "Trumpetti solistit",
      rooms: [
        {
          id: 2,
          name: "n-2222",
          allocatedHours: 30,
        },
        {
          id: 3,
          name: "n-41312",
          allocatedHours: 10,
        },
        {
          id: 4,
          name: "n-890",
          allocatedHours: 10,
        },
        {
          id: 5,
          name: "n-62728",
          allocatedHours: 10,
        },
      ],
      allocatedHours: 60,
      requiredHours: 100,
    },
  ],
  subjects: {
    1: [
      {
        id: 1,
        name: "teoria",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 2,
        name: "ryhmäsoitto",
        allocatedHours: 80,
        requiredHours: 100,
      },
      {
        id: 3,
        name: "yksilötunnit",
        allocatedHours: 100,
        requiredHours: 100,
      },
    ],
    2: [
      {
        id: 4,
        name: "teoria",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 5,
        name: "ryhmäsoitto",
        allocatedHours: 80,
        requiredHours: 100,
      },
      {
        id: 6,
        name: "yksilötunnit",
        allocatedHours: 100,
        requiredHours: 100,
      },
    ],
    3: [
      {
        id: 7,
        name: "teoria",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 8,
        name: "ryhmäsoitto",
        allocatedHours: 80,
        requiredHours: 120,
      },
      {
        id: 9,
        name: "yksilötunnit",
        allocatedHours: 120,
        requiredHours: 100,
      },
    ],
    4: [
      {
        id: 10,
        name: "teoria",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 11,
        name: "ryhmäsoitto",
        allocatedHours: 80,
        requiredHours: 100,
      },
      {
        id: 12,
        name: "yksilötunnit",
        allocatedHours: 100,
        requiredHours: 100,
      },
    ],
    5: [
      {
        id: 13,
        name: "teoria",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 14,
        name: "ryhmäsoitto",
        allocatedHours: 80,
        requiredHours: 100,
      },
      {
        id: 15,
        name: "yksilötunnit",
        allocatedHours: 100,
        requiredHours: 100,
      },
    ],
    6: [
      {
        id: 16,
        name: "teoria",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 17,
        name: "ryhmäsoitto",
        allocatedHours: 80,
        requiredHours: 100,
      },
      {
        id: 18,
        name: "yksilötunnit",
        allocatedHours: 100,
        requiredHours: 100,
      },
    ],
    7: [
      {
        id: 20000,
        name: "teoria",
        allocatedHours: 50,
        requiredHours: 100,
      },
      {
        id: 20001,
        name: "ryhmäsoitto",
        allocatedHours: 80,
        requiredHours: 100,
      },
      {
        id: 20002,
        name: "yksilötunnit",
        allocatedHours: 100,
        requiredHours: 100,
      },
    ],
  },
};

// export default testData;
