self.addEventListener("push", (event) => {
    event.waitUntil(
      self.registration.showNotification("SpeakBits", {
        body: event.data.text(),
        icon: "/icon-192x192.png"
      })
    );
  });
  
  self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
      self.clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          if (clientList.length > 0) {
            let client = clientList[0];
            for (let i = 0; i < clientList.length; i++) {
              if (clientList[i].focused) {
                client = clientList[i];
              }
            }
            return client.focus();
          }
          return clients.openWindow("/");
        })
    );
  });