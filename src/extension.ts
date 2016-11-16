// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import {
    window, commands, Disposable, ExtensionContext,
    StatusBarAlignment, StatusBarItem, TextDocument, workspace
} from 'vscode';

import * as slug from 'slug';
import { newPost } from './posts';
import { newDraft, promoteDraft } from './drafts';

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error).
    // This line of code will only be executed once when your extension is activated.
    console.log('Jekyll is now active');

    // The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const newPostDisposable = commands.registerCommand('extension.newPost', () => newPost());
    const newDraftDisposable = commands.registerCommand('extension.newDraft', () => newDraft());
    const promoteDraftDisposable = commands.registerCommand('extension.promoteDraft', () => promoteDraft());

    context.subscriptions.push(newPostDisposable);
    context.subscriptions.push(newDraftDisposable);
    context.subscriptions.push(promoteDraftDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}