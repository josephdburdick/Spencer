import React from 'react';

const renderIfData = ( categories ) => {
  console.log(`categories is ${JSON.stringify(categories)}`)
  if ( categories && categories.length > 0 ) {
    return categories.map( ( cat ) => {
      console.log(`cat is ${cat}`);
      return <li key={ cat._id }>{ cat.value} - {cat.label}</li>;
    });
  } else {
    return <p>No categories yet!</p>;
  }
};

export const Tester = ( { categories } ) => (
  <ol>{ renderIfData( categories ) }</ol>
);
