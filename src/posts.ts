import {
    window, commands, Disposable, ExtensionContext,
    StatusBarAlignment, StatusBarItem, TextDocument, workspace
} from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as slug from 'slug';
import { getDatePrefix, createFile, openFileInEditor } from './utils';

export function getPostsPath() {
    return path.join(workspace.rootPath, '_posts');
}

export function newPost() {
    console.log('Creating new post');
    // Display a message box to the user
    window.showInputBox({ prompt: 'Enter post title' })
        .then(getPostFileName)
        .then(createPostFile);
}

export function getPostFrontMatter(title: string):string {
    return '---\nlayout: post\ntitle: ' + title + '\ntags: []\n---\n';
}

function getPostFileName(title: string) {
    const d = new Date();
    return { filename: `${getDatePrefix()}-${slug(title, { lower: true })}.md`, title };
}

function createPostFile({filename, title}) {
    const filePath = path.join(getPostsPath(), filename);
    createFile(filePath, getPostFrontMatter(title))
        .then(() => openFileInEditor(filePath))
        .then(() => window.showInformationMessage('Created new post'))
        .catch(console.error)
}