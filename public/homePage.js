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
      moneyManager.setMessage(true, "Средства успешно зачислены!");
      setTimeout(function() {
        location.reload(); }, 3000);
    } else {
      moneyManager.setMessage(false, "не удалось зачислить средства");
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      moneyManager.setMessage(true, "Валюта успешно конвертирована!");
      setTimeout(function() {
        location.reload(); }, 3000);
    } else {
      moneyManager.setMessage(false, "неудачная попытка конвертации");
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      moneyManager.setMessage(true, "Перевод успешно осуществлен");
      setTimeout(function() {
        location.reload(); }, 3000);
    } else {
      moneyManager.setMessage(false, "не выбран пользователь");
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
      favoritesWidget.setMessage(true, "Поьзователь успешно добавлен");
    } else {
      favoritesWidget.setMessage(false, "Пользователь не найден");
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
      favoritesWidget.setMessage(false, "Не удалось удалить");
    }
  });
};

