export default class SharedService {
    constructor() {
        this.erorrToastConfig = {
            title: "Notification",
            appendToast: true,
            variant: "danger",
            autoHideDelay: 5000,
        };
        this.successToastConfig = {
            title: "Notification",
            appendToast: true,
            variant: "success",
            autoHideDelay: 5000,
        };
        this.warningToastConfig = {
            title: "Notification",
            appendToast: true,
            variant: "warning",
            autoHideDelay: 5000,
        };
    }

    /****Filtering an array based on a alphabatical
     * @params - arrayObj = [] || [listOfValue], isDesc = true || false, orderProperty = "" || string value
     */

    sortByAlphabatical(arrayObj = [], orderProperty = "name", isDesc = false) {
        let tempArrayObj = arrayObj.sort((a, b) => {
            let fa = a[orderProperty].toLowerCase(),
                fb = b[orderProperty].toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });

        if (isDesc) {
            tempArrayObj = tempArrayObj.reverse();
        }

        return tempArrayObj;
    }

    /*****
     * Extract Error messages from Api Response
     * @params validationErrors
     * ****** */

    extractErrorMessage(validationErrors = []) {
        return validationErrors.map((el) => el.message);
    }

    /****Filtering an array based on a date
     * @params - arrayObj = [] || [listOfValue], isDesc = true || false, orderProperty = "" || string value
     */

    sortByDate(arrayObj, orderProperty = "date", isDesc = false) {
        let tempArrayObj = arrayObj.sort(function (a, b) {
            return new Date(a[orderProperty]) - new Date(a[orderProperty]);
        });

        if (isDesc) {
            tempArrayObj = tempArrayObj.reverse();
        }

        return tempArrayObj;
    }

    /****Filtering an array based on a number
     * @params - arrayObj = [] || [listOfValue], orderProperty = "" || string value
     */

    sortByNumber(arrayObj, orderProperty = "id", isDesc = false) {
        let tempArrayObj = [];
        if (!isDesc) {
            tempArrayObj = arrayObj.sort(function (a, b) {
                return a[orderProperty] - b[orderProperty];
            });
        } else {
            tempArrayObj = arrayObj.sort(function (a, b) {
                return b[orderProperty] - a[orderProperty];
            });
        }
        return tempArrayObj;
    }

    //Filtering an array based on a string, time and number
    multiTypeSorting(arrayObj, orderProperty = "name", isDesc = false) {
        let tempArrayObj1 = arrayObj.filter(
            (item) => item[orderProperty] === undefined
        );
        let tempArrayObj2 = arrayObj.filter(
            (item) => item[orderProperty] !== undefined
        );
        tempArrayObj2 = tempArrayObj2.sort((a, b) => {
            if (typeof a[orderProperty] === "string") {
                if (a[orderProperty].toLowerCase()) {
                    if (!isDesc) {
                        let fa = a[orderProperty].toLowerCase(),
                            fb = b[orderProperty].toLowerCase();
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    } else {
                        let fa = a[orderProperty].toLowerCase(),
                            fb = b[orderProperty].toLowerCase();
                        if (fa < fb) {
                            return 1;
                        }
                        if (fa > fb) {
                            return -1;
                        }
                        return 0;
                    }
                } else {
                    return b[orderProperty].localeCompare(a[orderProperty]);
                }
            } else if (typeof a[orderProperty] === "number") {
                if (!isDesc) {
                    return a[orderProperty] - b[orderProperty];
                } else {
                    return b[orderProperty] - a[orderProperty];
                }
            }
        });

        let tempArrayObj = [];
        if (!isDesc) {
            tempArrayObj = [...tempArrayObj1, ...tempArrayObj2];
        } else {
            tempArrayObj = [...tempArrayObj2, ...tempArrayObj1];
        }
        return tempArrayObj;
    }

    /****Find the data and sort the array
     * @params - arrayObj = [] || [listOfValue], isDesc = true || false, orderProperty = "" || string value
     */
    findDataAndSort(arrayObj, orderProperty = "name", isDesc = false) {
        if (arrayObj && arrayObj.length) {
            const resultArray = Date.parse(arrayObj[0][orderProperty])
                ? this.sortByDate(arrayObj, orderProperty, isDesc)
                : this.sortByAlphabatical(arrayObj, orderProperty, isDesc);
            return resultArray;
        }

        return arrayObj;
    }

    //Confirmation window
    showConfirmationWindow(
        instance,
        message = "Are you sure you want to delete?",
        title = "Confirmation",
        variant = "primary",
        okTitle = "Yes",
        cancelTitle = "No"
    ) {
        const msgBox = instance.msgBoxConfirm("Are you sure you want to delete?", {
            title: title,
            size: "md",
            buttonSize: "sm",
            okVariant: variant,
            okTitle: okTitle,
            cancelTitle: cancelTitle,
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
        });
        return msgBox;
    }

    /***
     * To store user selected options on session storage
     * @input-params key - string value-any
     ****/

    setUserValues(key, value) {
        let userValues = sessionStorage.getItem("userValues");
        userValues = userValues ? JSON.parse(userValues) : {};
        userValues[key] = value;
        sessionStorage.setItem("userValues", JSON.stringify(userValues));
    }

    /***
     * To retrive user selected options on session storage
     * @input-params key - string
     ****/
    getUserValue(key) {
        const userValues = sessionStorage.getItem("userValues");
        return userValues ? JSON.parse(userValues)[key] : null;
    }

    /***
     * To retrieve the logged in user's initials from local storage
     */
    getUserInitials() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const { firstName, lastName } = currentUser;
        let userInits = [];
        if (firstName != null && firstName.length > 0) {userInits.push(firstName[0].toUpperCase()); }
        if (lastName != null && lastName.length > 0) { userInits.push(lastName[0].toUpperCase()); }
        return userInits.join('');
    }
}
