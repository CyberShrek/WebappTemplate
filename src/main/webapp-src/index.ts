import App from './App.svelte'
import {SimpleHttp} from "./import/typescript/api/http/SimpleHttp";

SimpleHttp
    .withHeaders()
    .get("api/test")
    .text()


new App({
    target: document.body
})