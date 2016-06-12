import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';

class SortByMenuSection extends React.Component {
  handleSortButtonClick(event){
    event.preventDefault()
    console.log(`SortByMenuSection.handleSortButtonClick: sort => ${event.target.dataset.sort}`);
    /*switch(event.target.dataset.sort) {
      case "price":
        let sortType = -1 //hardcoded for now but should come from state or props - must discover which
        Meteor.call('sortByPrice', sortType, (error,response)=>{
          if(error){
            //Bert.alert()
          }else{
            if(response){
              console.log(`we got a reponse from sortByPrice`)
            }
          }
        });
      break;
      case "date":
        let dateSortType = -1 //hardcoded for now but should come from state or props - must discover which
        Meteor.call('sortByDate', dateSortType, (error,response)=>{
          if(error){
            //Bert.alert()
          }else{
            if(response){
              console.log(`we got a reponse from sortByPrice`)
            }
          }
        });
      break;
      default: //--must be sort by category
        let categories = "HARDCODED_CATEGORY_NAME" //hardcoded for now but should come from state or props - must discover which
        Meteor.call('sortByCategory', categories, (error,response)=>{
          if(error){
            //Bert.alert()
          }else{
            if(response){
              console.log(`we got a reponse from sortByPrice`)
            }
          }
        });
      break;
    }*/
  }
  render () {
    return (
      <Row className="show-grid expenses-menu-row">
        <Col md={7}>
          <ButtonGroup >
            <Button bsSize="sm" bsStyle="info" data-sort="category" onClick={this.handleSortButtonClick}>Category- ??</Button >
            <Button bsSize="sm" data-sort="price" onClick={this.handleSortButtonClick.bind(this)}>Price($)</Button>
            <Button bsSize="sm" data-sort="date" onClick={this.handleSortButtonClick.bind(this)}>Date</Button>
          </ButtonGroup>
        </Col>
      </Row>
    )
  }
}

export default SortByMenuSection ;
