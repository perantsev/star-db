import React, { Component } from 'react';

import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details';
import ErrorIndicator from '../error-indicator';

import './people-page.css';
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: null,
    hasError: false
  };

  componentDidCatch(error, info) {

    this.setState({
      hasError: true
    });
  }

  onPersonSelected = (selectedPerson) => {

    this.setState({ selectedPerson });
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    return (
      <div className="row mb2">
        <div className="col-md-6">
          {/* <ItemList
            onItemSelected={this.onPersonSelected}
            getData={this.swapiService.getAllPeople}
            renderItem={({ name, gender }) => `${name} (${gender})`} /> */}
        </div>
        <div className="col-md-6">
          <ItemDetails
            itemId={this.state.selectedPerson}
            getData={this.swapiService.getPerson}
            getImageUrl={this.swapiService.getPersonImage} >
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
          </ItemDetails>
        </div>
      </div>
    );
  }
}
