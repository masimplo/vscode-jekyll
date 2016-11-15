// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import {
    window, commands, Disposable, ExtensionContext,
    StatusBarAlignment, StatusBarItem, TextDocument, workspace
} from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as slug from 'slug';

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error).
    // This line of code will only be executed once when your extension is activated.
    console.log('Jekyll is now active');

    // The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var disposable = commands.registerCommand('extension.newPost', () => {
		// The code you place here will be executed every time your command is executed

        Posts.newPost();
	});

}

function pad(n) {
	return (n < 10) ? '0' + n : n;
}

function getDatePrefix() {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth())}-${pad(d.getDate())}`
}
class Posts {
    public static get postsPath() {
        return path.join(workspace.rootPath, '_posts');
    }


    public static newPost() {
        console.log('Creating new post');
        let postTitle = '';
        // Display a message box to the user
        window.showInputBox({ prompt: 'Enter post title' })
            .then(Posts.getPostFileName)
            .then(Posts.getPostFilePath)
            .then(Posts.createPostFile);
    }

    private static getPostFileName(title: string) {
        const d = new Date();
        return { filename: `${getDatePrefix()}-${slug(title, { lower: true })}.md`, title };
    }

    private static getPostFilePath({filename, title}) {
        return { filePath: path.join(Posts.postsPath, filename), title };
    }

    private static createPostFile({filePath, title}) {
        fs.writeFile(filePath, Posts.getPostFrontMatter(title), { flag: 'wx' }, function (err) {
            console.error(err);
            window.showInformationMessage('Created new post');
        });
    }

    private static getPostFrontMatter(title:string) {
        return `
        ---
        layout: post
        title: ${title}
        tags: []
        ---`;
    }
}