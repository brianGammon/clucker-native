type Args = {
  errors: {
    [errorKey: string]: any,
  } | null,
  meta: {
    mustMatchLabel: string,
    label: string,
  },
};

const errorMapper = (errors: Args.errors, meta: Args.meta) => {
  const errorMap = {
    email: 'Enter a valid email address.',
    required: `${meta.label} is required.`,
    minLength:
      errors && errors.minLength
        ? `Must be at least ${errors.minLength.requiredLength} characters.`
        : 'Not long enough.',
    mustMatch: `Must match ${meta.mustMatchLabel || 'the other field'}.`,
    weightRange: 'Weight must be between 10 and 110 grams.',
    pattern: 'Use number format "0.0".',
    dateInFuture: 'Date cannot be in future.',
  };
  if (errors) {
    const result = Object.keys(errorMap).filter(k => k in errors);
    return errorMap[result[0]];
  }

  return null;
};

export default errorMapper;
