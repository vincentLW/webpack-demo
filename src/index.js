import _ from "lodash";
import "./style.css";
import Icon from "./icon.jpg";
import printMe from "./print";

function component() {
  var element = document.createElement("div");
  var btn = document.createElement("button");

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");
  var myIcon = new Image();
  myIcon.src = Icon;
  btn.innerHTML = "Click me and check the console ssswwwwsssswwww111111";

  btn.onclick = printMe;

  element.appendChild(btn);
  element.appendChild(myIcon);

  return element;
}
let element= component();
document.body.appendChild(element);

if(module.hot){
  module.hot.accept('./print.js',function(){
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    element=component();
    document.body.appendChild(element);
  })
}
