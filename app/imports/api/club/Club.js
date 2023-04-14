import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ClubsCollection. It encapsulates state and variable values for stuff.
 */
class ClubsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ClubsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      type: {
        type: String,
        allowedValues: ['Academic/Professional', 'Sports/Leisure',
          'Service', 'Fraternity/Sorority', 'Religious/Spiritual',
          'Political', 'Leisure/Recreational', 'Student_Affairs',
          'Honorary_Society', 'Ethnic/Cultural'],
      },
      description: String,
      owner: String,
      ownerMail: String,
      members: Array,
      admins: String,
      'members.$': String,
      image: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ClubsCollection.
 * @type {ClubsCollection}
 */
export const Clubs = new ClubsCollection();
