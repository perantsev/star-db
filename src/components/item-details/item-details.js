import React, { Component } from 'react';

import './item-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button'

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  swapiService = new SwapiService();
  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateitem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({ item: 'updating' });
      this.updateitem();
    }
  }

  updateitem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId)
      .then((item) => {
        this.setState({
          item: item,
          image: getImageUrl(item)
        });
      });
  }

  render() {
    const item = this.state.item;
    if (!item) {
      return <span>Select a item from a list</span>
    }
    if (item === 'updating')
      return <Spinner />
    const { name, gender, birthYear, eyeColor } = item;
    return (
      <div className="item-details card">
        <img className="item-image"
          src={this.state.image}
          alt="character" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            { 
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
               }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}
