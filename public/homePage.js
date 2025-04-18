const logOutButton = new LogoutButton();

logOutButton.action = () => {
  ApiConnector.logout((logout) => {
    if (logout.success) {
      location.reload();
    }
  });
};

const profileWidget = new ProfileWidget();

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data); 
  }
});

const ratesBoard = new RatesBoard();

function updateRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data); 
    }
  });
}

updateRates();
setInterval(updateRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      profileWidget.showProfile(response.data.user);
      moneyManager.setMessage("Баланс успешно пополнен");
    } else {
      moneyManager.setMessage(response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      profileWidget.showProfile(response.data.user);
      moneyManager.setMessage("Валюта успешно конвертирована!");
    } else {
      moneyManager.setMessage(response.error);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      profileWidget.showProfile(response.data.sender);
      moneyManager.setMessage("Перевод успешно осуществлен");
    } else {
      moneyManager.setMessage(response.error);
    }
  });
};

const favoritesWidget = new FavoritesWidget(); 

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
  }
});

favoritesWidget.addUserCallback = (userId) => {
  ApiConnector.addUserToFavorites(userId, (response) => {
    if (response.success) {
      favoritesWidget.fillTable(response.data);
      favoritesWidget.setMessage('Пользователь успешно добавлен в избранное.');
    } else {
      favoritesWidget.setMessage(response.error);
    }
  });
};

favoritesWidget.removeUserCallback = (userId) => {
  ApiConnector.removeUserFromFavorites(userId, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data); 
      favoritesWidget.setMessage('Пользователь удален из избранного.');
      console.log('Пользователь удален из избранного.')
    } else {
      favoritesWidget.setMessage(response.error);
    }
  });
};

