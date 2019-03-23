import React from 'react';
import PropTypes from 'prop-types';

import './item-list.css';


const ItemList = (props) => {
  console.log('props', props);

  const items = props.data.map((item) => {
    const content = props.children(item);
    return (
      <li className="list-group-item"
        key={item.id}
        onClick={() => props.onItemSelected(item.id)}>
        {content}
      </li>
    )
  });

  return (
    
      <ul className="item-list list-group">
        {items}
      </ul>
  );
}

ItemList.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.func.isRequired
}

export default ItemList;