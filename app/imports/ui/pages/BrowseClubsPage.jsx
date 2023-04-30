import React from 'react';
import { Container } from 'react-bootstrap';
import FilterClubs from '../components/FilterClubs';
import BrowseClubsList from '../components/BrowseClubsList';
import { useStickyState } from '../utilities/StickyState';

const allInterests = ['Academic/Professional', 'Ethnic/Cultural', 'Fraternity/Sorority', 'Honorary Society', 'Leisure/Recreational', 'Political', 'Religious/Spiritual', 'Service', 'Sports/Leisure', 'Student Affairs'];

const BrowseClubsPage = () => {
  const [interests, setInterests] = useStickyState('interests', allInterests);
  const [name, setName] = useStickyState('name', '');
  return (
    <Container id="browse-clubs-page" fluid className="mx-auto px-0 ">
      <FilterClubs setInterests={setInterests} setName={setName} />
      <BrowseClubsList interests={interests} name={name} />
    </Container>
  );
};

export default BrowseClubsPage;
