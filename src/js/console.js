const createConsole = function() {
  console.log('\n' +
    ' _______  _______  ______    _______  _______  _______  _______  ___      _______  _______  _______\n' +
    '|       ||       ||    _ |  |       ||       ||       ||       ||   |    |       ||       ||       |\n' +
    '|    _  ||    ___||   | ||  |    ___||    ___||       ||_     _||   |    |    ___||  _____||  _____|\n' +
    '|   |_| ||   |___ |   |_||_ |   |___ |   |___ |     __|  |   |  |   |    |   |___ | |_____ | |_____\n' +
    '|    ___||    ___||    __  ||    ___||    ___||    |     |   |  |   |___ |    ___||_____  ||_____  |\n' +
    '|   |    |   |___ |   |  | ||   |    |   |___ |    |__   |   |  |       ||   |___  _____| | _____| |\n' +
    '|___|    |_______||___|  |_||___|    |_______||_______|  |___|  |_______||_______||_______||_______|');
  console.log('')
  console.log('By, Nick Berens');
  console.log('type help() to see available commands');
  function displayHelp() {
    console.log('Available commands:');
    console.log(' - help(): help is as far as I have gotten');
    alert('Available commands:\n - help(): help is as far as I have gotten');
  }

// Define the help function
  function help() {
    displayHelp();
  }
}

export default createConsole;