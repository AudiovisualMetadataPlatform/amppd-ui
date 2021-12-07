export default class SharedService {
    constructor() {
        this.erorrToastConfig = { title: 'Notification', appendToast: true, variant: "danger", autoHideDelay: 5000 };
        this.successToastConfig = { title: 'Notification', appendToast: true, variant: "success", autoHideDelay: 5000 }; 
    }

    /****Filtering an array
     * @params - arrayObj
     */

    sortByAlphabatical(arrayObj = []) {
        const tempArrayObj = arrayObj.sort((a,b) => {
            let fa = a.name.toLowerCase(), fb = b.name.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });

        return tempArrayObj;
    }

    /*****
     * Extract Error messages from Api Response
     * @params validationErrors
     * ****** */

    extractErrorMessage( validationErrors = [] ) {
        return validationErrors.map(el => el.message);
    }
}