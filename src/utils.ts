import { window, TextEditor, workspace } from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function padNumber(n) {
	return (n < 10) ? '0' + n : n;
}

export function getDatePrefix() {
    const d = new Date();
    return `${d.getFullYear()}-${padNumber(d.getMonth())}-${padNumber(d.getDate())}`
}

export function createFile(filePath:string, content:string) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, { flag: 'wx' }, function (err) {
            if (err) reject(err);
            resolve();
        });
    });
}

export function openFileInEditor(filePath: string): Promise<TextEditor> {
    return new Promise((resolve, reject) => {
        workspace.openTextDocument(filePath)
            .then((textDocument) => {
                if (!textDocument) {
                    return reject('Could not open file!');
                }

                window.showTextDocument(textDocument).then((editor) => {
                    if (!editor) {
                        return reject('Could not show document!')
                    }
                    resolve(editor);
                });
            });
    });
  }