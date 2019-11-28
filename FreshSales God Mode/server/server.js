'use strict';
exports = {

  events: [
    { event: 'onExternalEvent', callback: 'onExternalEventHandler' },
  ],

  onExternalEventHandler: function (payload) {
    console.log('onExternalEventHandler');
    
    let payloadData = payload.data || payload.body;
    payloadData = typeof payloadData === 'string' ? JSON.parse(payloadData) : payloadData;
    console.log({payloadData, 'payload.requestEvent': payload.requestEvent})

    if(payload.requestEvent === 'createContact'){
      $request.post('https://ashishtestfs2.freshsales.io/contacts.json',
      {
        headers: payload.headers,
        json: payloadData,
        method: "POST"
      }).then((response) => {
        console.info('Success', response);
        renderData(response);
      }, error => {
        console.error('Error');
        console.error(error)
        renderData({ message: error.message });;
      })  
    }

    if(payload.requestEvent === 'createLead'){
      $request.post('https://ashishtestfs2.freshsales.io/leads.json',
      {
        headers: payload.headers,
        json: payloadData,
        method: "POST"
      }).then((response) => {
        console.info('Success', response);
        renderData(response);
      }, error => {
        console.error('Error');
        console.error(error)
        renderData({ message: error.message });;
      })  
    }
    
  }
};
