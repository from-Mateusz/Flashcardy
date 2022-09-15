import { View } from "./View";

export default interface ViewLoader {
    load(name: string): View;
}