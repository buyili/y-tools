const tsLoader = require('./ts-loader.json')

// console.log(tsLoader.versions['9.5.1'].devDependencies.webpack);

class NpmVersionModel {
    constructor(major, minor, patch){
        this.major = major
        this.minor = minor
        this.patch = patch
    }

    static parseVersion(version){
        // TODO: check version is not null
        version = version.replaceAll(/\^|~|@/g, "")
        const versionChunks = version.split('.')
        return new NpmVersionModel(versionChunks[0], versionChunks[1], versionChunks[2])
    }
}

function compareVersionWithEqualsMajor(searchVersion, targetVersion){
    const searchVersionModel = NpmVersionModel.parseVersion(searchVersion)
    const targetVersionModel = NpmVersionModel.parseVersion(targetVersion)
    if(searchVersionModel.major !== targetVersionModel.major) return false
    if(searchVersionModel.minor <= targetVersionModel.minor) return true
    return searchVersionModel.patch <= targetVersionModel.patch
}

function compareVersionWithEqualsMajorAndMinor(searchVersion, targetVersion){
    const searchVersionModel = NpmVersionModel.parseVersion(searchVersion)
    const targetVersionModel = NpmVersionModel.parseVersion(targetVersion)
    if(searchVersionModel.major !== targetVersionModel.major) return false
    if(searchVersionModel.minor !== targetVersionModel.minor) return false
    return searchVersionModel.patch <= targetVersionModel.patch
}

function compareVersionWithEqualsStrict(searchVersion, targetVersion){
    const searchVersionModel = NpmVersionModel.parseVersion(searchVersion)
    const targetVersionModel = NpmVersionModel.parseVersion(targetVersion)
    return searchVersionModel.major === targetVersionModel.major && searchVersionModel.minor === targetVersionModel.minor && searchVersionModel.patch === targetVersionModel.patch
}

function isPackageNameWithVersion(packageName){
    let temp = packageName
    if(temp.indexOf('@') === 0){
        temp = packageName.substring(1)
    }
    return temp.indexOf("@") !== -1
}

function getCompareFunc(version){
    switch(version.substr(0, 1)){
        case '^':
            return compareVersionWithEqualsMajor
        case '~':
            return compareVersionWithEqualsMajorAndMinor
        default:
            return compareVersionWithEqualsStrict
    }
}

function findVersionsByDependeny(versions, packageSpec){
    const withVersion = isPackageNameWithVersion(packageSpec)
    const foundDependencies = []
    if(withVersion){
        const packageSpecName = packageSpec.substring(0, packageSpec.lastIndexOf("@"));
        console.log(packageSpecName);
        const packageSpecVersion = packageSpec.substring(packageSpec.lastIndexOf("@") + 1);
        const compareFunc = getCompareFunc(packageSpecVersion)
        console.log(compareFunc);
        for (const remoteVersionKey in versions) {
            if (Object.hasOwnProperty.call(versions, remoteVersionKey)) {
                const remoteVersion = versions[remoteVersionKey];
                for (const dependencyKey in remoteVersion.dependencies) {
                    if(dependencyKey === packageSpecName && compareFunc(packageSpecVersion, remoteVersion.dependencies[dependencyKey])){
                        console.log("shot dependeny:", dependencyKey, remoteVersion.dependencies[dependencyKey], " version: ", remoteVersionKey);
                        foundDependencies.push(remoteVersion)
                    }
                }
                for (const dependencyKey in remoteVersion.devDependencies) {
                    if(dependencyKey === packageSpecName && compareFunc(packageSpecVersion, remoteVersion.devDependencies[dependencyKey])){
                        console.log("shot devDependeny :", dependencyKey, remoteVersion.devDependencies[dependencyKey], " version: ", remoteVersionKey);
                        foundDependencies.push(remoteVersion)
                    }
                }
            }
        }
    } else {
        for (const remoteVersionKey in versions) {
            if (Object.hasOwnProperty.call(versions, remoteVersionKey)) {
                const remoteVersion = versions[remoteVersionKey];
                for (const dependencyKey in remoteVersion.dependencies) {
                    if(dependencyKey === packageSpec){
                        console.log("shot dependeny:", dependencyKey, remoteVersion.dependencies[dependencyKey], " version: ", remoteVersionKey);
                        foundDependencies.push(remoteVersion)
                    }
                }
                for (const dependencyKey in remoteVersion.devDependencies) {
                    if(dependencyKey === packageSpec){
                        console.log("shot devDependeny :", dependencyKey, remoteVersion.devDependencies[dependencyKey], " version: ", remoteVersionKey);
                        foundDependencies.push(remoteVersion)
                    }
                }
            }
        }
    }
    return foundDependencies
}

// const version = '4.5.0'
// const versions = tsLoader.versions;

const version = '3.0.0'
const versions = require('./less-loader.json').versions;


// findVersionsByDependeny(versions, 'webpack')
// findVersionsByDependeny(versions, 'webpack@' + version)
// findVersionsByDependeny(versions, 'webpack@~' + version)
findVersionsByDependeny(versions, 'webpack@^' + version)

console.log(isPackageNameWithVersion('webpack@' + version));
console.log(('@webpack@' + version).indexOf('@'));
// console.log(NpmVersionModel.parseVersion("^4.5.0"));
// console.log(NpmVersionModel.parseVersion("~4.5.0"));
// console.log(NpmVersionModel.parseVersion("@4.5.0"));
// console.log(NpmVersionModel.parseVersion("4.5.0"));


// console.log(compareVersionWithEqualsMajor("^4.5.0", "^4.5.0"));
// console.log(compareVersionWithEqualsMajor("^4.5.0", "^4.2.0"));
// console.log(compareVersionWithEqualsMajor("^4.5.0", "^4.5.12"));
// console.log(compareVersionWithEqualsMajor("^4.5.1", "^4.5.0"));
// console.log(compareVersionWithEqualsMajor("^4.5.0", "^5.5.0"));


// console.log(isPackageNameWithVersion('ts-loader'));
// console.log(isPackageNameWithVersion('ts-loader@9.5.1'));
// console.log(isPackageNameWithVersion('ts-loader@^9.5.1'));
// console.log(isPackageNameWithVersion('ts-loader@~9.5.1'));
// console.log(isPackageNameWithVersion('@types/ts-loader@9.5.1'));
// console.log(isPackageNameWithVersion('@types/ts-loader@^9.5.1'));
// console.log(isPackageNameWithVersion('@types/ts-loader@~9.5.1'));