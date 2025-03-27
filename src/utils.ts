import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';

export function directoryExists(directory: string): boolean {
  return existsSync(directory);
}

export async function copyFolder(
  sourceFolder: string,
  destinationFolder: string,
) {
  const files = await readdir(sourceFolder);

  await mkdir(destinationFolder, { recursive: true });

  await Promise.all(
    files.map(async (file) => {
      const sourcePath = `${sourceFolder}/${file}`;
      const destinationPath = `${destinationFolder}/${file}`;

      const stats = await stat(sourcePath);

      if (stats.isDirectory()) {
        await copyFolder(sourcePath, destinationPath);
      } else {
        await copyFile(sourcePath, destinationPath);
      }
    }),
  );
}
