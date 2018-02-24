/* api配置 */

let enviroment = process.env.NODE_ENV == 'production' ? 'PRD' : 'DEV'
// enviroment = 'PRD'
enviroment = 'DEV'

const configuration = {
  'DEV': {
    ishopBase: 'http://ag.dev.c.smarteventcloud.cn'
  },
  'PRD': {
    ishopBase: 'http://ag.container.smarteventcloud.cn'
  }
}[enviroment]

export default configuration
