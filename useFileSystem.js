// useFileSystem.js
import RNFS from 'react-native-fs';

export const useFileSystem = () => {
  const documentDirectory = RNFS.DocumentDirectoryPath;

  const downloadFile = async (url, name) => {
    const destPath = `${documentDirectory}/${name}`;
    const options = {
      fromUrl: url,
      toFile: destPath,
    };
    try {
      const ret = await RNFS.downloadFile(options).promise;
      if (ret.statusCode === 200) {
        return { uri: `file://${destPath}` };
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Download error', error);
      throw error;
    }
  };

  const writeAsStringAsync = async (fileUri, content) => {
    await RNFS.writeFile(fileUri, content, 'utf8');
  };

  return {
    downloadFile,
    size: 0,
    progress: 0,
    success: true,
    error: null,
    documentDirectory,
    writeAsStringAsync,
  };
};
