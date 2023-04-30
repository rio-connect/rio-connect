import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import LoadingSpinner from './LoadingSpinner';
import { Clubs } from '../../api/club/Club';
import { Profiles } from '../../api/profile/Profile';

// Define the schema for the form.
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

// Callback function to add the club to the ClubsCollection.
const AddClubComponent = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, type, owner, ownerMail, description, image } = data;
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

  const { ready } = useTracker(() => {
    // Subscribe to the ClubsCollection to add the club.
    const clubSubscription = Meteor.subscribe(Clubs.userPublicationName);
    const profileSubscription = Meteor.subscribe(Profiles.userPublicationName);
    return {
      ready: clubSubscription.ready() && profileSubscription.ready(),
    };
  }, []);

  // Define the interests for the form dropdown.
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
                    <TextField id="add-form-name" showInlineError name="name" />
                  </Col>
                  <Col>
                    <TextField id="add-form-image" showInlineError name="image" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SelectField
                      id="add-form-type"
                      name="type"
                      showInlineError
                      // multiple
                      placeholder="Choose one..."
                      transform={transform}
                    />
                  </Col>
                  <Col>
                    <LongTextField id="add-form-description" showInlineError name="description" />
                  </Col>
                </Row>
                <HiddenField name="ownerMail" value={Meteor.user().username} />
                <HiddenField name="owner" value={Profiles.collection.findOne().name} />
                <Row className="text-center">
                  <SubmitField id="add-form-submit" value="Submit" />
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
