type Severity = "success" | "warning" | "error";

interface ValidationResult {
  valid: boolean;
  message: string;
  severity: Severity;
  name?: string;
}

const validators: Record<string, (data: string) => boolean> = {
  phoneNumber: (data: string) => /^(?:\+84|0)[3-9]\d{8}$/.test(data),
  password: (data: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(data),
  email: (data: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data),
};

const validateInputs = (data: Record<string, string>, requiredFields: string[]): ValidationResult => {
  for (const field of requiredFields) {
    if (!data[field]) {
      return {
        valid: false,
        name: field,
        message: `Please fill out the ${field} field!`,
        severity: "warning",
      };
    }
    if (validators[field] && !validators[field](data[field])) {
      if(field === 'password' ){
        return {
          valid: false,
          name: field,
          message: `The ${field} is invalid, password must have at least 8 characters, including uppercase letters, lowercase letters, numbers and special characters!`,
          severity: "warning",
        };
      }
      return {
        valid: false,
        name: field,
        message: `The ${field} is invalid!`,
        severity: "warning",
      };
    }
  }

  return {
    valid: true,
    message: "Log in successfully!",
    severity: "success",
  };
};


export {validateInputs};