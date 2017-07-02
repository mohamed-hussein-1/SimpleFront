import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import protobuf from 'protobufjs';
import './person.json';


class App extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password:"",
      users:[],
    };
  }
  componentWillMount() {
    var Root  = protobuf.Root,
    Type  = protobuf.Type,
    Field = protobuf.Field;
    var AwesomeMessage = new Type("Person").add(new Field("name", 1, "string"));
    var root = new Root().add(AwesomeMessage);
    AwesomeMessage = root.lookupType("Person");
    var payload = {name:"aly"};
    var errMsg = AwesomeMessage.verify(payload);
    if (errMsg)
      console.log(errMsg);
    var message = AwesomeMessage.create(payload);
    // console.log(message);

    var buffer = AwesomeMessage.encode(message).finish();
    console.log(buffer);
    let bbb;
    console.log("hi");
    Axios.get("http://localhost:8000/api/user?api_token=k9A6QhZnpY2R1O6h0K7qlL9Oq4K4yPtTSSojcu0zQpWy82gj9P6HFn4UKYsW",
      {
        headers: { 'crossDomain': true },
        responseType: 'arraybuffer'
      }
    ).then(function(response){
      // console.log(response.data);
      bbb = new Uint8Array(response.data);
      console.log(bbb);
      console.log(AwesomeMessage.decode(bbb));
    }).catch(function(response){
      console.log(response);
    });
  }

  render() {
    var Root  = protobuf.Root,
    Type  = protobuf.Type,
    Field = protobuf.Field;
    var AwesomeMessage = new Type("Person").add(new Field("name", 1, "string"));
    var root = new Root().add(AwesomeMessage);
     AwesomeMessage = root.lookupType("Person");
    //  var payload = {name:"aly"};
    //  var errMsg = AwesomeMessage.verify(payload);
    // if (errMsg)
    //     console.log(errMsg);
    // var message = AwesomeMessage.create(payload);
    // console.log(message);
    //     var buffer = AwesomeMessage.encode(message).finish();
    //     console.log(buffer);
   
    return (
      <div>
        <input type="text" name="email" value={this.state.username} onChange={this.updateUsernameValue}/>
        <input type="password" name="password" value={this.state.password} onChange={this.updatePasswordValue}/>
        <input type="submit" value="submit" onClick={this.handleSubmit}/>
        {this.state.users.length>0 &&
          <div>
            <h3>Users Of Same Role</h3>
            <ul>
              {this.state.users.map(function(u){
                return <li>{u}</li>;
              })}
            </ul>
          </div>
        }
      </div>

    );

  }

  handleSubmit = (e) => {
    let _self = this;
    console.log("submitting");
    console.log(this.state.username);
    console.log(this.state.password);
      Axios.post("http://localhost:8000/api/user",{username:this.state.username,password:this.state.password},{responseType: 'arraybuffer'}).then(
        function(response){
          var Root  = protobuf.Root,
          Type  = protobuf.Type,
          Field = protobuf.Field;
          var AwesomeMessage = new Type("Person").add(new Field("name", 1, "string"));
          var root = new Root().add(AwesomeMessage);
          AwesomeMessage = root.lookupType("Person");
          let bbb = new Uint8Array(response.data);
          let _users = AwesomeMessage.decode(bbb).name;
          _users = _users.split(",");
          _self.setState({users:_users});
        }
        );     
    };
    updateUsernameValue = (e) => {
      console.log("updating");
      this.setState({username:e.target.value});
    }
    updatePasswordValue = (e) => {
      console.log("updating");
      this.setState({password:e.target.value});
    }
}

export default App;
