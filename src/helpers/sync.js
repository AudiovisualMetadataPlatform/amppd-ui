import { sync as pathify_sync } from "vuex-pathify";

export default function sync(property) {
    return pathify_sync(property, false);
}