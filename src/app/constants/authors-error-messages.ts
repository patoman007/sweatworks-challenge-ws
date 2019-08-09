const authorErrorMessages = {
  emptyId: 'Id param must be provided',
  emptyFirstName: 'First name param must be provided',
  emptyLastName: 'Last name param must be provided',
  emptyEmail: 'Email param must be provided',
  emptyDof: 'Date of birth param must be provided',
  invalidAuthorId: (authorId?: string): string => {
    return `Author id ${ authorId || '' } is not valid`;
  },
  invalidFirstName: 'First name param must be a string',
  invalidLastName: 'Last name param must be a string',
  invalidEmail: 'Please use a valid e-mail address',
  invalidDof: 'Date of birth param must be a string'
};

export {
  authorErrorMessages
};
