export function validate(values) {
  const errors = {};
  const regName = new RegExp(/[A-Za-zäöåÄÖÅ0-9-\s]*$/); //  ^[A-Za-zäöåÄÖÅ-\s]*$/, [0-9]+[A-Za-zäöåÄÖÅ-\s]*$/
  const regNumber = new RegExp(/^[0-9]+$/);
  const regTime = new RegExp(
    /^([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$/
  );
  const regArea = new RegExp(/^[0-9]*(.[0-9]{1,2})?$/); //  (/^[0-9]{0,2}(.[0-9]{1,2})?$/);
  if (!values.name) {
    errors.name = "Pakollinen kenttä";
  } else if (values.name.length < 2 || values.name.length > 255) {
    errors.name = "Nimen pitää olla 2-255 merkkiä pitkä";
  } else if (!regName.test(values.name)) {
    errors.name = "Vain kirjaimet, numerot ja '-' sallittu";
  }
  if (!values.groupSize) {
    errors.groupSize = "Pakollinen kenttä";
  } else if (values.groupSize <= 0) {
    errors.groupSize = "Ryhmän koko ei voi olla 0";
  } else if (!regNumber.test(values.groupSize)) {
    errors.groupSize = "Vain numerot sallittu";
  }

  if (!values.groupCount) {
    errors.groupCount = "Pakollinen kenttä";
  } else if (values.groupCount <= 0) {
    errors.groupCount = "Ryhmien määrä ei voi olla 0";
  } else if (!regNumber.test(values.groupCount)) {
    errors.groupCount = "Vain numerot sallittu";
  }

  if (!values.sessionLength) {
    errors.sessionLength = "Pakollinen kenttä";
  } else if (!regTime.test(values.sessionLength)) {
    errors.sessionLength = "Sallittu muoto on 00:00:00";
  }

  if (!values.sessionCount) {
    errors.sessionCount = "Pakollinen kenttä";
  } else if (values.sessionCount <= 0) {
    errors.sessionCount = "Opetuksien määrä ei voi olla 0";
  } else if (!regNumber.test(values.sessionCount)) {
    errors.sessionCount = "Vain numerot sallittu";
  }

  if (!values.area) {
    errors.area = "Pakollinen kenttä";
  } else if (values.area <= 0) {
    errors.area = "Vaadittu määrä ei voi olla 0";
  } else if (!regArea.test(values.area)) {
    errors.area = "Vain numerot sallittu & sallittu muoto .00";
  }

  if (!values.programId) {
    errors.programId = "Pakollinen kenttä";
  }
  return errors;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
