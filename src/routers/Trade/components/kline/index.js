import React, { Component } from 'react'
import './index.less'

let ws = null

class Kline extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="k-line"></div>
    )
  }
}

export default Kline