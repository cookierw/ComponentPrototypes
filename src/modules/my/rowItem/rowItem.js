import { LightningElement, api } from 'lwc';

export default class RowItem extends LightningElement {

    @api record;                // Record data passed from parent
    @api type;
    Id;

    connectedCallback() {
        this.Id = this.record.Id;
    }

    // Fire event to parent to edit selected record
    handleEditRecordEvent(event) {
        this.dispatchEvent(new CustomEvent('edit', { detail: event.target.record }))
    }
}