type Args = {
  errors: {
    [errorKey: string]: any,
  } | null,
  meta: {
    label: string,
  },
};

const errorMapper = (errors: Args.errors, meta: Args.meta) => {
  const errorMap = {
    email: 'Enter a valid email address.',
    required: `${meta.label} is required.`,
    min: `Must be at least ${(errors && errors.min && errors.min.min) || 1}.`,
    minLength:
      errors && errors.minLength
        ? `Must be at least ${errors.minLength.requiredLength} characters.`
        : 'Not long enough.',
    weightRange: 'Weight must be between 10 and 110 grams.',
    pattern:
      (errors
        && errors.pattern
        && errors.pattern.requiredPattern === '/^\\d+([.]\\d{0,1})?$/'
        && 'Use number format "0.0".')
      || (errors
        && errors.pattern
        && errors.pattern.requiredPattern === '/^\\d+$/'
        && 'Must be a whole number.'),
    dateInFuture: 'Date cannot be in future.',
  };
  if (errors) {
    const result = Object.keys(errorMap).filter(k => k in errors);
    return errorMap[result[0]];
  }

  return null;
};

export default errorMapper;
