// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sendtoterminalpython" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sendtoterminalpython.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from sendToTerminalPython!');
	});

	context.subscriptions.push(disposable);
	let sendAndRemoveEmptyLines = vscode.commands.registerCommand('sendtoterminalpython.sendAndRemoveEmptyLines', () => {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showInformationMessage("no editor opened");
			return;
		}
		let selection = editor.selection;
		let content = editor.document.getText(selection);
		// if no selection, select the whole line
		if (content.length === 0) {
			content = editor.document.lineAt(selection.start.line).text;
		}
		// check if the content has empty lines
		let lineList = content.split(/\r?\n/);
		if (lineList.indexOf("") > -1) {
			lineList = lineList.filter(String);
		};
		content = lineList.join("\n");
		//show the selection in window to debug
		vscode.window.showInformationMessage(content);
		//send content to active terminal
		let terminal = vscode.window.activeTerminal;
		if (!terminal) {
			vscode.window.showInformationMessage("no terminal opened");
			return;
		}
		// send and add two \n to make the code run
		terminal.sendText(content+"\n\n");
	});
	context.subscriptions.push(sendAndRemoveEmptyLines);
}

// this method is called when your extension is deactivated
export function deactivate() { }
