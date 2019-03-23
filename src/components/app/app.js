import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import {SwapiServiceProvider} from '../swapi-service-context';
import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage
} from '../pages';


import './app.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    selectedPerson: null,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  onItemSelected = (id) => {
    console.log('selected', id);
    this.setState({
      selectedItem: id
    });
  };

  componentDidCatch = () => {
    this.setState({ hasError: true });
  };

  // planets = (
  //   <div className="row mb2">
  //     <div className="col-md-6">
  //       <ItemList onItemSelected={this.onPersonSelected}
  //         getData={this.swapiService.getAllPlanets}
  //         renderItem={({ name, population }) => `${name} ${population}`} />
  //     </div>
  //     <div className="col-md-6">
  //       <ItemDetails 
  //         itemId={this.state.selectedPerson}
  //         getData={this.swapiService.getP} />
  //     </div>
  //   </div>
  // );

  // starships = (
  //   <div className="row mb2">
  //     <div className="col-md-6">
  //       <ItemList
  //         onItemSelected={this.onPersonSelected}
  //         getData={this.swapiService.getAllStarships}
  //         renderItem={({ name, model }) => `${name} ${model}`} />
  //     </div>
  //     <div className="col-md-6">
  //       <ItemDetails 
  //         itemId={this.state.selectedPerson}
  //         getData={this.swapiService.getStarship} />
  //     </div>
  //   </div>
  // );

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    const planet = this.state.showRandomPlanet ?
      <RandomPlanet /> :
      null;

    return (
      <div className="stardb-app">
        <Router>
          <SwapiServiceProvider value={this.swapiService}>
            <Header />
            {planet}

            <Route path="/"
              render={() => <h2>Welcome to StarDB</h2>}
              exact />
            <Route path="/people/:id?" exact component={PeoplePage} />
            <Route path="/planets/:id?" component={PlanetsPage} />
            <Route path="/starships/:id?" component={StarshipsPage} />


          </SwapiServiceProvider>
        </Router>
      </div>
    );
  };
}