import * as vscode from 'vscode';

function findSpecFile(suffix: string, folders: Array<string>, filenameWithoutExtension: string, filenameExtension: string) {
  if (folders.length === 0) {
    return;
  }

  const file = `**/${folders.join('/')}/${filenameWithoutExtension}${suffix}${filenameExtension}`;
  vscode.workspace.findFiles(file, '**/node_modules/**').then(files => {
    if (files.length === 0) {
      findSpecFile(suffix, folders.slice(1), filenameWithoutExtension, filenameExtension);
    } else {
      vscode.workspace.openTextDocument(vscode.Uri.file(files[0].path))
        .then(vscode.window.showTextDocument);
    }
  });
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.switchToSpec', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const workspace = vscode.workspace.getWorkspaceFolder(editor.document.uri);
    if (!workspace) {
      return;
    }

    const relativePath = editor.document.fileName.slice(workspace.uri.path.length + 1);
    const parsedPath = relativePath.match(/(.*)\/([^/]+)(\.\w+)$/);
    if (!parsedPath || parsedPath.length !== 4) {
      return;
    }
    const [, relativeFolderPath, filenameWithoutExtension, filenameExtension] = parsedPath;
    const isSpecFile = /(\.|_|-)(spec|test)$/;
    if (isSpecFile.test(filenameWithoutExtension)) {
      const codeFileWithoutExtension = filenameWithoutExtension.replace(isSpecFile, '');
      findSpecFile('', relativeFolderPath.split('/'), codeFileWithoutExtension, filenameExtension);
    } else {
      const suffixSpecs = ['.spec', '.test', '_spec', '_test', '-spec', '-test'];
      suffixSpecs.forEach(suffix => {
        findSpecFile(suffix, relativeFolderPath.split('/'), filenameWithoutExtension, filenameExtension);
      });
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() { }
