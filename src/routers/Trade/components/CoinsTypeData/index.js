import React, { Component } from 'react'
import './index.less'
import { inject, observer } from 'mobx-react'

@inject('Store')
@observer
class CoinsTypeData extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const store = this.props.Store
    return (
      <div className="coinsTypeData">
        <header>
          <p className="fl">币种资料</p>
          <a href="javascript:void(0)" className="fr">了解更多>></a>
        </header>
        <main>
          <h3>{ store.currencyTrading.coinsType }</h3>
          <div className="coinMsg">
            <h4>特币现金(Bitcoin Cash)</h4>
            <p>比特币（BTC）是目前世界上最受追捧的数字货币，2017年8月1日发生分差，在一个“硬叉”的事件中，诞生了一种被称为比特币现金（BCH）的新数字货币。由于版本切换，比特币区块链被分叉至两条独立的区块链。在分叉前拥有比特币的所有人都有权获得相同数量的“比特币现金”代币，类似于股票中的股息派发。比特币现金（BCH）是由一小部分比特币开发者推出的不同配置的新版比特币，是一种新型的区块链资产。在2017年8月1日，比特币现金开始挖矿，每个比特币投资者的账户上将出现与比特币数量等量的比特币现金（BCH）。</p>
          </div>
        </main>
      </div>
    );
  }
}

export default CoinsTypeData