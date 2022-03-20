import { LightningElement, api, track } from 'lwc';
// import { refreshApex } from "@salesforce/apex";
// import { getListOf } from "@salesforce/apex/ProfileHelper.getListOf";


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


export default class ListContainer extends LightningElement {

    @track list;

    get type() {
        return this._type;
    }                    
    
    // List of records to display
    @api set type(input) {
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
    }                      // Education/Experience
    isEditing = false;              // 
    isCreating = false;             // 


    connectedCallback() {
        this.list = getMockData(5);
        console.log(this.list);
    }
    /**
     *  Wire service method that passes in 'type' and retrieves list of that obj
     */
    // @wire(getListOf, { type: this.-type })
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

    // When a record is edited/added, refresh list
    // Listens for onclick event on record-edit-form submit button
    onSubmitHandler() {
        // refreshApex(this.list);
    }
}
