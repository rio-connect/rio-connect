import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
// import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import LoadingSpinner from './LoadingSpinner';
import { Clubs } from '../../api/club/Club';
import { ProfileClubs } from '../../api/profile/ProfileClubs';
import { ProfilesInterests } from '../../api/profile/ProfileInterests';
import { Profiles } from '../../api/profile/Profile';
import { Interests } from '../../api/interests/Interests';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
// const allInterests = _.pluck(Clubs.collection.find().fetch(), 'type');
// const allInterests = _.pluck(interests, 'type');
// const formSchema = new SimpleSchema({
//   name: String,
//   type: { label: '', type: Array, optional: true },
//   'type.$': { type: String, allowedValues: allInterests },
//   description: String,
//   owner: String,
//   ownerMail: String,
//   image: String,
// });
const makeSchema = () => new SimpleSchema({
  name: String,
  type: { label: 'Club Type', type: String, optional: true,
    allowedValues: ['Academic/Professional', 'Ethic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'],
  },
  description: String,
  owner: String,
  ownerMail: String,
  members: { type: Array, label: 'members', optional: true },
  'members.$': { type: String, optional: true },
  image: String,
});

const AddClubComponent = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, type, description, ownerMail, image } = data;
    const owner = Meteor.user().username;
    const members = Meteor.user().username;
    Clubs.collection.insert(
      { name, type: type, description, owner, ownerMail, image, members: members },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Club added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // const AddClubComponent = () => {
  //
  //   /* On submit, insert the data. */
  //   const submit = (data, formRef) => {
  //     Meteor.call(addClubMethod, data, (error) => {
  //       if (error) {
  //         swal('Error', error.message, 'error');
  //       } else {
  //         swal('Success', 'Project added successfully', 'success').then(() => formRef.reset());
  //       }
  //     });
  //   };

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Interests.userPublicationName);
    const sub2 = Meteor.subscribe(Profiles.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub4 = Meteor.subscribe(ProfileClubs.userPublicationName);
    const sub5 = Meteor.subscribe(Clubs.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
      interests: Interests.collection.find().fetch(),
    };
  }, []);
  // const allInterests = _.pluck(interests, 'name');
  const allInterests = ['Academic/Professional', 'Ethic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'];
  const formSchema = makeSchema(allInterests);
  const bridge = new SimpleSchema2Bridge(formSchema);
  const transform = (label) => ` ${label}`;
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return ready ? (
    <Container className="py-3 gray-background">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Create a Club</h2>
          </Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <TextField showInlineError name="name" />
                  </Col>
                  <Col>
                    <TextField showInlineError name="image" />
                  </Col>
                </Row>
                <Row>
                  <Col><TextField showInlineError name="owner" /></Col>
                  <Col><TextField showInlineError name="ownerMail" /></Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField
                      name="type"
                      showInlineError
                      checkboxes
                      placeholder="Club Type"
                      transform={transform}
                    />
                  </Col>
                  <Col>
                    <LongTextField showInlineError name="description" />
                  </Col>
                </Row>
                <Row className="text-center">
                  <SubmitField value="Submit" />
                </Row>
                <Row>
                  <ErrorsField />
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default AddClubComponent;
