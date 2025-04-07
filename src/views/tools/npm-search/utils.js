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

function buildFoundPackage(packageInfo, dependencyName, dependencyVersion){
  return {
    ...packageInfo,
    targetDependencyName: dependencyName,
    targetDependencyVersion: dependencyVersion
  }
}

export function findVersionsByDependency(versions, packageSpec){
  const withVersion = isPackageNameWithVersion(packageSpec)
  const foundDependencies = []
  if(withVersion){
    const packageSpecName = packageSpec.substring(0, packageSpec.lastIndexOf("@"));
    const packageSpecVersion = packageSpec.substring(packageSpec.lastIndexOf("@") + 1);
    const compareFunc = getCompareFunc(packageSpecVersion)
    for (const remoteVersionKey in versions) {
      if (Object.hasOwnProperty.call(versions, remoteVersionKey)) {
        const remoteVersion = versions[remoteVersionKey];
        for (const dependencyKey in remoteVersion.dependencies) {
          let dependencyVersion = remoteVersion.dependencies[dependencyKey]
          if(dependencyKey === packageSpecName && compareFunc(packageSpecVersion, dependencyVersion)){
            foundDependencies.push(buildFoundPackage(remoteVersion, dependencyKey, dependencyVersion))
          }
        }
        for (const dependencyKey in remoteVersion.devDependencies) {
          let dependencyVersion = remoteVersion.devDependencies[dependencyKey]
          if(dependencyKey === packageSpecName && compareFunc(packageSpecVersion, dependencyVersion)){
            foundDependencies.push(buildFoundPackage(remoteVersion, dependencyKey, dependencyVersion))
          }
        }
      }
    }
  } else {
    for (const remoteVersionKey in versions) {
      if (Object.hasOwnProperty.call(versions, remoteVersionKey)) {
        const remoteVersion = versions[remoteVersionKey];
        for (const dependencyKey in remoteVersion.dependencies) {
          let dependencyVersion = remoteVersion.dependencies[dependencyKey]
          if(dependencyKey === packageSpec){
            foundDependencies.push(buildFoundPackage(remoteVersion, dependencyKey, dependencyVersion))
          }
        }
        for (const dependencyKey in remoteVersion.devDependencies) {
          let dependencyVersion = remoteVersion.devDependencies[dependencyKey]
          if(dependencyKey === packageSpec){
            foundDependencies.push(buildFoundPackage(remoteVersion, dependencyKey, dependencyVersion))
          }
        }
      }
    }
  }
  return foundDependencies
}
