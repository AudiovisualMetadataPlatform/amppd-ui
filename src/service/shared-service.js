export default class SharedService {
    constructor() {
        this.erorrToastConfig = { title: 'Notification', appendToast: true, variant: "danger", autoHideDelay: 5000 };
        this.successToastConfig = { title: 'Notification', appendToast: true, variant: "success", autoHideDelay: 5000 };
        this.warningToastConfig = { title: 'Notification', appendToast: true, variant: "warning", autoHideDelay: 5000 }; 
    }

    /****Filtering an array based on a alphabatical
     * @params - arrayObj = [] || [listOfValue], isDesc = true || false, orderProperty = "" || string value
     */

    sortByAlphabatical(arrayObj = [], orderProperty="name", isDesc = false) {
        let tempArrayObj = arrayObj.sort((a,b) => {
            let fa = a[orderProperty].toLowerCase(), fb = b[orderProperty].toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });

        if(isDesc) {
            tempArrayObj = tempArrayObj.reverse();
        }

        return tempArrayObj;
    }

    /*****
     * Extract Error messages from Api Response
     * @params validationErrors
     * ****** */

    extractErrorMessage( validationErrors = [] ) {
        return validationErrors.map(el => el.message);
    }


    /****Filtering an array based on a date
     * @params - arrayObj = [] || [listOfValue], isDesc = true || false, orderProperty = "" || string value
     */

     sortByDate(arrayObj, orderProperty = "date", isDesc = false) {
        let tempArrayObj = arrayObj.sort(function(a,b){
            return new Date(a[orderProperty]) - new Date(a[orderProperty]);
          });
        
        if(isDesc) {
            tempArrayObj = tempArrayObj.reverse();
        }

        return tempArrayObj;
          
     }

     /****Find the data and sort the array
     * @params - arrayObj = [] || [listOfValue], isDesc = true || false, orderProperty = "" || string value
     */
     findDataAndSort(arrayObj, orderProperty = "name", isDesc = false) {
         if(arrayObj && arrayObj.length) {
            const resultArray = Date.parse(arrayObj[0][orderProperty]) ? this.sortByDate(arrayObj, orderProperty, isDesc) : this.sortByAlphabatical(arrayObj, orderProperty, isDesc);
            return resultArray;
         }

         return arrayObj;
     }
}