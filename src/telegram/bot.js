import axios from "axios";

const MySenderBot = "5481692601:AAFUv1m_h8gBIod9TTibaIGfKrRdXMLxBHY"
const telegramContactsId = '-684129709' // contacts;
const telegramOrdersId = '-638830878' // orders;

const sendOrder = (msg , OrdersId = telegramOrdersId , bot = MySenderBot) => {
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

const sendContact = (msg , OrdersId = telegramContactsId , bot = MySenderBot) => {
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
