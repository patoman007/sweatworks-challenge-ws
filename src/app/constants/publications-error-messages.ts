const publicationErrorMessages = {
  emptyId: 'Id param must be provided',
  emptyTitle: 'Title param must be provided',
  emptyBody: 'Body param must be provided',
  emptyAuthor: 'Author param must be provided',
  emptyDatetime: 'Creation datetime param must be provided',
  invalidId: 'Id param must be a string',
  invalidTitle: 'Title param must be a string',
  invalidBody: 'Body param must be a string',
  invalidAuthorId: 'Author id param must be a string',
  invalidDatetime: 'Creation datetime param must be a string',
  invalidPublicationId: (pubId?: string): string => {
    return `Publication ${ pubId || '' } is not valid`;
  },
  invalidAuthor: (authorId?: string): string => {
    return `Author ${ authorId || '' } is not valid`;
  },
};

export {
  publicationErrorMessages
};
