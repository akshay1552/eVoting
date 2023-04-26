$(document).ready(function () {
  $(".modal").modal();

  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

  // Check that web3 is connected to the blockchain
  web3.eth.net
    .isListening()
    .then(function () {
      console.log("Web3 is connected to the blockchain.");
    })
    .catch(function (error) {
      console.error("Web3 is not connected to the blockchain.", error);
    });

  abi = JSON.parse(
    '[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]'
  );

  // Check that the ABI was parsed correctly
  if (!abi || !Array.isArray(abi)) {
    console.error("ABI is not valid.");
    return;
  }

  VotingContract = new web3.eth.Contract(
    abi,
    "0xbD9aFC94AaB654897Aa94D09462E7324B3E21D60"
  );

  // Check that the VotingContract object was created
  if (!VotingContract) {
    console.error("VotingContract object was not created.");
    return;
  }

  contractInstance = VotingContract;

  // candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

  //check cookie
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  var aadhaar_list = {
    300000000000: "Akola",
    738253790005: "Bhandara",
    123456781234: "Mumbai",
  };

  var aadhaar = readCookie("aadhaar");

  console.log(aadhaar);
  var address = aadhaar_list[aadhaar];
  console.log(address);
  $("#loc_info").text("Location based on Aadhaar : " + address);

  function disable() {
    $("#vote1").addClass("disabled");
    $("#vote2").addClass("disabled");
    $("#vote3").addClass("disabled");
    $("#vote4").addClass("disabled");

    //logout
    document.cookie = "show=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    document.cookie = "aadhaar=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    window.location = "/app";
  }

  $("#vote1").click(function () {
    contractInstance.voteForCandidate(
      "Sanat",
      { from: web3.eth.accounts[0] },
      function () {
        alert("vote submited to Akshay");
        disable();
        $("#loc_info").text("Vote submited successfully to Akshay");
      }
    );
  });
  $("#vote2").click(function () {
    contractInstance.voteForCandidate(
      "Aniket",
      { from: web3.eth.accounts[0] },
      function () {
        alert("vote submited to Siddhi");
        disable();
        $("#loc_info").text("Vote submited successfully to Siddhi");
      }
    );
  });
  $("#vote3").click(function () {
    contractInstance.voteForCandidate(
      "Mandar",
      { from: web3.eth.accounts[0] },
      function () {
        alert("vote submited to Shubham");
        disable();

        $("#loc_info").text("Vote submited successfully to Shubham");
      }
    );
  });
  $("#vote4").click(function () {
    contractInstance.voteForCandidate(
      "Akshay",
      { from: web3.eth.accounts[0] },
      function () {
        alert("vote submited to Bhakti");
        disable();
        $("#loc_info").text("Vote submited successfully to Bhakti");
      }
    );
  });
});
