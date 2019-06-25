import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'normalize'
import './styles/reset.less'
import Routers from './routers'
/* import 'antd';
 import 'antd/dist/antd.css';*/
class App extends React.Component {
    render(){
        return(
            <HashRouter>
                <Routers />
            </HashRouter>
        )
    }
}

render(<App/>, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
