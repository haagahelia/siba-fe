export const checkForUserPrograms = (singleSubject, userPrograms) => {
  return userPrograms.find((e) => e === singleSubject.programId);
};
