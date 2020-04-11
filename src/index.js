import React, {Component} from 'react';
import ReactDom from 'react-dom';

class App extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            num: 1
        }
    }
    addNum = () => {
        this.setState({
            num: this.state.num + 1
        })
    }
    render() {
        return (
          <div>
              <h1>Hello 1111world</h1>
              <div>{this.state.num}</div>
              <button onClick={this.addNum}>+</button>
          </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById('root'));

