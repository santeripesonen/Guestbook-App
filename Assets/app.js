// Load messages from JSON file on page load
$(document).ready(function() {
    $.getJSON('messages.json', function(data) {
      messages = data;
      renderMessages();
    });
  });
  
  // Array to store messages
  let messages = [];
  
  // Form submit event listener
  $('#message-form').submit(function(event) {
    event.preventDefault();
    
    // Get form data
    let name = $('#name').val();
    let message = $('#message').val();
    
    // Add message to array
    messages.push({ name: name, message: message });
    
    // Save messages to JSON file
    $.ajax({
      type: 'POST',
      url: 'save.php',
      data: { messages: messages },
      dataType: 'json',
      success: function(response) {
        console.log(response);
      }
    });
    
    // Render messages
    renderMessages();
    
    // Clear form fields
    $('#name').val('');
    $('#message').val('');
  });
  
  // Function to render messages
  function renderMessages() {
    let messageList = $('#message-list');
    
    // Clear existing messages
    messageList.empty();
    
    // Render each message
    messages.forEach(function(message) {
      let messageDiv = $('<div>').addClass('message');
      
      let nameSpan = $('<span>').addClass('name').text(message.name + ': ');
      let messageSpan = $('<span>').addClass('message').text(message.message);
      
      messageDiv.append(nameSpan).append(messageSpan);
      messageList
  