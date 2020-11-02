let found = false;

function handleRequest(details) {
	if (!found && details.initiator) {
		const command = "streamlink --player-continuous-http --http-header \"Referer=" + details.initiator + "\" " + details.url + " best";
		found = true;

		copyTextToClipboard(command);
		document.getElementById("command").innerText = command;
	}
}

function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}

document.getElementById("getStreamUrl").onclick = function () {
	chrome.webRequest.onSendHeaders.addListener(handleRequest, { urls: ["http://*/*.m3u8*", "https://*/*.m3u8?*"] });
};

