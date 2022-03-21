import { LightningElement, api, track } from 'lwc';
// import { refreshApex } from "@salesforce/apex";
// import { getListOf } from "@salesforce/apex/ProfileHelper.getListOf";

export default class ListContainer extends LightningElement {

    @track list;                // List of records to display
    editingId;                  // RecordId selected for editing
    isEditing = false;          // Edit form visibility
    isCreating = false;         // Create form visibility

    get type() {
        // Implemented types:
        //  Education/Experience
        return this._type;
    }                    
    
    // Type of records we're displaying
    // This is where you can add your own types
    @api set type(input) {
        // Sanity check on strings
        switch (input) {
            case 'Education':
                this._type = input;
                break;
            case 'Experience':
                this._type = input;
                break;
            default:
                console.log('Unsupported list type: ' + input)
                break;
        }
    }

    connectedCallback() {
        this.list = getMockData(5);
        console.log(this.list);
    }

    /**
     *  Wire service method that passes in 'type' and retrieves list of that obj
     */
    // @wire(getListOf, { type: this._type })
    getList({ error, data }) {
        if (error) {
            // Handle error
        }

        this.list = data;
    }

    // Listens for onclick event on record-edit-form submit button
    handleSubmitFormButton() {
        // When record created/edited, refresh list to show changes
        // refreshApex(this.list);

        // Reset state
        this.isEditing = false;
        this.isCreating = false;
        this.editingId = '';
    }

    // Handle displaying the create modal form
    handleCreateRecordButton() {
        this.isCreating = true;
    }

    // Capture event from child row component
    handleEditRecordEvent(event) {
        this.editingId = event.detail.Id;
        this.isEditing = true;
    }
}


/**
 *  Mock Data for Prototyping.
 *  TODO: delete me!
 */
function getMockData(amount) {
    let data = new Array();
    for (let i = 0; i < amount; i++) {
        data.push({
            Id: randomId(),
            Name: 'Test',
            Date: '12/12/1212',
            Detail: 'TEstT Est aTEs'
        })
    }

    return data;
}

function randomId() {
    return String(Math.floor(Math.random() * 10000000));
}