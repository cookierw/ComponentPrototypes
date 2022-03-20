import { LightningElement, api, track, wire } from 'lwc';
import { refreshApex } from "@salesforce/apex";
import { getListOf } from "@salesforce/apex/ProfileHelper.getListOf";

export default class ListContainer extends LightningElement {

    @track list;                    // List of records to display
    @api type;                      // Education/Experience
    isEditing = false;              // 
    isCreating = false;             // 

    /**
     *  Wire service method that passes in 'type' and retrieves list of that obj
     */
    @wire(getListOf, { type: this.type })
    getList({ error, data }) {
        if (error) {
            // Handle error
        }

        this.list = data;
    }

    // Handle displaying the create modal form
    onAddNewRowHandler() {
        this.isCreating = true;
    }

    onSubmitHandler() {
        refreshApex(this.list);
    }
}
