import axios from "axios";

const ArtflixBot = "5338222031:AAG-AjlV0s7hMrvVnMKbQjSPQjQOz-qcWS4"
const telegramContactsId = '-1001538500057' // contacts;
const telegramOrdersId = '-1001618917138' // orders;

const sendOrder = (msg , OrdersId = telegramOrdersId , bot = ArtflixBot) => {
    const message = msg = encodeURI(msg);

    const dataParams = new URLSearchParams({
        'chat_id' : OrdersId ,'text' : message,'parse_mode' : "html",'disable_web_page_preview' : true,
        'disable_notification' : false //,'reply_to_message_id' : null,'reply_markup' : null
      });

      const params = dataParams.toString();
      const url = `https://api.telegram.org/bot${bot}/sendMessage?${decodeURI(params)}`;
  
    axios.get(url).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })

}

const sendContact = (msg , OrdersId = telegramContactsId , bot = ArtflixBot) => {
    const message = msg = encodeURI(msg);

    const dataParams = new URLSearchParams({
        'chat_id' : OrdersId ,'text' : message,'parse_mode' : "html",'disable_web_page_preview' : true,
        'disable_notification' : false //,'reply_to_message_id' : null,'reply_markup' : null
      });

      const params = dataParams.toString();
      const url = `https://api.telegram.org/bot${bot}/sendMessage?${decodeURI(params)}`;
  
    axios.get(url).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })

}


export {
    sendOrder , sendContact
}
