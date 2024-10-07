import "./style.css";
import { test } from './createDOMEl.js';

const initLoad = (function() {
    window.addEventListener('DOMContentLoaded', console.log(test));
})();


