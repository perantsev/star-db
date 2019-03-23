import React from 'react';
import ItemList from '../item-list';
import WithData from '../hop-helper/with-data';
import SwapiService from '../../services/swapi-service';

const { getAllPeople, getAllPlanets, getAllStarships} = new SwapiService();

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                { fn }
            </Wrapped>
        );
    };
};

const renderName = ({name}) => <span>{name}</span>;
const renderNameAndModel = ({name, model}) => <span>{name} ({model})</span>;

const PersonList = WithData(withChildFunction(ItemList, renderName), getAllPeople);
const PlanetList = WithData(withChildFunction(ItemList, renderName), getAllPlanets);
const StarshipList = WithData(withChildFunction(ItemList, renderNameAndModel), getAllStarships);

export {
    PersonList,
    PlanetList,
    StarshipList
};