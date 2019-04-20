import React, { Component } from 'react';
import '@zendeskgarden/react-textfields/dist/styles.css';
import '@zendeskgarden/react-checkboxes/dist/styles.css';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import MyForm from './MyForm';

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <div className="App">
          <MyForm></MyForm>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
