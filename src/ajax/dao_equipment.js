export const fetchEquipmentData = async () => {
  const request = new Request(
    "http://localhost:3001/api/equipment/getEquipData",
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
};
