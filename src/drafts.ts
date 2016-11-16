import {
    window, commands, Disposable, ExtensionContext,
    StatusBarAlignment, StatusBarItem, TextDocument, workspace, Uri
} from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as slug from 'slug';
import { createFile, openFileInEditor } from './utils';
import { getPostFrontMatter } from './posts';

export function getDraftsPath() {
    return path.join(workspace.rootPath, '_drafts');
}

export function newDraft() {
    console.log('Creating new draft');

    // Display a message box to the user
    window.showInputBox({ prompt: 'Enter draft title' })
        .then(getDraftFileName)
        .then(createDraftFile);
}

export function promoteDraft() {

}

function getDraftFileName(title: string) {
    const d = new Date();
    return { filename: `${slug(title, { lower: true })}.md`, title };
}

function createDraftFile({filename, title}) {
    const filePath = path.join(getDraftsPath(), filename);
    createFile(filePath, getPostFrontMatter(title))
        .then(() => openFileInEditor(filePath))
        .then(() => window.showInformationMessage('Created new draft'))
        .catch(console.error)
}