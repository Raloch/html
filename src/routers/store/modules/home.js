import { observable } from 'mobx'

class Home {
  @observable urlpath = '' // 当前页面pathname
  @observable USDTLoading = false
  @observable BTCLoading = true
  @observable ETHLoading = false
  @observable BCTLoading = false
  @observable collectLoading = false
  @observable isUpdate = true // 传递该变量强制更新home-market页面
  @observable marketList = []
}

const home = new Home()

export default home