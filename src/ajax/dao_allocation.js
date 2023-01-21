export const getUnAllocableSubjects = async (id) => {
  try {
    const request = new Request(
      `http://localhost:3001/api/allocation/${id}/subject/unallocated`,
      {
        method: "GET",
      },
    );

    const response = await fetch(request);
    if (response.status === 500) {
      return 500;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return "error";
  }
};

export const getSubjectRooms = async (id) => {
  try {
    const request = new Request(
      `http://localhost:3001/api/allocation/subject/${id}/rooms`,
      {
        method: "GET",
      },
    );

    const response = await fetch(request);
    if (response.status === 500) {
      return 500;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return "error";
  }
};

export const getMissingEquipmentForRoom = async (subjectId, roomId) => {
  try {
    const request = new Request(
      `http://localhost:3001/api/allocation/missing-eqpt/subject/${subjectId}/room/${roomId}`,
      {
        method: "GET",
      },
    );

    const response = await fetch(request);
    if (response.status === 500) {
      return 500;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return "error";
  }
};
