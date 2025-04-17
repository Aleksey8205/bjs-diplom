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
  if (response.data) {
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

updateRates()
setInterval(updateRates, 60000)

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      profileWidget.showProfile(response.data.user);
      moneyManager.setMessage("Баланс успешно пополнен");
    } else {
      moneyManager.setMessage(response.error)
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      profileWidget.showProfile(response.data.user);
      moneyManager.setMessage("Валюта успешно конвертирована!")
    } else {
      moneyManager.setMessage(response.error);
    }
  })
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
      if (response.success) {
          profileWidget.showProfile(response.data.user);
          moneyManager.setMessage('Валюта успешно конвертирована!');
      } else {
          moneyManager.setMessage(response.error);
      }
  });
};

const faworitesWidget = new FavoritesWidget();
