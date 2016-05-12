import React, {Component} from 'react';
import { Row, Col, FormGroup, FormControl, Well, InputGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { insertExpense } from '../../api/expenses/methods.js';

export class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      price: 0,
      description: '',
      category: [],
      business: ''
    };

    this.handleInsertExpense = this.handleInsertExpense.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
    this.handleBusinessSelect = this.handleBusinessSelect.bind(this);
  }

  handleInsertExpense (event) {
    event.preventDefault();
    this.setState({isProcessing: true})
    const {
      price,
      description,
      category,
      business
    } = this.state;
    insertExpense.call({
      expense: {
        price, description, category, business
      }
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
        this.setState({isProcessing: false});
      } else {
        //%%clear entire form based on refs or what not.
        Bert.alert('Expense added!', 'success');
        this.setState({isProcessing: false});
      }
    });
  }

  handlePriceChange (event) {
    const inputString = event.target.value;
    const inputWithoutDigits = inputString.replace(/\D/g,'');
    event.target.value = parseFloat(inputWithoutDigits).toFixed(2)
    console.log(parseFloat(event.target.value));
    this.setState({price: parseFloat(event.target.value)});
  }

  handleDescriptionChange (event) {
    this.setState({description: event.target.value});
  }

  handleCategoriesChange (event) {
    this.setState({category: event.target.value});
  }

  handleBusinessSelect (event) {

  }

  render() {
    let isProcessing = this.state.isProcessing;
    const renderDropdownBusinessOptions = (
      <DropdownButton dropup bsStyle="link" title="For: AirBnB" id="dropdown_select-business" onSelect={this.handleBusinessSelect}>
        <MenuItem eventKey="1" active>Last: AirBnB</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="2">AirBnb</MenuItem>
        <MenuItem eventKey="3">Freelance Web</MenuItem>
      </DropdownButton>
    );
    return (
      <form onSubmit={this.handleInsertExpense}>
        <Well bsSize="small">
          <Row className="row--half-gutter">
            <Col xs={4} sm={3} md={2}>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl data-role="price" type="number" min="0" step="0.25" onChange={this.handlePriceChange} placeholder="Price"/>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col xs={8} sm={9} md={10}>
              <FormGroup>
                <FormControl data-role="description" type="text" onChange={this.handleDescriptionChange} placeholder="Type a description of expense"/>
              </FormGroup>
            </Col>
          </Row>
          <Row className="row--half-gutter">
            <Col xs={12} sm={7}>
              <FormGroup>
                <FormControl data-role="categories" type="text" onChange={this.handleCategoriesChange} placeholder="Categories"/>
              </FormGroup>
            </Col>
            <Col xs={12} sm={5}>
              <div className="pull-right">
                Needs business selector.
                <Button
                  bsStyle="success"
                  type="submit"
                  disabled={isProcessing}>
                    {isProcessing ? 'Adding Expense...' : 'Add Expense'}
                </Button>
              </div>
            </Col>
          </Row>
        </Well>
      </form>
    )
  }
}

// AddExpense.propTypes = { category: React.PropTypes.number };
// AddExpense.defaultProps = { initialCount: 0 };
