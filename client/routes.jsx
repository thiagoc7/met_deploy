import React from 'react';
import { render } from 'react-dom';

import {App} from './app.jsx';

Meteor.startup(function () {
  render(<App />, document.getElementById("root"));
});