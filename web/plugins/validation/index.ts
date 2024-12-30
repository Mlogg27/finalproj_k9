type Severity = "success" | "warning" | "error";
interface ValidationResult {
  valid: boolean;
  message?: string;
  severity?: Severity;
  name?: string;
}

const isImage = (data: string) =>  /^data:image\/(jpeg|png|gif);base64,[A-Za-z0-9+/=]+$/.test(data);
const validators: Record<string, (data: string) => boolean> = {
  "phone number": (data: string) => /^(?:\+84|0)[3-9]\d{8}$/.test(data),
  password: (data: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(data),
  email: (data :string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data),
  "first image": isImage,
  "second image": isImage,
  otp: (data: string) => /^\d{6}$/.test(data)
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

    if ((field === "email" || field === "emailRQ") && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data[field])) {
      return {
        valid: false,
        name: field,
        message: `The email is invalid!`,
        severity: "warning",
      };
    }

    if (validators[field] && !validators[field](data[field])) {
      return {
        valid: false,
        name: field,
        message: `The ${field.toLowerCase()} is invalid!`,
        severity: "warning",
      };
    }
  }

  return {
    valid: true,
  };
};


export {validateInputs};