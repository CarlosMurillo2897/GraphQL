export const resolvers = {
    Query: {
        jobs: () => {
            return [
                {
                    id: 'test-id',
                    title: 'The title',
                    description: 'The description'
                },
                {
                    id: 'test-id-2',
                    title: 'The title 2',
                    description: 'The description'
                },
            ];
          }
    }  
};