import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


const COLUMNS = [
    {
        label: 'Request Id',
        fieldName: 'Name',
        cellAttributes: { class: {fieldName:'cellClass'} },
        
    },
    {
        label: 'From Date',
        fieldName: 'From_Date__c',
        cellAttributes: { class: {fieldName:'cellClass'} },
    
        
    },
    {
        label: 'To Date',
        fieldName: 'To_Date__c',
        cellAttributes: { class: {fieldName:'cellClass'} },
       
    },
    {
        label: 'Reason',
        fieldName: 'Reason__c',
        cellAttributes: { class: {fieldName:'cellClass'} },
        
    },
    {
        label: 'Approval Status',
        fieldName: 'Status__c',
        cellAttributes: { class: {fieldName:'cellClass'} },
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
            disabled: {fieldName:'isEditDisabled'}
        },
        cellAttributes: { class: {fieldName:'cellClass'} }
    }
    
];
export default class MyLeaves extends LightningElement {
    columns=COLUMNS;

    myLeaves = [];
    myLeavesWiredResult;
    showModalPopup=false;
    objectApiName='LeaveRequest__c';
    recordId='';
    @wire(getMyLeaves)
    wiredMyLeaves(result) {
        this.myLeavesWiredResult = result;
        if(result.data){
            this.myLeaves = result.data.map(a=>({
                ...a,
                cellClass: a.Status__c == 'Approved' ? 'slds-theme_success':a.Status__c == 'Rejected' ? 'slds-theme_warning':'',
                isEditDisabled: a.Status__c!=='Pending'

            }));
        }
        if (result.error) {

            console.log('ERROR OCCURED FETCHING MY LEAVES - ', result.error);
            
        }
    }
    get noRecordsFound(){
        return this.myLeaves.length == 0;
        this.recordId='';

    }
    newRequestClickHandler(){
        this.showModalPopup=true;
    }
    popupCloseHandler(event){

        this.showModalPopup=false;
    }
    rowActionHandler(event){
        this.showModalPopup=true;
        this.recordId=event.detail.row.Id;
    }
    successHandler(event){
        this.showModalPopup=false;
        this.showToastEvent('Data Saved Successfully..!');

    }
    showToastEvent(message,title='success', variant='success'){
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}