import { PublicationInterface } from '../models/publications/publication.interface';

export class PublicationManager {

  static From(title: string,
              body: string,
              authorId: string,
              datetime: string,
              id?: string): PublicationInterface {
    return { id, title, body, authorId, datetime };
  }

  static Created(id: string,
                 publication: PublicationInterface): PublicationInterface {
    const title = publication.title;
    const body = publication.body;
    const authorId = publication.authorId;
    const datetime = publication.datetime;
    return PublicationManager.From(title, body, authorId, datetime, id);
  }
}
