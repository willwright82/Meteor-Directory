import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';

const EmployeeList = () => {
  return(
  <div>
    <div className="employee-list">
      Employee List
    </div>
  </div>
  );
};

export default createContainer(() => {
  // set up subscription
  Meteor.subscribe('employees');

  // return an object. Whatever we rturn will be sent to EmployeeList as props
  return { employees: Employees.find({}).fetch() };
}, EmployeeList);
