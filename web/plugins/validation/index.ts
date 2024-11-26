type Severity = "success" | "warning" | "error";

interface ValidationResult {
  valid: boolean;
  message: string;
  severity: Severity;
  name: string;
}



const phoneValidation = (data :string) :boolean =>{
  const regex = /^(?:\+84|0)[3-9]\d{8}$/;
  return regex.test(data);
}

const passValidation = (data :string) :boolean =>{
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return regex.test(data);
}

const emailValidation = (data :string) : boolean =>{
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(data);
}

const validateInputs = (phoneNumber: string, password: string, email?: string ) : ValidationResult => {
  if (!phoneNumber || !password || !email) {
    return { valid: false, name: 'all', message: "Please fill out all fields' information completely!", severity: "warning" };
  } else if (!phoneValidation(phoneNumber)) {
    return { valid: false, name:'phoneNumber', message: "Please have the correct phone number format!", severity: "warning" };
  } else if (!emailValidation(email)) {
    return { valid: false, message: "Please have the correct email format!", severity: "warning", name: 'email'};
  } else if (!passValidation(password)) {
    return { valid: false, name: 'password', message: "Your password must have at least 8 characters, including uppercase letters, lowercase letters, numbers and special characters!", severity: "warning" };
  } else {
    return { valid: true, message: "Log in successfully!", severity: "success", name: 'success' };
  }
};

export { validateInputs};