<template>
  <div style="display: flex">
    <a-space direction="vertical" style="width: 800px;padding: 30px;">
      <a-row>
        <a-space>
          <a-input type="text" v-model:value="uri" @keypress.enter.stop="connect"></a-input>
          <a-button @click="connect">连接</a-button>
          <a-button @click="close">断开</a-button>
          <a-button @click="cleanAll">清空</a-button>
        </a-space>
      </a-row>

      <div></div>
      <div id="outputMsgView" style="height: 600px;border: 1px solid #3d3c3d;border-radius: 10px;padding: 10px;overflow-y: auto;">
        <div style="margin-bottom: 12px;" v-for="item in msgList">
          <h4 style="color: royalblue;">{{item.title}}: </h4>
          <div :style="{color: msgColor[item.from]}">{{item.msg}}</div>
        </div>
      </div>
<!--      <textarea name="" cols="30" rows="10" v-model="outputText"></textarea>-->

    <a-row>
          <a-space>
            <a-input type="text" v-model:value="sendText" @keypress.enter.stop="sendMsg"></a-input>
            <a-button @click="sendMsg">发送</a-button>
          </a-space>
    </a-row>
    </a-space>
    <div style="text-align: left;margin-left: 20px;">
      <h2>示例</h2>
      <h3>火币示例</h3>
      <pre>
<my-clipboard-span value="wss://api.huobi.pro/feed"></my-clipboard-span>

连接后发送：
<my-clipboard-span value='{
  "sub": "market.btcusdt.mbp.5",
  "id": "id1"
}'></my-clipboard-span>


      </pre>
      <h3>本地示例</h3>
      <pre>
<my-clipboard-span value="ws://localhost:28080"></my-clipboard-span>

连接后发送任意消息，服务端会原样返回。比如：
<my-clipboard-span value='你好'></my-clipboard-span>


      </pre>
    </div>
  </div>
</template>

<script>
import pako from 'pako'
import MyClipboardSpan from "../../components/Clipboard/MyClipboardSpan.vue"

export default {
  name: "WebSocket",
  components: { MyClipboardSpan },
  data () {
    return {
      socket: null,
      uri: '',
      outputText: '',
      sendText: '',
      msgList: [],
      msgColor: {
        'send': '#17c9c1',
        'receive': '#9b5e13',
      }
    }
  },
  methods: {
    connect () {
      const that = this;
      that.socket && that.socket.close()
      const socket = new WebSocket(this.uri)
      this.socket = socket
      socket.onopen = function (e) {
        // alert("[open] Connection established")
        that.printText('receive','连接成功', `连接成功`)
      }

      socket.onmessage = function (event) {
        console.log(event)
        //判断是否为Blob格式的数据
        // console.log(event.data, event.data instanceof Blob)
        if (event.data instanceof Blob) {
          var blob = event.data
          let reader = new FileReader()
          reader.readAsArrayBuffer(event.data, "utf-8")
          reader.onload = function () {

            console.log("blob转ArrayBuffer数据类型", reader.result)
            // 对数据进行解压
            let msg = pako.ungzip(reader.result, {
              to: "string",
            })
            console.log("ArrayBuffer转字符串", msg)
            // global_callback(JSON.parse(msg));
            // alert(`[message] Data received from server: ${msg}`)
            that.printText('receive','服务端回应', `${msg}`)

            try{
              //火币心跳消息 https://huobiapi.github.io/docs/spot/v1/cn/#5ea2e0cde2-10
              if(JSON.parse(msg).ping){
                that.socket.send(`{"pong":${JSON.parse(msg).ping}}`)
              }
            }catch (e) {

            }
          }
        } else {
          // alert(`[message] Data received from server: ${event.data}`)
          that.printText('receive','服务端回应', `${event.data}`)
        }
      }

      socket.onclose = function (event) {
        if (event.wasClean) {
          // alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
          that.printText('receive','关闭连接', `连接已关闭，code=${event.code} reason=${event.reason}`)
        } else {
          // 例如服务器进程被杀死或网络中断
          // 在这种情况下，event.code 通常为 1006
          // alert("[close] Connection died")
          that.printText('receive','关闭连接', "服务器进程被杀死或网络中断")
        }
      }

      socket.onerror = function (error) {
        that.printText('receive','异常', error.message)
      }
    },
    close(){
      this.socket && this.socket.close()
    },
    cleanAll(){
      this.msgList = []
    },
    sendMsg(){
      if(this.sendText) {
        this.printText('send','发送消息', this.sendText)
        if(this.socket){
          this.socket.send(this.sendText)
          this.sendText = ''
        }
      }
    },
    exampleConnect(){

    },
    printText(from, type, msg){
      this.msgList.push({
        from: from,
        title: `${type}  ${new Date().toString()}`,
        msg: msg
      })
      this.$nextTick(()=>{
        this.scrollToBottom('outputMsgView')
      })
      // this.outputText = this.outputText + `\n [${type}]: ${msg}`
    },
    scrollToBottom(id){
      if(id){
        document.getElementById(id).scrollTop = document.getElementById(id).scrollHeight
      }
    }
  },
  beforeUnmount(){
    this.socket && this.socket.close();
  }
}
</script>

<style scoped>

</style>
