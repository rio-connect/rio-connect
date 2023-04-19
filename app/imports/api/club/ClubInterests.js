import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ClubsCollection. It encapsulates state and variable values for clubs.
 */
class ClubInterestsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ClubInterestsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      club: String,
      interest: String,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.publicPublicationName = `${this.name}.publication.public`;
  }
}

/**
 * The singleton instance of the ClubsInterestsCollection.
 * @type {ClubInterestsCollection}
 */
export const ClubInterests = new ClubInterestsCollection();
