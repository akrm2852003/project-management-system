const validation = {
  USERNAME_VALIDATION: {
    required: "User Name Is Required",
    minLength: {
      value: 4,
      message: "Minimum 4 characters",
    },
    maxLength: {
      value: 8,
      message: "Maximum 8 characters",
    },
    pattern: {
      value: /^[A-Za-z]+[A-Za-z0-9]*\d$/,
      message: "Must end with numbers without spaces",
    },
  },

  EMAIL_VALIDATION: {
    required: "Email is required",
    pattern: {
      value: /\S+@\S{3,}\.\S{2,}/,
      message: "Enter a valid email",
    },
  },

  PASSWORD_VALIDATION: (required) => ({
    required,
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    validate: {
      hasUppercase: (value) =>
        /[A-Z]/.test(value) ||
        "Password must contain at least one uppercase letter",
      hasLowercase: (value) =>
        /[a-z]/.test(value) ||
        "Password must contain at least one lowercase letter",
      hasNumber: (value) =>
        /\d/.test(value) || "Password must contain at least one number",
      hasSpecialChar: (value) =>
        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
        "Password must contain at least one special character",
    },
  }),

  CONFIRM_PASSWORD_VALIDATION: (getValues, newPassword) => ({
    required: "Confirm Password is required",
    validate: (value) =>
      value === getValues(newPassword) || "Passwords do not match",
  }),
};

export default validation;
