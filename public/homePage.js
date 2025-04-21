const logOutButton = new LogoutButton();

logOutButton.action = () => {
  ApiConnector.logout((logout) => {
    if (logout.success) {
      location.reload();
    }
  });
};

const profileWidget = new ProfileWidget();

function updateProfile() {
  ApiConnector.current((response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
  });
}

setInterval(updateProfile, 60 * 1000);
updateProfile();

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
      moneyManager.setMessage(true, "Средства успешно зачислены!");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      moneyManager.setMessage(true, "Валюта успешно конвертирована!");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};


moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      moneyManager.setMessage(true, "Перевод успешно осуществлен");
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

ApiConnector.getFavorites((response) => {
  if (response.success) {
    moneyManager.updateUsersList(response.data); 
  }
});

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
      favoritesWidget.setMessage(true, "Пользователь успешно добавлен");
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};

favoritesWidget.removeUserCallback = (userId) => {
  ApiConnector.removeUserFromFavorites(userId, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data); 
      favoritesWidget.setMessage(true, "Пользователь удален из избранного.");
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
};
