export default class SharedService {
    constructor() {}

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
}