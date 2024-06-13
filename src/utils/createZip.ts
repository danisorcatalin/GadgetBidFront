import JSZip from 'jszip';

export const createZip = async (files: File[] = [], name = 'archive.zip'): Promise<File> => {
  try {
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.name, file);
    });
    const archive = await zip.generateAsync({ type: 'blob' });
    return new File([archive], name);
  } catch (e) {
    throw new Error(e);
  }
};
