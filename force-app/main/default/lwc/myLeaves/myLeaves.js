import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';

export default class MyLeaves extends LightningElement {
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