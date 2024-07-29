import { execSync as exec } from 'node:child_process';


export function syncCrossWorkspaceDependencies() {
	for (const [ packageName, packageVersion ] of Object.entries(getWorkspacePackages())) {
		const foundDependencies = findDependency(packageName);

		for (const { workspace, dependencyType } of foundDependencies) {
			setDependency(workspace, dependencyType, packageName, packageVersion);
		}
	}
}

/** @typedef {'dependency' | 'devDependency' | 'peerDependency'} DependencyType */

/**
 * @returns {{ [packageName: string]: string }}
 */
function getWorkspacePackages() {
	return execNpmQuery('--workspaces pkg get version');
}

/**
 * @param {string} dependencyName
 * @returns {Array.<{ workspace: string, dependencyType: DependencyType, version: string }>}
 */
function findDependency(dependencyName) {
	/** @type {{ [workspace: string]: { [dependencyType in DependencyType]?: { [dependencyName: string]: string } } }} */
	const output = execNpmQuery('--workspaces pkg get dependencies devDependencies peerDependencies');

	return Object.entries(output).flatMap(([ workspace, dependencyTypes ]) =>
			Object.entries(dependencyTypes).flatMap(([ dependencyType, dependencies ]) =>
					Object.entries(dependencies)
						.filter(([ name ]) => name === dependencyName)
						.map(([ /**/, version ]) => ({ workspace, dependencyType, version }))
			)
		);
}

/**
 * @param {string} workspace
 * @param {DependencyType} dependencyType
 * @param {string} dependencyName
 * @param {string} dependencyVersion
 */
function setDependency(workspace, dependencyType, dependencyName, dependencyVersion) {
	exec(`npm --json --workspace ${workspace} pkg set '${dependencyType}.${dependencyName}="${dependencyVersion}"'`);
}

/**
 * @param {string} command
 * @returns {object}
 */
function execNpmQuery(command) {
	return JSON.parse(exec('npm --json ' + command).toString('utf-8'));
}
