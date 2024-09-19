import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';

const COLUMNS = [
    {
        label: 'Request Id',
        fieldName: 'Name',
        
    },
    {
        label: 'From Date',
        fieldName: 'From_Date__c',
        
    },
    {
        label: 'To Date',
        fieldName: 'To_Date__c',
       
    },
    {
        label: 'Reason',
        fieldName: 'Reason__c',
        
    },
    {
        label: 'Approval Status',
        fieldName: 'Status__c',
        
    },
    {
        label: 'Manager Comment',
        fieldName: 'Manager_Comment__c',
        
    },
    {
        type: 'button',
        typeAttributes: {
            label: 'Edit',
            name: 'Edit',
            title: 'Edit',
            value: 'edit',
           
        }
    }
    
];
export default class MyLeaves extends LightningElement {
    columns=COLUMNS;

    myLeaves = [];
    myLeavesWiredResult;
    @wire(getMyLeaves)
    wiredMyLeaves(result) {
        this.myLeavesWiredResult = result;
        if(result.data){
            this.myLeaves = result.data;
        }
        if (result.error) {

            console.log('ERROR OCCURED FETCHING MY LEAVES - ', result.error);
            
        }
    }
}