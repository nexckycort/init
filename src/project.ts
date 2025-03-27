import { cyan, reset } from 'kolorist';
import type { Answers } from 'prompts';
import { configureMonorepo } from './configure-monorepo.js';
import { FRAMEWORK } from './framework.js';

export const PROJECTS = [
  {
    name: 'monorepo',
    display: 'monorepo',
    color: cyan,
    options: [
      {
        type: 'select',
        name: 'framework',
        message: reset('Select framework'),
        initial: 0,
        choices: FRAMEWORK.map((framework) => {
          const frameworkColor = framework.color;
          return {
            title: frameworkColor(framework.display),
            value: framework,
          };
        }),
      },
      {
        type: 'text',
        name: 'projectName',
        message: reset('project name'),
        initial: 'example',
      },
    ],
  },
] as const;

export type ProjectName = (typeof PROJECTS)[number]['name'];

type ProjectMap = {
  [K in ProjectName]: (response: Answers<string>) => Promise<void>;
};

export const projectLookupMap: ProjectMap = {
  monorepo: async (response: Answers<'projectName' | 'framework'>) => {
    const { projectName, framework } = response;
    await configureMonorepo(projectName, framework.name);
  },
};
