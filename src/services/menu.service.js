export default async function getMenuData() {
  return [
    {
      category: true,
      title: 'Users',
    },
    {
      title: 'User',
      key: 'apps',
      icon: 'fe fe-database',
      children: [
        {
          title: 'Profile',
          key: 'appsProfile',
          url: '/apps/profile',
        },
      ],
    },
    {
      category: true,
      title: 'Developers',
    },
    {
      title: 'Developers',
      key: 'developers',
      icon: 'fe fe-home',
      // roles: ['admin'], // set user roles with access to this route
      count: 2,
      children: [
        {
          title: 'Projects',
          key: 'dashboard',
          url: '/dashboard/projects',
          children: [
            {
              title: 'Dataset management',
              key: 'extraAppsJiraAgileBoard',
              url: '/apps/dataset-management',
            },
            {
              title: 'Field management',
              key: 'fields-management',
              url: '/apps/fields-management',
            },
          ],
        },
      ],
    },
    {
      title: 'Testers',
      key: 'testers',
      category: true,
      count: 5,
      icon: 'fe fe-hard-drive',
      children: [
        {
          title: 'Management',
          key: 'management',
          category: true,
          count: 3,
          icon: 'fe fe-hard-drive',
          children: [
            {
              title: 'TestPlan management',
              key: 'testPlan',
              url: '/apps/testPlan-management',
            },
            {
              title: 'TestSet management',
              key: 'testPlan',
              url: '/apps/testSet-management',
            },
            {
              title: 'Testcase management',
              key: 'testCase',
              url: '/apps/testCase-management',
            },
          ],
        },
        {
          title: 'Test management',
          key: 'tests',
          url: '/apps/tests-management',
        },
        {
          title: 'Jira management',
          key: 'extraAppsJiraDashboard',
          url: '/apps/jira-dashboard',
        },
      ],
    },
  ]
}
