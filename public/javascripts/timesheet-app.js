import "../sass/style.scss";

import { $, $$ } from "./modules/bling";
import dateSearch from "./modules/dateSearch";
import post from "./modules/post";
import autocomplete from './modules/autocomplete';

autocomplete( $('#protitle'), $('#tasktitle'), $('#storytitle') );


dateSearch($(".postData"));

const taskForms = $$(".postData");
taskForms.on("submit", post);
