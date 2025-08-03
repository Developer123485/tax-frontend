export const CommonService = {
  isUserLogin,
  getLoginUserDetail,
  isAlphabet,
  isNumeric,
  isNumericDecimal,
  userDetail,
  dateFormat,
  tdsDateFormat,
  getCategory,
  isAlphabetSpecial
};

function isUserLogin() {
  if (typeof window !== "undefined") {
    const user = window.sessionStorage.getItem("userDetail")
      ? JSON.parse(sessionStorage.getItem("userDetail"))
      : null;
    if (user && user.token && user.id) {
      return true;
    }
    return false;
  }
}

function getCategory(value) {
  if (value == 1) {
    return "24Q";
  }
  if (value == 2) {
    return "26Q";
  }
  if (value == 3) {
    return "27EQ";
  }
  if (value == 4) {
    return "27Q";
  }
}

function tdsDateFormat(date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
  );
}

function dateFormat(date) {
  try {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  } catch (error) {
  }
}

function userDetail() {
  if (typeof window !== "undefined") {
    const user = window.sessionStorage.getItem("userDetail")
      ? JSON.parse(sessionStorage.getItem("userDetail"))
      : null;
    if (user && user.token) {
      return user;
    }
    return null;
  }
}

function isAlphabet(value) {
  const re = /^[a-zA-Z0-9 ]*$/;
  if (value === "" || re.test(value)) {
    return true;
  }
}

function isAlphabetSpecial(value) {
  // if (value && value.length == 1) {
  //   const re = /^[a-zA-Z0-9 ]*$/;
  //   if (value === "" || re.test(value)) {
  //     return true;
  //   }
  // } else {
  return true;
  // }
}

function isNumeric(value) {
  const re = /^[0-9]*$/;
  if (value === "" || re.test(value)) {
    return true;
  }
}

function isNumericDecimal(value) {
  const re = /^[0-9.0]*$/;
  if (value === "" || re.test(value)) {
    return true;
  }
}

function getLoginUserDetail() {
  if (typeof window !== "undefined") {
    const user = window.sessionStorage.getItem("userDetail")
      ? JSON.parse(sessionStorage.getItem("userDetail"))
      : null;
    if (user) {
      return user;
    }
  }
}
