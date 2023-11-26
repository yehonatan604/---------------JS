import { DomService } from "./services/Dom.service.js";
import { LocalStorageService } from "./services/LocalStorage.service.js";

let storage = new LocalStorageService();
let dom = new DomService(storage);
