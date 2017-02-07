import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

class EmployeeList extends Component {
  componentWillMount() {
    this.page = 1;
  }

  handleButtonClick() {
    this.page += 1;
    Meteor.subscribe('employees', PER_PAGE * this.page);
  }

  render() {
    // props.employees => an array of employee objects
    return(
      <div>
        <div className="employee-list">
          {this.props.employees.map(employee =>
            <EmployeeDetail key={employee._id} employee={employee} />
          )}
        </div>
        <p className="text-center">
          <button onClick={this.handleButtonClick.bind(this)}
            className="btn-lg btn-primary">
            Load more...
          </button>
        </p>
      </div>
    );
  }
};

export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees', PER_PAGE);

  // return an object. Whatever we rturn will be sent to EmployeeList as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
