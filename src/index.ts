import { red, reset } from 'kolorist';
import prompts from 'prompts';
import { PROJECTS, type ProjectName, projectLookupMap } from './project.js';

export async function createProjects() {
  try {
    const { project } = await prompts(
      {
        type: 'select',
        name: 'project',
        message: reset('Select a project:'),
        initial: 0,
        choices: PROJECTS.map((project) => {
          const projectColor = project.color;
          return {
            title: projectColor(project.display || project.name),
            value: project,
          };
        }),
      },
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`);
        },
      },
    );

    const response = await prompts(project.options, {
      onCancel: () => {
        throw new Error('Operation cancelled');
      },
    });

    const projectInfo = projectLookupMap[project.name as ProjectName];
    await projectInfo(response);

    if (project.name === 'monorepo') {
      console.log('\nDone. Now run:\n');
      console.log('  pnpm install');
    }
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (cancelled: any) {
    console.log(`${red('✖')} ${cancelled.message}`);
    return;
  }
}

await createProjects();
