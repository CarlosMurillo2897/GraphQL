import { getJobs, getJob, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
    Query: {
        company: async (_root, { id }) => {
            const company = await getCompany(id);
            if(!company) {
                throw notFoundError(`Company with id ${id} not found`);
            }
            return company;
        },
        job: async (_root, { id }) => {
            const job = await getJob(id);
            if(!job) {
                throw notFoundError(`Job with id ${id} not found`);
            }
            return job;
        },
        jobs: () => getJobs()
    },

    Company: {
        jobs: ({ id }) => getJobsByCompany(id),
    },

    Job: {
        date: (job) => toIsoDate(job.createdAt),
        company: (job) => getCompany(job.companyId)
    },
};

function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'NOT_FOUND' }
    });
}

function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}