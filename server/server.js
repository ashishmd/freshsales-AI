'use strict';
exports = {

  events: [
    { event: 'onExternalEvent', callback: 'onExternalEventHandler' },
  ],

  onExternalEventHandler: function (payload) {
    let payloadData = payload.data || payload.body;
    payloadData = typeof payloadData === 'string' ? JSON.parse(payloadData) : payloadData;
    console.log({payloadData})

    if(payload.requestEvent === 'createContact'){
      $request.post('https://ashishtestfs2.freshsales.io/contacts.json',
      {
        headers: payload.headers,
        json: payloadData,
        method: "POST"
      }).then((response) => {
        console.info('Successfully closed the ticket in Freshdesk', response);
        renderData();
      }, error => {
        console.error('Error: Failed to close the ticket in Freshdesk');
        console.error(error)
        renderData({ message: error.message });;
      })  
    }
    
  }
};
