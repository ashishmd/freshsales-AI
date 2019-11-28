'use strict';
exports = {

  events: [
    { event: 'onExternalEvent', callback: 'onExternalEventHandler' },
  ],

  onExternalEventHandler: function (payload) {
    console.log({payload})
    const payloadData = typeof payload.data === 'string' ? JSON.parse(payload.data) : payload.data;
    if(payload.requestEvent === 'fetchContacts'){
      $request.post('https://ashishtestfs2.freshsales.io/contacts.json',
      {
        headers: payload.headers,
        json: payloadData,
        method: "POST"
      }).then((response) => {
        console.info('Successfully closed the ticket in Freshdesk', response);
      }, error => {
        console.error('Error: Failed to close the ticket in Freshdesk');
        console.error(error)
      })  
    }
    
  }
};
