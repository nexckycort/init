import { dirname, join } from 'node:path';
import { cwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import type { FRAMEWORKS } from './framework.js';
import { copyFolder, directoryExists } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDirectory = cwd();

export async function configureMonorepo(
  projectName: string,
  framework: FRAMEWORKS,
) {
  const project = projectName.replaceAll(' ', '-');
  const projectDirectory = join(rootDirectory, project);
  const projectExists = directoryExists(projectDirectory);
  if (projectExists) {
    throw new Error('Project with that name already exists');
  }

  if (framework === 'solid') {
    console.log('\ncoming soon');
    return;
  }

  const sourceFolder = join(
    __dirname,
    '..',
    'templates',
    `monorepo-${framework}`,
  );
  await copyFolder(sourceFolder, projectDirectory);
}
