import './style.css';
import Icon from './icon.jpg';
import printMe from './print';
import { cube } from './math';

function component() {
  var element = document.createElement('pre');
  var btn = document.createElement('button');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = ['Hello webpack', '5 cubed is equal to ' + cube(5)].join(
    '\n\n'
  );
  element.classList.add('hello');
  // var myIcon = new Image();
  // // myIcon.src = Icon;
  // btn.innerHTML = 'Click me and check the console ssswwwwsssswwww111111';

  // btn.onclick = printMe;

  // element.appendChild(btn);
  // element.appendChild(myIcon);

  return element;
}
let element = component();
document.body.appendChild(element);

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}
