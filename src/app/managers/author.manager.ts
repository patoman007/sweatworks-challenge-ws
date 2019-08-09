import { AuthorInterface } from '../models/authors/author.interface';

export class AuthorManager {

  static From(firstName: string, lastName: string,
              email: string, dof: string, id?: string): AuthorInterface {
    return { id, firstName, lastName, email, dof };
  }

  static Created(id: string, author: AuthorInterface): AuthorInterface {
    return AuthorManager.From(author.firstName, author.lastName,
      author.email, author.dof, id);
  }
}
