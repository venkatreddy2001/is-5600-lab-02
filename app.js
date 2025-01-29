document.addEventListener("DOMContentLoaded", () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    // Generate the user list initially
    generateUserList(userData, stocksData);

    // Select save and delete buttons
    const saveButton = document.querySelector("#btnSave");
    const deleteButton = document.querySelector("#btnDelete");

    if (!saveButton || !deleteButton) {
      console.error("Save or Delete button not found in the DOM. Check the IDs.");
      return; // Exit early if buttons are not found
    }

    // Event listener for save button
    saveButton.addEventListener("click", (e) => {
      e.preventDefault();
      const id = document.querySelector("#userID").value;

      if (id) {
        const userIndex = userData.findIndex((user) => user.id == id);

        if (userIndex !== -1) {
          userData[userIndex].user.firstname = document.querySelector("#firstname").value;
          userData[userIndex].user.lastname = document.querySelector("#lastname").value;
          userData[userIndex].user.address = document.querySelector("#address").value;
          userData[userIndex].user.city = document.querySelector("#city").value;
          userData[userIndex].user.email = document.querySelector("#email").value;

          generateUserList(userData, stocksData);
          alert("User details updated successfully!");
        } else {
          alert("User not found for updating.");
        }
      } else {
        alert("Please select a user to update.");
      }
    });

    // Event listener for delete button
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      const userId = document.querySelector("#userID").value;

      if (userId) {
        const userIndex = userData.findIndex((user) => user.id == userId);

        if (userIndex !== -1) {
          userData.splice(userIndex, 1);
          clearForm();
          generateUserList(userData, stocksData);
          alert("User deleted successfully!");
        } else {
          alert("User not found for deletion.");
        }
      } else {
        alert("Please select a user to delete.");
      }
    });
  });

  /**
   * Generates the user list and attaches event listeners.
   */
  function generateUserList(users, stocks) {
    const userList = document.querySelector(".user-list");
    userList.innerHTML = ""; // Clear the list

    users.forEach(({ user, id }) => {
      const listItem = document.createElement("li");
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute("id", id);
      userList.appendChild(listItem);
    });

    userList.addEventListener("click", (event) => handleUserListClick(event, users, stocks));
  }

  /**
   * Handles user list item click event.
   */
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find((user) => user.id == userId);

    if (user) {
      populateForm(user);
      renderPortfolio(user, stocks);
    }
  }

  /**
   * Populates the form with user data.
   */
  function populateForm(data) {
    const { user, id } = data;

    document.querySelector("#userID").value = id;
    document.querySelector("#firstname").value = user.firstname;
    document.querySelector("#lastname").value = user.lastname;
    document.querySelector("#address").value = user.address;
    document.querySelector("#city").value = user.city;
    document.querySelector("#email").value = user.email;
  }

  /**
   * Renders the portfolio for a selected user.
   */
  function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector(".portfolio-list");
    portfolioDetails.innerHTML = ""; // Clear existing items

    portfolio.forEach(({ symbol, owned }) => {
      const symbolEl = document.createElement("p");
      const sharesEl = document.createElement("p");
      const actionEl = document.createElement("button");

      symbolEl.innerText = symbol;
      sharesEl.innerText = `${owned} shares`;
      actionEl.innerText = "View";
      actionEl.setAttribute("id", symbol);

      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });

    portfolioDetails.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        viewStock(event.target.id, stocks);
      }
    });
  }

  /**
   * Displays stock details for the selected stock symbol.
   */
  function viewStock(symbol, stocks) {
    const stock = stocks.find((s) => s.symbol === symbol);

    if (stock) {
      const stockArea = document.querySelector(".stock-form");
      document.querySelector("#stockName").textContent = stock.name;
      document.querySelector("#stockSector").textContent = stock.sector;
      document.querySelector("#stockIndustry").textContent = stock.subIndustry;
      document.querySelector("#stockAddress").textContent = stock.address;
      document.querySelector("#logo").src = `logos/${symbol}.svg`;
    }
  }

  /**
   * Clears the form inputs.
   */
  function clearForm() {
    document.querySelector("#userID").value = "";
    document.querySelector("#firstname").value = "";
    document.querySelector("#lastname").value = "";
    document.querySelector("#address").value = "";
    document.querySelector("#city").value = "";
    document.querySelector("#email").value = "";
  }


