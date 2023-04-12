import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Interests = () => {
  // State with list of all checked item
  const [checked, setChecked] = useState([]);
  const checkList = ['Games', 'Music', 'Social', 'Culinary'];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => `${total}, ${item}`)
    : '';

  // Return classes based on whether item is checked
  const isChecked = (item) => (checked.includes(item) ? 'checked-item' : 'not-checked-item');

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms

  return (
    <Container className="py-3 gray-background">
      <Row className="justify-content-center">
        <Col xs={3} className="d-flex align-items-center">
          <img src="images/generic-user.png" width="100%" alt="Your user profile" />
        </Col>
        <Col xs={4}>
          <div className="title">Your CheckList:</div>
          <div className="list-container">
            {checkList.map((item, index) => (
              <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>

  );
};

export default Interests;
